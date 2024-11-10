import React, { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import image12 from '../images/image12.jpg';
import axios from 'axios';

const Inscription = () => {
  const [medecin, setMedecin] = useState({
    name: '',
    surName: '',
    email: '',
    password: '',
    speciality: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedecin({ ...medecin, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await axios.post('http://localhost:10000/api/medecins', null, { params: medecin });
      console.log(response.data);
      setMessage('Médecin ajouté avec succès!');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du médecin:', error);
      setError('Erreur lors de l\'ajout du médecin');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <img src={image12} alt="Contact" style={{ width: '100%', height: 'auto' }} />
        </Col>
        <Col md={6}>
          <h2>Créer un nouveau compte</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label className="text-left"><FontAwesomeIcon icon={faUser} /> <b>Prénom</b></Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={medecin.name}
                onChange={handleChange}
                placeholder="Entrez votre prénom"
                required
              />
            </Form.Group>
            <Form.Group controlId="formSurName">
              <Form.Label className="text-left"><FontAwesomeIcon icon={faUser} /> <b>Nom</b></Form.Label>
              <Form.Control
                type="text"
                name="surName"
                value={medecin.surName}
                onChange={handleChange}
                placeholder="Entrez votre nom"
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label className="text-left"><FontAwesomeIcon icon={faEnvelope} /><b> Email</b></Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={medecin.email}
                onChange={handleChange}
                placeholder="Entrez votre email"
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label className="text-left"><FontAwesomeIcon icon={faLock} /><b> Mot de passe</b></Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={medecin.password}
                onChange={handleChange}
                placeholder="Entrez votre mot de passe"
                required
              />
            </Form.Group>
            <Form.Group controlId="formSpeciality">
              <Form.Label className="text-left"><FontAwesomeIcon icon={faBriefcase} /><b> Spécialité</b></Form.Label>
              <Form.Control
                type="text"
                name="speciality"
                value={medecin.speciality}
                onChange={handleChange}
                placeholder="Entrez votre spécialité"
                required
              />
            </Form.Group>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <Button variant="primary" type="submit" className="mt-3">
              S'inscrire
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Inscription;
