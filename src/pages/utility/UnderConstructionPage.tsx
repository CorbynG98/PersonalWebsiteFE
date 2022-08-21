import { faPersonDigging, faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Container, Nav } from 'react-bootstrap';

export default function UnderConstructionPage() {
  // Build UI
  return (
    <React.Fragment>
      <div className='containerStyle'>
        <Container style={{ textAlign: 'center' }}>
          <FontAwesomeIcon icon={faPersonDigging} size='10x' color='white' />
          <FontAwesomeIcon icon={faWrench} size='10x' color='white' />
          <p style={{ color: 'white', fontSize: '3rem', paddingTop: '1rem' }}>
            <strong>This pages appears to be under construction!</strong>
          </p>
          <p style={{ color: 'white' }}>
            Check back again soon to see if this has changed!
          </p>
          <div
            style={{
              display: 'flex',
              paddingTop: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Button
              variant='secondary'
              onClick={() => window.history.back()}
              style={{ height: '2.5rem' }}>
              ← Return
            </Button>
            <Nav.Link href='/Home'>
              <Button variant='primary' style={{ height: '2.5rem' }}>
                Go to home →
              </Button>
            </Nav.Link>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
}
