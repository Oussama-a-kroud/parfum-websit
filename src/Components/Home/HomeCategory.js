import React from "react";
import { Container, Row } from "react-bootstrap";
import SubTiltle from "../Utility/SubTitle";
import CategoryCard from "./../Category/CategoryCard";

import clothe from "../../images/clothe.png";
import dwa2 from "../../images/dwa2.png";
import dwa3 from "../../images/dwa3.png";
import dwa4 from "../../images/dwa4.png";
import dwa5 from "../../images/dwa5.png";

const HomeCategory = () => {
  return (
    <Container>
      <SubTiltle title="category" btntitle="plus..." pathText="/allcategory"/>
      <Row className='my-2 d-flex justify-content-between'>
                {/* <CategoryCard title="adjuvent" img={clothe} background="#F4DBA4" /> */}
                <CategoryCard title="category2 " img={dwa2} background="#F4DBA4" />
                <CategoryCard title=" category3 " img={dwa3} background="#0034FF" />
                <CategoryCard title=" category4 " img={dwa4} background="#F4DBA4" />
                <CategoryCard title=" category5 " img={dwa5} background="#F4DBA4" />
            </Row>
    </Container>
  );
};

export default HomeCategory;
