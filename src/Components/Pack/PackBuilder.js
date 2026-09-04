import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Button, Modal, ProgressBar, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import baseUrl from '../../Api/baseURL';
import packHeroImg from '../../images/pack_banner_hero.png';

// Import all uploaded AKROUD PARFUM custom images
import imgAllure from '../../images/allure_sport.png';
import imgArmani from '../../images/armani_code.png';
import imgAzzaro from '../../images/azzaro_wanted.png';
import imgBlackXs from '../../images/black_xs.png';
import imgFahrenheit from '../../images/dior_fahrenheit.png';
import imgGucci from '../../images/gucci_flora.png';
import imgInvictus from '../../images/invictus_ap.png';
import imgKayali from '../../images/kayali_28.jpg';
import imgVersace from '../../images/versace_crystal_noir.png';
import imgKhamrah from '../../images/khamrah.png';
import imgLaBelle from '../../images/labelle.png';
import imgLacosteEssential from '../../images/lacoste_essential.png';
import imgLacosteBlanc from '../../images/lacoste_blanc.png';
import imgLhommeYsl from '../../images/lhomme_ysl.png';
import imgLegend from '../../images/montblanc_legend.png';
import imgLimperatrice from '../../images/limperatrice.png';
import imgLacosteNoir from '../../images/lacoste_noir.png';
import imgOudMood from '../../images/oud_mood.jpg';
import imgAkroudGold from '../../images/akroud_gold_bottle.png';
import imgBleuDeChanel from '../../images/bleu_de_chanel_ap.jpg';
import imgSauvage from '../../images/sauvage_dior_ap.jpg';
import imgScandalHomme from '../../images/scandal_homme.png';
import imgStrongerWithYou from '../../images/stronger_with_you_ap.jpg';
import imgTerreDhermes from '../../images/terre_dhermes.png';
import imgUltraMale from '../../images/ultra_male_ap.jpg';
import imgVersaceEros from '../../images/versace_eros.png';

const resolvePerfumeImage = (title, imageCover) => {
    const t = (title || "").toLowerCase();

    if (imageCover && typeof imageCover === 'string' && imageCover.startsWith('data:')) {
        return imageCover;
    }

    if (t.includes("bleu") || t.includes("blue") || t.includes("chanel")) return imgBleuDeChanel;
    if (t.includes("eros") || t.includes("versace eros")) return imgVersaceEros;
    if (t.includes("ultra male") || t.includes("ultra mal")) return imgUltraMale;
    if (t.includes("terre") || t.includes("hermès") || t.includes("hermes")) return imgTerreDhermes;
    if (t.includes("stronger") || t.includes("strong")) return imgStrongerWithYou;
    if (t.includes("scandal")) return imgScandalHomme;
    if (t.includes("sauvage")) return imgSauvage;
    if (t.includes("lacoste noir") || (t.includes("lacoste") && t.includes("noir"))) return imgLacosteNoir;
    if (t.includes("essential") || t.includes("lacoste essential")) return imgLacosteEssential;
    if (t.includes("lacoste blanc") || t.includes("blanc")) return imgLacosteBlanc;
    if (t.includes("oud mood") || t.includes("عود مود")) return imgOudMood;
    if (t.includes("impératrice") || t.includes("imperatrice")) return imgLimperatrice;
    if (t.includes("l'homme") || t.includes("yves saint laurent")) return imgLhommeYsl;
    if (t.includes("legend") || t.includes("montblanc")) return imgLegend;
    if (t.includes("خمرة") || t.includes("khamrah")) return imgKhamrah;
    if (t.includes("labelle") || t.includes("la belle")) return imgLaBelle;
    if (t.includes("allure")) return imgAllure;
    if (t.includes("armani") || t.includes("code")) return imgArmani;
    if (t.includes("azzaro") || t.includes("wanted")) return imgAzzaro;
    if (t.includes("black xs") || t.includes("black")) return imgBlackXs;
    if (t.includes("fahrenheit")) return imgFahrenheit;
    if (t.includes("gucci") || t.includes("flora")) return imgGucci;
    if (t.includes("invictus")) return imgInvictus;
    if (t.includes("kayali")) return imgKayali;
    if (t.includes("versace") || t.includes("crystal")) return imgVersace;

    return imgAkroudGold;
};

