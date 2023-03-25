import { setActiveLink } from '@src/context/slices/auth_slice';
import { store } from '@src/context/store';
import { State } from '@src/models/State';
import { useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

const NavBarComponentTop = () => {
  const activeLink = useSelector((state: State) => state.activeLink);
  const isLoggedIn = useSelector((state: State) => state.isLoggedIn);
  const username = useSelector((state: State) => state.username);
  const mouseClickApplyActive = (id: string) => {
    store.dispatch(setActiveLink(id));
  };
  const is1100px = useMediaQuery({ query: '(max-width: 1100px)' });
  const is575px = useMediaQuery({ query: '(max-width: 575px)' });
  const is360px = useMediaQuery({ query: '(max-width: 400px)' });

  useEffect(() => {
    var path = window.location.pathname;
    var active = '';
    if (path.toLowerCase().indexOf('home') != -1 || path == '/')
      active = 'home';
    if (path.toLowerCase().indexOf('resumt') != -1) active = 'resume';
    if (path.toLowerCase().indexOf('projects') != -1) active = 'projects';
    if (path.toLowerCase().indexOf('about') != -1) active = 'about';
    if (path.toLowerCase().indexOf('contact') != -1) active = 'connect';
    // Admin links. Bundle login and admin to admin active
    if (path.toLowerCase().indexOf('admin') != -1) active = 'admin';
    if (path.toLowerCase().indexOf('login') != -1) active = 'admin';
    store.dispatch(setActiveLink(active));
  });

  const renderCollapsableNavBar = () => {
    return (
      <>
        <Navbar
          variant='dark'
          sticky='top'
          expand='sm'
          className={`m-auto navSemiBackground ${
            activeLink == 'home' || activeLink == 'resume' ? 'd-none' : ''
          }`}
          style={{
            minHeight: '4rem',
            paddingBottom: 0,
            paddingTop: 0,
            display: `${activeLink == 'home' ? 'none' : 'inline'}`,
          }}>
          <Container style={{ padding: 0 }}>
            <Container
              className='p-0 m-0'
              style={{ display: `${is575px ? 'block' : 'flex'}` }}>
              <div
                style={{
                  display: 'flex',
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                  paddingBottom: '0.3rem',
                  paddingTop: '0.3rem',
                }}>
                <Navbar.Brand
                  onClick={() => mouseClickApplyActive('home')}
                  as={Link}
                  to='/Home'
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <img
                    alt=''
                    src='https://storage.googleapis.com/public_images_us/icon-512x512.png'
                    width='40'
                    height='40'
                    className='d-inline-block align-top'
                    style={{ borderRadius: '15%' }}
                  />{' '}
                  {!is360px && (
                    <strong style={{ marginLeft: '1rem' }}>
                      CorbynGreenwood
                    </strong>
                  )}
                </Navbar.Brand>
                <Navbar.Toggle
                  aria-controls='navbarScroll'
                  style={{ margin: 'auto', marginRight: 0 }}
                />
              </div>
              <Navbar.Collapse id='navbarScroll'>
                <Nav
                  className='my-2 my-lg-0'
                  style={{
                    margin: 'auto',
                    marginRight: 0,
                    marginBottom: '0 !important',
                  }}>
                  <Nav.Link
                    as={Link}
                    to='/Projects'
                    onClick={() => mouseClickApplyActive('projects')}
                    style={
                      is575px
                        ? {
                            textAlign: 'center',
                            borderTop: '2px solid white',
                            borderBottom: '1px solid white',
                            height: '3rem',
                          }
                        : {}
                    }
                    className={`linkStyleTopNav ${
                      is575px ? 'linkStyleBackgroundHover' : ''
                    } ${activeLink == 'projects' ? `topNavActiveLink` : ''}`}>
                    PROJECTS
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to='/About'
                    onClick={() => mouseClickApplyActive('about')}
                    style={
                      is575px
                        ? {
                            textAlign: 'center',
                            borderTop: '1px solid white',
                            borderBottom: '1px solid white',
                            height: '3rem',
                          }
                        : {}
                    }
                    className={`linkStyleTopNav ${
                      is575px ? 'linkStyleBackgroundHover' : ''
                    } ${activeLink == 'about' ? `topNavActiveLink` : ''}`}>
                    ABOUT
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to='/Contact'
                    onClick={() => mouseClickApplyActive('connect')}
                    style={
                      is575px
                        ? {
                            textAlign: 'center',
                            borderTop: '1px solid white',
                            borderBottom: '2px solid white',
                            height: '3rem',
                          }
                        : {}
                    }
                    className={`linkStyleTopNav ${
                      is575px ? 'linkStyleBackgroundHover' : ''
                    } ${activeLink == 'connect' ? `topNavActiveLink` : ''}`}>
                    CONNECT
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to={isLoggedIn ? '/Admin' : '/Login'}
                    onClick={() => mouseClickApplyActive('connect')}
                    style={
                      is575px
                        ? {
                            textAlign: 'center',
                            borderTop: '1px solid white',
                            borderBottom: '2px solid white',
                            height: '3rem',
                          }
                        : {}
                    }
                    className={`linkStyleTopNav ${
                      is575px ? 'linkStyleBackgroundHover' : ''
                    } ${activeLink == 'connect' ? `topNavActiveLink` : ''}`}>
                    {isLoggedIn ? username?.toUpperCase() : 'LOGIN'}
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Container>
        </Navbar>
      </>
    );
  };

  if (is1100px) return renderCollapsableNavBar();
  return <></>;
};

export default NavBarComponentTop;
