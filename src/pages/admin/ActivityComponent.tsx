import { GetActivities } from '@src/apiclient/apiclient';
import CustomPagination from '@src/components/CustomPagination';
import { AuthActivityResource, AuthActivityType } from '@src/models/AuthActivityResource';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Spinner, Table } from 'react-bootstrap';
import Moment from 'react-moment';
import { useMediaQuery } from 'react-responsive';

export default function ActivityComponent() {
  const [activities, setActivities] = useState<AuthActivityResource[]>(
    [] as AuthActivityResource[],
  );
  const [activitiesLoaded, setActivitiesLoaded] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10)
  const [page, setPage] = useState<number>(1);

  const is575px = useMediaQuery({ query: '(max-width: 575px)' });

  // UseEffect to check auth and signout if need be
  useEffect(() => {
    let cancelToken = axios.CancelToken.source();
    setActivitiesLoaded(false);
    (async () => {
      GetActivities(pageSize, page, cancelToken).then((result) => {
        setActivities(result);
        setActivitiesLoaded(true);
      });
    })();
    return () => {
      cancelToken.cancel();
    };
  }, [pageSize, page]);

  // Build UI
  return (
    <React.Fragment>
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
        id='profileComponent'>
        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
          Activity Component
        </p>
        {!activitiesLoaded ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Spinner animation='border' variant='dark' />
          </div>
        ) : (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Actioned</th>
                  {!is575px && <th>SessionId</th>}
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {activities &&
                  activities.slice(0, pageSize).map((activity, index) => (
                    <tr key={index}>
                      <td style={{ verticalAlign: 'middle' }}>
                        <p style={{ margin: 0 }}>
                          <Moment format='YYYY-MM-DD'>
                            {activity.actionedAt ?? new Date()}
                          </Moment>
                        </p>
                      </td>
                      {!is575px &&
                        <td style={{ verticalAlign: 'middle' }}>
                          <p style={{ margin: 0 }}>{activity.sessionId}</p>
                        </td>
                      }

                      <td style={{ verticalAlign: 'middle' }}>
                        <p style={{ margin: 0 }}>
                          {AuthActivityType[activity.type]}
                        </p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <CustomPagination
              page={page}
              pageSize={pageSize}
              pageSizeOptions={[5, 10]}
              totalItems={activities.length}
              onPageSizeChange={(newPageSize: number) => { setPageSize(newPageSize); setPage(1) }}
              onPageChange={(newPage: number) => setPage(newPage)}
            />
          </>
        )}
      </Container>
    </React.Fragment>
  );
}
