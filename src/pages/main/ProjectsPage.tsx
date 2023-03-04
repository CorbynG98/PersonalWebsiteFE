import { faCode, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetProjects } from '../../apiclient/apiclient';
import { ProjectData } from '../../models/ProjectData';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { useSearchParams } from 'react-router-dom';

export default function ProjectsPage() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState<ProjectData[]>([] as ProjectData[]);
  const [isSimpleMode, setIsSimpleMode] = useState<boolean>(true);

  const is1000px = useMediaQuery({ query: '(max-width: 991px)' });
  const is576px = useMediaQuery({ query: '(max-width: 576px)' });

  useEffect(() => {
    let cancelToken = axios.CancelToken.source();
    setIsLoading(true);
    GetProjects(cancelToken).then((response) => {
      setProjects(response);
      setIsLoading(false);
    });
    return () => {
      cancelToken.cancel();
    };
  }, []);

  useEffect(() => {
    setIsSimpleMode(searchParams.get('useSimpleMode') === 'true');
  }, [searchParams]);

  const toggleSimpleMode = () => {
    setIsSimpleMode((prev) => !prev);
  };

  const simpleRenderer = () => {
    return (
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th>Title</th>
            {!is1000px && <th>Technology</th>}
            {!is576px && <th>Source</th>}
            {!is576px && <th>Live</th>}
          </tr>
        </thead>
        <tbody>
          {projects != null && projects.length >= 1 ? (
            <>
              {is576px
                ? renderSimpleModeVerySmall()
                : is1000px
                  ? renderSimpleModeSmall()
                  : renderSimpleMode()}
            </>
          ) : (
            <>
              <p style={{ paddingLeft: '0.5rem', paddingTop: '0.5rem' }}>
                There don't seem to be any projects to show you! Uh oh!
              </p>
            </>
          )}
        </tbody>
      </Table>
    );
  };

  const renderSimpleMode = () => {
    return (
      <>
        {projects.map((project, i) => {
          return (
            <tr>
              <td style={{ verticalAlign: 'middle' }}>
                <p
                  style={{
                    margin: 'auto',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#55cc69',
                  }}>
                  {project.name}
                </p>
                <p style={{ margin: 'auto' }}>{project.description}</p>
              </td>
              <td style={{ verticalAlign: 'middle' }}>
                {project.techStack?.join(', ')}
              </td>
              <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                {project.source != null ? (
                  <a href={project.source}>
                    <FontAwesomeIcon icon={faCode} size='2x' color='white' />
                  </a>
                ) : (
                  <FontAwesomeIcon icon={faCode} size='2x' color='red' />
                )}
              </td>
              <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                {project.liveUrl != null ? (
                  <a href={project.liveUrl}>
                    <FontAwesomeIcon icon={faGlobe} size='2x' color='white' />
                  </a>
                ) : (
                  <FontAwesomeIcon icon={faGlobe} size='2x' color='red' />
                )}
              </td>
            </tr>
          );
        })}
      </>
    );
  };

  const renderSimpleModeSmall = () => {
    return (
      <>
        {projects.map((project, i) => {
          return (
            <tr>
              <td style={{ verticalAlign: 'middle' }}>
                <p
                  style={{
                    margin: 'auto',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#55cc69',
                  }}>
                  {project.name}
                </p>
                <p style={{ margin: 'auto' }}>{project.description}</p>
                <p
                  style={{
                    margin: 'auto',
                    color: '#55cc69',
                    fontWeight: 'bold',
                  }}>
                  {project.techStack?.join(', ')}
                </p>
              </td>
              <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                {project.source != null ? (
                  <a href={project.source}>
                    <FontAwesomeIcon icon={faCode} size='2x' color='white' />
                  </a>
                ) : (
                  <FontAwesomeIcon icon={faCode} size='2x' color='red' />
                )}
              </td>
              <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                {project.liveUrl != null ? (
                  <a href={project.liveUrl}>
                    <FontAwesomeIcon icon={faGlobe} size='2x' color='white' />
                  </a>
                ) : (
                  <FontAwesomeIcon icon={faGlobe} size='2x' color='red' />
                )}
              </td>
            </tr>
          );
        })}
      </>
    );
  };

  const renderSimpleModeVerySmall = () => {
    return (
      <>
        {projects.map((project, i) => {
          return (
            <tr>
              <td style={{ verticalAlign: 'middle' }}>
                <p
                  style={{
                    margin: 'auto',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#55cc69',
                  }}>
                  {project.name}
                </p>
                <p style={{ margin: 'auto' }}>{project.description}</p>
                <div style={{ display: 'flex', paddingTop: '0.3rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {project.liveUrl != null ? (
                      <a href={project.liveUrl}>
                        <FontAwesomeIcon
                          icon={faGlobe}
                          size='2x'
                          color='white'
                        />
                      </a>
                    ) : (
                      <FontAwesomeIcon icon={faGlobe} size='2x' color='red' />
                    )}
                    {project.source != null ? (
                      <a href={project.source}>
                        <FontAwesomeIcon
                          icon={faCode}
                          size='2x'
                          color='white'
                          style={{ marginLeft: '1.5rem' }}
                        />
                      </a>
                    ) : (
                      <FontAwesomeIcon
                        icon={faCode}
                        size='2x'
                        color='red'
                        style={{ marginLeft: '1.5rem' }}
                      />
                    )}
                  </div>
                  <p
                    style={{
                      margin: 'auto 0 auto 0',
                      color: '#55cc69',
                      fontWeight: 'bold',
                      marginLeft: '1.5rem',
                    }}>
                    {project.techStack?.join(', ')}
                  </p>
                </div>
              </td>
            </tr>
          );
        })}
      </>
    );
  };

  const advancedRenderer = () => {
    return (
      <p style={{ color: 'white' }}>
        Advanced mode is still under construction
      </p>
    );
  };

  // Build UI
  return (
    <React.Fragment>
      <Container style={{ paddingTop: '2rem' }} id="projectsPage">
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Spinner animation='border' variant='light' />
          </div>
        ) : (
          <>
            <Button
              variant='primary'
              onClick={toggleSimpleMode}
              style={{ float: 'right', marginBottom: '1rem' }}>
              {isSimpleMode ? 'Advanced mode' : 'Simple mode'}
            </Button>
            {isSimpleMode ? simpleRenderer() : advancedRenderer()}
          </>
        )}
      </Container>
    </React.Fragment>
  );
}
