import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import image11 from '../images/image11.jpg';


const Contact = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <img src={image11} alt="Contact" style={{ width: '100%', height: 'auto' }} />
        </Col>
        <Col md={6}>
          <h2>Contactez-nous</h2>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label className="text-left"><FontAwesomeIcon icon={faUser}/><b> Nom</b></Form.Label>
              <Form.Control type="text" placeholder="Votre nom" />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="text-left"><FontAwesomeIcon icon={faEnvelope}/><b> Email</b></Form.Label>
              <Form.Control type="email" placeholder="Votre email" />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label className="text-left"><FontAwesomeIcon icon={faEnvelope}/><b> Message</b></Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Votre message" />
            </Form.Group>

            <Button variant="primary" type="submit" style={{marginLeft:'400px',marginTop:'10px'}}>Envoyer</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;