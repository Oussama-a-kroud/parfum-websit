import React, { useState, useEffect } from "react";
import { Row, Spinner, Alert } from "react-bootstrap";
import AdminAllProductsCard from "./AdminAllProductsCard";
import baseUrl from "../../Api/baseURL";

const AdminAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await baseUrl.get('/api/v1/products');
      if (res.data && res.data.data) {
        setProducts(res.data.data);
      } else if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        setProducts([]);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Impossible de charger les produits");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div>
      <div className="admin-content-text pb-3">Gérer tous les produits</div>
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : products.length === 0 ? (
        <Alert variant="info">Aucun produit trouvé. Vous pouvez ajouter un nouveau produit.</Alert>
      ) : (
        <Row className="justify-content-start">
          {products.map((item) => (
            <AdminAllProductsCard key={item._id} item={item} onDelete={handleDeleteProduct} />
          ))}
        </Row>
      )}
    </div>
  );
};

export default AdminAllProducts;
