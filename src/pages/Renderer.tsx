import RoutesComponent from '../components/RoutesComponent';
import { CheckAuth } from '../apiclient/apiclient';
import { signIn, signOut } from '../context/slices/auth_slice';
import { store } from '../context/store';
import { LoginData } from '../models/LoginData';
import { State } from '../models/State';
import { getCookie } from '../storageclient/storageclient';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Notyf } from 'notyf';
import { useEffect, useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import '../custom.css';
import NavBarComponentTop from '../components/NavBarComponentTop';
import NavBarComponentBottom from '../components/NavBarComponentBottom';

export const Renderer = () => {
  const notyf = new Notyf({
    dismissible: true,
    position: { x: 'right', y: 'top' },
  });
  // State stuff
  const [isLoginModalVisible, setLoginModalVisible] = useState<boolean>(false);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<LoginData>({} as LoginData);
  const [formValidated, setFormValidated] = useState<boolean>(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState<
    string | undefined | null
  >(null);
  // Selector stuff
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
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setFormValidated(true);
      return;
    }

    setLoginLoading(true);
    try {
      await store.dispatch(
        signIn({
          username: loginData.username,
          password: loginData.password,
        }),
      );
      setLoginData({} as LoginData);
      setLoginModalVisible(false);
      setLoginLoading(false);
    } catch (err: any) {
      // Handle errors here with some state variables probably
      setLoginErrorMessage('Invalid username or password');
      setFormValidated(true);
      setLoginData((previous) => ({ ...previous, password: '' }));
      setLoginLoading(false);
    }
  };

  const attemptLogout = async () => {
    try {
      await store.dispatch(signOut());
    } catch (err) {
      notyf.error('Failed to signout of this account.');
    }
  };

  return (
    <HelmetProvider>
      <Helmet
        titleTemplate='Corbyn Greenwood | %s'
        defaultTitle='Corbyn Greenwood | Home'
      />
      <Router>
        <div className='maxHeight'>
          <NavBarComponentTop />
          <RoutesComponent />
          <NavBarComponentBottom />
        </div>
      </Router>

      <Modal
        show={isLoginModalVisible}
        onHide={() => setLoginModalVisible(false)}
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={formValidated} onSubmit={attemptLogin}>
          <Modal.Body>
            <Form.Group className='mb-3' controlId='formUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter username'
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
                Required and 3 or more characters
              </Form.Control.Feedback>
              <Form.Control.Feedback type='valid'>
                Looks good!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
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
                Required and 8 or more characters
              </Form.Control.Feedback>
              <Form.Control.Feedback type='valid'>
                Looks good!
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {loginErrorMessage && (
              <p style={{ color: 'red' }}>{loginErrorMessage}</p>
            )}
            <Button
              variant='secondary'
              onClick={() => setLoginModalVisible(false)}
              disabled={loginLoading}>
              Close
            </Button>
            <Button
              type='submit'
              disabled={loginLoading}
              style={{ width: '5rem' }}>
              {loginLoading ? (
                <Spinner animation='border' size='sm' />
              ) : (
                'Login'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </HelmetProvider>
  );
};
