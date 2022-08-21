import React from 'react';
import { Container } from 'react-bootstrap';

export default function LicensePage() {
  // Build UI
  return (
    <React.Fragment>
      <div className='containerStyle'>
        <Container>
          <p style={{ color: 'white' }}>
            This page will have the license information on it
          </p>
        </Container>
      </div>
    </React.Fragment>
  );
}
