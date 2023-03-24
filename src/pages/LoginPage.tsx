import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Container, Form, Nav, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate } from 'react-router-dom';
import { CheckAuth } from '../apiclient/apiclient';
import NotyfContext from '../context/NotyfContext';
import { signIn } from '../context/slices/auth_slice';
import { store } from '../context/store';
import { LoginData } from '../models/LoginData';
import { State } from '../models/State';
import { getCookie } from '../storageclient/storageclient';

export default function LoginPage() {
  const notyf = useContext(NotyfContext);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginData>({} as LoginData);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  const is991px = useMediaQuery({ query: '(max-width: 991px)' });
  const isLoggedIn = useSelector((state: State) => state.isLoggedIn);

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
          }
        });
      }
    })();
    return () => {
      cancelToken.cancel();
    };
  }, []);

  const attemptLogin = async (event: any) => {
    if (loginLoading) return;
    event.preventDefault();
    event.stopPropagation();

    setLoginLoading(true);
    try {
      await store.dispatch(
        signIn({
          username: loginData.username,
          password: loginData.password,
        }),
      );
      setLoginData({} as LoginData);
      setLoginLoading(false);
      navigate('/Home');
    } catch (err: any) {
      // Handle errors here with some state variables probably
      notyf.error('Invalid username or password');
      setLoginData((previous) => ({ ...previous, password: '' }));
      setLoginLoading(false);
    }
  };

  const renderLoginForm = () => {
    return (
      <Form noValidate validated={true} onSubmit={attemptLogin}>
        <Form.Group className='mb-3 input-container' controlId='formUsername'>
          <Form.Label style={{ color: 'black' }}>Username</Form.Label>
          <Form.Control
            type='text'
            className='input-box'
            placeholder='Your username'
            value={loginData.username ?? ''}
            onChange={(event) =>
              setLoginData((prev) => ({
                ...prev,
                username: event.target.value,
              }))
            }
            required
            minLength={3}
          />
          <Form.Control.Feedback type='invalid'>
            3 or more characters required
          </Form.Control.Feedback>
          <Form.Control.Feedback type='valid'>
            Looks good!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3 input-container' controlId='formPassword'>
          <Form.Label style={{ color: 'black' }}>Password</Form.Label>
          <Form.Control
            type='password'
            className='input-box'
            placeholder='Your password'
            value={loginData.password ?? ''}
            onChange={(event) =>
              setLoginData((prev) => ({
                ...prev,
                password: event.target.value,
              }))
            }
            required
            minLength={8}
          />
          <Form.Control.Feedback type='invalid'>
            8 or more characters required
          </Form.Control.Feedback>
          <Form.Control.Feedback type='valid'>
            Looks good!
          </Form.Control.Feedback>
        </Form.Group>
        <Button type='submit' disabled={loginLoading} style={{ width: '5rem' }}>
          {loginLoading ? <Spinner animation='border' size='sm' /> : 'Submit'}
        </Button>
      </Form>
    );
  };

  // Build UI
  return (
    <React.Fragment>
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
        }}
        id='loginPage'>
        <Card style={{ padding: '2rem', width: `${is991px ? '85%' : '50%'}` }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>Login</p>
          {isLoggedIn ? (
            <div>
              <p>
                You are already logged in! I might do something with this at
                some stage.
              </p>
              <div style={{ display: 'flex' }}>
                <p>For now though,&nbsp;</p>
                <Nav.Link as={Link} to='/Home' style={{ color: '#55cc69' }}>
                  Go home?
                </Nav.Link>
              </div>
            </div>
          ) : (
            renderLoginForm()
          )}
        </Card>
      </Container>
    </React.Fragment>
  );
}
