import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import mobile from '../../images/dwa5.png';
import deleteicon from '../../images/delete.png';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
    if (!item) return null;

    const title = item.title || "Parfum de luxe";
    const price = item.price || 50;
    const quantity = item.quantity || 1;
    const imgUrl = item.imageCover || mobile;

    const handleQtyChange = (e) => {
        const val = Math.max(1, parseInt(e.target.value) || 1);
        if (onQuantityChange) onQuantityChange(item._id, val);
    };

    return (
        <Col xs="12" className="cart-item-body my-2 d-flex px-3 py-2 bg-white rounded shadow-sm align-items-center">
            <img 
                width="120px" 
                height="120px" 
                style={{ objectFit: "contain" }} 
                src={imgUrl} 
                onError={(e) => { e.target.src = mobile; }} 
                alt="product" 
            />
            <div className="w-100 ms-3">
                <Row className="justify-content-between">
                    <Col sm="12" className="d-flex flex-row justify-content-between align-items-center">
                        <div className="cat-text fw-bold text-dark" style={{ fontSize: "16px" }}>
                            {title}
                        </div>
                        <div 
                            onClick={() => onRemove && onRemove(item._id)} 
                            className="d-flex align-items-center text-danger" 
                            style={{ cursor: "pointer", fontWeight: "600", fontSize: "14px" }}>
                            <img src={deleteicon} alt="delete" width="18px" height="20px" className="me-1" />
                            <span>Supprimer</span>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-between mt-3 align-items-center">
                    <Col sm="12" className="d-flex flex-row justify-content-between align-items-center">
                        <div className="d-inline-flex align-items-center">
                            <span className="cat-text me-2" style={{ fontSize: "14px" }}>Quantité :</span>
                            <Button 
                                variant="outline-secondary" 
                                size="sm" 
                                className="px-2 py-0 me-1" 
                                onClick={() => onQuantityChange && onQuantityChange(item._id, Math.max(1, quantity - 1))}>
                                -
                            </Button>
                            <input
                                className="text-center form-control form-control-sm d-inline px-1"
                                type="number"
                                value={quantity}
                                onChange={handleQtyChange}
                                style={{ width: "45px", height: "30px" }}
                            />
                            <Button 
                                variant="outline-secondary" 
                                size="sm" 
                                className="px-2 py-0 ms-1" 
                                onClick={() => onQuantityChange && onQuantityChange(item._id, quantity + 1)}>
                                +
                            </Button>
                        </div>
                        <div className="barnd-text" style={{ fontSize: "18px", fontWeight: "bold", color: "#2c3e50" }}>
                            {price * quantity} MAD
                        </div>
                    </Col>
                </Row>
            </div>
        </Col>
    );
};

export default CartItem;