const defaultPerfumesList = [
  { _id: "p1", title: "Sauvage Dior", category: "cat_homme", imageCover: imgSauvage, price: 50 },
  { _id: "p2", title: "Bleu De Chanel", category: "cat_homme", imageCover: imgBleuDeChanel, price: 50 },
  { _id: "p3", title: "Ultra Male JPG", category: "cat_homme", imageCover: imgUltraMale, price: 50 },
  { _id: "p4", title: "Stronger With You Intensely", category: "cat_homme", imageCover: imgStrongerWithYou, price: 50 },
  { _id: "p5", title: "Versace Eros", category: "cat_homme", imageCover: imgVersaceEros, price: 50 },
  { _id: "p6", title: "خمرة Khamrah Lattafa", category: "cat_oriental", imageCover: imgKhamrah, price: 50 },
  { _id: "p7", title: "Scandal Homme", category: "cat_homme", imageCover: imgAkroudGold, price: 50 },
  { _id: "p8", title: "Lacoste Noir", category: "cat_homme", imageCover: imgAkroudGold, price: 50 },
  { _id: "p9", title: "Coco Chanel", category: "cat_femme", imageCover: imgAkroudGold, price: 50 },
  { _id: "p10", title: "La Vie Est Belle", category: "cat_femme", imageCover: imgLaBelle, price: 50 },
  { _id: "p11", title: "Good Girl", category: "cat_femme", imageCover: imgAkroudGold, price: 50 },
  { _id: "p12", title: "Yara Lattafa", category: "cat_femme", imageCover: imgAkroudGold, price: 50 }
];

