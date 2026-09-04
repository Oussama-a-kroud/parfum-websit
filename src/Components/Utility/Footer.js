import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logoImg from '../../images/logo.png';
import facebookImg from '../../images/facebook.png';
import instagramImg from '../../images/instagram.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer style={{ backgroundColor: "#0b0f19", color: "#94a3b8", fontFamily: "'Almarai', sans-serif" }}>
      {/* 1. Value Proposition Banner */}
      <div style={{ backgroundColor: "#151c2c", borderTop: "1px solid rgba(245, 158, 11, 0.2)", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
        <Container className="py-4">
          <Row className="g-4 text-center">
            <Col xs="6" md="3" className="d-flex flex-column align-items-center">
              <span style={{ fontSize: "28px" }} className="mb-2">🚚</span>
              <h6 className="fw-bold text-white mb-1" style={{ fontSize: "14px" }}>LIVRAISON GRATUITE</h6>
              <small style={{ fontSize: "12px", color: "#94a3b8" }}>30 DH partout au Maroc (Gratuite dès 200 DH)</small>
            </Col>
            <Col xs="6" md="3" className="d-flex flex-column align-items-center">
              <span style={{ fontSize: "28px" }} className="mb-2">💵</span>
              <h6 className="fw-bold text-white mb-1" style={{ fontSize: "14px" }}>PAIEMENT À LA LIVRAISON</h6>
              <small style={{ fontSize: "12px", color: "#94a3b8" }}>100% Sécurisé à la réception</small>
            </Col>
            <Col xs="6" md="3" className="d-flex flex-column align-items-center">
              <span style={{ fontSize: "28px" }} className="mb-2">✨</span>
              <h6 className="fw-bold text-white mb-1" style={{ fontSize: "14px" }}>HAUTE FIXATION</h6>
              <small style={{ fontSize: "12px", color: "#94a3b8" }}>Extraits de parfum longue tenue</small>
            </Col>
            <Col xs="6" md="3" className="d-flex flex-column align-items-center">
              <span style={{ fontSize: "28px" }} className="mb-2">💬</span>
              <h6 className="fw-bold text-white mb-1" style={{ fontSize: "14px" }}>SUPPORT CLIENT VIP</h6>
              <small style={{ fontSize: "12px", color: "#94a3b8" }}>WhatsApp direct 06 66 05 08 79</small>
            </Col>
          </Row>
        </Container>
      </div>

      {/* 2. Main 4-Column Footer */}
      <Container className="py-5">
        <Row className="g-4">
          {/* Column 1: Brand & Contact Info */}
          <Col lg="4" md="6" xs="12">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img src={logoImg} alt="AKROUD PARFUM" style={{ height: "45px", width: "auto" }} />
              <span className="fw-black text-white" style={{ fontSize: "20px", letterSpacing: "1px" }}>
                AKROUD <span style={{ color: "#f59e0b" }}>PARFUM</span>
              </span>
            </div>
            <p className="small mb-4" style={{ color: "#94a3b8", lineHeight: "1.7", maxWidth: "340px" }}>
              La haute parfumerie accessible à tous. Plus de 46 fragrances d'exception pour Homme et Femme au prix unique de 50 DH le flacon.
            </p>
            <div className="d-flex flex-column gap-2 small">
              <div className="d-flex align-items-center gap-2">
                <span className="text-warning">📍</span>
                <span>Casablanca, Maroc</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="text-warning">📞</span>
                <a href="tel:0666050879" className="text-decoration-none" style={{ color: "#f59e0b", fontWeight: "700" }}>
                  06 66 05 08 79 / 06 66 05 09 79
                </a>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="text-warning">💬</span>
                <a 
                  href="https://wa.me/212666050879" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-decoration-none fw-bold" 
                  style={{ color: "#25D366" }}>
                  Commander via WhatsApp →
                </a>
              </div>
            </div>
          </Col>

          {/* Column 2: Navigation Rapide */}
          <Col lg="2" md="6" xs="6">
            <h6 className="fw-bold text-white mb-3 text-uppercase" style={{ fontSize: "13px", letterSpacing: "1.5px", color: "#f59e0b" }}>
              NAVIGATION
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <Link to="/pack" className="text-decoration-none" style={{ color: "#f59e0b", fontWeight: "800" }}>
                  🎁 PACK 4 PARFUMS (200 DH)
                </Link>
              </li>
              <li>
                <Link to="/products?category=cat_homme" className="text-decoration-none" style={{ color: "#cbd5e1" }}>
                  👔 Collection Homme
                </Link>
              </li>
              <li>
                <Link to="/products?category=cat_femme" className="text-decoration-none" style={{ color: "#cbd5e1" }}>
                  👠 Collection Femme
                </Link>
              </li>
              <li>
                <Link to="/products?category=cat_oriental" className="text-decoration-none" style={{ color: "#cbd5e1" }}>
                  🌙 Parfums Orientaux
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-decoration-none" style={{ color: "#cbd5e1" }}>
                  🛍️ Tous les Parfums (50 DH)
                </Link>
              </li>
            </ul>
          </Col>

          {/* Column 3: Client & Info */}
          <Col lg="2" md="6" xs="6">
            <h6 className="fw-bold text-white mb-3 text-uppercase" style={{ fontSize: "13px", letterSpacing: "1.5px", color: "#f59e0b" }}>
              INFORMATIONS
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <Link to="/cart" className="text-decoration-none" style={{ color: "#cbd5e1" }}>
                  🛒 Mon Panier
                </Link>
              </li>
              <li>
                <Link to="/user/allorders" className="text-decoration-none" style={{ color: "#cbd5e1" }}>
                  📦 Suivi de Commande
                </Link>
              </li>
              <li>
                <span style={{ color: "#94a3b8", cursor: "pointer" }}>
                  📜 Termes & Conditions
                </span>
              </li>
              <li>
                <span style={{ color: "#94a3b8", cursor: "pointer" }}>
                  🔒 Politique de Confidentialité
                </span>
              </li>
              <li>
                <span style={{ color: "#94a3b8", cursor: "pointer" }}>
                  ❓ FAQ & Aide
                </span>
              </li>
            </ul>
          </Col>

          {/* Column 4: Newsletter & Socials */}
          <Col lg="4" md="6" xs="12">
            <h6 className="fw-bold text-white mb-3 text-uppercase" style={{ fontSize: "13px", letterSpacing: "1.5px", color: "#f59e0b" }}>
              NEWSLETTER & OFFRES VIP
            </h6>
            <p className="small mb-3" style={{ color: "#94a3b8" }}>
              Inscrivez-vous pour recevoir en avant-première nos nouvelles fragrances et promotions exclusives.
            </p>

            <Form onSubmit={handleNewsletterSubmit} className="mb-4">
              <div className="d-flex gap-2">
                <Form.Control 
                  type="email"
                  placeholder="Votre adresse email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-dark border-secondary text-white small"
                  style={{ borderRadius: "8px", padding: "10px 14px", fontSize: "13px" }}
                  required
                />
                <Button 
                  type="submit" 
                  className="btn-warning fw-bold px-3 border-0"
                  style={{ backgroundColor: "#f59e0b", color: "#000", borderRadius: "8px", whiteSpace: "nowrap", fontSize: "13px" }}>
                  S'INSCRIRE
                </Button>
              </div>
              {subscribed && (
                <small className="text-success d-block mt-2 font-weight-bold">
                  ✓ Merci ! Vous êtes inscrit à notre newsletter VIP.
                </small>
              )}
            </Form>

            <h6 className="fw-bold text-white mb-2 small text-uppercase" style={{ letterSpacing: "1px" }}>
              SUIVEZ-NOUS
            </h6>
            <div className="d-flex align-items-center gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="d-flex align-items-center justify-content-center rounded-circle bg-dark border border-secondary p-2"
                style={{ width: "38px", height: "38px", transition: "all 0.3s ease" }}>
                <img src={facebookImg} alt="Facebook" style={{ width: "18px", height: "18px" }} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="d-flex align-items-center justify-content-center rounded-circle bg-dark border border-secondary p-2"
                style={{ width: "38px", height: "38px", transition: "all 0.3s ease" }}>
                <img src={instagramImg} alt="Instagram" style={{ width: "18px", height: "18px" }} />
              </a>
              <a 
                href="https://wa.me/212666050879" 
                target="_blank" 
                rel="noreferrer"
                className="d-flex align-items-center justify-content-center rounded-circle p-2"
                style={{ width: "38px", height: "38px", backgroundColor: "#25D366", textDecoration: "none" }}>
                <span style={{ fontSize: "18px" }}>💬</span>
              </a>
            </div>
          </Col>
        </Row>
      </Container>

      {/* 3. Bottom Copyright Bar */}
      <div style={{ backgroundColor: "#060911", borderTop: "1px solid rgba(255, 255, 255, 0.05)" }} className="py-3">
        <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small">
          <div style={{ color: "#64748b", fontSize: "12px" }}>
            © {new Date().getFullYear()} <strong className="text-white">AKROUD PARFUM</strong>. Tous droits réservés. Coded with ❤️ in Morocco 🇲🇦
          </div>
          <div className="d-flex align-items-center gap-3" style={{ fontSize: "12px", color: "#64748b" }}>
            <span>Paiement à la livraison</span> • <span>Livraison 24h-48h</span> • <span>100% Authentique</span>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
