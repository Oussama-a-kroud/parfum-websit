import React, { useState } from "react";
import { Col, Container, Row, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import imagelogin from './../../images/loginn.jpg';
import baseUrl from '../../Api/baseURL';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Veuillez saisir votre email/téléphone et mot de passe");
      return;
    }

    const inputEmailClean = email.trim().toLowerCase();

    // Check 1: Rate Limiting Lockout Check
    const now = Date.now();
    const lockoutUntil = Number(localStorage.getItem('adminLockoutUntil') || '0');
    if (now < lockoutUntil) {
      const minutesLeft = Math.ceil((lockoutUntil - now) / (60 * 1000));
      setError(`⛔ Accès Admin bloqué suite à plusieurs tentatives échouées. Veuillez réessayer dans ${minutesLeft} minute(s).`);
      return;
    }

    // Check 2: Admin Login Request
    const isAdminAttempt = inputEmailClean === 'admin@akroud.com' || inputEmailClean.includes('admin');

    if (isAdminAttempt) {
      if (inputEmailClean !== 'admin@akroud.com' || password !== '@2003Akroud') {
        const currentAttempts = Number(localStorage.getItem('adminAttempts') || '0') + 1;
        localStorage.setItem('adminAttempts', currentAttempts);

        if (currentAttempts >= 3) {
          localStorage.setItem('adminLockoutUntil', Date.now() + 15 * 60 * 1000);
          localStorage.removeItem('adminAttempts');
          setError("⛔ Accès Admin bloqué pendant 15 minutes (3/3 tentatives échouées).");
        } else {
          setError(`❌ Identifiants Admin incorrects ! (Tentative ${currentAttempts}/3).`);
        }
        return;
      } else {
        // Admin credentials correct! Clear lockout/attempts
        localStorage.removeItem('adminAttempts');
        localStorage.removeItem('adminLockoutUntil');

        const adminObj = {
          _id: 'admin_akroud_1',
          name: 'Admin Akroud',
          email: 'admin@akroud.com',
          role: 'admin'
        };

        localStorage.setItem('user', JSON.stringify(adminObj));
        localStorage.setItem('token', 'token_admin_2003');
        window.dispatchEvent(new Event('userStateChanged'));
        navigate('/admin/allproducts');
        return;
      }
    }

    // Check 3: Standard Client Login
    try {
      setLoading(true);
      setError('');

      let userObj = null;
      let tokenObj = null;
      let apiErrorMessage = '';

      try {
        const res = await baseUrl.post('/api/v1/auth/login', { email, password });
        if (res.data && res.data.data) {
          userObj = res.data.data;
          tokenObj = res.data.token || 'token_' + Date.now();
        }
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          apiErrorMessage = err.response.data.message;
        }
      }

      // Check registered users in localStorage if API didn't return user
      if (!userObj) {
        const usersList = JSON.parse(localStorage.getItem('usersList') || '[]');
        const foundUser = usersList.find(u => 
          (u.email && u.email.toLowerCase().trim() === inputEmailClean) ||
          (u.phone && u.phone.trim() === inputEmailClean)
        );

        if (!foundUser) {
          setLoading(false);
          setError(apiErrorMessage || "❌ Aucun compte trouvé avec ces coordonnées. Veuillez d'abord créer un compte !");
          return;
        }

        if (foundUser.password !== password) {
          setLoading(false);
          setError("❌ Mot de passe incorrect ! Veuillez saisir le mot de passe créé lors de votre inscription.");
          return;
        }

        userObj = foundUser;
        tokenObj = 'token_' + Date.now();
      }

      // Save user & token in localStorage
      localStorage.setItem('user', JSON.stringify(userObj));
      localStorage.setItem('token', tokenObj);

      // Trigger custom event for Navbar update
      window.dispatchEvent(new Event('userStateChanged'));

      setLoading(false);
      navigate('/user/allorders');

    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Erreur de connexion. Veuillez réessayer.");
    }
  };

  return (
    <Container className="py-5">
      <Row className="py-3 mt-2 d-flex justify-content-center align-items-center">
        <Col sm="5" className="mb-4 mb-sm-0">
          <img 
            style={{ borderRadius: 20 }}  
            src={imagelogin}
            alt="AKROUD PARFUM Login"
            className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5 shadow-sm"
          />
        </Col>
        <Col sm="6" className="d-flex flex-column">
          <label className="mx-auto title-login mb-3 fs-3 fw-bold">Connexion Client / Admin</label>

          {error && <Alert variant="danger" className="text-center py-2 fw-bold">{error}</Alert>}

          <form onSubmit={handleLogin} className="d-flex flex-column w-100">
            <input
              placeholder="Email ou N° Téléphone..."
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="user-input my-2 text-center mx-auto"
              required
            />
            <input
              placeholder="Mot de passe..."
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="user-input my-2 text-center mx-auto"
              required
            />
            <div className="text-center my-1">
              <Link to="/forgot-password" className="text-decoration-none small text-secondary">
                🔑 Mot de passe oublié ?
              </Link>
            </div>
            <button type="submit" className="btn-login mx-auto mt-3 fw-bold" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Se connecter"}
            </button>
          </form>

          <label className="mx-auto my-4 text-muted">
            Vous n'avez pas encore de compte ?{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              <span style={{ cursor: "pointer" }} className="text-danger fw-bold">
                Créer un compte
              </span>
            </Link>
          </label>

          <div className="d-flex justify-content-center gap-3 mt-2">
            <Link to="/user/allorders" style={{ textDecoration: "none" }}>
              <span className="badge bg-warning text-dark p-2">Espace Mes Commandes</span>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
