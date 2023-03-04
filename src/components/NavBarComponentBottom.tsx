import { Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setActiveLink } from '../context/slices/auth_slice';
import { State } from '../models/State';
import { store } from '../context/store';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

const NavBarComponentBottom = () => {
  const activeLink = useSelector((state: State) => state.activeLink);
  const mouseClickApplyActive = (id: string) => {
    store.dispatch(setActiveLink(id));
  }
  const is1100px = useMediaQuery({ query: '(max-width: 1100px)' });

  useEffect(() => {
    var path = window.location.pathname;
    var active = "";
    if (path.toLowerCase().indexOf("home") != -1 || path == '/') active = "home";
    if (path.toLowerCase().indexOf("projects") != -1) active = "projects";
    if (path.toLowerCase().indexOf("about") != -1) active = "about";
    if (path.toLowerCase().indexOf("contact") != -1) active = "connect";
    store.dispatch(setActiveLink(active));
  });

  const renderPrimaryNavbar = () => {
    return (
      <Navbar
        variant='dark'
        expand='sm'
        className={`m-auto`}
        style={{
          overflow: "hidden",
          position: "fixed",
          bottom: 0,
          width: "100%",
          height: "4rem"
        }}>
        <Nav.Link
          as={Link}
          to='/Home'
          onClick={() => mouseClickApplyActive("home")}
          style={{ width: "25%", height: "4rem", display: 'flex', borderTop: "2px solid white", borderRight: "1px solid white" }}
          className={`linkStyle ${activeLink == "home" ? 'activeLink' : 'notActiveLink'}`}>
          <div style={{ margin: 'auto' }}>
            <p style={{ margin: 0, padding: 0, color: "white" }}>HOME</p>
          </div>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to='/Projects'
          onClick={() => mouseClickApplyActive("projects")}
          style={{ width: "25%", height: "4rem", display: 'flex', borderTop: "2px solid white", borderLeft: "1px solid white", borderRight: "1px solid white" }}
          className={`linkStyle ${activeLink == "projects" ? 'activeLink' : 'notActiveLink'}`}>
          <div style={{ margin: 'auto' }}>
            <p style={{ margin: 0, padding: 0, color: "white" }}>PROJECTS</p>
          </div>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to='/About'
          onClick={() => mouseClickApplyActive("about")}
          style={{ width: "25%", height: "4rem", display: 'flex', borderTop: "2px solid white", borderLeft: "1px solid white", borderRight: "1px solid white" }}
          className={`linkStyle ${activeLink == "about" ? 'activeLink' : 'notActiveLink'}`}>
          <div style={{ margin: 'auto' }}>
            <p style={{ margin: 0, padding: 0, color: "white" }}>ABOUT</p>
          </div>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to='/Contact'
          onClick={() => mouseClickApplyActive("connect")}
          style={{ width: "25%", height: "4rem", display: 'flex', borderTop: "2px solid white", borderLeft: "1px solid white" }}
          className={`linkStyle ${activeLink == "connect" ? 'activeLink' : 'notActiveLink'}`}>
          <div style={{ margin: 'auto' }}>
            <p style={{ margin: 0, padding: 0, color: "white" }}>CONNECT</p>
          </div>
        </Nav.Link>
      </Navbar>
    );
  };

  if (!is1100px && activeLink != "home") return renderPrimaryNavbar();
  return <></>;
};

export default NavBarComponentBottom;

