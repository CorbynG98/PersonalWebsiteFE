import React, { } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

export default function ActivityComponent() {
  const is991px = useMediaQuery({ query: '(max-width: 991px)' });

  // Build UI
  return (
    <React.Fragment>
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
        }}
        id='profileComponent'>
        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>Activity Component</p>
      </Container>
    </React.Fragment>
  );
}
