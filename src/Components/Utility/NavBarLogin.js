import React from "react";
import { Container, FormControl, Nav, Navbar } from "react-bootstrap";
import logo from '../../images/logo.png'
import login from '../../images/login.png'
import cart from '../../images/cart.png'
const NavBarLogin = () => {
  return (
    <div>
      <Navbar className="sticky-top" bg="secondary bg-dark bg-gradient" variant="dark" expand="sm">
        <Container>
          <Navbar.Brand>
            <a href="/">
              <img src={logo} className="logo" />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <FormControl
              type="search"
              placeholder="search..."
              className="me-2 w-100 text-center "
              aria-label="Search"
              
            />
            <Nav className="me-auto">
              <Nav.Link
                href="/login"
                className="nav-text d-flex mt-2 justify-content-center"
              >
                <img src={login} className="login-img" alt="sfvs" />
                <p style={{ color: "white" }}></p>
              </Nav.Link>
              <Nav.Link
                href="/cart"
                className="nav-text d-flex mt-2 justify-content-center"
                style={{ color: "white" }}
              >
                <img src={cart} className="login-img" alt="sfvs" />
                <p style={{ color: "white" }}></p>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBarLogin;
