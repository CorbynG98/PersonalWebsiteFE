import React from 'react';
import { Container } from 'react-bootstrap';
import Typed from 'react-typed';

export default function HomePage() {
  // Build UI
  return (
    <React.Fragment>
      <div className='containerStyle'>
        <Container
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <div className='meContainer'>
            <div className='mePhoto'>
              <img
                src='https://storage.googleapis.com/public_images_ctg/hopefully-square.jpg'
                className='mePhoto'
                alt="me-picture-hopefully"></img>
            </div>
          </div>
          <div className='hello'>
            <h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>
              Hello People
            </h2>
          </div>
          <Typed
            strings={["I'm Corbyn Greenwood! ^^ Thats me!"]}
            cursorChar='_'
            typeSpeed={40}
            className='typedStyles'
          />
          <div className='smallBlurb' style={{ margin: 'auto' }}>
            <span className='blurb-p'>Software Engineer</span>&nbsp;|&nbsp;
            <span className='blurb-p'>Developer</span>&nbsp;|&nbsp;
            <span className='blurb-p'>Designer</span>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
}
