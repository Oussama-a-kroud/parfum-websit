import React, { useState, useEffect } from 'react';
import { Container, Spinner, Breadcrumb } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import CategoryHeader from '../../Components/Category/CategoryHeader';
import CardProductsContainer from '../../Components/Products/CardProductsContainer';
import ProductDetails from '../../Components/Products/ProductDetails';
import RateContainer from '../../Components/Rate/RateContainer';
import baseUrl from '../../Api/baseURL';

// Import all 25 uploaded AKROUD PARFUM custom images for image resolution
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

const ProductDetalisPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await baseUrl.get(`/api/v1/products/${id}`);
                const data = res.data?.data || res.data;
                if (data) {
                    setItem(data);
                } else {
                    setItem(null);
                }
            } catch (err) {
                console.error("Error fetching product details:", err);
                // Fallback demo product if backend ID not found
                setItem({
                    _id: id,
                    title: "Sauvage Dior (AKROUD PARFUM)",
                    price: 50,
                    ratingsAverage: 4.8,
                    description: "Un parfum captivant et puissant. Une fraîcheur extrême mariée à des notes boisées et épicées intenses dans votre flacon signature AKROUD PARFUM."
                });
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const imgUrl = resolvePerfumeImage(item?.title, item?.imageCover);

    return (
        <div style={{ minHeight: '670px', backgroundColor: '#f8fafc' }} className="pb-5">
            <CategoryHeader />
            <Container className="pt-3">
                {/* Breadcrumbs */}
                <Breadcrumb className="my-2">
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
                        Accueil
                    </Breadcrumb.Item>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/products" }}>
                        Boutique Parfums
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        {item?.title || "Détails du Parfum"}
                    </Breadcrumb.Item>
                </Breadcrumb>

                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" variant="warning" />
                        <p className="mt-2 text-muted fw-bold">Chargement des détails du parfum...</p>
                    </div>
                ) : (
                    <>
                        <ProductDetails item={item} imgUrl={imgUrl} />
                        <div className="my-4">
                            <RateContainer />
                        </div>
                        <div className="my-5">
                            <CardProductsContainer title="Vous Aimerez Aussi (Sélection 50 DH)" pathText="/products" />
                        </div>
                    </>
                )}
            </Container>
        </div>
    );
};

export default ProductDetalisPage;
