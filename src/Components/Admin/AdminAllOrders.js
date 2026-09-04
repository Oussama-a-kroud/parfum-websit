import React, { useState, useEffect } from 'react';
import { Row, Spinner, Alert } from 'react-bootstrap';
import AdminAllOrdersItem from './AdminAllOrdersItem';
import baseUrl from '../../Api/baseURL';

const AdminAllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const localOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
            let apiOrders = [];

            try {
                const res = await baseUrl.get('/api/v1/orders');
                if (res.data && res.data.data) {
                    apiOrders = res.data.data;
                } else if (Array.isArray(res.data)) {
                    apiOrders = res.data;
                }
            } catch (err) {
                console.error("Error fetching API orders:", err);
            }

            // Combine local and API orders deduplicating by _id
            const orderMap = new Map();
            localOrders.forEach(o => orderMap.set(o._id || o.id, o));
            apiOrders.forEach(o => orderMap.set(o._id || o.id, o));

            const combinedOrders = Array.from(orderMap.values());
            setOrders(combinedOrders.length > 0 ? combinedOrders : [
                {
                    _id: "ORD-100001",
                    id: 1,
                    user: { name: "Oussama Akroud", phone: "0666050879", email: "oussama@gmail.com", city: "Casablanca", address: "Maarif 12" },
                    totalOrderPrice: 200,
                    isPaid: false,
                    isDelivered: false,
                    status: "En cours",
                    cartItems: [{ title: "Sauvage Dior", price: 50, quantity: 4 }]
                }
            ]);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <div className='admin-content-text pb-3'>Gérer les commandes</div>
            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : orders.length === 0 ? (
                <Alert variant="info">Aucune commande pour le moment.</Alert>
            ) : (
                <Row className='justify-content-start'>
                    {orders.map((order, index) => (
                        <AdminAllOrdersItem key={order._id || index} order={order} index={index + 1} />
                    ))}
                </Row>
            )}
        </div>
    );
};

export default AdminAllOrders;
