import React from 'react';
import { Container } from 'react-bootstrap';

export default function ChangelogPage() {
  // Build UI
  return (
    <React.Fragment>
      <div className='containerStyle'>
        <Container>
          <p style={{ color: 'white' }}>
            This will be the changelogs eventually. Will have to make a backend
            so I can link it up the (currently) private github repos
          </p>
        </Container>
      </div>
    </React.Fragment>
  );
}
