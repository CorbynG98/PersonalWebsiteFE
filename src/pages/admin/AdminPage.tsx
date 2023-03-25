import { CheckAuth } from '@src/apiclient/apiclient';
import { store } from '@src/context/store';
import { getCookie, removeCookie } from '@src/storageclient/storageclient';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Container, Tab, Tabs } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import ActivityComponent from './ActivityComponent';
import ProfileComponent from './ProfileComponent';
import SessionComponent from './SessionComponent';

export default function AdminPage() {
  const [key, setKey] = useState('profile');
  const navigate = useNavigate();

  const is991px = useMediaQuery({ query: '(max-width: 991px)' });

  // UseEffect to check auth and signout if need be
  useEffect(() => {
    let cancelToken = axios.CancelToken.source();
    (async () => {
      let auth = await getCookie('cgAuthData');
      if (auth != null && auth.token != null) {
        CheckAuth(cancelToken).then((result) => {
          if (!result) {
            // Run logout function
            store.dispatch({ type: 'SIGN_OUT' });
            removeCookie('cgAuthData');
            navigate('/Home');
          }
        });
      } else {
        navigate('/Home');
      }
    })();
    return () => {
      cancelToken.cancel();
    };
  }, []);
  // Build UI
  return (
    <React.Fragment>
      <Container id='adminPage' style={{ paddingTop: '2rem' }}>
        <Card style={{ padding: '2rem' }}>
          <Tabs
            id='profile-tab'
            activeKey={key}
            onSelect={(k) => setKey(k ?? 'profile')}
            className='mb-3 noBottomBorder'
            mountOnEnter={true}>
            <Tab
              eventKey='profile'
              title='Profile'
              className='noBottomBorder'
              mountOnEnter={true}>
              <ProfileComponent />
            </Tab>
            <Tab eventKey='sessions' title='Sessions' mountOnEnter={true}>
              <SessionComponent />
            </Tab>
            <Tab eventKey='authActivity' title='Activity' mountOnEnter={true}>
              <ActivityComponent />
            </Tab>
          </Tabs>
        </Card>
      </Container>
    </React.Fragment>
  );
}
