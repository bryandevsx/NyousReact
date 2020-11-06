import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

const Menu = () =>{
    const history = useHistory();

    const sair = (event) => {
        event.preventDefault();

        localStorage.removeItem('token-nyous')

        history.push('/');
    }

    const RenderMenu = () => {
        const token = localStorage.getItem('token-nyous')

        if(token === null){
          return(
            <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/cadastrar">Cadastrar</Nav.Link>
            </Nav>
          )
        }else if(jwt_decode(token).role === 'Admin'){
          return( 
            <Nav>
                <Nav.Link href="/admin/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/admin/categorias">Categorias</Nav.Link>
                <Nav.Link href="/admin/eventos">Eventos</Nav.Link>
                <NavDropdown title={jwt_decode(token).family_name} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={event => sair(event)}>Sair</NavDropdown.Item>
                </NavDropdown>

            </Nav>
          )
        } else{
          return(
          <Nav>
            <Nav.Link href="/admin/dashboard">Eventos</Nav.Link>
            <NavDropdown title={jwt_decode(token).family_name} id="basic-nav-dropdown">
              <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={event => sair(event)}>Sair</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          )
        }
    }

    return(

      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      { RenderMenu() }
    </Navbar>

    )

}

export default Menu;