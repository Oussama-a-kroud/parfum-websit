import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import offerBannerImg from '../../images/home_pack_offer_banner.png';
import packHeroImg from '../../images/pack_banner_hero.png';

const PackPromoSection = () => {
  const navigate = useNavigate();

  const handleOpenPack = () => {
    navigate('/pack');
  };

  return (
    <div className="py-5 my-4" style={{ backgroundColor: "#0b0f19", color: "#ffffff" }}>
      <Container>
        <Row className="align-items-center g-5">
          {/* Left Column - Poster Card */}
          <Col lg="5" md="12">
            <div 
              onClick={handleOpenPack}
              className="rounded-4 overflow-hidden shadow-lg border p-2 pack-poster-hover"
              style={{
                backgroundColor: "#18181b",
                borderColor: "rgba(245, 158, 11, 0.3)",
                cursor: "pointer",
              }}>
              <img 
                src={offerBannerImg || packHeroImg} 
                alt="4 Parfums 1 Prix 0 Livraison - AKROUD PARFUM" 
                className="w-100 h-auto rounded-3"
                style={{ objectFit: "cover", display: "block" }}
                onError={(e) => { e.target.src = packHeroImg; }}
              />
            </div>
          </Col>

          {/* Right Column - Inspired Typography & Layout */}
          <Col lg="7" md="12" className="text-center text-lg-start">
            <div className="ps-lg-4">
              {/* Sub-badge */}
              <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 mb-3">
                <span className="fw-bold text-uppercase" style={{ fontSize: "13px", color: "#f59e0b", letterSpacing: "2px" }}>
                  • LE PACK SIGNATURE
                </span>
              </div>

              {/* Giant 3-Line Headline */}
              <h1 className="fw-black mb-3" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: "900", lineHeight: "1.1", letterSpacing: "-1px" }}>
                <span className="text-white d-block">4 parfums.</span>
                <span style={{ color: "#c084fc" }} className="d-block">1 prix.</span>
                <span style={{ color: "#f59e0b" }} className="d-block">0 livraison.</span>
              </h1>

              {/* Description */}
              <p className="text-slate-300 mb-4" style={{ fontSize: "16px", color: "#94a3b8", lineHeight: "1.6", maxWidth: "540px" }}>
                Composez votre coffret avec 4 fragrances au choix parmi notre catalogue de 46+ jus. Lui, Elle, Niche, AKROUD Collection — mélangez les univers, c'est vous qui décidez.
              </p>

              {/* Checklist */}
              <div className="mb-4 text-start d-inline-block">
                <div className="d-flex align-items-center mb-2" style={{ fontSize: "15px", color: "#cbd5e1" }}>
                  <span className="text-warning me-2 fw-bold" style={{ color: "#f59e0b" }}>✓</span> 4 flacons de 30ml au choix
                </div>
                <div className="d-flex align-items-center mb-2" style={{ fontSize: "15px", color: "#cbd5e1" }}>
                  <span className="text-warning me-2 fw-bold" style={{ color: "#f59e0b" }}>✓</span> Livraison gratuite partout au Maroc
                </div>
                <div className="d-flex align-items-center mb-4" style={{ fontSize: "15px", color: "#cbd5e1" }}>
                  <span className="text-warning me-2 fw-bold" style={{ color: "#f59e0b" }}>✓</span> Paiement à la livraison disponible
                </div>
              </div>

              {/* Oval Gold Button */}
              <div className="mb-2">
                <Button
                  onClick={handleOpenPack}
                  className="btn-warning btn-lg fw-extrabold text-uppercase px-5 py-3 border-0 shadow-lg"
                  style={{
                    backgroundColor: "#f59e0b",
                    color: "#000000",
                    fontSize: "15px",
                    borderRadius: "50px",
                    letterSpacing: "1px",
                    transition: "all 0.3s ease"
                  }}>
                  COMPOSER MON PACK →
                </Button>
              </div>

              {/* Savings Subtext */}
              <small className="text-muted d-block mt-2" style={{ fontSize: "13px", color: "#64748b" }}>
                Économisez jusqu'à <strong style={{ color: "#f59e0b" }}>45 DH</strong> vs achat à l'unité
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PackPromoSection;
