import React from 'react';
import { Row, Col } from 'react-bootstrap';
import defaultProductImg from '../../images/item.png';

const UserAllOrderCard = ({ item }) => {
    if (!item) return null;

    const imgSrc = item.imageCover && item.imageCover !== 'default-product.png' ? item.imageCover : defaultProductImg;

    return (
        <div className="py-2 border-bottom">
            <Row className="d-flex align-items-center">
                <Col xs="3" md="2" className="d-flex justify-content-start">
                    <img 
                        width="80px" 
                        height="95px" 
                        src={imgSrc} 
                        alt={item.title || "Parfum"} 
                        style={{ objectFit: 'cover', borderRadius: '8px' }} 
                    />
                </Col>
                <Col xs="9" md="10">
                    <div className="fw-bold fs-6 text-dark">
                        {item.title || "Parfum AKROUD"}
                    </div>
                    <div className="text-muted small mt-1">
                        Quantité: <span className="fw-bold text-dark">{item.quantity || 1}</span> | Prix unitaire: <span className="fw-bold text-warning">{item.price || 50} DH</span>
                    </div>
                    <div className="fw-bold text-dark mt-1">
                        Total: {(item.price || 50) * (item.quantity || 1)} DH
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default UserAllOrderCard;
