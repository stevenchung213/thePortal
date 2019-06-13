import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

const Navigation = ({ auth }) => {
  return (
    <div>
      <Navbar collapseOnSelect expand="sm" bg="white" fixed='top'>
        <Navbar.Brand href="#top-nav">the.Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto mr-auto">
            <NavDropdown title="Giphy" id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to='/giphy'>My Collection</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to='/giphy/search'>Search Giphy</NavDropdown.Item>
            </NavDropdown>
            <NavLink as={Link} to='/something'>Something</NavLink>
          </Nav>
          <Nav>
            <NavLink to="/deets">More deets</NavLink>
            <NavLink to="" onClick={() => auth.logout()}>Log out</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
