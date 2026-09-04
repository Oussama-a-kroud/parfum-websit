import React, { useState, useEffect } from 'react';
import { Row, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserAllOrderItem from './UserAllOrderItem';
import baseUrl from '../../Api/baseURL';

const UserAllOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get logged-in client credentials from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
        setUser(storedUser);

        const fetchUserOrders = async () => {
            try {
                setLoading(true);

                // If user is not logged in at all, do not show any orders
                if (!storedUser || (!storedUser.phone && !storedUser.email && !storedUser.name)) {
                    setOrders([]);
                    setLoading(false);
                    return;
                }

                // Get orders saved locally in this browser
                const localOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');

                // Fetch backend orders if available
                let apiOrders = [];
                try {
                    const res = await baseUrl.get('/api/v1/orders');
                    if (res.data && res.data.data) {
                        apiOrders = res.data.data;
                    }
                } catch (e) {
                    console.log("API orders fetch notice:", e);
                }

                // Combine local and API orders into one map to eliminate duplicates
                const orderMap = new Map();
                localOrders.forEach(o => orderMap.set(o._id || o.id, o));
                apiOrders.forEach(o => orderMap.set(o._id || o.id, o));
                const allOrders = Array.from(orderMap.values());

                // STRICT FILTERING: Match ONLY orders belonging to this specific logged-in user
                const userFilteredOrders = allOrders.filter(order => {
                    if (!order || !order.user) return false;

                    const storedPhone = (storedUser.phone || '').toString().trim();
                    const orderPhone = (order.user.phone || '').toString().trim();

                    const storedEmail = (storedUser.email || '').toLowerCase().trim();
                    const orderEmail = (order.user.email || '').toLowerCase().trim();

                    const storedName = (storedUser.name || '').toLowerCase().trim();
                    const orderName = (order.user.name || '').toLowerCase().trim();

                    // Phone match (highest priority)
                    if (storedPhone && orderPhone && orderPhone.includes(storedPhone)) return true;

                    // Email match
                    if (storedEmail && orderEmail && orderEmail === storedEmail) return true;

                    // Exact Name match
                    if (storedName && orderName && orderName === storedName) return true;

                    return false;
                });

                setOrders(userFilteredOrders);
                setLoading(false);
            } catch (err) {
                console.error("Error loading user orders:", err);
                setOrders([]);
                setLoading(false);
            }
        };

        fetchUserOrders();
    }, []);

    return (
        <div>
            <div className="admin-content-text pb-2">
                Bonjour, <span className="text-warning fw-bold">{user?.name || 'Client'}</span> 👋
            </div>

            {user ? (
                <div className="text-muted small mb-4">
                    Espace personnel: voici uniquement <strong>vos propres طلبات</strong>.
                </div>
            ) : (
                <Alert variant="warning" className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        🔒 <strong>Veuillez vous connecter</strong> pour accéder à vos commandes personnelles.
                    </div>
                    <Link to="/login" className="btn btn-sm btn-dark">Se connecter</Link>
                </Alert>
            )}

            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="warning" />
                </div>
            ) : !user ? (
                <Alert variant="secondary" className="text-center py-4">
                    <h5>Aucune commande affichée</h5>
                    <p className="mb-3">Connectez-vous à votre compte client pour voir vos commandes.</p>
                    <Link to="/login" className="btn btn-dark fw-bold">Se connecter</Link>
                </Alert>
            ) : orders.length === 0 ? (
                <Alert variant="info" className="text-center py-4">
                    <h5>Vous n'avez aucune commande pour le moment 🛍️</h5>
                    <p className="mb-3">Toutes vos futures commandes apparaîtront ici.</p>
                    <Link to="/products" className="btn btn-warning fw-bold text-dark">Voir les parfums (50 DH)</Link>
                </Alert>
            ) : (
                <Row className='justify-content-between'>
                    {orders.map((order, index) => (
                        <UserAllOrderItem key={order._id || index} order={order} index={index + 1} />
                    ))}
                </Row>
            )}
        </div>
    );
};

export default UserAllOrder;
