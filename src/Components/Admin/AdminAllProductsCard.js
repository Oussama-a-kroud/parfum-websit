import React, { useState } from 'react';
import { Col, Card, Row, Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import baseUrl from '../../Api/baseURL';

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

    // Default Fallback Image for any unlisted perfume: AKROUD Gold Bottle!
    return imgAkroudGold;
};

const AdminAllProductsCard = ({ item, onDelete }) => {
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    if (!item) return null;

    const handleDelete = async () => {
        try {
            setLoadingDelete(true);
            await baseUrl.delete(`/api/v1/products/${item._id}`);
            setLoadingDelete(false);
            setShowDeleteModal(false);
            if (onDelete) onDelete(item._id);
        } catch (err) {
            console.error("Error deleting product:", err);
            setLoadingDelete(false);
            setShowDeleteModal(false);
            if (onDelete) onDelete(item._id);
        }
    };

    const imageUrl = resolvePerfumeImage(item.title, item.imageCover);

    return (
        <Col xs="12" sm="6" md="5" lg="4" className="d-flex">
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmer la suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>Voulez-vous vraiment supprimer ce produit "{item.title}" ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Annuler
                    </Button>
                    <Button variant="danger" onClick={handleDelete} disabled={loadingDelete}>
                        {loadingDelete ? "Suppression..." : "Supprimer"}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Card
                className="my-2"
                style={{
                    width: "100%",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                }}>
                <Row className="d-flex justify-content-center px-2 pt-2">
                    <Col className="d-flex justify-content-between">
                        <div 
                            onClick={() => setShowDeleteModal(true)}
                            className="d-inline item-delete-edit text-danger" 
                            style={{ cursor: "pointer", fontWeight: "bold" }}>
                            supprimer
                        </div>
                        <div 
                            onClick={() => navigate(`/admin/editproduct/${item._id}`)}
                            className="d-inline item-delete-edit text-primary" 
                            style={{ cursor: "pointer", fontWeight: "bold" }}>
                            modifier
                        </div>
                    </Col>
                </Row>
                <Link to={`/products/${item._id}`} style={{ textDecoration: "none" }}>
                    <Card.Img 
                        style={{ height: "200px", width: "100%", objectFit: "contain", padding: "10px" }} 
                        src={imageUrl} 
                        onError={(e) => { e.target.src = imgAkroudGold; }}
                    />
                    <Card.Body>
                        <Card.Title>
                            <div className="card-title text-truncate" style={{ fontSize: "16px", fontWeight: "600", color: "#333" }}>
                                {item.title || "Nom du produit"}
                            </div>
                        </Card.Title>
                        <Card.Text>
                            <div className="d-flex justify-content-between align-items-center mt-2">
                                <div className="card-rate">⭐ {item.ratingsAverage || 4.5}</div>
                                <div className="d-flex align-items-center">
                                    <div className="card-price" style={{ fontSize: "18px", fontWeight: "bold", color: "#16a34a" }}>
                                        {item.price || 50}
                                    </div>
                                    <div className="card-currency mx-1 fw-bold" style={{ color: "#16a34a" }}>DH</div>
                                </div>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Link>
            </Card>
        </Col>
    );
};

export default AdminAllProductsCard;
