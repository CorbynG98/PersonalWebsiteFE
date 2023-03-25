import { setActiveLink } from '@src/context/slices/auth_slice';
import { store } from '@src/context/store';
import { State } from '@src/models/State';
import { useEffect } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

const NavBarComponentBottom = () => {
  const activeLink = useSelector((state: State) => state.activeLink);
  const isLoggedIn = useSelector((state: State) => state.isLoggedIn);
  const username = useSelector((state: State) => state.username);
  const mouseClickApplyActive = (id: string) => {
    store.dispatch(setActiveLink(id));
  };
  const is1100px = useMediaQuery({ query: '(max-width: 1100px)' });

  useEffect(() => {
    var path = window.location.pathname;
    var active = '';
    if (path.toLowerCase().indexOf('home') != -1 || path == '/')
      active = 'home';
    if (path.toLowerCase().indexOf('resume') != -1) active = 'resume';
    if (path.toLowerCase().indexOf('projects') != -1) active = 'projects';
    if (path.toLowerCase().indexOf('about') != -1) active = 'about';
    if (path.toLowerCase().indexOf('contact') != -1) active = 'connect';
    // Admin links. Bundle login and admin to admin active
    if (path.toLowerCase().indexOf('admin') != -1) active = 'admin';
    if (path.toLowerCase().indexOf('login') != -1) active = 'admin';
    store.dispatch(setActiveLink(active));
  });

  const renderPrimaryNavbar = () => {
    return (
      <Navbar
        variant='dark'
        expand='sm'
        className={`m-auto ${
          activeLink == 'home' || activeLink == 'resume' ? 'd-none' : ''
        }`}
        style={{
          overflow: 'hidden',
          position: 'fixed',
          bottom: 0,
          width: '100%',
          height: '4rem',
          zIndex: 11111,
        }}>
        <Nav.Link
          as={Link}
          to='/Home'
          onClick={() => mouseClickApplyActive('home')}
          style={{
            width: '22%',
            height: '4rem',
            display: 'flex',
            borderTop: '2px solid white',
            borderRight: '1px solid white',
          }}
          className={`linkStyle ${
            activeLink == 'home' ? 'activeLink' : 'notActiveLink'
          } bottomNavLinkStyle`}>
          <div style={{ margin: 'auto' }}>
            <p style={{ margin: 0, padding: 0, color: 'white' }}>HOME</p>
          </div>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to='/Projects'
          onClick={() => mouseClickApplyActive('projects')}
          style={{
            width: '22%',
            height: '4rem',
            display: 'flex',
            borderTop: '2px solid white',
            borderLeft: '1px solid white',
            borderRight: '1px solid white',
          }}
          className={`linkStyle ${
            activeLink == 'projects' ? 'activeLink' : 'notActiveLink'
          } bottomNavLinkStyle`}>
          <div style={{ margin: 'auto' }}>
            <p style={{ margin: 0, padding: 0, color: 'white' }}>PROJECTS</p>
          </div>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to={isLoggedIn ? '/Admin' : '/Login'}
          onClick={() => mouseClickApplyActive('connect')}
          style={{
            width: '12%',
            height: '4rem',
            display: 'flex',
            borderTop: '2px solid white',
            borderLeft: '1px solid white',
          }}
          className={`linkStyle ${
            activeLink == 'admin' ? 'activeLink' : 'notActiveLink'
          } bottomNavLinkStyle `}>
          <div style={{ margin: 'auto' }}>
            <p style={{ margin: 0, padding: 0, color: 'white' }}>
              {isLoggedIn ? username?.toUpperCase() : 'LOGIN'}
            </p>
          </div>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to='/About'
          onClick={() => mouseClickApplyActive('about')}
          style={{
            width: '22%',
            height: '4rem',
            display: 'flex',
            borderTop: '2px solid white',
            borderLeft: '1px solid white',
            borderRight: '1px solid white',
          }}
          className={`linkStyle ${
            activeLink == 'about' ? 'activeLink' : 'notActiveLink'
          } bottomNavLinkStyle `}>
          <div style={{ margin: 'auto' }}>
            <p style={{ margin: 0, padding: 0, color: 'white' }}>ABOUT</p>
          </div>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to='/Contact'
          onClick={() => mouseClickApplyActive('connect')}
          style={{
            width: '22%',
            height: '4rem',
            display: 'flex',
            borderTop: '2px solid white',
            borderLeft: '1px solid white',
          }}
          className={`linkStyle ${
            activeLink == 'connect' ? 'activeLink' : 'notActiveLink'
          } bottomNavLinkStyle `}>
          <div style={{ margin: 'auto' }}>
            <p style={{ margin: 0, padding: 0, color: 'white' }}>CONNECT</p>
          </div>
        </Nav.Link>
      </Navbar>
    );
  };

  if (!is1100px) return renderPrimaryNavbar();
  return <></>;
};

export default NavBarComponentBottom;
