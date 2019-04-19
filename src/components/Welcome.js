import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

const Welcome = ({ auth }) => {
  const { name } = auth.getProfile();
  return (
    <div className="dashboard-container" id='top-nav' style={dashboardContainer}>
      <Navbar collapseOnSelect expand="sm" bg="bg-transparent" fixed='top'>
        <Navbar.Brand href="#top-nav">the.Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto mr-auto">

            <NavLink as={Link} to='/features'>Features</NavLink>

            <NavLink to="/pricing">Pricing</NavLink>
            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item componentClass={NavLink} to='/'>Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavLink to="/deets">More deets</NavLink>
            <NavLink to="" onClick={logout}>Log out</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <h1>{name} is now logged in</h1>
      <Route/>
      <Route/>
      <Route/>
      <Route/>
    </div>
  );
};

export default Welcome;
