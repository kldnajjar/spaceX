import { Navbar, Container, Nav, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import "./navbar.scss";

const NavbarWrapper = () => {
  const logo = require("../../assets/logo.png");
  const history = useHistory();

  return (
    <Navbar bg="light" expand="lg" className="navbar-container">
      <Container fluid>
        <Navbar.Brand
          className="pointer"
          onClick={() => history.push("/spaces")}
        >
          <Image src={logo} className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Item onClick={() => history.push("/spaces")}>Ships</Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarWrapper;
