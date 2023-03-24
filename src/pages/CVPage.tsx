import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Document, Page } from 'react-pdf/dist/esm/entry.vite';
import NotyfContext from '../context/NotyfContext';

export default function CVPage() {
  const [loaded, setLoaded] = useState<Boolean>(false);
  const notyf = useContext(NotyfContext);

  const onPDFError = (error: Error) => {
    notyf.error(error.message);
  };
  // Build UI
  return (
    <React.Fragment>
      <a
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          marginTop: '2rem',
          marginLeft: '2rem',
          zIndex: 10,
        }}
        href='https://storage.googleapis.com/download/storage/v1/b/less_public_files/o/CV_CorbynGreenwood_2023_1Page?alt=media'
        target='_blank'>
        <FontAwesomeIcon
          icon={faCloudArrowDown}
          size='3x'
          color='white'
          className='iconLinkStyle'
        />
      </a>
      <Document
        file='https://storage.googleapis.com/less_public_files/CV_CorbynGreenwood_2023_1Page'
        onLoadSuccess={() => setLoaded(true)}
        onLoadError={onPDFError}>
        {!loaded ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Spinner animation='border' variant='light' />
          </div>
        ) : (
          <Page
            scale={1.75}
            pageNumber={1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        )}
      </Document>
    </React.Fragment>
  );
}
