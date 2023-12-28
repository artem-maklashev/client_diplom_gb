import { Navbar } from "react-bootstrap";
import React from "react";

const Footer = () => {
    return (
        <Navbar fixed="bottom" bg="dark" variant="dark" className="justify-content-end">
            <Navbar.Brand >&copy; 2023 Маклашев Артем</Navbar.Brand>
        </Navbar>
    );
};

export default Footer;
