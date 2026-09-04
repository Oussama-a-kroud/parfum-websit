import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductGallery from './ProductGallery';
import ProductText from './ProductText';

const ProductDetails = ({ item, imgUrl }) => {
    return (
        <div className="my-4">
            <Row className="g-4 align-items-start">
                <Col lg="5" md="6" sm="12">
                    <ProductGallery imgUrl={imgUrl} title={item?.title} />
                </Col>

                <Col lg="7" md="6" sm="12">
                    <ProductText item={item} imgUrl={imgUrl} />
                </Col>
            </Row>
        </div>
    );
};

export default ProductDetails;
