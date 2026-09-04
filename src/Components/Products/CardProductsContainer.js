import React, { useState, useEffect } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import ProductCard from "./ProductCard";
import SubTiltle from "../Utility/SubTitle";
import baseUrl from "../../Api/baseURL";
import { defaultPerfumesList } from "../../Api/perfumesData";

const CardProductsContainer = ({ title, btntitle, pathText, products: propProducts }) => {
  const [products, setProducts] = useState(propProducts || defaultPerfumesList);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (propProducts && propProducts.length > 0) {
      setProducts(propProducts);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await baseUrl.get('/api/v1/products');
        const data = res.data?.data || res.data || [];
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(defaultPerfumesList);
        }
      } catch (err) {
        console.log("Using default perfumes fallback:", err);
        setProducts(defaultPerfumesList);
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
        {loading && listToRender.length === 0 ? (
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
