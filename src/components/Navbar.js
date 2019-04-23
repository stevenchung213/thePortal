import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";
import { Link, Route, withRouter } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Giphy from "./Giphy";

const Navigation = ({ auth }) => {
  const logout = () => {
    console.log('***DASH.logout()***')
    auth.logout();
  };
  return (
    <div>
      <Navbar collapseOnSelect expand="sm" bg="bg-transparent" fixed='top'>
        <Navbar.Brand href="#top-nav">the.Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto mr-auto">
            <NavLink as={Link} to='/giphy'>Giphy</NavLink>
            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to='/'>Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavLink to="/deets">More deets</NavLink>
            <NavLink to="" onClick={logout}>Log out</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default withRouter(Navigation);
