import { GetUserData } from '@src/apiclient/apiclient';
import NotyfContext from '@src/context/NotyfContext';
import { setActiveLink, signOut } from '@src/context/slices/auth_slice';
import { store } from '@src/context/store';
import { UserDataResource } from '@src/models/UserResource';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';

export default function ProfileComponent() {
  const [profile, setProfile] = useState<UserDataResource>();
  const [profileLoading, setProfileLoading] = useState<boolean>(false);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
  const notyf = useContext(NotyfContext);
  const navigate = useNavigate();

  // UseEffect to check auth and signout if need be
  useEffect(() => {
    let cancelToken = axios.CancelToken.source();
    setProfileLoading(true);
    (async () => {
      GetUserData(cancelToken).then((result) => {
        setProfile(result);
        setProfileLoading(false);
      });
    })();
    return () => {
      cancelToken.cancel();
    };
  }, []);

  const attemptSignout = async (event: any) => {
    if (logoutLoading) return;
    event.preventDefault();
    event.stopPropagation();

    setLogoutLoading(true);
    try {
      await store.dispatch(signOut());
      setLogoutLoading(false);
      store.dispatch(setActiveLink('home')); // To make sure nav doesn't render on home page when we redirect
      navigate('/Home');
    } catch (err: any) {
      // Handle errors here with some state variables probably
      setLogoutLoading(false);
      notyf.error('Logout failed. Cookies have still been cleared');
      navigate('/Home');
    }
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
        <div style={{ display: 'flex', marginBottom: '1rem' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
            Profile Data
          </p>

          <Button
            onClick={attemptSignout}
            disabled={logoutLoading}
            variant='danger'
            style={{ width: '5rem', marginLeft: '1.5rem' }}>
            {logoutLoading ? (
              <Spinner animation='border' size='sm' />
            ) : (
              'Logout'
            )}
          </Button>
        </div>
        {profileLoading ? (
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
            <div style={{ display: 'flex' }}>
              <p style={{ fontSize: '1.25rem' }}>Username:&nbsp;</p>
              <p style={{ fontSize: '1.25rem', color: '#55cc69' }}>
                {profile?.username}
              </p>
            </div>
            <div style={{ display: 'flex' }}>
              <p style={{ fontSize: '1.25rem' }}>Created At:&nbsp;</p>
              <p style={{ fontSize: '1.25rem', color: '#55cc69' }}>
                <Moment format='LLLL'>
                  {profile?.createdAt ?? new Date()}
                </Moment>
              </p>
            </div>
            <div style={{ display: 'flex' }}>
              <p style={{ fontSize: '1.25rem' }}>Updated At:&nbsp;</p>
              <p style={{ fontSize: '1.25rem', color: '#55cc69' }}>
                <Moment format='LLLL'>
                  {profile?.updatedAt ?? new Date()}
                </Moment>
              </p>
            </div>
            <div style={{ display: 'flex' }}>
              <p style={{ fontSize: '1.25rem' }}>Last Login At:&nbsp;</p>
              <p style={{ fontSize: '1.25rem', color: '#55cc69' }}>
                <Moment format='LLLL'>
                  {profile?.lastLoginAt ?? new Date()}
                </Moment>
              </p>
            </div>
          </>
        )}
      </Container>
    </React.Fragment>
  );
}
