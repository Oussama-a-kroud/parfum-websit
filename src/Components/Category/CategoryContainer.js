import React from "react";
import { Container, Row } from "react-bootstrap";
import dwa2 from "../../images/dwa2.png";
import dwa3 from "../../images/dwa5.png";
import dwa4 from "../../images/dwa4.png";

import CategoryCard from "./../Category/CategoryCard";
const CategoryContainer = () => {
  
  return (
    <Container>
      <div className="admin-content-text mt-2 ">tout les categories </div>
      <Row className="my-2 d-flex justify-content-between">
        <CategoryCard title="category2 " img={dwa2} background="#F4DBA4" />
        <CategoryCard title=" category3 " img={dwa3} background="#0034FF" />
        <CategoryCard title=" category4 " img={dwa4} background="#F4DBA4" />
        <CategoryCard title=" category5 " img={dwa2} background="#0034FF" />
        <CategoryCard title="category2 " img={dwa2} background="#F4DBA4" />
        <CategoryCard title=" category3 " img={dwa3} background="#0034FF" />
        <CategoryCard title=" category4 " img={dwa4} background="#F4DBA4" />
        <CategoryCard title=" category5 " img={dwa2} background="#0034FF" />
        <CategoryCard title="category2 " img={dwa2} background="#F4DBA4" />
        <CategoryCard title=" category3 " img={dwa3} background="#0034FF" />
        <CategoryCard title=" category4 " img={dwa4} background="#F4DBA4" />
        <CategoryCard title=" category5 " img={dwa2} background="#0034FF" />
      </Row>
    </Container>
  );
};

export default CategoryContainer;
