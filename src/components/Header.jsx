import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"
const header = () => {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
         <LinkContainer to="/">
        <Navbar.Brand href="">TV Show Apps</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="ml-auto centerText">
          <LinkContainer to="/">
            <Nav.Link ><i className="fas fa-home"></i>Home </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/show">
            <Nav.Link > <i className="fas fa-tv"></i> Show </Nav.Link>
            </LinkContainer>
            <Nav.Link > <i className="fas fa-user"></i> Login  </Nav.Link>
            <Nav.Link > <i className="fas fa-user"></i> Logout </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default header;
