import React, { useState, useEffect } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import CategoryCard from "./CategoryCard";
import baseUrl from "../../Api/baseURL";

import dwa2 from "../../images/dwa2.png";
import dwa3 from "../../images/dwa5.png";
import dwa4 from "../../images/dwa4.png";
import dwa5 from "../../images/dwa6.png";

const colors = ["#F4DBA4", "#0034FF", "#FF6B6B", "#4ECDC4", "#FFE66D"];

const CategoryContainer = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await baseUrl.get('/api/v1/categories');
        const data = res.data?.data || res.data || [];
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching categories in container:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Container>
      <div className="admin-content-text mt-3 mb-2 fw-bold" style={{ fontSize: "20px", color: "#0f172a" }}>
        Toutes les Catégories
      </div>
      <Row className="my-2 d-flex justify-content-center align-items-center">
        {loading ? (
          <div className="text-center w-100 py-4">
            <Spinner animation="border" variant="warning" />
          </div>
        ) : categories.length > 0 ? (
          categories.map((cat, idx) => (
            <CategoryCard
              key={cat._id || idx}
              id={cat._id || cat.name}
              title={cat.name}
              img={cat.image}
              background={colors[idx % colors.length]}
            />
          ))
        ) : (
          <>
            <CategoryCard id="Homme" title="Homme" img={dwa5} background="#F4DBA4" />
            <CategoryCard id="Femme" title="Femme" img={dwa3} background="#0034FF" />
            <CategoryCard id="Orientaux" title="Parfums Orientaux" img={dwa4} background="#FF6B6B" />
            <CategoryCard id="Offres" title="Offres 50 DH" img={dwa2} background="#4ECDC4" />
          </>
        )}
      </Row>
    </Container>
  );
};

export default CategoryContainer;
