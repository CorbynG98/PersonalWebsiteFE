import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faBeerMugEmpty } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

const FooterComponent = () => {
  const is1000px = useMediaQuery({ query: '(max-width: 991px)' });

  const renderPrimaryFooter = () => {
    return (
      <React.Fragment>
        <div className='footerBackgroundStyle footerPositionStyle'>
          <Container>
            <Row>
              <Col sm='4'>
                <Container className='p-0 m-0 colContainerStyle'>
                  <img
                    alt=''
                    src='https://storage.googleapis.com/public_images_ctg/icon-512x512.png'
                    width='45'
                    height='45'
                    className='d-inline-block align-top'
                    style={{ borderRadius: '15%' }}
                  />{' '}
                  <strong
                    style={{
                      fontSize: '1.25rem',
                      color: 'white',
                      paddingTop: '0.5rem',
                    }}>
                    CorbynGreenwood
                  </strong>
                  <p style={{ color: 'rgb(166, 170, 191)' }}>
                    © Copyright 2022 Corbyn Greenwood
                  </p>
                  <div style={{ display: 'flex' }}>
                    <a href='https://www.linkedin.com/in/corbyngreenwood/'>
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        size='2x'
                        color='white'
                        style={{ paddingRight: '0.8rem', fontSize: '30px' }}
                      />
                    </a>
                    <a href='https://github.com/CorbynG98'>
                      <FontAwesomeIcon
                        icon={faGithub}
                        size='2x'
                        color='white'
                        style={{ paddingRight: '0.8rem', fontSize: '30px' }}
                      />
                    </a>
                    <a href='https://www.buymeacoffee.com/corbyn'>
                      <FontAwesomeIcon
                        icon={faBeerMugEmpty}
                        size='2x'
                        color='white'
                        style={{ paddingRight: '0.8rem', fontSize: '30px' }}
                      />
                    </a>
                  </div>
                </Container>
              </Col>
              <Col sm='4'>
                <Container
                  className='p-0 m-0 colContainerStyle'
                  style={{ alignItems: 'center' }}>
                  <p
                    style={{
                      fontSize: '1rem',
                      color: 'white',
                      marginBottom: '0.3rem',
                    }}>
                    <strong>ABOUT</strong>
                  </p>
                  <a
                    href='https://github.com/CorbynG98/PersonalWebsiteFE/commits/main'
                    className='p-0 m-0 linkStyle'>
                    Changelog
                  </a>
                  <Nav.Link href='/Blog' className='p-0 m-0 linkStyle' disabled>
                    Blog
                  </Nav.Link>
                </Container>
              </Col>
              <Col sm='4'>
                <Container
                  className='p-0 m-0 colContainerStyle'
                  style={{ alignItems: 'flex-end' }}>
                  <p
                    style={{
                      fontSize: '1rem',
                      color: 'white',
                      marginBottom: '0.3rem',
                    }}>
                    <strong>ORG</strong>
                  </p>
                  <a
                    href='https://github.com/CorbynG98/PersonalWebsiteFE/blob/main/LICENSE'
                    className='p-0 m-0 linkStyle'>
                    License
                  </a>
                  <Nav.Link
                    href='/Terms'
                    className='p-0 m-0 linkStyle'
                    disabled>
                    Terms
                  </Nav.Link>
                  <Nav.Link
                    href='/Privacy'
                    className='p-0 m-0 linkStyle'
                    disabled>
                    Privacy
                  </Nav.Link>
                </Container>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  };

  const renderCollapsedFooter = () => {
    return (
      <React.Fragment>
        <div className='footerBackgroundStyle footerPositionStyle'>
          <Container>
            <Container
              className='p-0 m-0 colContainerStyle'
              style={{ alignItems: 'center' }}>
              <div style={{ display: 'flex', paddingBottom: '0.5rem' }}>
                <img
                  alt=''
                  src='https://storage.googleapis.com/public_images_ctg/icon-512x512.png'
                  width='45'
                  height='45'
                  className='d-inline-block align-top'
                  style={{ borderRadius: '15%' }}
                />{' '}
                <strong
                  style={{
                    fontSize: '1.25rem',
                    color: 'white',
                    alignItems: 'center',
                    paddingLeft: '1rem',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                  }}>
                  CorbynGreenwood
                </strong>
              </div>
              <p style={{ color: 'rgb(166, 170, 191)' }}>
                © Copyright 2022 Corbyn Greenwood
              </p>
              <div style={{ display: 'flex' }}>
                <a href='https://www.linkedin.com/in/corbyngreenwood/'>
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    size='2x'
                    color='white'
                    style={{ paddingRight: '0.8rem', fontSize: '30px' }}
                  />
                </a>
                <a href='https://github.com/CorbynG98'>
                  <FontAwesomeIcon
                    icon={faGithub}
                    size='2x'
                    color='white'
                    style={{ paddingRight: '0.8rem', fontSize: '30px' }}
                  />
                </a>
                <a href='https://www.buymeacoffee.com/corbyn'>
                  <FontAwesomeIcon
                    icon={faBeerMugEmpty}
                    size='2x'
                    color='white'
                    style={{ paddingRight: '0.8rem', fontSize: '30px' }}
                  />
                </a>
              </div>
            </Container>
            <Container style={{ display: 'flex' }}>
              <Container
                className='p-0 m-0 colContainerStyle'
                style={{ alignItems: 'center' }}>
                <p
                  style={{
                    fontSize: '1rem',
                    color: 'white',
                    marginBottom: '0.3rem',
                  }}>
                  <strong>ABOUT</strong>
                </p>
                <a
                  href='https://github.com/CorbynG98/PersonalWebsiteFE/commits/main'
                  className='p-0 m-0 linkStyle'>
                  Changelog
                </a>
                <Nav.Link href='/Blog' className='p-0 m-0 linkStyle' disabled>
                  Blog
                </Nav.Link>
              </Container>
              <Container
                className='p-0 m-0 colContainerStyle'
                style={{ alignItems: 'center' }}>
                <p
                  style={{
                    fontSize: '1rem',
                    color: 'white',
                    marginBottom: '0.3rem',
                  }}>
                  <strong>ORG</strong>
                </p>
                <a
                  href='https://github.com/CorbynG98/PersonalWebsiteFE/blob/main/LICENSE'
                  className='p-0 m-0 linkStyle'>
                  License
                </a>
                <Nav.Link href='/Terms' className='p-0 m-0 linkStyle' disabled>
                  Terms
                </Nav.Link>
                <Nav.Link
                  href='/Privacy'
                  className='p-0 m-0 linkStyle'
                  disabled>
                  Privacy
                </Nav.Link>
              </Container>
            </Container>
          </Container>
        </div>
      </React.Fragment>
    );
  };

  if (is1000px) return renderCollapsedFooter();
  else return renderPrimaryFooter();
};

export default FooterComponent;
