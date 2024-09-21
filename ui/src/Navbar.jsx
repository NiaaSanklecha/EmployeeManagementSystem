import React from 'react';
import { Link } from "react-router-dom";
import {Navbar, Nav, NavItem, Container, NavDropdown,MenuItem, Glyphicon, Tooltip, OverlayTrigger} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { LinkContainer } from 'react-router-bootstrap';
export default function NavBar(){
  
  
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Employee Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          
        <Nav.Link as={Link} to={'/employees'}>Employee List</Nav.Link>
        <Nav.Link as={Link} to={'/upcomingRetirement'}>Upcoming Retirement</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
 <Nav.Link as={Link} to={'/addEmployee'}><FontAwesomeIcon icon={faPlus} /></Nav.Link>
   
 </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    
    
    
  );
  
}
