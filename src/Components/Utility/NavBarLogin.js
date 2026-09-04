import React, { useState, useEffect } from "react";
import { Container, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from '../../images/logo.png';
import login from '../../images/login.png';
import cart from '../../images/cart.png';

const NavBarLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchWord, setSearchWord] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  // Sync logged in user state
  const syncUser = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('user') || 'null');
      setUser(stored);
    } catch (e) {
      setUser(null);
    }
  };

  // Sync cart count from localStorage dynamically
  const updateCartCount = () => {
    try {
      const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const totalCount = items.reduce((acc, item) => acc + (item.quantity || 1), 0);
      setCartCount(totalCount);
    } catch (e) {
      setCartCount(0);
    }
  };

  useEffect(() => {
    syncUser();
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    window.addEventListener('userStateChanged', syncUser);
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('userStateChanged', syncUser);
    };
  }, []);

  // Sync search input with URL query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get("search") || "";
    setSearchWord(search);
  }, [location.search]);

  const onChangeSearch = (e) => {
    const value = e.target.value;
    setSearchWord(value);
    
    if (value.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(value)}`);
    } else if (location.pathname === "/products") {
      navigate(`/products`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    window.dispatchEvent(new Event('userStateChanged'));
    navigate('/login');
  };

  return (
    <div>
      <Navbar className="sticky-top" bg="secondary bg-dark bg-gradient" variant="dark" expand="sm">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img src={logo} className="logo" alt="AKROUD PARFUM" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <FormControl
              value={searchWord}
              onChange={onChangeSearch}
              type="search"
              placeholder="Rechercher un parfum..."
              className="me-2 w-100 text-center"
              aria-label="Search"
              style={{ borderRadius: "20px" }}
            />
            <Nav className="me-auto align-items-center">
              {/* Pack 4 Parfums Link */}
              <Nav.Link
                as={Link}
                to="/pack"
                className="nav-text d-flex mt-2 justify-content-center align-items-center me-2"
                style={{ color: "white", textDecoration: "none" }}
              >
                <span className="badge bg-warning text-dark px-2 py-1 rounded-pill me-1" style={{ fontSize: "11px", fontWeight: "800", letterSpacing: "0.5px" }}>
                  🎁 PACK 200 DH
                </span>
              </Nav.Link>

              {/* Dynamic User Profile or Login Link */}
              {user ? (
                <NavDropdown 
                  title={
                    <span style={{ color: "#f59e0b", fontWeight: "700", fontSize: "14px" }}>
                      👤 {user.name || 'Mon Compte'}
                    </span>
                  } 
                  id="user-dropdown"
                  className="mt-1 me-2"
                >
                  {user.role === 'admin' ? (
                    <>
                      <NavDropdown.Item as={Link} to="/admin/allproducts">
                        🛠️ Espace Admin (Produits)
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/admin/allorders">
                        📦 Espace Admin (Commandes)
                      </NavDropdown.Item>
                    </>
                  ) : (
                    <NavDropdown.Item as={Link} to="/user/allorders">
                      📦 Mes Commandes
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="text-danger fw-bold">
                    🚪 Déconnexion
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="nav-text d-flex mt-2 justify-content-center align-items-center me-2"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <img 
                    src={login} 
                    className="login-img me-1" 
                    alt="login" 
                    style={{ filter: "brightness(0) invert(1)", width: "20px", height: "20px" }} 
                  />
                  <span style={{ color: "white", fontWeight: "600", fontSize: "14px" }}>Connexion</span>
                </Nav.Link>
              )}

              {/* Cart Link with Icon + White Text + Dynamic Badge */}
              <Nav.Link
                as={Link}
                to="/cart"
                className="nav-text d-flex mt-2 justify-content-center align-items-center position-relative"
                style={{ color: "white", textDecoration: "none" }}
              >
                <img 
                  src={cart} 
                  className="login-img me-1" 
                  alt="cart" 
                  style={{ filter: "brightness(0) invert(1)", width: "20px", height: "20px" }} 
                />
                <span style={{ color: "white", fontWeight: "600", fontSize: "14px" }}>Panier</span>
                {cartCount > 0 && (
                  <span 
                    className="badge bg-danger rounded-pill ms-1 position-absolute top-0 start-100 translate-middle shadow-sm" 
                    style={{ fontSize: "10px", fontWeight: "700" }}>
                    {cartCount}
                  </span>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBarLogin;
