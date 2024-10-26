import React from "react";
import { Row, Col } from "react-bootstrap";
import CartItem from "../Cart/CartItem";

const AdminOrderDetalis = () => {
  return (
    <div>
      <div className="admin-content-text"> Détails de la commande #55</div>
      <CartItem />
      <CartItem />
      <CartItem />

      <Row className="justify-content-center mt-4 user-data">
        <Col xs="12" className=" d-flex">
          <div className="admin-content-text py-2">Détails du client </div>
        </Col>
        <Col xs="12" className="d-flex">
          <div
            style={{
              color: "#555550",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
          >
            nom:
          </div>

          <div
            style={{
              color: "#979797",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
            className="mx-2"
          >
            oussama akroud
          </div>
        </Col>

        <Col xs="12" className="d-flex">
          <div
            style={{
              color: "#555550",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
          >
            numero de telephone:
          </div>

          <div
            style={{
              color: "#979797",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
            className="mx-2"
          >
            0666050879
          </div>
        </Col>
        <Col xs="12" className="d-flex">
          <div
            style={{
              color: "#555550",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
          >
            email:
          </div>

          <div
            style={{
              color: "#979797",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
            className="mx-2"
          >
            oussama@gmail.com
          </div>
        </Col>
        <div className=" d-inline px-4 border text-center pt-2">
          somme 5000 mad
        </div>
        <div className="d-flex mt-2 justify-content-center">
          <select
            name="languages"
            id="lang"
            className="select input-form-area mt-1  text-center px-2 w-50"
          >
            <option value="val">Statut de la demande </option>
            <option value="val2">En cours </option>
            <option value="val2">Terminé </option>
            <option value="val2">annule</option>
          </select>
          <button className="btn-a px-3 d-inline mx-2 ">save </button>
        </div>
      </Row>
    </div>
  );
};

export default AdminOrderDetalis;
