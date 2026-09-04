import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartCheckout from '../../Components/Cart/CartCheckout';
import CartItem from '../../Components/Cart/CartItem';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    // Load cart items from localStorage
    useEffect(() => {
        try {
            const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
            setCartItems(items);
        } catch (e) {
            console.error("Error loading cart:", e);
        }
    }, []);

    // Save cart items to localStorage and notify app
    const updateCart = (newItems) => {
        setCartItems(newItems);
        localStorage.setItem('cartItems', JSON.stringify(newItems));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const handleQuantityChange = (id, newQty) => {
        const updated = cartItems.map((item) =>
            item._id === id ? { ...item, quantity: newQty } : item
        );
        updateCart(updated);
    };

    const handleRemoveItem = (id) => {
        const updated = cartItems.filter((item) => item._id !== id);
        updateCart(updated);
    };

    const handleClearCart = () => {
        updateCart([]);
    };

    const totalPrice = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + Number(item.price || 50) * Number(item.quantity || 1), 0);
    }, [cartItems]);

    return (
        <Container style={{ minHeight: '670px' }} className="py-4">
            <Row>
                <div className='cart-title mb-3 fw-bold' style={{ fontSize: "24px" }}>Mon Panier ({cartItems.length})</div>
            </Row>
            {cartItems.length === 0 ? (
                <Row className="justify-content-center py-5">
                    <Col md="8" className="text-center">
                        <Alert variant="info" className="py-4">
                            <h4>Votre panier est vide !</h4>
                            <p>Vous n'avez pas encore ajouté de parfum à votre panier.</p>
                            <Link to="/products" className="btn btn-dark mt-2">
                                Explorer les parfums (50 DH)
                            </Link>
                        </Alert>
                    </Col>
                </Row>
            ) : (
                <Row className='d-flex justify-content-center'>
                    <Col xs="12" md="8" className="mb-3">
                        {cartItems.map((item) => (
                            <CartItem 
                                key={item._id} 
                                item={item} 
                                onQuantityChange={handleQuantityChange}
                                onRemove={handleRemoveItem}
                            />
                        ))}
                    </Col>

                    <Col xs="12" md="4">
                        <CartCheckout 
                            totalPrice={totalPrice} 
                            onClearCart={handleClearCart} 
                        />
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default CartPage;
