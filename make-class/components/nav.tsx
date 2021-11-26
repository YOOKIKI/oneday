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
            <Nav.Link href="#핸드메이드">핸드메이드</Nav.Link>
            <Nav.Link href="#자기계발">자기계발</Nav.Link>
            <Nav.Link href="#플라워·가드닝">플라워·가드닝</Nav.Link>
            <Nav.Link href="#드로잉">드로잉</Nav.Link>
            <Nav.Link href="#음악">음악</Nav.Link>
            {/* <Nav.Link href="#요가·필라테스">요가·필라테스</Nav.Link>
            <Nav.Link href="#레져·스포츠">레져·스포츠</Nav.Link>
            <Nav.Link href="#반려동물">반려동물</Nav.Link>
            <Nav.Link href="#체험">체험</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
