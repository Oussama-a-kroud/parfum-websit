import React, { useState } from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import user uploaded AKROUD PARFUM custom images
import imgSauvage from "../../images/sauvage_dior.png";
import imgEros from "../../images/versace_eros.png";
import imgUltraMale from "../../images/ultra_male.png";
import imgAkroudGold from "../../images/akroud_gold_bottle.png";

const Silder = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="w-100 position-relative overflow-hidden mb-4" style={{ backgroundColor: "#0b0f19" }}>
      <div className="slider-container-custom">
        <Carousel activeIndex={index} onSelect={handleSelect} fade indicators={true}>
          {/* Slide 1 - Sauvage Dior */}
          <Carousel.Item className="slider-background py-4 py-md-5" interval={3500}>
            <Container>
              <Row className="align-items-center g-4">
                <Col md="7" xs="12" className="text-center text-md-start pe-md-4">
                  <span className="slider-badge">✨ AKROUD PARFUM LUXE</span>
                  <h3 className="slider-title">Sauvage Dior & Collection Royale</h3>
                  <p className="slider-text">
                    L'élégance masculine absolue capturée dans votre flacon signature AKROUD PARFUM. Prix unique : 50 DH !
                  </p>
                  <Link to="/products" className="slider-btn">
                    Découvrir la collection (50 DH) →
                  </Link>
                </Col>
                <Col md="5" className="d-none d-md-block text-center">
                  <div className="slider-img-container">
                    <img
                      className="slider-img"
                      src={imgSauvage}
                      alt="Sauvage AKROUD Parfum"
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </Carousel.Item>

          {/* Slide 2 - Versace Eros */}
          <Carousel.Item className="slider-background3 py-4 py-md-5" interval={3500}>
            <Container>
              <Row className="align-items-center g-4">
                <Col md="7" xs="12" className="text-center text-md-start pe-md-4">
                  <span className="slider-badge">🔥 Offre Exceptionnelle</span>
                  <h3 className="slider-title">Versace Eros — Séduction Infinie</h3>
                  <p className="slider-text">
                    L'incarnation de la passion et du désir dans la bouteille dorée AKROUD PARFUM à 50 DH.
                  </p>
                  <Link to="/products" className="slider-btn">
                    Acheter maintenant (50 DH) →
                  </Link>
                </Col>
                <Col md="5" className="d-none d-md-block text-center">
                  <div className="slider-img-container">
                    <img
                      className="slider-img"
                      src={imgEros}
                      alt="Versace Eros AKROUD"
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </Carousel.Item>

          {/* Slide 3 - Jean Paul Gaultier Ultra Male */}
          <Carousel.Item className="slider-background2 py-4 py-md-5" interval={3500}>
            <Container>
              <Row className="align-items-center g-4">
                <Col md="7" xs="12" className="text-center text-md-start pe-md-4">
                  <span className="slider-badge">⚓ Jean Paul Gaultier</span>
                  <h3 className="slider-title">Ultra Male JPG & Senteurs d'Exception</h3>
                  <p className="slider-text">
                    L'icône masculine irrésistible de Jean Paul Gaultier dans votre flacon AKROUD PARFUM à 50 DH.
                  </p>
                  <Link to="/products" className="slider-btn">
                    Commander Ultra Male (50 DH) →
                  </Link>
                </Col>
                <Col md="5" className="d-none d-md-block text-center">
                  <div className="slider-img-container">
                    <img
                      className="slider-img"
                      src={imgUltraMale}
                      alt="Jean Paul Gaultier Ultra Male AKROUD"
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </Carousel.Item>

          {/* Slide 4 - Signature Gold Bottle */}
          <Carousel.Item className="slider-background4 py-4 py-md-5" interval={3500}>
            <Container>
              <Row className="align-items-center g-4">
                <Col md="7" xs="12" className="text-center text-md-start pe-md-4">
                  <span className="slider-badge">🚚 Signature AKROUD PARFUM</span>
                  <h3 className="slider-title">Tous vos Parfums Préférés à 50 DH</h3>
                  <p className="slider-text">
                    Plus de 46 fragrances d'exception pour Homme et Femme. Livraison rapide partout au Maroc !
                  </p>
                  <Link to="/products" className="slider-btn">
                    Commandez vos parfums (50 DH) →
                  </Link>
                </Col>
                <Col md="5" className="d-none d-md-block text-center">
                  <div className="slider-img-container">
                    <img
                      className="slider-img"
                      src={imgAkroudGold}
                      alt="AKROUD Signature Bottle"
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default Silder;
