import React from 'react'
import { Row,Col } from 'react-bootstrap'

const ProductText = () => {
    return (
        <div>
      <Row className="mt-2">
        <div className="cat-text">riha sauvage : </div>
      </Row>
      <Row>
        <Col md="8">
          <div className="cat-title d-inline">
           had riha bla manhtaj ndwi 3liha, hiya dawya 3la rasha ,dakchi qualité<div className="cat-rate d-inline mx-3">4.5</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="8" className="mt-4">
          <div className="cat-text d-inline">Marque :</div>
          <div className="barnd-text d-inline mx-1"> Akroud Sauvage</div>
        </Col>
      </Row>
      {/* <Row>
        <Col md="8" className="mt-1 d-flex">
          <div
            className="color ms-2 border"
            style={{ backgroundColor: "#E52C2C" }}></div>
          <div
            className="color ms-2 border "
            style={{ backgroundColor: "white" }}></div>
          <div
            className="color ms-2 border"
            style={{ backgroundColor: "black" }}></div>
        </Col>
      </Row> */}

      <Row className="mt-4">
        <div className="cat-text">Caractéristiques :</div>
      </Row>
      <Row className="mt-2">
        <Col md="10">
          <div className="product-description d-inline">
          riha dyal l3bar fiha lankol oro7
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md="12">
          <div className="product-price d-inline px-3 py-3 border">50 mad</div>
          <div className="product-cart-add px-3 py-3 d-inline mx-3">ajouter aux panier </div>
        </Col>
      </Row>
    </div>
    )
}

export default ProductText
