import { faCode, faGlobe, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetProjects } from '@src/apiclient/apiclient';
import { ProjectData } from '@src/models/ProjectData';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

export default function ProjectsPage() {
  const [ searchParams ] = useSearchParams();
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ projects, setProjects ] = useState<ProjectData[]>([] as ProjectData[]);
  const [ isSimpleMode, setIsSimpleMode ] = useState<boolean>(true);

  useEffect(() => {
    let cancelToken = axios.CancelToken.source();
    setIsLoading(true);
    setIsSimpleMode(searchParams.get('useSimpleMode') === 'true');
    GetProjects(cancelToken).then(response => {
      setProjects(response);
      setIsLoading(false);
    })
    return () => {
      cancelToken.cancel();
    };
  }, [])

  const toggleSimpleMode = () => {
    setIsSimpleMode(prev => !prev);
  }

  const renderSimpleMode = () => {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Title</th>
            <th>Technology</th>
            <th>Stars</th>
            <th>Source</th>
            <th>Live</th>
          </tr>
        </thead>
        <tbody>
          {
            projects != null && projects.length >= 1 ?
              <>
                {
                  projects.map((project, i) => {
                    return (
                      <tr>
                        <td style={{verticalAlign: "middle"}}>
                            <p style={{margin: 'auto', fontSize: "1.5rem", fontWeight: "bold", color: "#55cc69"}}>{project.name}</p>
                            <p style={{margin: 'auto'}}>{project.description}</p>
                        </td>
                        <td style={{verticalAlign: "middle"}}>{project.techStack?.join(', ')}</td>
                        <td style={{verticalAlign: "middle"}}>
                          <div style={{display: "flex"}}>
                            <FontAwesomeIcon
                              icon={faStar}
                              size='2x'
                              color='yellow'
                            />
                            <p style={{margin: "auto", marginLeft: "0.5rem"}}>x {project.stars}</p> 
                          </div>
                        </td>
                        <td style={{verticalAlign: "middle", textAlign: "center"}}>
                          {
                            project.source != null ?
                              <a href='source_code_link'>
                                <FontAwesomeIcon
                                  icon={faCode}
                                  size='2x'
                                  color='white'
                                />
                              </a>
                            :
                              <FontAwesomeIcon
                                icon={faCode}
                                size='2x'
                                color='red'
                              />
                          }
                        </td>
                        <td style={{verticalAlign: "middle", textAlign: "center"}}>
                        {
                            project.liveUrl != null ?
                              <a href='source_code_link'>
                                <FontAwesomeIcon
                                  icon={faGlobe}
                                  size='2x'
                                  color='white'
                                />
                              </a>
                            :
                              <FontAwesomeIcon
                                icon={faGlobe}
                                size='2x'
                                color='red'
                              />
                          }
                        </td>
                      </tr>
                    )
                  })
                }
              </>
            :
              <>
                <p style={{paddingLeft: "0.5rem", paddingTop: "0.5rem"}}>There don't seem to be any projects to show you! Uh oh!</p>
              </>
          }
        </tbody>
      </Table>
    )
  }

  const renderAdvancedMode = () => {
    return (
      <p style={{ color: 'white' }}>
        Advanced mode is still under construction
      </p>
    )
  }

  // Build UI
  return (
    <React.Fragment>
      <Container style={{marginTop: "2rem"}}>
        {
          isLoading ?
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Spinner animation='border' variant="light" />
            </div>
          :
            <>
              <Button variant="primary" onClick={toggleSimpleMode} style={{float: "right", marginBottom: "1rem"}}>{isSimpleMode ? "Advanced mode" : "Simple mode"}</Button>
              {
                isSimpleMode ?
                  renderSimpleMode()
                :
                  renderAdvancedMode()
              }
            </>
        }
      </Container>
    </React.Fragment>
  );
}
