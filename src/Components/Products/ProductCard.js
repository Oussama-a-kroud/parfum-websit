import React, { useState, useEffect } from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import favoff from "../../images/fav-off.png";
import favon from "../../images/fav-on.png";

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

    // 1. Direct Base64 data URLs uploaded by user in admin panel
    if (imageCover && typeof imageCover === 'string' && imageCover.startsWith('data:')) {
        return imageCover;
    }

    // 2. Specific Perfume Title Matches
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

    // 3. Official Default Fallback Image: AKROUD Gold Bottle!
    return imgAkroudGold;
};

const ProductCard = ({ item }) => {
    const title = item?.title || "Parfum AKROUD";
    const price = item?.price || 50;
    const id = item?._id || ":id";
    const imgUrl = resolvePerfumeImage(title, item?.imageCover);

    const [isFav, setIsFav] = useState(false);
    const [addedToast, setAddedToast] = useState(false);

    // Read initial favorite state
    useEffect(() => {
        try {
            const favs = JSON.parse(localStorage.getItem('favItems') || '[]');
            setIsFav(favs.some(f => f._id === id || f.title === title));
        } catch (e) {
            console.error("Error reading favorites:", e);
        }
    }, [id, title]);

    // Handle heart click -> Toggle Favorite
    const handleFavClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const favs = JSON.parse(localStorage.getItem('favItems') || '[]');
            const index = favs.findIndex(f => f._id === id || f.title === title);

            if (index > -1) {
                favs.splice(index, 1);
                setIsFav(false);
            } else {
                favs.push({ _id: id, title, price, imageCover: imgUrl });
                setIsFav(true);
            }

            localStorage.setItem('favItems', JSON.stringify(favs));
            window.dispatchEvent(new Event('favUpdated'));
        } catch (err) {
            console.error("Error toggling favorite:", err);
        }
    };

    // Handle plus button click -> Add to cart
    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

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
            window.dispatchEvent(new Event('cartUpdated'));

            setAddedToast(true);
            setTimeout(() => setAddedToast(false), 2000);
        } catch (err) {
            console.error("Error adding to cart:", err);
        }
    };

    // Format title: "TYPE BLEU CHANEL", "TYPE SAUVAGE DIOR", etc.
    const rawTitleUpper = title.toUpperCase();
    const displayTitle = rawTitleUpper.startsWith("TYPE") ? rawTitleUpper : `TYPE ${rawTitleUpper}`;

    // Format category subtitle
    const isFemme = (item?.category === 'cat_femme' || title.toLowerCase().includes("femme") || title.toLowerCase().includes("belle") || title.toLowerCase().includes("flora") || title.toLowerCase().includes("yara") || title.toLowerCase().includes("impératrice"));
    const categorySubtitle = isFemme ? "PARFUM FEMME" : "PARFUM HOMME";

    return (
        <Col xs="6" sm="6" md="4" lg="3" className="d-flex position-relative mb-4">
            {addedToast && (
                <div 
                    className="position-absolute bg-dark text-white px-3 py-1 rounded-pill shadow"
                    style={{ top: "12px", left: "50%", transform: "translateX(-50%)", zIndex: 100, fontSize: "12px", whiteSpace: "nowrap" }}>
                    🛒 Ajouté au panier (50.00 dh) !
                </div>
            )}

            <Card
                className="my-2 product-card-hover overflow-hidden w-100"
                style={{
                    borderRadius: "22px",
                    backgroundColor: "#FFFFFF",
                    border: "1.5px solid rgba(217, 119, 6, 0.35)",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
                    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease"
                }}>
                
                {/* Image Flush to Top, Left & Right Edges */}
                <Link to={`/products/${id}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <div 
                        className="w-100 overflow-hidden position-relative"
                        style={{ 
                            height: "270px", 
                            backgroundColor: "#f8fafc"
                        }}>
                        <img 
                            src={imgUrl} 
                            alt={title}
                            style={{ 
                                width: "100%", 
                                height: "100%", 
                                objectFit: "cover",
                                objectPosition: "center",
                                display: "block" 
                            }} 
                            onError={(e) => { e.target.src = imgAkroudGold; }}
                        />

                        {/* Top-Right Favorite Heart Badge */}
                        <button
                            onClick={handleFavClick}
                            title={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
                            className="position-absolute border-0 d-flex align-items-center justify-content-center shadow-sm"
                            style={{
                                top: "12px",
                                right: "12px",
                                width: "34px",
                                height: "34px",
                                borderRadius: "50%",
                                backgroundColor: "rgba(255, 255, 255, 0.92)",
                                backdropFilter: "blur(4px)",
                                cursor: "pointer",
                                transition: "transform 0.2s ease",
                                zIndex: 5
                            }}>
                            <img
                                src={isFav ? favon : favoff}
                                alt="favorite"
                                style={{ height: "18px", width: "18px" }}
                            />
                        </button>
                    </div>
                </Link>

                {/* Content Section Below Image */}
                <Card.Body className="p-3 d-flex flex-column justify-content-between">
                    <div>
                        {/* Subtitle Badge (PARFUM HOMME / PARFUM FEMME) */}
                        <span 
                            className="fw-bold text-uppercase d-block mb-1" 
                            style={{ fontSize: "12px", color: "#b45309", letterSpacing: "1px", fontWeight: "700" }}>
                            {categorySubtitle}
                        </span>

                        {/* Title */}
                        <Link to={`/products/${id}`} style={{ textDecoration: 'none' }}>
                            <div 
                                className="fw-black text-truncate mb-3" 
                                style={{ fontSize: "16px", fontWeight: "900", color: "#000000", lineHeight: "1.2", letterSpacing: "-0.2px" }}>
                                {displayTitle}
                            </div>
                        </Link>
                    </div>

                    {/* Divider Line */}
                    <div style={{ borderTop: "1px solid #e2e8f0", margin: "4px 0 12px 0" }}></div>

                    {/* Bottom Row: Price & Plus Button */}
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="fw-black" style={{ fontSize: "20px", color: "#000000", fontWeight: "900" }}>
                            {Number(price).toFixed(2)} <span style={{ fontSize: "16px", fontWeight: "800" }}>dh</span>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            title="Ajouter au panier"
                            className="border-0 bg-transparent p-0 d-flex align-items-center justify-content-center"
                            style={{
                                cursor: "pointer",
                                fontSize: "24px",
                                fontWeight: "700",
                                color: "#000000",
                                lineHeight: "1",
                                width: "32px",
                                height: "32px",
                                transition: "transform 0.2s ease"
                            }}>
                            +
                        </button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default ProductCard;
