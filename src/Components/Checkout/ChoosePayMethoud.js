import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, Badge, Modal, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "../../Api/baseURL";
import imgAkroudGold from "../../images/akroud_gold_bottle.png";

const ChoosePayMethoud = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Payment Method State: 'cod' (Cash on Delivery), 'whatsapp', or 'card'
  const [paymentMethod, setPaymentMethod] = useState('cod');



  // Coupon Code State
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');

  // Order Success Modal State
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  // Load Cart Items from LocalStorage
  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
      setCartItems(items);

      // Pre-fill user data if logged in or stored in profile
      const user = JSON.parse(localStorage.getItem('userProfile') || '{}');
      if (user.name) setName(user.name);
      if (user.phone) setPhone(user.phone);
      if (user.city) setCity(user.city);
      if (user.address) setAddress(user.address);
    } catch (e) {
      console.error("Error reading cart items:", e);
    }
  }, []);

  // Calculate Subtotal & Total
  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price || 50) * Number(item.quantity || 1)), 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingFee = subtotal >= 200 || subtotal === 0 ? 0 : 30;
  const totalPrice = Math.max(0, subtotal - discountAmount + shippingFee);

  // Apply Coupon Code
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode) return;

    const code = couponCode.trim().toUpperCase();
    if (code === 'AKROUD10' || code === 'PACK200' || code === 'PROMO10') {
      setDiscountPercent(10);
      setCouponMsg('✓ Code promo (-10%) appliqué avec succès !');
    } else {
      setCouponMsg('❌ Code promo non valide.');
      setDiscountPercent(0);
    }
  };

  // Submit Order & Process Payment
  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Votre panier est vide ! Veuillez ajouter des produits avant de commander.");
      return;
    }

    if (!name || !phone || !city || !address) {
      alert("Veuillez remplir tous les champs de livraison obligatoires (*)");
      return;
    }



    setLoading(true);

    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    const orderData = {
      _id: orderId,
      id: orderId,
      user: { name, phone, city, address, notes },
      cartItems: cartItems.map(item => ({
        _id: item._id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        imageCover: item.imageCover
      })),
      totalOrderPrice: totalPrice,
      paymentMethodType: paymentMethod === 'cod' ? 'Paiement à la livraison' : paymentMethod === 'whatsapp' ? 'WhatsApp' : 'Carte Bancaire',
      isPaid: paymentMethod === 'card',
      isDelivered: false,
      status: 'En cours',
      createdAt: new Date().toISOString()
    };

    try {
      // 1. Save order to LocalStorage history
      const existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
      existingOrders.unshift(orderData);
      localStorage.setItem('userOrders', JSON.stringify(existingOrders));

      // 2. Post order to backend API if available
      try {
        await baseUrl.post('/api/v1/orders', orderData);
      } catch (err) {
        console.log("Backend offline log:", err);
      }

      // 3. Handle WhatsApp redirect if selected
      if (paymentMethod === 'whatsapp') {
        const perfumesListText = cartItems
          .map((item, idx) => `${idx + 1}. *${item.title}* (${item.quantity}x ${item.price} DH)`)
          .join('\n');

        const message = `🌸 *NOUVELLE COMMANDE (AKROUD PARFUM)* 🌸\n\n` +
          `📜 *N° de Commande:* ${orderId}\n\n` +
          `🛍️ *Produits Commandés:*\n${perfumesListText}\n\n` +
          `👤 *Informations de Livraison:*\n` +
          `• *Nom:* ${name}\n` +
          `• *Ville:* ${city}\n` +
          `• *Adresse:* ${address}\n` +
          `• *Téléphone:* ${phone}\n` +
          (notes ? `• *Notes:* ${notes}\n` : '') +
          `\n💰 *Total à Payer:* ${totalPrice}.00 DH (Livraison Gratuite)`;

        const whatsappUrl = `https://wa.me/212666050879?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      }

      // 4. Clear Cart
      localStorage.removeItem('cartItems');
      window.dispatchEvent(new Event('cartUpdated'));

      setCreatedOrder(orderData);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Une erreur est survenue lors de la validation. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-4" style={{ backgroundColor: "#f8fafc", minHeight: "80vh" }}>
      {/* Breadcrumb */}
      <div className="text-uppercase mb-4" style={{ fontSize: "12px", letterSpacing: "1px", color: "#64748b" }}>
        <Link to="/" className="text-decoration-none text-secondary">ACCUEIL</Link> / <Link to="/cart" className="text-decoration-none text-secondary">PANIER</Link> / <span className="fw-bold text-dark">COMMANDER & PAIEMENT</span>
      </div>

      <h2 className="fw-extrabold text-dark mb-4" style={{ fontSize: "28px", letterSpacing: "-0.5px" }}>
        💳 Valider la commande & Mode de Paiement
      </h2>

      <Row className="g-4">
        {/* Left Column - Shipping Info & Payment Methods */}
        <Col lg="7" md="12">
          <Form onSubmit={handleSubmitOrder}>
            {/* Step 1: Customer & Delivery Info */}
            <Card className="border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
              <h5 className="fw-extrabold text-dark mb-3 d-flex align-items-center gap-2" style={{ fontSize: "18px" }}>
                <span>📦 1. Adresse de Livraison</span>
              </h5>

              <Row className="g-3">
                <Col md="6">
                  <Form.Group>
                    <Form.Label className="fw-bold small text-dark">Nom Complet (الاسم الكامل) *</Form.Label>
                    <Form.Control 
                      type="text"
                      placeholder="Ex: Oussama Akroud"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="py-2"
                      style={{ borderRadius: "8px" }}
                    />
                  </Form.Group>
                </Col>

                <Col md="6">
                  <Form.Group>
                    <Form.Label className="fw-bold small text-dark">Téléphone (رقم الهاتف) *</Form.Label>
                    <Form.Control 
                      type="tel"
                      placeholder="Ex: 0666050879"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="py-2"
                      style={{ borderRadius: "8px" }}
                    />
                  </Form.Group>
                </Col>

                <Col md="6">
                  <Form.Group>
                    <Form.Label className="fw-bold small text-dark">Ville (المدينة) *</Form.Label>
                    <Form.Control 
                      type="text"
                      placeholder="Ex: Casablanca, Rabat, Marrakech, Fès..."
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="py-2"
                      style={{ borderRadius: "8px" }}
                    />
                  </Form.Group>
                </Col>

                <Col md="6">
                  <Form.Group>
                    <Form.Label className="fw-bold small text-dark">Adresse complète (العنوان) *</Form.Label>
                    <Form.Control 
                      type="text"
                      placeholder="Ex: Rue 14, Quartier..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="py-2"
                      style={{ borderRadius: "8px" }}
                    />
                  </Form.Group>
                </Col>

                <Col xs="12">
                  <Form.Group>
                    <Form.Label className="fw-bold small text-dark">Notes / Instructions de livraison (ملاحظات إضافية)</Form.Label>
                    <Form.Control 
                      as="textarea"
                      rows={2}
                      placeholder="Ex: Livraison après 15h, s'il vous plaît..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      style={{ borderRadius: "8px" }}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card>

            {/* Step 2: Payment Method Selection */}
            <Card className="border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
              <h5 className="fw-extrabold text-dark mb-3 d-flex align-items-center gap-2" style={{ fontSize: "18px" }}>
                <span>💳 2. Choisissez le Mode de Paiement</span>
              </h5>

              {/* Payment Option 1: Cash on Delivery */}
              <div 
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 mb-3 rounded-3 border ${paymentMethod === 'cod' ? 'border-warning bg-warning bg-opacity-10' : 'bg-light'}`}
                style={{ cursor: "pointer", transition: "all 0.2s ease" }}>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <Form.Check 
                      type="radio" 
                      name="paymentGroup" 
                      id="payCOD" 
                      checked={paymentMethod === 'cod'} 
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <div>
                      <h6 className="fw-extrabold text-dark mb-0" style={{ fontSize: "15px" }}>
                        💵 Paiement à la Livraison (Cash on Delivery)
                      </h6>
                      <small className="text-muted" style={{ fontSize: "12px" }}>
                        Payer en espèces à la réception de votre colis. 100% sécurisé partout au Maroc 🇲🇦
                      </small>
                    </div>
                  </div>
                  <Badge bg="success" style={{ fontSize: "11px" }}>Recommandé</Badge>
                </div>
              </div>

              {/* Payment Option 2: WhatsApp Order */}
              <div 
                onClick={() => setPaymentMethod('whatsapp')}
                className={`p-3 mb-3 rounded-3 border ${paymentMethod === 'whatsapp' ? 'border-success bg-success bg-opacity-10' : 'bg-light'}`}
                style={{ cursor: "pointer", transition: "all 0.2s ease" }}>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <Form.Check 
                      type="radio" 
                      name="paymentGroup" 
                      id="payWA" 
                      checked={paymentMethod === 'whatsapp'} 
                      onChange={() => setPaymentMethod('whatsapp')}
                    />
                    <div>
                      <h6 className="fw-extrabold text-dark mb-0" style={{ fontSize: "15px" }}>
                        💬 Commander Directement via WhatsApp
                      </h6>
                      <small className="text-muted" style={{ fontSize: "12px" }}>
                        Transmettre directement votre récapitulatif sur notre WhatsApp VIP (06 66 05 08 79)
                      </small>
                    </div>
                  </div>
                  <Badge bg="success" style={{ fontSize: "11px" }}>Instant</Badge>
                </div>
              </div>


            </Card>

            {/* Submit Action Button */}
            <Button
              type="submit"
              disabled={loading || cartItems.length === 0}
              className="w-100 py-3 fw-extrabold text-uppercase shadow-lg border-0 mb-4"
              style={{
                backgroundColor: paymentMethod === 'whatsapp' ? '#25D366' : '#16a34a',
                color: '#ffffff',
                fontSize: '18px',
                borderRadius: '12px',
                letterSpacing: '0.5px'
              }}>
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : paymentMethod === 'whatsapp' ? (
                `💬 Valider et Envoyer sur WhatsApp (${totalPrice}.00 DH)`
              ) : (
                `🛍️ Valider la Commande (${totalPrice}.00 DH)`
              )}
            </Button>
          </Form>
        </Col>

        {/* Right Column - Order Summary Box */}
        <Col lg="5" md="12">
          <Card className="border-0 shadow-sm rounded-4 p-4 bg-white sticky-top" style={{ top: "90px" }}>
            <h5 className="fw-extrabold text-dark mb-3" style={{ fontSize: "18px" }}>
              🛒 Récapitulatif de la Commande ({cartItems.length})
            </h5>

            {/* Cart Items List */}
            <div className="mb-3" style={{ maxHeight: "280px", overflowY: "auto" }}>
              {cartItems.length > 0 ? (
                cartItems.map((item, idx) => (
                  <div key={idx} className="d-flex align-items-center justify-content-between py-2 border-bottom">
                    <div className="d-flex align-items-center gap-3">
                      <img 
                        src={item.imageCover || imgAkroudGold} 
                        alt={item.title} 
                        style={{ width: "45px", height: "45px", objectFit: "cover", borderRadius: "8px" }} 
                        onError={(e) => { e.target.src = imgAkroudGold; }}
                      />
                      <div>
                        <h6 className="fw-bold text-dark mb-0 text-truncate" style={{ fontSize: "14px", maxWidth: "160px" }}>
                          {item.title}
                        </h6>
                        <small className="text-muted" style={{ fontSize: "12px" }}>
                          Quantité : {item.quantity || 1} x {item.price || 50} DH
                        </small>
                      </div>
                    </div>
                    <span className="fw-extrabold text-dark" style={{ fontSize: "15px" }}>
                      {(Number(item.price || 50) * Number(item.quantity || 1)).toFixed(2)} DH
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-muted text-center py-4">Votre panier est vide.</div>
              )}
            </div>

            {/* Coupon Code Section */}
            <Form onSubmit={handleApplyCoupon} className="mb-3">
              <div className="d-flex gap-2">
                <Form.Control 
                  type="text" 
                  placeholder="Code promo (ex: AKROUD10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{ borderRadius: "8px", fontSize: "13px" }}
                />
                <Button type="submit" variant="dark" style={{ borderRadius: "8px", fontSize: "13px" }}>
                  Appliquer
                </Button>
              </div>
              {couponMsg && (
                <small className={`d-block mt-1 fw-bold ${discountPercent > 0 ? 'text-success' : 'text-danger'}`} style={{ fontSize: "12px" }}>
                  {couponMsg}
                </small>
              )}
            </Form>

            {/* Price Calculations Breakdown */}
            <div className="pt-2 border-top">
              <div className="d-flex justify-content-between my-2 text-muted" style={{ fontSize: "14px" }}>
                <span>Sous-total :</span>
                <span>{subtotal.toFixed(2)} DH</span>
              </div>

              {discountAmount > 0 && (
                <div className="d-flex justify-content-between my-2 text-success" style={{ fontSize: "14px" }}>
                  <span>Réduction Code Promo (-10%) :</span>
                  <span>-{discountAmount.toFixed(2)} DH</span>
                </div>
              )}

              <div className="d-flex justify-content-between my-2 text-muted" style={{ fontSize: "14px" }}>
                <span>Frais de livraison :</span>
                <span className="text-success fw-bold">
                  {shippingFee === 0 ? "GRATUIT 🇲🇦" : `${shippingFee}.00 DH`}
                </span>
              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-center my-2">
                <span className="fw-black text-dark" style={{ fontSize: "18px" }}>Total Général :</span>
                <span className="fw-black text-success" style={{ fontSize: "24px" }}>
                  {totalPrice.toFixed(2)} DH
                </span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Order Success Confirmation Modal */}
      <Modal show={showSuccessModal} onHide={() => navigate('/user/allorders')} centered size="md">
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title style={{ fontSize: "18px", fontWeight: "700" }}>
            🎉 Commande Enregistrée avec Succès !
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center p-4">
          <span style={{ fontSize: "50px" }} className="d-block mb-2">📦</span>
          <h4 className="fw-extrabold text-dark mb-2">Merci pour votre confiance !</h4>
          <p className="text-muted small mb-3">
            Votre commande <strong className="text-dark">#{createdOrder?._id}</strong> a été enregistrée avec succès. Notre équipe vous contactera par téléphone pour la confirmation et l'expédition.
          </p>

          <div className="p-3 mb-4 rounded-3 text-start bg-light border">
            <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
              <span className="fw-bold small">Client :</span>
              <span className="small">{createdOrder?.user?.name} ({createdOrder?.user?.phone})</span>
            </div>
            <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
              <span className="fw-bold small">Adresse :</span>
              <span className="small">{createdOrder?.user?.address}, {createdOrder?.user?.city}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="fw-bold small">Montant Total :</span>
              <span className="fw-bold text-success">{createdOrder?.totalOrderPrice}.00 DH ({createdOrder?.paymentMethodType})</span>
            </div>
          </div>

          <div className="d-flex gap-2">
            <Button 
              variant="success" 
              className="w-100 py-2 fw-bold"
              style={{ borderRadius: "8px" }}
              onClick={() => navigate('/user/allorders')}>
              📦 Suivre mes Commandes
            </Button>
            <Button 
              variant="outline-dark" 
              className="w-100 py-2 fw-bold"
              style={{ borderRadius: "8px" }}
              onClick={() => navigate('/')}>
              🏠 Retour à l'accueil
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ChoosePayMethoud;
