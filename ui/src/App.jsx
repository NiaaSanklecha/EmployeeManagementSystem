import React from "react";
import ReactDOM from "react-dom";
import EmployeeDirectory from "./EmployeeDirectory.jsx";
import Contents from "./Contents.jsx";
import { HashRouter } from "react-router-dom";
import NavBar from "./Navbar.jsx";
import { Container } from "react-bootstrap";

function App(){
  return(

    <HashRouter>
      <>
      <NavBar/>
      <Container>
      <Contents/> 
      </Container>
     
      </>
   </HashRouter>
    
  );
}
ReactDOM.render(<App/>,document.getElementById("content"));