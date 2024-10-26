import React from 'react'
import { Container, Row } from 'react-bootstrap'
// import SubTiltle from '../Uitily/SubTiltle'
import SubTiltle from "../Utility/SubTitle"

import BrandCard from './BrandCard'
import brand1 from "../../images/dwa2.png";
import brand2 from "../../images/dwa3.png";
import brand3 from "../../images/dwa4.png";

const BrandFeatured = ({ title, btntitle }) => {
    return (
        <Container>
            <SubTiltle title={title} btntitle={btntitle} pathText="/allbrand" />
            <Row className='my-1 d-flex justify-content-between'>
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

export default BrandFeatured
