import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import defaultImg from '../../images/dwa2.png';

const CategoryCard = ({ id, background, img, title }) => {
    // Determine image src: use Data URL, full URL, or default image
    const getImageSrc = () => {
        if (!img) return defaultImg;
        if (img.startsWith('data:') || img.startsWith('http')) return img;
        return defaultImg;
    };

    const catParam = id || title || "";

    return (
        <Col
            xs="6"
            sm="6"
            md="4"
            lg="2"
            className="my-3 d-flex justify-content-center align-items-center">
            <Link to={`/products?category=${encodeURIComponent(catParam)}`} style={{ textDecoration: 'none', width: '100%' }}>
                <div className="allCard mb-2 w-100 text-center" style={{ cursor: 'pointer', transition: 'transform 0.2s ease' }}>
                    <div
                        className="categoty-card mx-auto"
                        style={{ backgroundColor: `${background || '#F4DBA4'}` }}></div>
                    <img 
                        alt={title || "category"} 
                        src={getImageSrc()} 
                        onError={(e) => { e.target.src = defaultImg; }}
                        className="categoty-card-img" 
                    />
                    <p className="categoty-card-text my-2 text-truncate" style={{ fontSize: "14px", fontWeight: "700", color: "#2c3e50" }}>
                        {title}
                    </p>
                </div>
            </Link>
        </Col>
    );
};

export default CategoryCard;
