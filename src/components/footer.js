import React, { useState } from "react";
import { Container, Row, Col, Nav,Button,Modal} from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaHome, FaUserPlus, FaLock } from 'react-icons/fa';
import Login from './login';
import { Link } from "react-router-dom";

function Footer() {
    const[showLogin,setShowLogin]=useState(false);
    const handleLoginShow=()=> setShowLogin(true);
    const handleLoginClose=()=>setShowLogin(false);
    return (
        <footer style={{ backgroundColor: '#2E3D34', color: "white", padding: '20px 0'}}>
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>Contactez-nous</h5>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            <li><FaEnvelope /> Email: contact@doctorcontroller.com</li>
                            <li><FaPhone /> Phone: (+216) 70 861 360</li>
                            <li><FaMapMarkerAlt /> Address: Résidence El Rahma Bloc C, A2, El Manar1, 2092, Tunis, Tunisie</li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Suivez-nous</h5>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook style={{ color: 'white' }} /></a></li>
                            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter style={{ color: 'white' }} /></a></li>
                            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin style={{ color: 'white' }} /></a></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Navigation</h5>
                        <Nav className="flex-column">
                            <Nav.Link as={Link} to='/' style={{color:'white'}}><FaHome style={{color:'white'}} /> Home</Nav.Link>
                            <Nav.Link as={Link} to='/contact' style={{color:'white'}}><FaEnvelope style={{color:'white'}} /> Contact</Nav.Link>
                            <Nav.Link as={Link} to='/inscription' style={{color:'white'}}><FaUserPlus style={{color:'white'}} /> Inscription</Nav.Link>
                            <Nav.Link onClick={handleLoginShow} style={{color:'white'}}><FaLock style={{color:'white'}} /> Votre Espace Sécurisé</Nav.Link>
                        </Nav>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <p>&copy; 2024 Doctor Controller. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
            <Modal show={showLogin} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Authentification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLoginClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
        </footer>
        
    );
}

export default Footer;