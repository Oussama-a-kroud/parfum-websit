import React, { useState, useEffect } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import ProductCard from "./ProductCard";
import SubTiltle from "../Utility/SubTitle";
import baseUrl from "../../Api/baseURL";

const CardProductsContainer = ({ title, btntitle, pathText, products: propProducts }) => {
  const [products, setProducts] = useState(propProducts || []);
  const [loading, setLoading] = useState(!propProducts);

  useEffect(() => {
    if (propProducts) {
      setProducts(propProducts);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await baseUrl.get('/api/v1/products');
        const data = res.data?.data || res.data || [];
        if (Array.isArray(data)) {
          setProducts(data);
        }
      } catch (err) {
        console.error("Error fetching products in container:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [propProducts]);

  // If pathText is passed (Homepage section), show first 4. Otherwise show all products!
  const listToRender = pathText ? products.slice(0, 4) : products;

  return (
    <Container>
      {title && <SubTiltle title={title} btntitle={btntitle} pathText={pathText} />}
      <Row className="my-2 d-flex justify-content-start">
        {loading ? (
          <div className="text-center w-100 py-3">
            <Spinner animation="border" size="sm" />
          </div>
        ) : listToRender.length > 0 ? (
          listToRender.map((item, idx) => (
            <ProductCard key={item._id || idx} item={item} />
          ))
        ) : (
          <div className="text-center w-100 py-4 text-muted">
            Aucun produit trouvé.
          </div>
        )}
      </Row>
    </Container>
  );
};

export default CardProductsContainer;
