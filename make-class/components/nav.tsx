import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import style from "./layout.module.css";

export default function Sidebar() {
  return (
    <div className={style.navbar}>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand className={style.navbar}>
            <h4>어떤클래스?</h4>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#handmade">핸드메이드</Nav.Link>
            <Nav.Link href="#develpment">자기계발</Nav.Link>
            <Nav.Link href="#flower">플라워가드닝</Nav.Link>
            <Nav.Link href="#drawing">드로잉</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
