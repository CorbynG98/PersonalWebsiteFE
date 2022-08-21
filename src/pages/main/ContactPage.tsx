import { SendContactEmail } from '@src/apiclient/apiclient';
import { EmailData } from '@src/models/EmailData';
import { Notyf } from 'notyf';
import React, { useState } from 'react';
import { Button, Container, Form, Spinner } from 'react-bootstrap';

export default function ContactPage() {
  const notyf = new Notyf({
    dismissible: true,
    position: {x: 'right', y: 'top'} 
  });

  const [emailData, setEmailData] = useState<EmailData>({} as EmailData);
  const [formValidated, setFormValidated] = useState<boolean>(true);
  const [sendEmailLoading, setSendEmailLoading] = useState<boolean>(false);

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
    SendContactEmail(emailData).then(() => {
      notyf.success("Email has been sent :)");
      setEmailData({} as EmailData); // Reset email data
      setSendEmailLoading(false);
    }).catch(() => {
      notyf.error("Email failed to send. Try again later.");
      setSendEmailLoading(false);
    })
  }

  // Build UI
  return (
    <React.Fragment>
      <Container className="containerStyle">
        <div className="textContainer">
          <h2 className="mainTitle">Get in touch!</h2>
          <p className="subTitle" style={{color: "white"}}>
            Note: I recommend signing the email so its easier for me to get back
            to you!
          </p>
        </div>
        <Form noValidate validated={formValidated} onSubmit={attemptEmail}>
          <Form.Group className="mb-3 input-container" controlId="formName" style={{height: "4.5rem"}}>
            <Form.Control 
              type="text"
              className="input-box"
              placeholder="Full name" 
              value={emailData.name ?? ""}
              onChange={(event) => setEmailData((prev => ({...prev, name: event.target.value})))}
              required
              minLength={3}
            />
            <Form.Control.Feedback type="invalid">
              Required and 3 or more characters
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
              Looks good!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 input-container" controlId="formEmail" style={{height: "4.5rem"}}>
            <Form.Control 
              type="email" 
              className="input-box"
              placeholder="Your Email Address" 
              value={emailData.emailAddress ?? ""}
              onChange={(event) => setEmailData((prev => ({...prev, emailAddress: event.target.value})))}
              required
              minLength={5}
            />
            <Form.Control.Feedback type="invalid">
              Required and 5 or more characters
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
              Looks good!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 input-container" controlId="formContent">
            <Form.Control 
              as="textarea"
              rows={5}
              className="input-box text-area"
              placeholder="Email Content" 
              value={emailData.content ?? ""}
              onChange={(event) => setEmailData((prev => ({...prev, content: event.target.value})))}
              required
              minLength={15}
            />
            <Form.Control.Feedback type="invalid">
              Required and 15 or more characters
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
              Looks good!
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" disabled={sendEmailLoading} style={{width: "5rem"}}>
            {sendEmailLoading ?
                <Spinner animation="border" size="sm"/>
            :
                "Submit"
            }
          </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}
