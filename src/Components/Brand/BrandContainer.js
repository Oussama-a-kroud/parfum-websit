import React, { useState, useEffect } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import BrandCard from './BrandCard';
import baseUrl from '../../Api/baseURL';

import brand1 from "../../images/dwa2.png";
import brand2 from "../../images/dwa3.png";
import brand3 from "../../images/dwa5.png";

const BrandContainer = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                setLoading(true);
                const res = await baseUrl.get('/api/v1/brands');
                const data = res.data?.data || res.data || [];
                setBrands(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error fetching brands in container:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();
    }, []);

    return (
        <Container>
            <div className="admin-content-text mt-2 ">Toutes les marques</div>
            <Row className='my-1 d-flex justify-content-start'>
                {loading ? (
                    <div className="text-center w-100 py-4">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : brands.length > 0 ? (
                    brands.map((b, idx) => (
                        <BrandCard key={b._id || idx} img={b.image} title={b.name} />
                    ))
                ) : (
                    <>
                        <BrandCard img={brand1} />
                        <BrandCard img={brand2} />
                        <BrandCard img={brand3} />
                        <BrandCard img={brand1} />
                    </>
                )}
            </Row>
        </Container>
    );
};

export default BrandContainer;
