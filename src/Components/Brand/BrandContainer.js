import React from 'react'
import brand1 from "../../images/dwa2.png";
import brand2 from "../../images/dwa3.png";
import brand3 from "../../images/dwa5.png";
import { Container, Row } from 'react-bootstrap';
import BrandCard from './BrandCard';
const BrandContainer = () => {
    return (
        <Container>
            <div className="admin-content-text mt-2 ">tout les marques</div>
            <Row className='my-1 d-flex justify-content-between'>
                <BrandCard img={brand1} />
                <BrandCard img={brand2} />
                <BrandCard img={brand3} />
                <BrandCard img={brand2} />
                <BrandCard img={brand1} />
                <BrandCard img={brand3} />
                <BrandCard img={brand1} />
                <BrandCard img={brand2} />
                <BrandCard img={brand3} />
                <BrandCard img={brand2} />
                <BrandCard img={brand1} />
                <BrandCard img={brand3} />
                <BrandCard img={brand1} />
                <BrandCard img={brand2} />
                <BrandCard img={brand3} />
                <BrandCard img={brand2} />
                <BrandCard img={brand1} />
                <BrandCard img={brand3} />

            </Row>
        </Container>
    )
}

export default BrandContainer
