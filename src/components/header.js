import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Modal } from 'react-bootstrap';
import { FaHome, FaEnvelope, FaUserPlus, FaLock } from 'react-icons/fa';
import image6 from '../images/image6.png';
import Login from './login';
import { Link } from 'react-router-dom';

function Header() {
  const [showLogin, setShowLogin] = useState(false); 

  const handleLoginShow = () => setShowLogin(true);
  const handleLoginClose = () => setShowLogin(false);

  return (
    <Navbar style={{ backgroundColor: '#007FFF', maxHeight: '110px' }} variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        <img
          alt="Doctor Controller Logo"
          src={image6}
          width="150"
          height="150"
          className="d-inline-block align-top"
        />{' '}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
        <Form inline className="ml-auto d-flex">
          <FormControl type="text" placeholder="Rechercher" className="mr-sm-2" />
          <Button variant="outline-success" style={{ backgroundColor: 'green', color: 'white' }}>
            Rechercher
          </Button>
        </Form>
        <Nav className="mx-auto">
          <Nav.Link as={Link} to="/" style={{color:'white'}}> <FaHome /> Home</Nav.Link>
          <Nav.Link as={Link} to="/contact" style={{color:'white'}}><FaEnvelope /> Contact</Nav.Link>
          <Nav.Link as ={Link} to="/inscription" style={{color:'white'}}> <FaUserPlus /> Inscription</Nav.Link>
          <Nav.Link onClick={handleLoginShow} style={{color:'white'}}> <FaLock /> Votre Espace Sécurisé</Nav.Link>
        </Nav>
      </Navbar.Collapse>

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
    </Navbar>
  );
}

export default Header;