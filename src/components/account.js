import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Table, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye, faEyeSlash, faCheckCircle, faTimesCircle, faUser, faCalendar, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import image14 from '../images/image14.jpg';

const Account = () => {
  const navigate = useNavigate();
  const [dossier, setDossier] = useState({
    patientName: '',
    status: 'PENDING',
    createdDate: '',
    completedDate: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [dossiers, setDossiers] = useState([]);
  const [pendingDossiers, setPendingDossiers] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showPendingTable, setShowPendingTable] = useState(false);

  useEffect(() => {
    fetchDossiers();
  }, []);

  const fetchDossiers = async () => {
    try {
      const response = await fetch('http://localhost:10000/api/dossiers/list');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la récupération des dossiers');
      }
      const data = await response.json();
      setDossiers(data);
    } catch (error) {
      console.error('Erreur:', error);
      setError(error.message);
    }
  };

  const fetchPendingDossiers = async () => {
    try {
      const response = await fetch('http://localhost:10000/api/dossiers/pendingDossiers');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la récupération des dossiers en attente');
      }
      const data = await response.json();
      setPendingDossiers(data);
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur lors de la récupération des dossiers en attente');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDossier({ ...dossier, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const { createdDate, completedDate } = dossier;

    const createdDateObj = new Date(createdDate);
    const completedDateObj = new Date(completedDate);

    if (createdDate && completedDate && createdDateObj > completedDateObj) {
      setError('La date de création ne peut pas être ultérieure à la date de complétion.');
      return;
    }

    try {
      const response = await fetch('http://localhost:10000/api/dossiers/createDossier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dossier)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'ajout du dossier');
      }

      setMessage('Dossier ajouté avec succès!');
      setDossier({
        patientName: '',
        status: 'PENDING',
        createdDate: '',
        completedDate: ''
      });
      fetchDossiers(); 
    } catch (error) {
      console.error('Erreur lors de l\'ajout du dossier:', error);
      setError('Erreur lors de l\'ajout du dossier');
    }
  };

  const handleShowTable = () => {
    setShowTable(!showTable);
  };

  const handleShowPendingTable = () => {
    if (!showPendingTable) {
      fetchPendingDossiers();
    }
    setShowPendingTable(!showPendingTable);
  };

  const handleUpdateProfileClick = () => {
    navigate('/updateProfile'); 
  };

  const containerStyle = {
    backgroundImage: `url(${image14})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '20px',
    minHeight: '100vh',
  };

  const formStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
  };

  return (
    <Container style={containerStyle}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div style={formStyle}>
            <h2>Ajouter un Dossier <FontAwesomeIcon icon={faPlus} /></h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formPatientName">
                <Form.Label><strong>Nom du patient</strong></Form.Label>
                <InputGroup>
                  <InputGroup.Text><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                  <FormControl
                    type="text"
                    name="patientName"
                    value={dossier.patientName}
                    onChange={handleChange}
                    placeholder="Entrez le nom du patient"
                    required
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formStatus">
                <Form.Label><strong>Status</strong></Form.Label>
                <InputGroup>
                  <InputGroup.Text><FontAwesomeIcon icon={faInfoCircle} /></InputGroup.Text>
                  <Form.Control
                    as="select"
                    name="status"
                    value={dossier.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </Form.Control>
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formCreatedDate">
                <Form.Label><strong>Date de Création</strong></Form.Label>
                <InputGroup>
                  <InputGroup.Text><FontAwesomeIcon icon={faCalendar} /></InputGroup.Text>
                  <FormControl
                    type="date"
                    name="createdDate"
                    value={dossier.createdDate}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formCompletedDate">
                <Form.Label><strong>Date de Complétion</strong></Form.Label>
                <InputGroup>
                  <InputGroup.Text><FontAwesomeIcon icon={faCalendar} /></InputGroup.Text>
                  <FormControl
                    type="date"
                    name="completedDate"
                    value={dossier.completedDate}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>
              {message && <p style={{ color: 'green' }}><FontAwesomeIcon icon={faCheckCircle} /> {message}</p>}
              {error && <p style={{ color: 'red' }}><FontAwesomeIcon icon={faTimesCircle} /> {error}</p>}
              <Button
                variant="primary"
                type="submit"
                style={{ marginTop: '10px', backgroundColor: '#4CAF50', border: 'none', borderRadius: '4px' }}
              >
                Ajouter Dossier <FontAwesomeIcon icon={faPlus} />
              </Button>
              <Button
                variant="primary"
                onClick={handleUpdateProfileClick}
                style={{ marginTop: '10px', backgroundColor: '#007bff', border: 'none', borderRadius: '4px', backgroundColor: 'gray', marginLeft: '10px' }}
              >
                Modifier le Profil
              </Button>
            </Form>
            <Button
              variant="info"
              style={{ marginTop: '10px', backgroundColor: '#17a2b8', border: 'none', borderRadius: '4px', marginLeft: '20px' }}
              onClick={handleShowTable}
            >
              {showTable ? <><FontAwesomeIcon icon={faEyeSlash} /> Masquer les Dossiers Traités</> : <><FontAwesomeIcon icon={faEye} /> Afficher les Dossiers Traités</>}
            </Button>
            {showTable && (
              <>
                <h3 className="mt-4">Liste des Dossiers Traités</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nom du Patient</th>
                      <th>Status</th>
                      <th>Date de Création</th>
                      <th>Date de Complétion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dossiers.length > 0 ? (
                      dossiers.map(dossier => (
                        <tr key={dossier.id}>
                          <td>{dossier.patientName}</td>
                          <td>{dossier.status}</td>
                          <td>{dossier.createdDate}</td>
                          <td>{dossier.completedDate}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">Aucun dossier trouvé</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </>
            )}
            <Button
              variant="info"
              style={{ marginTop: '10px', backgroundColor: '#17a2b8', border: 'none', borderRadius: '4px', marginLeft: '20px' }}
              onClick={handleShowPendingTable}
            >
              {showPendingTable ? <><FontAwesomeIcon icon={faEyeSlash} /> Masquer les Dossiers en Attente</> : <><FontAwesomeIcon icon={faEye} /> Afficher les Dossiers en Attente</>}
            </Button>
            {showPendingTable && (
              <>
                <h3 className="mt-4">Liste des Dossiers en Attente</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nom du Patient</th>
                      <th>Status</th>
                      <th>Date de Création</th>
                      <th>Date de Complétion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingDossiers.length > 0 ? (
                      pendingDossiers.map(dossier => (
                        <tr key={dossier.id}>
                          <td>{dossier.patientName}</td>
                          <td>{dossier.status}</td>
                          <td>{dossier.createdDate}</td>
                          <td>{dossier.completedDate}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">Aucun dossier en attente trouvé</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Account;