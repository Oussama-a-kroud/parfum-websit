import React from 'react';
import { Row } from 'react-bootstrap';

const SideFilter = ({
    categories = [],
    brands = [],
    selectedCategories = [],
    onCategoryChange,
    selectedBrands = [],
    onBrandChange,
    priceFrom = '',
    onPriceFromChange,
    priceTo = '',
    onPriceToChange
}) => {
    return (
        <div className="mt-3 p-2 bg-white rounded shadow-sm" style={{ minWidth: "180px" }}>
            <Row className="px-2">
                {/* Categories Filter */}
                <div className="d-flex flex-column mt-2">
                    <div className="filter-title fw-bold border-bottom pb-1" style={{ fontSize: "16px", color: "#2c3e50" }}>
                        Catégories
                    </div>
                    <div className="d-flex align-items-center mt-2">
                        <input
                            type="checkbox"
                            id="cat-all"
                            checked={selectedCategories.length === 0}
                            onChange={() => onCategoryChange('all')}
                            style={{ cursor: "pointer" }}
                        />
                        <label htmlFor="cat-all" className="filter-sub ms-2 mb-0" style={{ cursor: "pointer", fontSize: "14px" }}>
                            Toutes les catégories
                        </label>
                    </div>
                    {categories.map((cat) => (
                        <div key={cat._id} className="d-flex align-items-center mt-2">
                            <input
                                type="checkbox"
                                id={`cat-${cat._id}`}
                                value={cat._id}
                                checked={selectedCategories.includes(cat._id) || selectedCategories.includes(cat.name)}
                                onChange={() => onCategoryChange(cat._id)}
                                style={{ cursor: "pointer" }}
                            />
                            <label htmlFor={`cat-${cat._id}`} className="filter-sub ms-2 mb-0 text-truncate" style={{ cursor: "pointer", fontSize: "14px" }}>
                                {cat.name}
                            </label>
                        </div>
                    ))}
                </div>

                {/* Brands Filter */}
                <div className="d-flex flex-column mt-4">
                    <div className="filter-title fw-bold border-bottom pb-1" style={{ fontSize: "16px", color: "#2c3e50" }}>
                        Marques
                    </div>
                    <div className="d-flex align-items-center mt-2">
                        <input
                            type="checkbox"
                            id="brand-all"
                            checked={selectedBrands.length === 0}
                            onChange={() => onBrandChange('all')}
                            style={{ cursor: "pointer" }}
                        />
                        <label htmlFor="brand-all" className="filter-sub ms-2 mb-0" style={{ cursor: "pointer", fontSize: "14px" }}>
                            Toutes les marques
                        </label>
                    </div>
                    {brands.map((b) => (
                        <div key={b._id} className="d-flex align-items-center mt-2">
                            <input
                                type="checkbox"
                                id={`brand-${b._id}`}
                                value={b._id}
                                checked={selectedBrands.includes(b._id) || selectedBrands.includes(b.name)}
                                onChange={() => onBrandChange(b._id)}
                                style={{ cursor: "pointer" }}
                            />
                            <label htmlFor={`brand-${b._id}`} className="filter-sub ms-2 mb-0 text-truncate" style={{ cursor: "pointer", fontSize: "14px" }}>
                                {b.name}
                            </label>
                        </div>
                    ))}
                </div>

                {/* Price Filter */}
                <div className="d-flex flex-column mt-4 mb-2">
                    <div className="filter-title fw-bold border-bottom pb-1" style={{ fontSize: "16px", color: "#2c3e50" }}>
                        Prix (MAD)
                    </div>
                    <div className="d-flex align-items-center mt-2">
                        <span className="filter-sub me-1" style={{ fontSize: "13px" }}>De:</span>
                        <input
                            className="form-control form-control-sm text-center px-1"
                            type="number"
                            placeholder="Min"
                            value={priceFrom}
                            onChange={(e) => onPriceFromChange(e.target.value)}
                            style={{ width: "70px" }}
                        />
                    </div>
                    <div className="d-flex align-items-center mt-2">
                        <span className="filter-sub me-1" style={{ fontSize: "13px" }}>À:</span>
                        <input
                            className="form-control form-control-sm text-center px-1"
                            type="number"
                            placeholder="Max"
                            value={priceTo}
                            onChange={(e) => onPriceToChange(e.target.value)}
                            style={{ width: "70px" }}
                        />
                    </div>
                </div>
            </Row>
        </div>
    );
};

export default SideFilter;
