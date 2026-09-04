import React from "react";
import { Col, Card } from "react-bootstrap";
import defaultBrandImg from "../../images/dwa2.png";

const BrandCard = ({ img, title }) => {
  const getImageSrc = () => {
    if (!img) return defaultBrandImg;
    if (img.startsWith('data:') || img.startsWith('http')) return img;
    return defaultBrandImg;
  };

  return (
    <Col
      xs="6"
      sm="6"
      md="4"
      lg="2"
      className="my-2 d-flex justify-content-center"
    >
      <Card
        className="my-1"
        style={{
          width: "100%",
          height: "151px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
        }}
      >
        <Card.Img 
          style={{ width: "100%", height: "151px", objectFit: "contain", padding: "8px" }} 
          src={getImageSrc()} 
          alt={title || "brand"}
          onError={(e) => { e.target.src = defaultBrandImg; }}
        />
      </Card>
    </Col>
  );
};

export default BrandCard;
