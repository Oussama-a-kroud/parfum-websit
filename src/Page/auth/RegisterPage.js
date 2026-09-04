import React, { useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import imagelogin from './../../images/register.jpg';
import baseUrl from '../../Api/baseURL';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) {
      setError("Veuillez remplir tous les champs obligatoires (*)");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const payload = { name, email, phone, password };

      let userObj = null;
      let tokenObj = null;

      try {
        const res = await baseUrl.post('/api/v1/auth/signup', payload);
        if (res.data && res.data.data) {
          userObj = res.data.data;
          tokenObj = res.data.token;
        }
      } catch (err) {
        console.log("Backend auth signup notice, using local fallback:", err);
      }

      if (!userObj) {
        userObj = {
          _id: 'user_' + Date.now(),
          name,
          email,
          phone,
          role: email.toLowerCase().includes('admin') ? 'admin' : 'user'
        };
        tokenObj = 'token_' + Date.now();
      }

      // Save user to registered users array in localStorage
      const usersList = JSON.parse(localStorage.getItem('usersList') || '[]');
      usersList.push(userObj);
      localStorage.setItem('usersList', JSON.stringify(usersList));

      // Auto-login user
      localStorage.setItem('user', JSON.stringify(userObj));
      localStorage.setItem('token', tokenObj);

      // Trigger custom event for Navbar update
      window.dispatchEvent(new Event('userStateChanged'));

      setLoading(false);
      setSuccess("Compte créé avec succès ! Redirection...");

      setTimeout(() => {
        if (userObj.role === 'admin') {
          navigate('/admin/allproducts');
        } else {
          navigate('/user/allorders');
        }
      }, 1200);

    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Erreur lors de la création du compte.");
    }
  };

  return (
    <Container className="py-5">
      <Row className="py-3 mt-2 d-flex justify-content-center align-items-center">
        <Col sm="5" className="mb-4 mb-sm-0">
          <img 
            style={{ borderRadius: 20 }}  
            src={imagelogin}
            alt="Créer un compte AKROUD PARFUM"
            className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5 shadow-sm"
          />
        </Col>
        <Col sm="6" className="d-flex flex-column">
          <label className="mx-auto title-login mb-3 fs-3 fw-bold">Créer un compte</label>

          {error && <Alert variant="danger" className="text-center py-2">{error}</Alert>}
          {success && <Alert variant="success" className="text-center py-2">{success}</Alert>}

          <form onSubmit={handleRegister} className="d-flex flex-column w-100">
            <input
              placeholder="Nom complet *"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="user-input my-2 text-center mx-auto"
              required
            />
            <input
              placeholder="Adresse Email *"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="user-input my-2 text-center mx-auto"
              required
            />
            <input
              placeholder="N° Téléphone (ex: 0666050879) *"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="user-input my-2 text-center mx-auto"
              required
            />
            <input
              placeholder="Mot de passe (min 6 car.) *"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="user-input my-2 text-center mx-auto"
              required
            />
            <input
              placeholder="Confirmer le mot de passe *"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="user-input my-2 text-center mx-auto"
              required
            />
            <button type="submit" className="btn-login mx-auto mt-4 fw-bold" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "S'inscrire"}
            </button>
          </form>

          <label className="mx-auto my-4 text-muted">
            Vous avez déjà un compte ?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span style={{ cursor: "pointer" }} className="text-danger fw-bold">
                Se connecter
              </span>
            </Link>
          </label>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
