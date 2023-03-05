import { SendContactEmail } from '../../apiclient/apiclient';
import { EmailData } from '../../models/EmailData';
import React, { useState, useContext } from 'react';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import Snowfall from 'react-snowfall';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faHackerrank,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { faBeerMugEmpty } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';
import NotyfContext from '../../context/NotyfContext';

export default function ContactPage() {
  const notyf = useContext(NotyfContext);

  const [emailData, setEmailData] = useState<EmailData>({} as EmailData);
  const [formValidated, setFormValidated] = useState<boolean>(true);
  const [sendEmailLoading, setSendEmailLoading] = useState<boolean>(false);
  const is1100px = useMediaQuery({ query: '(max-width: 1100px)' });

  const attemptEmail = (event: any) => {
    if (sendEmailLoading) return;
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setFormValidated(true);
      return;
    }

    setSendEmailLoading(true);
    SendContactEmail(emailData)
      .then(() => {
        notyf.success('Email has been sent :)');
        setEmailData({} as EmailData); // Reset email data
        setSendEmailLoading(false);
      })
      .catch(() => {
        notyf.error('Email failed to send. Try again later.');
        setSendEmailLoading(false);
      });
  };

  const mobileFriendlyUI = () => {
    // Build UI
    return (
      <React.Fragment>
        <div style={{}} id='contactPage'>
          <div
            style={{
              height: 'auto',
              paddingTop: '2rem',
              paddingBottom: '2rem',
              backgroundColor: '#55cc69',
              borderBottom: '1px solid white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Container>
              <div className='textContainer'>
                <p className='mainTitle' style={{ color: 'black' }}>
                  CONTACT ME
                </p>
              </div>
              <Form
                noValidate
                validated={formValidated}
                onSubmit={attemptEmail}>
                <Form.Group
                  className='mb-3 input-container'
                  controlId='formName'>
                  <Form.Label style={{ color: 'black' }}>NAME</Form.Label>
                  <Form.Control
                    type='text'
                    className='input-box'
                    placeholder='Full name'
                    value={emailData.fullname ?? ''}
                    onChange={(event) =>
                      setEmailData((prev) => ({
                        ...prev,
                        fullname: event.target.value,
                      }))
                    }
                    required
                    minLength={3}
                  />
                  <Form.Control.Feedback type='invalid'>
                    3 or more characters required
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type='valid'>
                    Looks good!
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className='mb-3 input-container'
                  controlId='formEmail'>
                  <Form.Label style={{ color: 'black' }}>
                    EMAIL ADDRESS
                  </Form.Label>
                  <Form.Control
                    type='email'
                    className='input-box'
                    placeholder='Your Email Address'
                    value={emailData.from ?? ''}
                    onChange={(event) =>
                      setEmailData((prev) => ({
                        ...prev,
                        from: event.target.value,
                      }))
                    }
                    required
                    minLength={5}
                  />
                  <Form.Control.Feedback type='invalid'>
                    5 or more characters required
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type='valid'>
                    Looks good!
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className='mb-3 input-container'
                  controlId='formContent'>
                  <Form.Label style={{ color: 'black' }}>MESSAGE</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={5}
                    className='input-box text-area'
                    placeholder='Email Content'
                    value={emailData.content ?? ''}
                    onChange={(event) =>
                      setEmailData((prev) => ({
                        ...prev,
                        content: event.target.value,
                      }))
                    }
                    required
                    minLength={15}
                  />
                  <Form.Control.Feedback type='invalid'>
                    15 or more characters required
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type='valid'>
                    Looks good!
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  type='submit'
                  disabled={sendEmailLoading}
                  style={{ width: '5rem' }}>
                  {sendEmailLoading ? (
                    <Spinner animation='border' size='sm' />
                  ) : (
                    'Submit'
                  )}
                </Button>
              </Form>
            </Container>
          </div>
          <div
            style={{
              paddingTop: '2rem',
              borderTop: '1px solid white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <div>
              <div style={{ paddingBottom: '3rem' }}>
                <a href='https://github.com/CorbynG98'>
                  <FontAwesomeIcon
                    icon={faGithub}
                    size='7x'
                    color='white'
                    style={{ paddingRight: '3rem' }}
                    className='iconLinkStyle'
                  />
                </a>
                <a href='https://www.linkedin.com/in/corbyngreenwood/'>
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    size='7x'
                    color='white'
                    className='iconLinkStyle'
                  />
                </a>
              </div>
              <div>
                <a href='https://www.buymeacoffee.com/corbyn'>
                  <FontAwesomeIcon
                    icon={faBeerMugEmpty}
                    size='7x'
                    color='white'
                    style={{ paddingRight: '3rem' }}
                    className='iconLinkStyle'
                  />
                </a>
                <a href='https://leetcode.com/CorbynG98/'>
                  <FontAwesomeIcon
                    icon={faHackerrank}
                    size='7x'
                    color='white'
                    className='iconLinkStyle'
                  />
                </a>
              </div>
            </div>
            <div style={{ paddingTop: '7rem' }}>
              <p style={{ color: 'white' }}>
                © Copyright {new Date().getFullYear()} Corbyn Greenwood
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const nonMobileFriendlyUI = () => {
    // Build UI
    return (
      <React.Fragment>
        <div style={{ display: 'flex' }} id='contactPage'>
          <div
            style={{
              width: '50%',
              height: '100%',
              backgroundColor: '#55cc69',
              borderRight: '1px solid white',
            }}>
            <Container
              style={{
                width: '75%',
                margin: '0 auto',
                position: 'relative',
                top: '50%',
                transform: 'translate(0, -50%)',
              }}>
              <div className='textContainer'>
                <p className='mainTitle' style={{ color: 'black' }}>
                  CONTACT ME
                </p>
              </div>
              <Form
                noValidate
                validated={formValidated}
                onSubmit={attemptEmail}>
                <Form.Group
                  className='mb-3 input-container'
                  controlId='formName'>
                  <Form.Label style={{ color: 'black' }}>NAME</Form.Label>
                  <Form.Control
                    type='text'
                    className='input-box'
                    placeholder='Full name'
                    value={emailData.fullname ?? ''}
                    onChange={(event) =>
                      setEmailData((prev) => ({
                        ...prev,
                        fullname: event.target.value,
                      }))
                    }
                    required
                    minLength={3}
                  />
                  <Form.Control.Feedback type='invalid'>
                    3 or more characters required
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type='valid'>
                    Looks good!
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className='mb-3 input-container'
                  controlId='formEmail'>
                  <Form.Label style={{ color: 'black' }}>
                    EMAIL ADDRESS
                  </Form.Label>
                  <Form.Control
                    type='email'
                    className='input-box'
                    placeholder='Your Email Address'
                    value={emailData.from ?? ''}
                    onChange={(event) =>
                      setEmailData((prev) => ({
                        ...prev,
                        from: event.target.value,
                      }))
                    }
                    required
                    minLength={5}
                  />
                  <Form.Control.Feedback type='invalid'>
                    5 or more characters required
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type='valid'>
                    Looks good!
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className='mb-3 input-container'
                  controlId='formContent'>
                  <Form.Label style={{ color: 'black' }}>MESSAGE</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={5}
                    className='input-box text-area'
                    placeholder='Email Content'
                    value={emailData.content ?? ''}
                    onChange={(event) =>
                      setEmailData((prev) => ({
                        ...prev,
                        content: event.target.value,
                      }))
                    }
                    required
                    minLength={15}
                  />
                  <Form.Control.Feedback type='invalid'>
                    15 or more characters required
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type='valid'>
                    Looks good!
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  type='submit'
                  disabled={sendEmailLoading}
                  style={{ width: '5rem' }}>
                  {sendEmailLoading ? (
                    <Spinner animation='border' size='sm' />
                  ) : (
                    'Submit'
                  )}
                </Button>
              </Form>
            </Container>
          </div>
          <div
            style={{
              width: '50%',
              height: '100%',
              borderLeft: '1px solid white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <div>
              <div style={{ paddingBottom: '3rem' }}>
                <a href='https://github.com/CorbynG98'>
                  <FontAwesomeIcon
                    icon={faGithub}
                    size='7x'
                    color='white'
                    style={{ paddingRight: '3rem' }}
                    className='iconLinkStyle'
                  />
                </a>
                <a href='https://www.linkedin.com/in/corbyngreenwood/'>
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    size='7x'
                    color='white'
                    className='iconLinkStyle'
                  />
                </a>
              </div>
              <div>
                <a href='https://www.buymeacoffee.com/corbyn'>
                  <FontAwesomeIcon
                    icon={faBeerMugEmpty}
                    size='7x'
                    color='white'
                    style={{ paddingRight: '3rem' }}
                    className='iconLinkStyle'
                  />
                </a>
                <a href='https://leetcode.com/CorbynG98/'>
                  <FontAwesomeIcon
                    icon={faHackerrank}
                    size='7x'
                    color='white'
                    className='iconLinkStyle'
                  />
                </a>
              </div>
            </div>
            <div style={{ paddingTop: '7rem' }}>
              <p style={{ color: 'white' }}>
                © Copyright {new Date().getFullYear()} Corbyn Greenwood
              </p>
            </div>
          </div>
        </div>
        <Snowfall />
      </React.Fragment>
    );
  };

  if (is1100px) return mobileFriendlyUI();
  return nonMobileFriendlyUI();
}
