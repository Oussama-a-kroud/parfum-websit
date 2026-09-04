import React, { useState, useEffect } from 'react';
import { Button, Badge } from 'react-bootstrap';
import favoff from "../../images/fav-off.png";
import favon from "../../images/fav-on.png";
import rate from "../../images/ultramal.png";

const ProductText = ({ item, imgUrl }) => {
  const title = item?.title || "Parfum de Luxe AKROUD";
  const price = item?.price || 50;
  const rating = item?.ratingsAverage || 4.8;
  const id = item?._id || "1";
  const categoryName = item?.category?.name || "Haute Parfumerie";
  const brandName = item?.brand?.name || "AKROUD PARFUM";
  const description = item?.description || "Une fragrance envoûtante de haute parfumerie. Élaborée avec des essences précieuses et concentrées pour une tenue exceptionnelle et un sillage irrésistible tout au long de la journée.";

  const [isFav, setIsFav] = useState(false);
  const [addedToast, setAddedToast] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("30 ml");

  useEffect(() => {
    try {
      const currentCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const exists = currentCart.some(c => c._id === id);
      setIsFav(exists);
    } catch (e) {
      console.error("Error reading cart:", e);
    }
  }, [id]);

  const handleAddToCart = () => {
    try {
      const currentCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const existingIndex = currentCart.findIndex(c => c._id === id);

      if (existingIndex > -1) {
        currentCart[existingIndex].quantity = (currentCart[existingIndex].quantity || 1) + 1;
      } else {
        currentCart.push({
          _id: id,
          title: title,
          price: Number(price),
          imageCover: imgUrl,
          quantity: 1
        });
      }

      localStorage.setItem('cartItems', JSON.stringify(currentCart));
      setIsFav(true);
      window.dispatchEvent(new Event('cartUpdated'));

      setAddedToast(true);
      setTimeout(() => setAddedToast(false), 2500);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const whatsappMessage = encodeURIComponent(`Bonjour AKROUD PARFUM, je souhaite commander le parfum "${title}" à ${price} DH.`);

  return (
    <div className="p-4 bg-white rounded-3 shadow-sm border position-relative">
      {addedToast && (
        <div 
          className="position-absolute bg-dark text-white px-3 py-2 rounded-pill shadow-lg"
          style={{ top: "15px", right: "20px", zIndex: 100, fontSize: "13px", fontWeight: "600" }}>
          🛒 Produit ajouté au panier ({price} DH) !
        </div>
      )}

      {/* Category & Brand Badges */}
      <div className="d-flex align-items-center mb-2">
        <Badge bg="warning" text="dark" className="me-2 px-3 py-2 rounded-pill" style={{ fontSize: "11px", fontWeight: "700" }}>
          {categoryName.toUpperCase()}
        </Badge>
        <span className="text-muted fw-bold" style={{ fontSize: "13px" }}>
          {brandName}
        </span>
      </div>

      {/* Title & Rating */}
      <h2 className="fw-extrabold mb-2" style={{ color: "#0f172a", fontSize: "28px" }}>
        {title}
      </h2>

      <div className="d-flex align-items-center mb-3">
        <img src={rate} alt="star rating" height="18" width="18" className="me-1" />
        <span className="fw-bold me-2" style={{ color: "#d97706", fontSize: "15px" }}>{rating}</span>
        <span className="text-muted" style={{ fontSize: "13px" }}>(48 avis vérifiés)</span>
        <span className="ms-auto text-success fw-bold" style={{ fontSize: "13px" }}>
          ✓ En Stock (Livraison 24h/48h)
        </span>
      </div>

      <hr style={{ opacity: 0.1 }} />

      {/* Price Section */}
      <div className="my-3 p-3 rounded-3" style={{ backgroundColor: "#f8fafc", borderLeft: "4px solid #16a34a" }}>
        <div className="d-flex align-items-baseline">
          <span className="fw-extrabold text-success" style={{ fontSize: "32px" }}>{price}</span>
          <span className="fw-bold text-success ms-1 me-3" style={{ fontSize: "20px" }}>DH</span>
          <span className="text-decoration-line-through text-muted me-2" style={{ fontSize: "16px" }}>120 DH</span>
          <Badge bg="danger" className="px-2 py-1" style={{ fontSize: "12px" }}>-58% PROMO</Badge>
        </div>
        <small className="text-muted d-block mt-1">Prix TTC • Paiement à la livraison (COD) partout au Maroc</small>
      </div>

      {/* Format Selector */}
      <div className="my-3">
        <label className="fw-bold d-block mb-2" style={{ fontSize: "14px", color: "#334155" }}>
          Contenance / Format :
        </label>
        <div className="d-flex gap-2">
          {["30 ml"].map((format) => (
            <button
              key={format}
              onClick={() => setSelectedFormat(format)}
              className={`btn btn-sm px-3 py-2 fw-bold rounded-pill ${selectedFormat === format ? 'btn-dark text-warning' : 'btn-outline-secondary'}`}
              style={{ fontSize: "13px" }}>
              ✨ {format} — (Flacon Signature)
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="my-3">
        <h6 className="fw-bold text-dark mb-1" style={{ fontSize: "15px" }}>Description du Parfum :</h6>
        <p className="text-secondary" style={{ fontSize: "14px", lineHeight: "1.6" }}>
          {description}
        </p>
      </div>

      {/* Olfactory Notes Info */}
      <div className="my-3 p-3 rounded-3" style={{ backgroundColor: "#fafafa", fontSize: "13px" }}>
        <div className="row g-2 text-muted">
          <div className="col-4"><strong>Concentration :</strong> Extrait de Parfum</div>
          <div className="col-4"><strong>Tenue :</strong> + 24 Heures</div>
          <div className="col-4"><strong>Origine :</strong> Grasse, France</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 d-flex flex-column flex-sm-row gap-2">
        <Button
          onClick={handleAddToCart}
          className="btn-success btn-lg fw-bold flex-grow-1 py-3 border-0 shadow-sm"
          style={{ backgroundColor: "#16a34a", fontSize: "16px", borderRadius: "10px" }}>
          🛒 Ajouter au Panier ({price} DH)
        </Button>

        <a
          href={`https://wa.me/?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-dark btn-lg fw-bold py-3 px-4 d-flex align-items-center justify-content-center gap-2"
          style={{ fontSize: "15px", borderRadius: "10px" }}>
          💬 Commander sur WhatsApp
        </a>

        <Button
          onClick={handleAddToCart}
          variant={isFav ? "light" : "outline-secondary"}
          className="py-3 px-3 border"
          style={{ borderRadius: "10px" }}>
          <img src={isFav ? favon : favoff} alt="fav" width="22" height="22" />
        </Button>
      </div>

      {/* Guarantees Footer */}
      <div className="mt-4 pt-3 border-top d-flex justify-content-between text-muted text-center" style={{ fontSize: "12px" }}>
        <div>🚚 <strong>Livraison Rapide</strong><br />Partout au Maroc</div>
        <div>💵 <strong>Paiement à la Livraison</strong><br />Espèces à la réception</div>
        <div>💎 <strong>100% Satisfait</strong><br />Qualité haute tenue</div>
      </div>
    </div>
  );
};

export default ProductText;
