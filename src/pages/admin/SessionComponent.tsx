import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetSessions, RevokeSession } from '@src/apiclient/apiclient';
import CustomPagination from '@src/components/CustomPagination';
import NotyfContext from '@src/context/NotyfContext';
import { SessionResource } from '@src/models/SessionResource';
import axios from 'axios';
import 'moment-timezone';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import Moment from 'react-moment';
import { useMediaQuery } from 'react-responsive';
import Swal from 'sweetalert2';

export default function SessionComponent() {
  const [sessions, setSessions] = useState<SessionResource[]>(
    [] as SessionResource[],
  );
  const [sessionsLoaded, setSessionsLoaded] = useState<boolean>(false);
  const [revokingSession, setRevokingSession] = useState<string | null>(null);
  const notyf = useContext(NotyfContext);
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const is991px = useMediaQuery({ query: '(max-width: 991px)' });
  const is500px = useMediaQuery({ query: '(max-width: 500px)' });
  const is400px = useMediaQuery({ query: '(max-width: 400px)' });

  // UseEffect to check auth and signout if need be
  useEffect(() => {
    let cancelToken = axios.CancelToken.source();
    setSessionsLoaded(false);
    (async () => {
      GetSessions(pageSize, page, cancelToken).then((result) => {
        setSessions(result);
        setSessionsLoaded(true);
      });
    })();
    return () => {
      cancelToken.cancel();
    };
  }, [pageSize, page]);

  const showRevokeConfirmAlert = (sessionId: string) => {
    Swal.fire({
      title: 'Revoke session',
      text: 'Are you sure you wish to revoke this session?',
      showCancelButton: true,
      confirmButtonColor: '#55cc69',
    }).then((result) => {
      if (result.isConfirmed) {
        setRevokingSession(sessionId);
        RevokeSession(sessionId)
          .then(() => {
            let newSessions = sessions.filter((value) => {
              return value.id != sessionId;
            });
            setSessions(newSessions);
            notyf.success('Session has been revoked.');
          })
          .catch(() => {
            setRevokingSession(null);
            notyf.error('Failed to revoke this session');
          });
      }
    });
  };

  // Build UI
  return (
    <React.Fragment>
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
        id='profileComponent'>
        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>Active sessions</p>
        {!sessionsLoaded ? (
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
                  <th>Created</th>
                  {is991px ?
                    <th>Location</th>
                    :
                    <>
                      <th>City</th>
                      <th>Country</th>
                      <th>Lat, Lon</th>
                    </>}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sessions &&
                  sessions.map((session, index) => (
                    <tr key={index}>
                      <td style={{ verticalAlign: 'middle' }}>
                        <p style={{ margin: 0 }}>
                          <Moment format='YYYY-MM-DD'>
                            {session.createdAt ?? new Date()}
                          </Moment>
                        </p>
                      </td>

                      {is991px ?
                        <td style={{ verticalAlign: 'middle' }}>
                          {is400px ?
                            <div>
                              <p style={{ margin: 0 }}>{session.city}</p>
                              <p style={{ margin: 0 }}>{session.country}</p>
                            </div>
                            :
                            <div style={{ display: 'flex' }}>
                              <p style={{ margin: 0 }}>{session.city}</p>,&nbsp;
                              <p style={{ margin: 0 }}>{session.country}</p>
                            </div>
                          }
                          <p style={{ margin: 0 }}>
                            {session.latitude}, {session.longitude}
                          </p>
                        </td>
                        :
                        <>
                          <td style={{ verticalAlign: 'middle' }}>
                            <p style={{ margin: 0 }}>{session.city}</p>
                          </td>
                          <td style={{ verticalAlign: 'middle' }}>
                            <p style={{ margin: 0 }}>{session.country}</p>
                          </td>
                          <td style={{ verticalAlign: 'middle' }}>
                            <p style={{ margin: 0 }}>
                              {session.latitude}, {session.longitude}
                            </p>
                          </td>
                        </>}
                      <td>
                        {revokingSession == session.id ? (
                          <div
                            style={{
                              paddingLeft: '0.75rem',
                              paddingRight: '0.75rem',
                            }}>
                            <Spinner
                              animation='border'
                              variant='dark'
                              size='sm'
                            />
                          </div>
                        ) : (
                          <Button
                            onClick={() => showRevokeConfirmAlert(session.id)}
                            disabled={session.currentSession}
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              display: 'flex',
                              alignItems: 'center',
                            }}>
                            <FontAwesomeIcon
                              icon={faTrash}
                              size='1x'
                              color={session.currentSession ? 'red' : 'black'}
                              className='iconLinkStyle'
                            />
                            {session.currentSession && !is500px ? (
                              <p
                                style={{
                                  margin: 0,
                                  color: 'black',
                                  paddingLeft: '1rem',
                                }}>
                                Current session
                              </p>
                            ) : (
                              <></>
                            )}
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <CustomPagination
              page={page}
              pageSize={pageSize}
              pageSizeOptions={[5, 10]}
              totalItems={sessions.length}
              onPageSizeChange={(newPageSize: number) => { setPageSize(newPageSize); setPage(1) }}
              onPageChange={(newPage: number) => setPage(newPage)}
            />
          </>
        )}
      </Container>
    </React.Fragment>
  );
}
