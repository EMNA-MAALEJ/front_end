import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    speciality: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchProfile = async (email) => {
    try {
      const response = await fetch(`http://localhost:10000/api/medecins/email/${email}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des informations du profil');
      }
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur lors de la récupération des informations du profil');
    }
  };

  useEffect(() => {
    const email = 'user@example.com'; // Remplacer par l'email de l'utilisateur connecté
    fetchProfile(email);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:10000/api/medecins/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du profil');
      }

      setMessage('Profil mis à jour avec succès!');
      setTimeout(() => {
        navigate('/profile');
      }, 2000); // Rediriger après 2 secondes
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      setError('Erreur lors de la mise à jour du profil');
    }
  };

  return (
    <Container>
      <h2>Modifier le Profil</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label><strong>Nom</strong></Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Entrez le nom"
            required
          />
        </Form.Group>
        <Form.Group controlId="formSurname">
          <Form.Label><strong>Prénom</strong></Form.Label>
          <Form.Control
            type="text"
            name="surname"
            value={profile.surname}
            onChange={handleChange}
            placeholder="Entrez le prénom"
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label><strong>Email</strong></Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={profile.email}
            readOnly
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label><strong>Mot de passe</strong></Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            placeholder="Entrez le mot de passe"
          />
        </Form.Group>
        <Form.Group controlId="formSpeciality">
          <Form.Label><strong>Spécialité</strong></Form.Label>
          <Form.Control
            type="text"
            name="speciality"
            value={profile.speciality}
            onChange={handleChange}
            placeholder="Entrez la spécialité"
            required
          />
        </Form.Group>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button
          variant="primary"
          type="submit"
          style={{ marginTop: '10px' }}
        >
          Sauvegarder les Modifications
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateProfile;
