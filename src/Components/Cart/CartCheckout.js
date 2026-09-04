import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CartCheckout = ({ totalPrice = 0, onClearCart }) => {
    return (
        <Row className="my-1 d-flex justify-content-center cart-checkout bg-white rounded-4 shadow-sm p-3 m-0">
            <Col xs="12" className="d-flex flex-column p-0">
                <div className="d-flex mb-3">
                    <input
                        className="copon-input d-inline text-center form-control form-control-sm me-2"
                        placeholder="Code promo"
                    />
                    <button className="copon-btn d-inline btn btn-dark btn-sm">Appliquer</button>
                </div>
                <div className="d-flex justify-content-between align-items-center my-2 p-2 bg-light rounded">
                    <span className="fw-bold" style={{ fontSize: "16px", color: "#333" }}>Total :</span>
                    <span className="fw-bold text-success" style={{ fontSize: "20px" }}>{totalPrice} MAD</span>
                </div>
                <Link
                    to="/order/paymethoud"
                    style={{ textDecoration: "none" }}
                    className="w-100 mt-2 mb-2">
                    <button className="btn btn-dark w-100 py-2 fw-bold" style={{ borderRadius: "8px" }}>
                        Commander ({totalPrice} MAD)
                    </button>
                </Link>
                {onClearCart && (
                    <Button 
                        variant="outline-danger" 
                        size="sm" 
                        className="w-100" 
                        style={{ borderRadius: "8px" }}
                        onClick={onClearCart}>
                        Vider le panier
                    </Button>
                )}
            </Col>
        </Row>
    );
};

export default CartCheckout;
