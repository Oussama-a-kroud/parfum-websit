import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import imagelogin from './../../images/loginn.jpg'

const LoginPage = () => {
  return (
    <Container>
      <Row className="py-3 mt-2 d-flex justify-content-center ">
        <Col sm="5">
          <img style={{ borderRadius: 20}}  src={imagelogin}

            alt="Trendy Pants and Shoes"
            class=" w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
          />
        </Col>
        <Col sm="6" className="d-flex flex-column ">
          <label className="mx-auto title-login">Login</label>
          <input
            placeholder="email..."
            type="text"
            className="user-input my-3 text-center mx-auto"
          />
          <input
            placeholder="password..."
            type="password"
            className="user-input text-center mx-auto"
          />
          <button className="btn-login mx-auto mt-4"> login</button>
          <label className="mx-auto my-4">
            Vous n'avez pas de compte ?{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              <span style={{ cursor: "pointer" }} className="text-danger">
                Cliquez ici{" "}
              </span>
            </Link>
          </label>
          <label className="mx-auto my-4">
            <Link to="/admin/allproducts" style={{ textDecoration: "none" }}>
              <span style={{ cursor: "pointer" }} className="text-danger">
                login admin              </span>
            </Link>

            <Link to="/user/allorders" style={{ textDecoration: "none" }}>
              <span style={{ cursor: "pointer" }} className="text-danger mx-3">
                login user
              </span>
            </Link>
          </label>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
