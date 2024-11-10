import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/footer';
import Body from './components/body';
import './App.css';
import ContactPage from './components/contact'; 
import Inscription from './components/inscription';
import 'bootstrap/dist/css/bootstrap.min.css';
import Account from './components/account';
import Header from './components/header';
import UpdateProfile from './components/updateProfile';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="App-content">
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/account" element={<Account />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