const PackBuilder = () => {
  const [allPerfumes, setAllPerfumes] = useState(defaultPerfumesList);
  const [selectedSlots, setSelectedSlots] = useState([null, null, null, null]);
  const [activeSlotIndex, setActiveSlotIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Category Filter & Search inside picker Modal
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');

  // Customer order form inputs
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Fetch perfumes list from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await baseUrl.get('/api/v1/products');
        const data = res.data?.data || res.data || [];
        if (Array.isArray(data) && data.length > 0) {
          setAllPerfumes(data);
        }
      } catch (err) {
        console.error("Error fetching perfumes for pack:", err);
      }
    };
    fetchProducts();
  }, []);

  // Open slot selection modal
  const handleOpenSlotModal = (index) => {
    setActiveSlotIndex(index);
    setActiveCategoryTab('all');
    setSearchKeyword('');
    setShowModal(true);
  };

  // Assign perfume to active slot
  const handleSelectPerfumeForSlot = (perfume) => {
    if (activeSlotIndex === null) return;
    const newSlots = [...selectedSlots];
    newSlots[activeSlotIndex] = perfume;
    setSelectedSlots(newSlots);
    setShowModal(false);
    setActiveSlotIndex(null);
  };

  // Remove perfume from a slot
  const handleRemoveSlot = (e, index) => {
    e.stopPropagation();
    const newSlots = [...selectedSlots];
    newSlots[index] = null;
    setSelectedSlots(newSlots);
  };

  const selectedCount = selectedSlots.filter(s => s !== null).length;
  const isComplete = selectedCount === 4;

  // Open direct checkout order modal
  const handleOpenOrderModal = () => {
    if (!isComplete) return;
    setShowOrderModal(true);
  };

  // Filter perfumes list inside modal by category & search
  const filteredPerfumes = allPerfumes.filter((p) => {
    const cat = p.category || '';
    const titleLower = (p.title || '').toLowerCase();

    const matchesCategory = 
      activeCategoryTab === 'all' ||
      cat === activeCategoryTab ||
      (activeCategoryTab === 'cat_homme' && (cat === 'cat_homme' || titleLower.includes("homme") || titleLower.includes("sauvage") || titleLower.includes("bleu") || titleLower.includes("male") || titleLower.includes("eros") || titleLower.includes("legend") || titleLower.includes("lacoste") || titleLower.includes("invictus"))) ||
      (activeCategoryTab === 'cat_femme' && (cat === 'cat_femme' || titleLower.includes("femme") || titleLower.includes("belle") || titleLower.includes("flora") || titleLower.includes("yara") || titleLower.includes("impératrice") || titleLower.includes("coco") || titleLower.includes("girl") || titleLower.includes("si ") || titleLower.includes("candy"))) ||
      (activeCategoryTab === 'cat_oriental' && (cat === 'cat_oriental' || titleLower.includes("خمرة") || titleLower.includes("عود") || titleLower.includes("khamrah") || titleLower.includes("oud") || titleLower.includes("اميرة") || titleLower.includes("amirat")));

    const matchesSearch = !searchKeyword || titleLower.includes(searchKeyword.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Handle Order Submit -> Formats WhatsApp Message & Opens WhatsApp Directly
  const handleConfirmOrderWhatsApp = (e) => {
    e.preventDefault();

    if (!customerName || !customerCity || !customerAddress || !customerPhone) {
      alert("Veuillez remplir tous les champs de livraison !");
      return;
    }

    const perfumesText = selectedSlots
      .map((p, idx) => `${idx + 1}. *${p?.title || "Parfum"}*`)
      .join("\n");

    const message = `🌸 *NOUVELLE COMMANDE PACK 4 PARFUMS (AKROUD PARFUM)* 🌸\n\n` +
      `📦 *Détails du Pack (200 DH - Livraison Gratuite):*\n${perfumesText}\n\n` +
      `👤 *Informations du Client:*\n` +
      `• *Nom:* ${customerName}\n` +
      `• *Ville:* ${customerCity}\n` +
      `• *Adresse:* ${customerAddress}\n` +
      `• *Téléphone:* ${customerPhone}\n\n` +
      `💰 *Montant Total:* 200 DH (Paiement à la livraison)`;

    const phoneNum = "212666050879"; // WhatsApp store number
    const whatsappUrl = `https://wa.me/${phoneNum}?text=${encodeURIComponent(message)}`;

    // Save order record to local storage & backend
    try {
      const existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
      const newOrder = {
        _id: "ord_pack_" + Date.now(),
        user: { name: customerName, phone: customerPhone, city: customerCity, address: customerAddress },
        cartItems: selectedSlots.map(p => ({ title: p?.title, price: 50, quantity: 1 })),
        totalOrderPrice: 200,
        status: "En cours",
        createdAt: new Date().toISOString()
      };
      existingOrders.push(newOrder);
      localStorage.setItem('userOrders', JSON.stringify(existingOrders));

      // Attempt backend API post
      baseUrl.post('/api/v1/orders', newOrder).catch(err => console.log("Backend offline log:", err));
    } catch (err) {
      console.error("Error saving order locally:", err);
    }

    setShowOrderModal(false);

    // Open WhatsApp directly
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="py-4" style={{ backgroundColor: "#faf8f5", minHeight: "80vh" }}>
      <Container>
        {/* Breadcrumb */}
        <div className="text-uppercase mb-3" style={{ fontSize: "12px", letterSpacing: "1px", color: "#64748b" }}>
          <Link to="/" className="text-decoration-none text-secondary">ACCUEIL</Link> / <Link to="/products" className="text-decoration-none text-secondary">BOUTIQUE</Link> / <span className="fw-bold text-dark">PACK AKROUD SIGNATURE</span>
        </div>

        <Row className="g-4 align-items-start">
          {/* Left Column - Large Poster */}
          <Col lg="6" md="12">
            <div className="rounded-4 overflow-hidden shadow-lg border p-2 bg-white">
              <img 
                src={packHeroImg} 
                alt="Pack 4 Parfums 200DH AKROUD SIGNATURE" 
                className="w-100 h-auto rounded-3"
                style={{ objectFit: "cover", display: "block" }}
              />
            </div>
          </Col>

          {/* Right Column - Pack Details & Interactive Customizer */}
          <Col lg="6" md="12">
            <div className="ps-lg-3">
              <span className="fw-bold text-uppercase" style={{ fontSize: "13px", color: "#d97706", letterSpacing: "1.5px" }}>
                • PACK SIGNATURE
              </span>
              
              <h1 className="fw-extrabold text-dark my-2" style={{ fontSize: "36px", letterSpacing: "-0.5px" }}>
                PACK AKROUD SIGNATURE
              </h1>

              {/* Pricing Section */}
              <div className="d-flex align-items-center gap-3 my-3">
                <span className="fw-extrabold text-dark" style={{ fontSize: "34px" }}>
                  200.00 dh
                </span>
                <span className="text-decoration-line-through text-muted" style={{ fontSize: "20px" }}>
                  245.00 dh
                </span>
                <Badge bg="primary" style={{ backgroundColor: "#8b5cf6", fontSize: "12px", padding: "6px 12px", borderRadius: "20px" }}>
                  ÉCONOMISEZ 45.00 DH
                </Badge>
              </div>

              <div className="text-muted small mb-4">
                Taxes incluses · Livraison offerte partout au Maroc
              </div>

              <hr style={{ opacity: 0.15 }} />

              {/* Highlights Checkmarks */}
              <div className="my-4">
                <div className="d-flex align-items-center mb-2" style={{ fontSize: "15px", color: "#334155" }}>
                  <span className="text-warning fw-bold me-2">✓</span> <strong>4 parfums au choix</strong> dans notre collection (46+ senteurs)
                </div>
                <div className="d-flex align-items-center mb-2" style={{ fontSize: "15px", color: "#334155" }}>
                  <span className="text-warning fw-bold me-2">✓</span> Coffret cadeau signature AKROUD inclus
                </div>
                <div className="d-flex align-items-center mb-3" style={{ fontSize: "15px", color: "#334155" }}>
                  <span className="text-warning fw-bold me-2">✓</span> Livraison offerte partout au Maroc
                </div>
              </div>

              {/* Interactive Customizer Yellow/Gold Container */}
              <div 
                className="p-4 rounded-4 my-4"
                style={{
                  border: "2px solid #f59e0b",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 8px 24px rgba(245, 158, 11, 0.15)"
                }}>
                <div className="text-center mb-3">
                  <small className="fw-bold text-uppercase text-warning" style={{ letterSpacing: "1.5px", fontSize: "11px" }}>
                    ÉTAPE UNIQUE
                  </small>
                  <h3 className="fw-extrabold text-dark mb-1" style={{ fontSize: "24px" }}>
                    Composez votre <span style={{ color: "#d97706" }}>pack</span>
                  </h3>
                  <p className="text-muted small mb-0">
                    Sélectionnez vos 4 parfums préférés parmi toute notre collection homme et femme.
                  </p>
                </div>

                {/* 4 Interactive Slots */}
                <Row className="g-3 my-2 justify-content-center">
                  {[0, 1, 2, 3].map((slotIdx) => {
                    const slotData = selectedSlots[slotIdx];
                    const slotImg = slotData ? resolvePerfumeImage(slotData.title, slotData.imageCover) : imgAkroudGold;

                    return (
                      <Col xs="6" sm="3" key={slotIdx} className="text-center">
                        <div className="position-relative">
                          <span 
                            className="position-absolute top-0 start-50 translate-middle badge rounded-circle bg-dark text-white border"
                            style={{ zIndex: 5, width: "22px", height: "22px", fontSize: "11px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {slotIdx + 1}
                          </span>

                          <div 
                            onClick={() => handleOpenSlotModal(slotIdx)}
                            className="rounded-circle d-flex flex-column align-items-center justify-content-center mx-auto my-2 border shadow-sm"
                            style={{
                              width: "75px",
                              height: "75px",
                              backgroundColor: slotData ? "#ffffff" : "#fef3c7",
                              borderColor: slotData ? "#22c55e" : "#f59e0b",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              overflow: "hidden"
                            }}>
                            {slotData ? (
                              <img 
                                src={slotImg} 
                                alt={slotData.title} 
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              />
                            ) : (
                              <span className="fw-bold text-warning" style={{ fontSize: "24px" }}>+</span>
                            )}
                          </div>

                          <div className="fw-bold text-dark text-truncate px-1" style={{ fontSize: "12px" }}>
                            {slotData ? slotData.title : "AJOUTER"}
                          </div>

                          {slotData && (
                            <button
                              onClick={(e) => handleRemoveSlot(e, slotIdx)}
                              className="btn btn-sm btn-link text-danger p-0 text-decoration-none"
                              style={{ fontSize: "11px" }}>
                              ✕ Retirer
                            </button>
                          )}
                        </div>
                      </Col>
                    );
                  })}
                </Row>

                {/* Progress Tracker */}
                <div className="mt-4 pt-2 border-top">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-extrabold text-uppercase text-dark" style={{ fontSize: "11px", letterSpacing: "1px" }}>
                      {selectedCount} SUR 4 SÉLECTIONNÉ
                    </span>
                    <span className="fw-bold text-muted" style={{ fontSize: "11px" }}>
                      {isComplete ? "✓ Pack Complet !" : "Choisissez 4 parfums"}
                    </span>
                  </div>
                  <ProgressBar 
                    now={(selectedCount / 4) * 100} 
                    variant={isComplete ? "success" : "warning"}
                    style={{ height: "8px", borderRadius: "10px" }}
                  />
                </div>
              </div>

              {/* Main Submit Action Button */}
              <Button
                disabled={!isComplete}
                onClick={handleOpenOrderModal}
                className="w-100 py-3 fw-extrabold text-uppercase shadow-lg border-0"
                style={{
                  backgroundColor: isComplete ? "#10b981" : "#94a3b8",
                  fontSize: "18px",
                  borderRadius: "12px",
                  letterSpacing: "0.5px",
                  transition: "all 0.3s ease"
                }}>
                {isComplete ? "💬 Commander Directement sur WhatsApp (200.00 DH)" : `Veuillez sélectionner 4 parfums (${selectedCount}/4)`}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Modal 1 - Select Perfume for Slot */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title style={{ fontSize: "18px", fontWeight: "700" }}>
            Sélectionner le Parfum #{activeSlotIndex !== null ? activeSlotIndex + 1 : ""} du Pack
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "75vh", overflowY: "auto", backgroundColor: "#f8fafc" }} className="p-4">
          
          {/* Category Filter Tabs */}
          <div className="d-flex gap-2 mb-3 flex-wrap justify-content-center">
            <Button 
              variant={activeCategoryTab === 'all' ? 'warning' : 'outline-secondary'} 
              size="sm"
              className="rounded-pill px-3 fw-bold"
              onClick={() => setActiveCategoryTab('all')}>
              🌟 Tous (46+)
            </Button>
            <Button 
              variant={activeCategoryTab === 'cat_homme' ? 'warning' : 'outline-secondary'} 
              size="sm"
              className="rounded-pill px-3 fw-bold"
              onClick={() => setActiveCategoryTab('cat_homme')}>
              👔 Homme
            </Button>
            <Button 
              variant={activeCategoryTab === 'cat_femme' ? 'warning' : 'outline-secondary'} 
              size="sm"
              className="rounded-pill px-3 fw-bold"
              onClick={() => setActiveCategoryTab('cat_femme')}>
              👠 Femme
            </Button>
            <Button 
              variant={activeCategoryTab === 'cat_oriental' ? 'warning' : 'outline-secondary'} 
              size="sm"
              className="rounded-pill px-3 fw-bold"
              onClick={() => setActiveCategoryTab('cat_oriental')}>
              🌙 Parfums Orientaux
            </Button>
          </div>

          {/* Live Search Input */}
          <Form.Control
            type="text"
            placeholder="🔍 Rechercher un parfum par nom (ex: Sauvage, Chanel, Khamrah, Eros...)..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="mb-4 rounded-pill px-3 py-2 border"
            style={{ fontSize: "14px" }}
          />

          <Row className="g-3">
            {filteredPerfumes.length > 0 ? (
              filteredPerfumes.map((perfume) => {
                const perfumeImg = resolvePerfumeImage(perfume.title, perfume.imageCover);

                return (
                  <Col xs="6" sm="4" md="3" key={perfume._id || perfume.title}>
                    <div 
                      onClick={() => handleSelectPerfumeForSlot(perfume)}
                      className="bg-white p-2 rounded-3 border text-center shadow-sm h-100 d-flex flex-column justify-content-between"
                      style={{ cursor: "pointer", transition: "transform 0.2s ease" }}>
                      <div className="overflow-hidden rounded-2 mb-2" style={{ height: "130px", backgroundColor: "#fafafa" }}>
                        <img 
                          src={perfumeImg} 
                          alt={perfume.title}
                          style={{ height: "100%", width: "100%", objectFit: "cover" }}
                          onError={(e) => { e.target.src = imgAkroudGold; }}
                        />
                      </div>
                      <div>
                        <div className="fw-bold text-dark text-truncate" style={{ fontSize: "13px" }}>
                          {perfume.title}
                        </div>
                        <Badge bg="success" className="mt-1" style={{ fontSize: "10px" }}>
                          Inclus f Pack (30ml)
                        </Badge>
                      </div>
                    </div>
                  </Col>
                );
              })
            ) : (
              <div className="text-center w-100 py-4 text-muted">
                Aucun parfum trouvé dans cette catégorie.
              </div>
            )}
          </Row>
        </Modal.Body>
      </Modal>

      {/* Modal 2 - Direct WhatsApp Order Form Modal */}
      <Modal show={showOrderModal} onHide={() => setShowOrderModal(false)} centered size="md">
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title style={{ fontSize: "18px", fontWeight: "700" }}>
            📦 Informations de Livraison (Pack 200 DH)
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4" style={{ backgroundColor: "#ffffff" }}>
          {/* Chosen 4 Perfumes Summary Box */}
          <div className="p-3 mb-4 rounded-3" style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a" }}>
            <span className="fw-bold text-dark d-block mb-1" style={{ fontSize: "13px" }}>
              🎁 Vos 4 Parfums sélectionnés :
            </span>
            <ul className="mb-0 ps-3 small text-dark">
              {selectedSlots.map((p, i) => (
                <li key={i}><strong>{p?.title}</strong> (30ml)</li>
              ))}
            </ul>
            <div className="mt-2 pt-2 border-top border-warning d-flex justify-content-between align-items-center">
              <span className="fw-bold text-dark" style={{ fontSize: "13px" }}>Total à payer :</span>
              <span className="fw-extrabold text-success" style={{ fontSize: "18px" }}>200.00 DH (Livraison Gratuite)</span>
            </div>
          </div>

          {/* Form */}
          <Form onSubmit={handleConfirmOrderWhatsApp}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-dark small">Nom Complet (الاسم الكامل) *</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ex: Mohamed Alami" 
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required 
                style={{ borderRadius: "8px", padding: "10px" }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-dark small">Ville (المدينة) *</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ex: Casablanca, Rabat, Marrakech, Fès..." 
                value={customerCity}
                onChange={(e) => setCustomerCity(e.target.value)}
                required 
                style={{ borderRadius: "8px", padding: "10px" }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-dark small">Adresse de livraison (العنوان) *</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ex: Rue 12, Quartier..." 
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                required 
                style={{ borderRadius: "8px", padding: "10px" }}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold text-dark small">Téléphone (رقم الهاتف) *</Form.Label>
              <Form.Control 
                type="tel" 
                placeholder="Ex: 0612345678" 
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                required 
                style={{ borderRadius: "8px", padding: "10px" }}
              />
            </Form.Group>

            <Button 
              type="submit" 
              className="w-100 py-3 fw-extrabold text-uppercase border-0 shadow"
              style={{ backgroundColor: "#25D366", color: "#ffffff", borderRadius: "10px", fontSize: "16px", letterSpacing: "0.5px" }}>
              💬 Valider et Envoyer la commande sur WhatsApp →
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PackBuilder;
