import { faCode, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetProjects } from '@src/apiclient/apiclient';
import { ProjectResource } from '@src/models/ProjectResource';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Container, Modal, Spinner } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { useMediaQuery } from 'react-responsive';
import rehypeRaw from 'rehype-raw';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function ProjectsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<ProjectResource[]>(
    [] as ProjectResource[],
  );
  const [selectedProject, setSelectedProject] =
    useState<ProjectResource | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  const is1100px = useMediaQuery({ query: '(max-width: 1100px)' });

  useEffect(() => {
    let cancelToken = axios.CancelToken.source();
    setIsLoading(true);
    GetProjects(cancelToken).then((response) => {
      setProjects(
        response.sort((x, y) => Number(y.featured) - Number(x.featured)),
      );
      setIsLoading(false);
    });
    return () => {
      cancelToken.cancel();
    };
  }, []);

  const handleScroll = (speed: number, distance: number, step: number) => {
    let scrollAmount = 0;
    let element = elementRef.current;
    const slideTimer = setInterval(() => {
      if (element) {
        element.scrollLeft += step;
        scrollAmount += Math.abs(step);
        if (scrollAmount >= distance) {
          clearInterval(slideTimer);
        }
      }
    }, speed);
  };

  const toggleModal = (project: ProjectResource | null, show: boolean) => {
    console.log(project);
    if (project && project.isDescriptionMarkdown && !project.description) {
      fetch(project.descriptionUrl + `&${new Date()}`, {
        headers: {
          'Content-Type': 'text/markdown',
          'Access-Control-Allow-Origin': 'http://localhost:5173',
        },
      })
        .then((response) => {
          return response.text();
        })
        .then((text) => {
          if (project) {
            project.description = text;
          }
          setSelectedProject(show ? project : null);
          setShowModal(show);
        });
    } else {
      setSelectedProject(show ? project : null);
      setShowModal(show);
    }
  };

  const renderProjectsPage = () => {
    return (
      <React.Fragment>
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden',
            position: 'relative',
          }}
          ref={elementRef}>
          <div
            style={{
              height: '100%',
              minWidth: '65vw',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              flexDirection: 'column',
              paddingLeft: '3rem',
            }}>
            <p style={{ fontSize: '5vw', color: 'white', fontWeight: 'bold' }}>
              Creature of <span style={{ color: '#55cc69' }}>Simplicity</span>.
            </p>
            <p style={{ fontSize: '5vw', color: 'white', fontWeight: 'bold' }}>
              <span style={{ color: '#55cc69' }}>Passion</span> for Efficiency.
            </p>
            <p style={{ fontSize: '5vw', color: 'white', fontWeight: 'bold' }}>
              Master of <span style={{ color: '#55cc69' }}>Code</span>.
            </p>
          </div>
          <div
            style={{
              height: '100%',
              minWidth: '2rem',
              display: 'flex',
              alignItems: 'center',
            }}>
            {projects.map((project, index) => (
              <>
                <div
                  style={{
                    maxHeight: 'min(50vh, 50vw)',
                    minHeight: 'min(50vh, 50vw)',
                    minWidth: '2rem',
                    maxWidth: '2rem',
                    background:
                      'linear-gradient(#55cc69, #55cc69) no-repeat center/3px 100%',
                  }}></div>
                <div
                  className='hoverableSlide'
                  style={{
                    minHeight: 'min(50vh, 50vw)',
                    minWidth: 'min(50vh, 50vw)',
                    maxHeight: 'min(50vh, 50vw)',
                    maxWidth: 'min(50vh, 50vw)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'left',
                    backgroundImage: `url(${project.imageUrl})`,
                  }}>
                  <div
                    className='information'
                    onClick={() => {
                      toggleModal(project, true);
                    }}
                    style={{
                      height: '100%',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      padding: '0 2.7rem',
                    }}>
                    <p
                      style={{
                        fontSize: '3rem',
                        borderBottom: '1px solid white',
                        textAlign: 'center',
                      }}>
                      {project.name}
                    </p>
                  </div>
                </div>
              </>
            ))}
            <div
              style={{
                maxHeight: 'min(50vh, 50vw)',
                minHeight: 'min(50vh, 50vw)',
                minWidth: '2rem',
                maxWidth: '2rem',
                background:
                  'linear-gradient(#55cc69, #55cc69) no-repeat center/3px 100%',
              }}></div>
          </div>
          <div
            style={{
              position: 'fixed',
              bottom: '6rem',
              right: '2rem',
              display: 'flex',
            }}>
            <div
              style={{
                width: '5rem',
                height: '3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => {
                handleScroll(10, 500, -75);
              }}
              className='arrowContainer'>
              <i className='arrow left'></i>
              <i className='arrow left'></i>
            </div>
            <div
              style={{
                width: '5rem',
                height: '3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => {
                handleScroll(10, 500, 25);
              }}
              className='arrowContainer'>
              <i className='arrow right'></i>
              <i className='arrow right'></i>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const renderMobileProjectsPage = () => {
    return (
      <React.Fragment>
        <div style={{ width: '100%', minWidth: '2rem' }}>
          {projects.map((project, index) => (
            <>
              <div
                className='hoverableSlide'
                style={{
                  minHeight: 'min(50vh, 50vw)',
                  maxHeight: 'min(50vh, 50vw)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'left',
                  backgroundImage: `url(${project.imageUrl})`,
                }}>
                <div
                  className='information'
                  onClick={() => {
                    toggleModal(project, true);
                  }}
                  style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    padding: '0 2.7rem',
                  }}>
                  <p
                    style={{
                      fontSize: '5vw',
                      borderBottom: '1px solid white',
                      textAlign: 'center',
                    }}>
                    {project.name}
                  </p>
                </div>
              </div>
            </>
          ))}
        </div>
      </React.Fragment>
    );
  };

  // Build UI
  return (
    <React.Fragment>
      <Container
        style={{
          paddingTop: `${is1100px ? '0' : '2rem'}`,
          marginBottom: '2rem',
          height: `${is1100px ? 'auto' : '100%'}`,
          margin: 0,
          minWidth: '100%',
        }}
        id='projectsPage'>
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
          <>{is1100px ? renderMobileProjectsPage() : renderProjectsPage()}</>
        )}
      </Container>
      {selectedProject && (
        <Modal
          show={showModal}
          onHide={() => {
            toggleModal(null, false);
          }}
          size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>
              <div style={{ display: 'flex' }}>
                <p style={{ margin: 'auto' }}>{selectedProject.name}</p>
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target='_blank'
                    style={{
                      marginLeft: '1rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <FontAwesomeIcon
                      icon={faGlobe}
                      color='black'
                      className='iconLinkStyle'
                      style={{ fontSize: '2.5rem' }}
                    />
                  </a>
                )}
                {selectedProject.source && (
                  <a
                    href={selectedProject.source}
                    target='_blank'
                    style={{
                      marginLeft: '1rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <FontAwesomeIcon
                      icon={faCode}
                      color='black'
                      className='iconLinkStyle'
                      style={{ fontSize: '2.5rem' }}
                    />
                  </a>
                )}
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <p
                style={{
                  fontWeight: 'bold',
                  color: '#55cc69',
                  textAlign: 'center',
                }}>
                {selectedProject.techStack?.join(', ') ??
                  'No listed tech? Strange...'}
              </p>
              {selectedProject.isDescriptionMarkdown ? (
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {selectedProject.description}
                </ReactMarkdown>
              ) : (
                <p style={{ textAlign: 'left' }}>
                  {selectedProject.description}
                </p>
              )}
            </div>
          </Modal.Body>
        </Modal>
      )}
    </React.Fragment>
  );
}
