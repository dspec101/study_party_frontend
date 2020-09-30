import React from "react";
import { Nav, Navbar, Form, NavDropdown, Button, FormControl } from 'react-bootstrap';

function MyNav (props) {
    
return(
<Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">   
  <a href="#">&#9776; 
  <img src="https://www.wikihow.com/images/3/38/Form-a-Study-Group-Step-16.jpg" style={{width:100, marginTop: -7}} alt="" />
  </a>
  StudyGrouper 
  </Navbar.Brand>
      {props.user?
      `Welcome ${props.user} !` 
      : null } 
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Profile</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">About Us</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Terms and Conditions</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Search for friends!</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
)}

export default MyNav