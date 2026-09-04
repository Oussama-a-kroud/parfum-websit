import React from 'react';

const ProductGallery = ({ imgUrl, title }) => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center p-3"
            style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                border: "1px solid #f1f5f9"
            }}>
            <div 
                className="position-relative d-flex justify-content-center align-items-center w-100 p-4"
                style={{
                    minHeight: "340px",
                    background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, rgba(250,250,250,1) 75%)",
                    borderRadius: "12px",
                    overflow: "hidden"
                }}>
                <img
                    src={imgUrl}
                    alt={title || "AKROUD PARFUM"}
                    style={{
                        maxHeight: "320px",
                        maxWidth: "100%",
                        objectFit: "contain",
                        filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.25)) drop-shadow(0 4px 10px rgba(245,158,11,0.2))",
                        transition: "transform 0.4s ease"
                    }}
                    className="product-detail-img"
                />
            </div>
            <div className="mt-3 text-center">
                <span className="badge bg-dark text-warning px-3 py-2 rounded-pill" style={{ fontSize: "12px", letterSpacing: "1px" }}>
                    ✨ FLACON SIGNATURE AKROUD (30 ML)
                </span>
            </div>
        </div>
    );
};

export default ProductGallery;
