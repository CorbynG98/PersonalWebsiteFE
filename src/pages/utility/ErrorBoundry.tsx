import {
  faCircleExclamation,
  faSkullCrossbones,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container, Button, Nav } from 'react-bootstrap';

export default class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <React.Fragment>
          <Container style={{ textAlign: 'center', marginTop: '2rem' }}>
            <FontAwesomeIcon
              icon={faCircleExclamation}
              size='10x'
              color='white'
            />
            <p
              style={{
                color: 'white',
                fontSize: '2.5rem',
                paddingTop: '1rem',
              }}>
              <strong>Something went seriously wrong.</strong>
            </p>
            <p style={{ color: 'white' }}>
              This is a 500 (Interal Server Error) page
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
                style={{ height: '2.5rem', marginRight: '1rem' }}>
                ← Return
              </Button>
              <Nav.Link href='/Home'>
                <Button variant='primary' style={{ height: '2.5rem' }}>
                  Go to home →
                </Button>
              </Nav.Link>
            </div>
          </Container>
        </React.Fragment>
      );
    }

    return this.props.children;
  }
}
