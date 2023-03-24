import { faL, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  ListGroup,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { GetSessions, RevokeSession } from '../../apiclient/apiclient';
import { store } from '../../context/store';
import { SessionData } from '../../models/SessionData';
import { getCookie, removeCookie } from '../../storageclient/storageclient';
import Moment from 'react-moment';
import 'moment-timezone';
import Swal from 'sweetalert2';
import NotyfContext from '../../context/NotyfContext';

export default function SessionComponent() {
  const [sessions, setSessions] = useState<SessionData[]>([] as SessionData[]);
  const [sessionsLoaded, setSessionsLoaded] = useState<boolean>(false);
  const [revokingSession, setRevokingSession] = useState<string | null>(null);
  const notyf = useContext(NotyfContext);

  const is991px = useMediaQuery({ query: '(max-width: 991px)' });

  // UseEffect to check auth and signout if need be
  useEffect(() => {
    let cancelToken = axios.CancelToken.source();
    setSessionsLoaded(false);
    (async () => {
      GetSessions(cancelToken).then((result) => {
        setSessions(result);
        setSessionsLoaded(true);
      });
    })();
    return () => {
      cancelToken.cancel();
    };
  }, []);

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
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Created</th>
                <th>City</th>
                <th>Country</th>
                <th>Lat, Lon</th>
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
                          {session.currentSession ? (
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
        )}
      </Container>
    </React.Fragment>
  );
}
