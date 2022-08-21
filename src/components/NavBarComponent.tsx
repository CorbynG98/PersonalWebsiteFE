import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBeerMugEmpty, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { State } from '@src/models/State';
import { useEffect, useState } from 'react';
import { Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

type Props = {
  isLoggedIn: boolean;
  loginCallBack: any;
  signoutCallBack: any;
};

const NavBarComponent = (props: Props) => {
  // Selector stuff
  const username = useSelector((state: State) => state.username);

  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setIsAtTop(window.scrollY <= 2);
    });
    setIsAtTop(window.scrollY <= 2);
  }, []);

  const is1000px = useMediaQuery({ query: '(max-width: 991px)' });
  const is360px = useMediaQuery({ query: '(max-width: 360px)' });

  const renderPrimaryNavbar = () => {
    return (
      <Navbar
        variant='dark'
        sticky='top'
        expand='sm'
        className={`m-auto ${
          isAtTop ? 'navNoBackground' : 'navSemiBackground'
        }`}>
        <Container style={{ paddingTop: '0.3rem', paddingBottom: '0.3rem' }}>
          <Container className='p-0 m-0'>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col md='2'>
                <Navbar.Brand
                  href='/Home'
                  style={{
                    display: 'flex',
                    justifyContent: 'left',
                    alignItems: 'center',
                  }}>
                  <img
                    alt=''
                    src='https://storage.googleapis.com/public_images_ctg/icon-512x512.png'
                    width='40'
                    height='40'
                    className='d-inline-block align-top'
                    style={{ borderRadius: '15%' }}
                  />{' '}
                  <strong style={{ marginLeft: '1rem', color: 'white' }}>
                    CorbynGreenwood
                  </strong>
                </Navbar.Brand>
              </Col>
              <Col md='8'>
                <Nav style={{ justifyContent: 'center' }}>
                  <Nav.Link href='/Projects' className='linkStyle'>
                    Projects
                  </Nav.Link>
                  <Nav.Link href='/About' className='linkStyle'>
                    About
                  </Nav.Link>
                  <Nav.Link href='/Contact' className='linkStyle'>
                    Contact
                  </Nav.Link>
                </Nav>
              </Col>
              <Col md='2'>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'right',
                    alignItems: 'center',
                  }}>
                  {props.isLoggedIn ? (
                    <NavDropdown
                      title={username}
                      className='specialLinkStyle'
                      style={{ paddingRight: '0.8rem' }}>
                      <NavDropdown.Item disabled>Admin Portal</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        style={{ color: 'red' }}
                        onClick={props.signoutCallBack}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <FontAwesomeIcon
                      icon={faLock}
                      size='2x'
                      color='white'
                      onClick={props.loginCallBack}
                      style={{ paddingRight: '0.8rem' }}
                      className='iconLinkStyle'
                    />
                  )}
                  <a href='https://github.com/CorbynG98'>
                    <FontAwesomeIcon
                      icon={faGithub}
                      size='2x'
                      color='white'
                      style={{ paddingRight: '0.8rem' }}
                    />
                  </a>
                  <a href='https://www.buymeacoffee.com/corbyn'>
                    <FontAwesomeIcon
                      icon={faBeerMugEmpty}
                      size='2x'
                      color='white'
                    />
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </Container>
      </Navbar>
    );
  };

  const renderCollapsableNavBar = () => {
    return (
      <>
        <Navbar
          variant='dark'
          sticky='top'
          expand='sm'
          className={'m-auto navSemiBackground'}>
          <Container style={{ paddingTop: '0.3rem', paddingBottom: '0.3rem' }}>
            <Container className='p-0 m-0' style={{ display: 'flex' }}>
              <Navbar.Brand
                href='/Home'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <img
                  alt=''
                  src='https://storage.googleapis.com/public_images_ctg/icon-512x512.png'
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
              <Navbar.Collapse id='navbarScroll'>
                <Nav
                  className='my-2 my-lg-0'
                  style={{ margin: 'auto', marginRight: 0 }}>
                  <Nav.Link href='/Projects'>Projects</Nav.Link>
                  <Nav.Link href='/About'>About</Nav.Link>
                  <Nav.Link href='/Contact'>Contact</Nav.Link>
                  {props.isLoggedIn ? (
                    <NavDropdown title={username} className='specialLinkStyle'>
                      <NavDropdown.Item disabled>Admin Portal</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        style={{ color: 'red' }}
                        onClick={props.signoutCallBack}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <Nav.Link onClick={props.loginCallBack}>Login</Nav.Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Container>
        </Navbar>
      </>
    );
  };

  // Render
  if (is1000px) return renderCollapsableNavBar();
  else return renderPrimaryNavbar();
};

export default NavBarComponent;
