import React from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import UserAllOrderCard from './UserAllOrderCard';

const UserAllOrderItem = ({ order, index }) => {
    if (!order) return null;

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Livrée':
            case 'Payée':
                return <Badge bg="success">Livrée / Payée</Badge>;
            case 'En cours de livraison':
                return <Badge bg="info">En cours de livraison</Badge>;
            case 'Annulée':
                return <Badge bg="danger">Annulée</Badge>;
            default:
                return <Badge bg="warning" text="dark">En cours de traitement</Badge>;
        }
    };

    const formattedDate = order.createdAt 
        ? new Date(order.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        : 'Date récente';

    return (
        <div className="user-order mt-3 p-3 bg-white rounded-3 shadow-sm border">
            <Row className="align-items-center mb-3 pb-2 border-bottom">
                <Col xs="12" md="6">
                    <div className="fw-bold fs-6 text-primary">
                        Commande #{order._id || order.id || index}
                    </div>
                    <div className="text-muted small">
                        📅 Effectuée le: {formattedDate}
                    </div>
                </Col>
                <Col xs="12" md="6" className="text-md-end mt-2 mt-md-0">
                    <span className="me-2">{getStatusBadge(order.status)}</span>
                    <span className="badge bg-secondary">{order.paymentMethodType || 'Paiement à la livraison'}</span>
                </Col>
            </Row>

            {/* List of Cart Items */}
            {order.cartItems && order.cartItems.length > 0 ? (
                order.cartItems.map((item, idx) => (
                    <UserAllOrderCard key={item._id || idx} item={item} />
                ))
            ) : (
                <div className="text-muted small py-2">Détails des articles indisponibles</div>
            )}

            <Row className="d-flex justify-content-between align-items-center mt-3 pt-2 bg-light p-2 rounded">
                <Col xs="12" md="7">
                    <div className="small text-muted">
                        📍 <strong>Adresse de livraison:</strong> {order.user?.address || 'Adresse enregistrée'}, {order.user?.city || 'Maroc'} ({order.user?.phone || ''})
                    </div>
                </Col>
                <Col xs="12" md="5" className="text-md-end mt-2 mt-md-0">
                    <div className="fs-6 fw-bold">
                        Total commande: <span className="text-success fs-5">{order.totalOrderPrice || 200}.00 DH</span>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default UserAllOrderItem;
