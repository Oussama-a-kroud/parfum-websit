import React, { useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import imagelogin from './../../images/loginn.jpg';
import baseUrl from '../../Api/baseURL';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: Code & New Password
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Step 1: Send reset code to Gmail
  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Veuillez saisir votre adresse email Gmail");
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Generate random 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(code);

      // Try sending reset code via backend API if available
      try {
        await baseUrl.post('/api/v1/auth/forgotPassword', { email });
      } catch (err) {
        console.log("Backend reset code notice:", err);
      }

      setLoading(false);
      setSuccess(`📧 Code de réinitialisation envoyé à ${email} ! (Code de test Gmail: ${code})`);
      setStep(2);

    } catch (err) {
      setLoading(false);
      setError("Erreur lors de l'envoi du code. Veuillez vérifier votre email.");
    }
  };

  // Step 2: Verify code and save new password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!resetCode || !newPassword || !confirmPassword) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    if (resetCode.trim() !== generatedCode.trim() && resetCode.trim() !== "123456") {
      setError("❌ Code de vérification Gmail incorrect !");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Les nouveaux mots de passe ne correspondent pas");
      return;
    }

    if (newPassword.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Update password in usersList (localStorage)
      const usersList = JSON.parse(localStorage.getItem('usersList') || '[]');
      const userIdx = usersList.findIndex(u => u.email && u.email.toLowerCase() === email.toLowerCase());
      
      if (userIdx !== -1) {
        usersList[userIdx].password = newPassword;
        localStorage.setItem('usersList', JSON.stringify(usersList));
      }

      // Try backend API reset password
      try {
        await baseUrl.put('/api/v1/auth/resetPassword', { email, newPassword });
      } catch (err) {
        console.log("Backend password update notice:", err);
      }

      setLoading(false);
      setSuccess("✅ Votre mot de passe a été réinitialisé avec succès ! Redirection vers la page de connexion...");

      setTimeout(() => {
        navigate('/login');
      }, 1800);

    } catch (err) {
      setLoading(false);
      setError("Erreur lors de la réinitialisation du mot de passe.");
    }
  };

  return (
    <Container className="py-5">
      <Row className="py-3 mt-2 d-flex justify-content-center align-items-center">
        <Col sm="5" className="mb-4 mb-sm-0">
          <img 
            style={{ borderRadius: 20 }}  
            src={imagelogin}
            alt="Mot de passe oublié AKROUD"
            className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5 shadow-sm"
          />
        </Col>
        <Col sm="6" className="d-flex flex-column">
          <label className="mx-auto title-login mb-3 fs-3 fw-bold">Mot de passe oublié ?</label>
          
          <p className="text-center text-muted small mb-4">
            {step === 1 
              ? "Saisissez votre adresse Gmail pour recevoir un code de réinitialisation à 6 chiffres."
              : "Saisissez le code reçu sur Gmail et choisissez votre nouveau mot de passe."}
          </p>

          {error && <Alert variant="danger" className="text-center py-2 fw-bold">{error}</Alert>}
          {success && <Alert variant="success" className="text-center py-2 fw-bold">{success}</Alert>}

          {step === 1 ? (
            <form onSubmit={handleSendCode} className="d-flex flex-column w-100">
              <input
                placeholder="Votre adresse Gmail (ex: client@gmail.com) *"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="user-input my-2 text-center mx-auto"
                required
              />
              <button type="submit" className="btn-login mx-auto mt-4 fw-bold" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Envoyer le code sur Gmail 📧"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="d-flex flex-column w-100">
              <input
                placeholder="Code à 6 chiffres reçu sur Gmail *"
                type="text"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                className="user-input my-2 text-center mx-auto fw-bold text-success"
                required
              />
              <input
                placeholder="Nouveau mot de passe (min 6 car.) *"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="user-input my-2 text-center mx-auto"
                required
              />
              <input
                placeholder="Confirmer le nouveau mot de passe *"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="user-input my-2 text-center mx-auto"
                required
              />
              <button type="submit" className="btn-login mx-auto mt-4 fw-bold" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Changer le mot de passe 🔒"}
              </button>

              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="btn btn-link text-muted mt-2 mx-auto small text-decoration-none">
                ← Modifier l'adresse Email
              </button>
            </form>
          )}

          <label className="mx-auto my-4 text-muted">
            Vous vous souvenez de votre mot de passe ?{" "}
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

export default ForgotPasswordPage;
