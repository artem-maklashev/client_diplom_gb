import React from "react";
import {Button, Form, FormControl, Nav, Navbar, NavbarBrand, NavDropdown} from "react-bootstrap";
import {Link, Route, BrowserRouter as Router, Routes} from "react-router-dom";
import GypsumBoardShow2 from "../pages/GypsumBoardShow2";
import MainPage from "../pages/MainPage";
import DelaysShow from "../pages/DelaysShow";

function NavigationBar() {
    return (

        <Router>
            <Navbar expand="lg" className="bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <NavbarBrand href="/">Декоратор</NavbarBrand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">
                                Home
                            </Nav.Link>
                            <NavDropdown title="Гипсокартон" id="board-dropdown">
                                <NavDropdown.Item as={Link} to="/board">
                                    Производство
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/boardDelays" >Простои</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/" disabled={true}>
                                Disabled
                            </Nav.Link>
                        </Nav>
                        <Form className="d-inline-flex">
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </div>
            </Navbar>

            <Routes>
                <Route path="/board" element={<GypsumBoardShow2/>}/>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/boardDelays" element={<DelaysShow />}/>
            </Routes>
        </Router>

    );
}

export default NavigationBar;
