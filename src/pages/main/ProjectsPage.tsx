import {
  faCode,
  faDirections,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetProjects } from '../../apiclient/apiclient';
import { ProjectData } from '../../models/ProjectData';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Carousel, Container, Spinner, Table } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { useSearchParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function ProjectsPage() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<ProjectData[]>([] as ProjectData[]);

  const is1400px = useMediaQuery({ query: '(max-width: 1400px)' });
  const is1200px = useMediaQuery({ query: '(max-width: 1200px)' });
  const is600px = useMediaQuery({ query: '(max-width: 600px)' });
  const is300px = useMediaQuery({ query: '(max-width: 300px)' });

  const is1100pxHeight = useMediaQuery({ query: '(max-height: 1100px)' });

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

  const renderCarouselItems = () => {
    return (
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={25}
        slidesPerView={is1400px ? 1 : 2}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        {projects.map((project, index) => (
          <SwiperSlide
            style={{
              height: `${is1100pxHeight && !is1200px ? '40rem' : '50vh'}`,
            }}
            className='hoverableSlide'>
            <div
              style={{
                backgroundSize: 'cover',
                backgroundPosition: 'left',
                backgroundImage: `url(${project.imageUrl})`,
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className='image'>
              {project.name}
            </div>
            <div
              style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: '0 1rem 0 1rem',
              }}
              className='information'>
              <p
                style={{
                  fontSize: '3rem',
                  borderBottom: '1px solid white',
                  textAlign: 'center',
                }}>
                {project.name}
              </p>
              <p
                style={{
                  fontWeight: 'bold',
                  color: '#55cc69',
                  textAlign: 'center',
                }}>
                {project.techStack?.join(', ') ?? 'No listed tech? Strange...'}
              </p>
              <p style={{ textAlign: 'center' }}>{project.description}</p>
              <div>
                {project.liveUrl && (
                  <a href={project.liveUrl} target='_blank'>
                    <FontAwesomeIcon
                      icon={faGlobe}
                      size='3x'
                      color='white'
                      className='iconLinkStyle'
                    />
                  </a>
                )}
                {project.source && (
                  <a href={project.source} target='_blank'>
                    <FontAwesomeIcon
                      icon={faCode}
                      size='3x'
                      color='white'
                      className='iconLinkStyle'
                      style={{ marginLeft: '1rem' }}
                    />
                  </a>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  const renderProjectsPage = () => {
    return (
      <React.Fragment>
        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {is600px ? (
            <div>
              <p
                style={{
                  color: 'white',
                  fontSize: '1.5rem',
                  textAlign: 'center',
                }}>
                Passion
              </p>
              <p
                style={{
                  color: '#55cc69',
                  fontSize: '1.5rem',
                  textAlign: 'center',
                }}>
                Simplicity
              </p>
              <p
                style={{
                  color: 'white',
                  fontSize: '1.5rem',
                  textAlign: 'center',
                }}>
                Efficiency
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex' }}>
              <p style={{ color: 'white', fontSize: '3rem' }}>
                Passion&nbsp;|&nbsp;
              </p>
              <p style={{ color: '#55cc69', fontSize: '3rem' }}>Simplicity</p>
              <p style={{ color: 'white', fontSize: '3rem' }}>
                &nbsp;|&nbsp;Efficiency
              </p>
            </div>
          )}
        </Container>
        <Container
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          {is1200px
            ? renderMobileFriendlyProjectsDisplay()
            : renderCarouselItems()}
        </Container>
      </React.Fragment>
    );
  };

  const renderMobileFriendlyProjectsDisplay = () => {
    let projectBoxHeight = '40vh';
    if (is1200px && !is600px && is1100pxHeight) projectBoxHeight = '40rem';
    else if (is300px) projectBoxHeight = '85vh';
    else if (is600px) projectBoxHeight = '65vh';
    return (
      <React.Fragment>
        <div style={{ paddingTop: '2rem', width: '85%' }}>
          {projects.map((project, index) => (
            <div
              style={{
                height: `${projectBoxHeight}`,
                marginBottom: '2rem',
              }}
              className='hoverableSlide'>
              <div
                style={{
                  backgroundSize: 'cover',
                  backgroundPosition: 'left',
                  backgroundImage: `url(${project.imageUrl})`,
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                className='image'>
                {project.name}
              </div>
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  padding: '0 1rem 0 1rem',
                }}
                className='information'>
                <p
                  style={{
                    fontSize: `${is600px ? '2rem' : '2.5rem'}`,
                    borderBottom: '1px solid white',
                    textAlign: 'center',
                  }}>
                  {project.name}
                </p>
                <p
                  style={{
                    fontWeight: 'bold',
                    color: '#55cc69',
                    textAlign: 'center',
                    fontSize: `${is600px ? '1rem' : '1.5rem'}`,
                  }}>
                  {project.techStack?.join(', ') ??
                    'No listed tech? Strange...'}
                </p>
                <p style={{ textAlign: 'center', fontSize: '1rem' }}>
                  {project.description}
                </p>
                <div>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target='_blank'>
                      <FontAwesomeIcon
                        icon={faGlobe}
                        size='3x'
                        color='white'
                        className='iconLinkStyle'
                      />
                    </a>
                  )}
                  {project.source && (
                    <a href={project.source} target='_blank'>
                      <FontAwesomeIcon
                        icon={faCode}
                        size='3x'
                        color='white'
                        className='iconLinkStyle'
                        style={{ marginLeft: '1rem' }}
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  };

  // Build UI
  return (
    <React.Fragment>
      <Container
        style={{ paddingTop: '2rem', marginBottom: '2rem' }}
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
          <>{renderProjectsPage()}</>
        )}
      </Container>
    </React.Fragment>
  );
}