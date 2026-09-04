import React from 'react';

const AnnouncementBar = () => {
  const marqueeItems = [
    "🔥 PACK 4 PARFUMS À 200 DH SEULEMENT",
    "🚚 LIVRAISON OFFERTE DÈS 200 DH",
    "📦 PAIEMENT À LA LIVRAISON DANS TOUT LE MAROC",
    "✨ PARFUMS DE LUXE 30 ML À 50 DH SEULEMENT",
    "🇲🇦 LIVRAISON PARTOUT AU MAROC (24h - 48h)",
  ];

  const fullText = marqueeItems.join("  ✦  ") + "  ✦  ";

  return (
    <div className="announcement-bar-container">
      <div className="announcement-bar-track">
        <span className="announcement-bar-text">{fullText}</span>
        <span className="announcement-bar-text">{fullText}</span>
        <span className="announcement-bar-text">{fullText}</span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
