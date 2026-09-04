import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import baseUrl from '../../Api/baseURL';

const CategoryHeader = ({ selectedCategory, onCategorySelect }) => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await baseUrl.get('/api/v1/categories');
                const data = res.data?.data || res.data || [];
                if (Array.isArray(data) && data.length > 0) {
                    setCategories(data);
                } else {
                    setCategories([
                        { _id: 'cat_homme', name: 'Homme (الرجال)' },
                        { _id: 'cat_femme', name: 'Femme (النساء)' },
                        { _id: 'cat_oriental', name: 'العطور الشرقية (Orientaux)' }
                    ]);
                }
            } catch (err) {
                console.error("Error fetching header categories:", err);
                setCategories([
                    { _id: 'cat_homme', name: 'Homme (الرجال)' },
                    { _id: 'cat_femme', name: 'Femme (النساء)' },
                    { _id: 'cat_oriental', name: 'العطور الشرقية (Orientaux)' }
                ]);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (catId) => {
        if (onCategorySelect) {
            onCategorySelect(catId);
        }
        if (catId === 'all') {
            navigate('/products');
        } else {
            navigate(`/products?category=${encodeURIComponent(catId)}`);
        }
    };

    return (
        <div className="cat-header py-1" style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-start align-items-center py-2 flex-wrap gap-3">
                        <Link to="/pack" style={{ textDecoration: 'none' }}>
                            <div 
                                className="cat-text-header fw-bold text-warning"
                                style={{ cursor: "pointer", fontSize: "14px" }}>
                                🎁 Pack 4 Parfums (200 DH)
                            </div>
                        </Link>

                        <div 
                            onClick={() => handleCategoryClick('all')}
                            className={`cat-text-header ${!selectedCategory || selectedCategory === 'all' ? 'fw-bold text-warning' : ''}`}
                            style={{ cursor: "pointer", fontSize: "14px" }}>
                            Tout
                        </div>

                        {categories.map((cat) => (
                            <div 
                                key={cat._id}
                                onClick={() => handleCategoryClick(cat._id)}
                                className={`cat-text-header ${selectedCategory === cat._id ? 'fw-bold text-warning' : ''}`}
                                style={{ cursor: "pointer", fontSize: "14px" }}>
                                {cat.name}
                            </div>
                        ))}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CategoryHeader;
