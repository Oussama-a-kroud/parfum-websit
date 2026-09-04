import React, { useState, useEffect } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import SubTiltle from "../Utility/SubTitle";
import CategoryCard from "./../Category/CategoryCard";
import baseUrl from "../../Api/baseURL";

import dwa2 from "../../images/dwa2.png";
import dwa3 from "../../images/dwa3.png";
import dwa4 from "../../images/dwa4.png";
import dwa5 from "../../images/dwa5.png";

const colors = ["#F4DBA4", "#0034FF", "#FF6B6B", "#4ECDC4", "#FFE66D"];

const HomeCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await baseUrl.get('/api/v1/categories');
        const data = res.data?.data || res.data || [];
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        } else {
          setCategories([]);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Container>
      <SubTiltle title="Catégories de Parfums" />
      <Row className='my-2 d-flex justify-content-center align-items-center'>
        {loading ? (
          <div className="text-center w-100 py-3">
            <Spinner animation="border" size="sm" />
          </div>
        ) : categories.length > 0 ? (
          categories.slice(0, 5).map((cat, idx) => (
            <CategoryCard
              key={cat._id || idx}
              id={cat._id || cat.name}
              title={cat.name}
              img={cat.image ? (cat.image.startsWith('http') ? cat.image : `http://127.0.0.1:8000/categories/${cat.image}`) : dwa2}
              background={colors[idx % colors.length]}
            />
          ))
        ) : (
          <>
            <CategoryCard id="Homme" title="Homme" img={dwa2} background="#F4DBA4" />
            <CategoryCard id="Femme" title="Femme" img={dwa3} background="#0034FF" />
            <CategoryCard id="Orientaux" title="Parfums Orientaux" img={dwa4} background="#FF6B6B" />
            <CategoryCard id="Offres" title="Offres 50 DH" img={dwa5} background="#4ECDC4" />
          </>
        )}
      </Row>
    </Container>
  );
};

export default HomeCategory;
