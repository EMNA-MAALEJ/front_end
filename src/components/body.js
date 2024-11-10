import React, { useState } from 'react';
import image13 from '../images/image13.jpg';
import { Button,Modal } from 'react-bootstrap';
import Inscription from './inscription';
import ImageCarousel from'./ImageCarousel';

function Body() {
  const[showInscription,setShowInscription]=useState(false);
  const handleInscriptionShow=()=>setShowInscription(true);
  const handleInscriptionClose=()=>setShowInscription(false);
  return (
    <div>
      <ImageCarousel/>
    <div className="image-container">
      <img src={image13} alt="Doctor Controller Logo" style={{marginBottom:'50px',marginTop:'50px'}} />
      <div className="text-overlay">
        <h1 style={{color:'#4A4A4A'}}>La vie de votre cabinet médical devient encore plus simple</h1>
        <h5 style={{color:'#4A4A4A'}}>Rendez-vous en ligne, communication patient en direct.</h5>
        <button onClick={handleInscriptionShow}>S'inscrire</button>
      </div>
      <Modal show={showInscription} onHide={handleInscriptionClose}>
        <Modal.Header closeButton>
          <Modal.Title>Créer un nouveau compte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Inscription />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleInscriptionClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  );
}

export default Body;