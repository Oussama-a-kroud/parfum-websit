import React from "react";
import { Row, Col } from "react-bootstrap";

const ChoosePayMethoud = () => {
  return (
    <div>
      <div className="admin-content-text pt-5">
        choisis la method de payment
      </div>
      <div className="user-address-card my-3 px-3">
        <Row className="d-flex justify-content-between ">
          <Col xs="12" className="my-4">
            <input
              name="group"
              id="group1"
              type="radio"
              value=" Paiement par carte
                            "
              className="mt-2"
            />
            <label className="mx-2" for="group1">
              Paiement par carte
            </label>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs="12" className="d-flex">
            <input
              name="group"
              id="group1"
              type="radio"
              value="Paiement à réception"
              className="mt-2"
            />
            <label className="mx-2" for="group1">
              Paiement à réception
            </label>
          </Col>
        </Row>
      </div>

      <Row>
        <Col xs="12" className="d-flex justify-content-end">
          <div className="product-price d-inline   border">34000 mad</div>
          <div className="product-cart-add px-3 pt-2 d-inline me-2">
            {" "}
            validation
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ChoosePayMethoud;
