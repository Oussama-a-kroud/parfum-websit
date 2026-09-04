import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import mobile from '../../images/dwa2.png';

const AdminAllOrdersItem = ({ order, index }) => {
    if (!order) return null;

    const firstItem = order.cartItems && order.cartItems.length > 0 ? order.cartItems[0] : null;

    return (
        <Col sm="12">
            <Link
                to={`/admin/orders/${order._id || index}`}
                className="cart-item-body my-2 px-3 py-2 d-flex align-items-center"
                style={{ textDecoration: "none", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
                <img width="120px" height="120px" style={{ objectFit: "contain" }} src={mobile} alt="order" />
                <div className="w-100 ms-3">
                    <Row className="justify-content-between">
                        <Col sm="12" className="d-flex flex-row justify-content-between">
                            <div className="d-inline cat-text" style={{ fontSize: "16px", fontWeight: "bold" }}>
                                Commande #{order.id || index}
                            </div>
                            <div className="d-inline text-muted" style={{ fontSize: "14px" }}>
                                Client: {order.user?.name || "Oussama Akroud"}
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-2">
                        <Col sm="12" className="d-flex flex-row justify-content-start">
                            <div className="d-inline cat-title" style={{ color: "#333" }}>
                                {firstItem ? (firstItem.product?.title || firstItem.title || "Produit sans titre") : "Commande générale"}
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-between mt-3">
                        <Col sm="12" className="d-flex flex-row justify-content-between align-items-center">
                            <div className="d-inline cat-text">
                                Statut: <span className="badge bg-warning text-dark">{order.status || (order.isPaid ? "Payé" : "En cours")}</span>
                            </div>
                            <div className="d-inline barnd-text" style={{ fontSize: "18px", fontWeight: "bold", color: "#2c3e50" }}>
                                {order.totalOrderPrice || 880} MAD
                            </div>
                        </Col>
                    </Row>
                </div>
            </Link>
        </Col>
    );
};

export default AdminAllOrdersItem;
