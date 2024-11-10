import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // Keeps track of login state
    const [showMessage, setShowMessage] = useState(false);  // Manages the visibility of success message
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await axios.post('http://localhost:10000/api/medecins/authenticate', { email, password });
            if (response.status === 200) {
                setLoading(false);

                // Set both login state and success message
                setIsLoggedIn(true);
                setShowMessage(true);

                // Store the doctor ID in localStorage
                localStorage.setItem('medecinId', response.data.medecinId);

                // Hide the success message after 1 second
                setTimeout(() => {
                    setShowMessage(false);
                    
                    // Redirect to the account page after the message disappears
                    navigate('/account', { state: { userDetails: response.data } });
                }, 1000);
            }
        } catch (error) {
            setLoading(false);
            setError('Identifiants invalides ou erreur serveur');
            console.error('Erreur lors de la connexion !', error);
        }
    };

    return (
        <>
            {/* Show success message if logged in, hide both the message and form when message disappears */}
            {isLoggedIn && showMessage ? (
                <p>Connexion réussie ! Redirection en cours...</p>
            ) : isLoggedIn ? null : (  // If logged in but message is gone, don't show form again
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Adresse email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Entrez votre email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Entrez votre mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                        style={{ marginTop: '10px' }}
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </Button>
                </Form>
            )}
        </>
    );
};

export default Login;
