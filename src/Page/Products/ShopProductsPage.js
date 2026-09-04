import React, { useState, useEffect, useMemo } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import CategoryHeader from '../../Components/Category/CategoryHeader';
import SearchCountResult from '../../Components/Utility/SearchCountResult';
import SideFilter from '../../Components/Utility/SideFilter';
import CardProductsContainer from '../../Components/Products/CardProductsContainer';
import baseUrl from '../../Api/baseURL';

const ShopProductsPage = () => {
  const location = useLocation();
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter State
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [sortType, setSortType] = useState('');

  // Extract search keyword from URL params (?search=...)
  const searchWord = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("search") || "";
  }, [location.search]);

  // Sync category param from URL query (?category=...)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catParam = params.get("category") || params.get("categoryId") || "";
    if (catParam) {
      setSelectedCategories([catParam]);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch products
        const resProd = await baseUrl.get('/api/v1/products');
        const prodData = resProd.data?.data || resProd.data || [];
        setAllProducts(Array.isArray(prodData) ? prodData : []);

        // Fetch categories
        const resCat = await baseUrl.get('/api/v1/categories');
        const catData = resCat.data?.data || resCat.data || [];
        setCategories(Array.isArray(catData) ? catData : []);

        // Fetch brands
        const resBrand = await baseUrl.get('/api/v1/brands');
        const brandData = resBrand.data?.data || resBrand.data || [];
        setBrands(Array.isArray(brandData) ? brandData : []);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching shop products & filters:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Category Checkbox Toggle Handler
  const handleCategoryChange = (catId) => {
    if (catId === 'all') {
      setSelectedCategories([]);
      return;
    }
    setSelectedCategories((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  // Brand Checkbox Toggle Handler
  const handleBrandChange = (brandId) => {
    if (brandId === 'all') {
      setSelectedBrands([]);
      return;
    }
    setSelectedBrands((prev) =>
      prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]
    );
  };

  // Category Header Click Handler
  const handleHeaderCategorySelect = (catId) => {
    if (catId === 'all') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([catId]);
    }
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Filter by Keyword Search (Title or Description)
    if (searchWord.trim() !== '') {
      const q = searchWord.toLowerCase().trim();
      result = result.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Filter by Category
    if (selectedCategories.length > 0) {
      result = result.filter((p) => {
        const catVal = (p.category?._id || p.category || "").toString().toLowerCase();
        const catName = (p.category?.name || p.category || "").toString().toLowerCase();
        return selectedCategories.some((sel) => {
          const s = sel.toString().toLowerCase();
          return catVal === s || catName === s || catName.includes(s) || s.includes(catName);
        });
      });
    }

    // Filter by Brand
    if (selectedBrands.length > 0) {
      result = result.filter((p) => {
        const brandVal = p.brand?._id || p.brand;
        const brandName = p.brand?.name || p.brand;
        return selectedBrands.includes(brandVal) || selectedBrands.includes(brandName);
      });
    }

    // Filter by Price From
    if (priceFrom !== '') {
      result = result.filter((p) => Number(p.price) >= Number(priceFrom));
    }

    // Filter by Price To
    if (priceTo !== '') {
      result = result.filter((p) => Number(p.price) <= Number(priceTo));
    }

    // Sorting
    if (sortType === 'price-asc') {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortType === 'price-desc') {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortType === 'rating') {
      result.sort((a, b) => Number(b.ratingsAverage || 0) - Number(a.ratingsAverage || 0));
    } else if (sortType === 'best-seller') {
      result.sort((a, b) => Number(b.sold || 0) - Number(a.sold || 0));
    }

    return result;
  }, [allProducts, searchWord, selectedCategories, selectedBrands, priceFrom, priceTo, sortType]);

  return (
    <div style={{ minHeight: '670px', backgroundColor: '#f8f9fa' }}>
      <CategoryHeader
        selectedCategory={selectedCategories.length === 1 ? selectedCategories[0] : null}
        onCategorySelect={handleHeaderCategorySelect}
      />
      <Container className="py-2">
        <SearchCountResult
          title={searchWord ? `Résultats pour "${searchWord}" (${filteredProducts.length})` : `${filteredProducts.length} Produit(s) trouvé(s)`}
          resultsCount={filteredProducts.length}
          sortType={sortType}
          onSortChange={setSortType}
        />
        <Row className='d-flex flex-row mt-2'>
          <Col lg="3" md="4" sm="12" className='mb-3'>
            <SideFilter
              categories={categories}
              brands={brands}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              selectedBrands={selectedBrands}
              onBrandChange={handleBrandChange}
              priceFrom={priceFrom}
              onPriceFromChange={setPriceFrom}
              priceTo={priceTo}
              onPriceToChange={setPriceTo}
            />
          </Col>
          <Col lg="9" md="8" sm="12">
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <CardProductsContainer products={filteredProducts} title="" btntitle="" />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShopProductsPage;