import React from 'react';
import { Container, Button, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';

export default function NotFoundPage() {
  // Build UI
  return (
    <React.Fragment>
      <div className='containerStyle'>
        <Container style={{ textAlign: 'center' }}>
          <FontAwesomeIcon icon={faSkullCrossbones} size='10x' color='white' />
          <p style={{ color: 'white', fontSize: '3rem', paddingTop: '1rem' }}>
            <strong>There doesn't seem to be anything here!</strong>
          </p>
          <p style={{ color: 'white' }}>This is a 404 (Not Found) page</p>
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
