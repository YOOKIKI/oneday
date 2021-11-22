import React from "react";
import Link from "next/link";
import { Navbar, Container, Nav } from "react-bootstrap";
import style from "./headbar.module.css";
import { NavDropdown } from "react-bootstrap";

const HeadBar = () => {
  return (
    <Navbar className={style.headbar}>
      <Container className="w-100">
        <Navbar.Brand className="ms-3">
          <Link href="/onedayclass">
            <a className="text-light me-5">ONEDAYCLASS</a>
          </Link>
        </Navbar.Brand>
        <div className={style.headbar}>
          {/* <Nav.Item className="me-3">
            <Link href="/inquiry">
              <a className="text-light me-3">1:1문의</a>
            </Link>
          </Nav.Item> */}
          <NavDropdown
            title="나의 리스트"
            id="list"
            className={style.NavDropdown}
          >
            <NavDropdown.Item href="/reservation">나의 클래스</NavDropdown.Item>
            <NavDropdown.Item href="/inquiry/list">1:1 문의</NavDropdown.Item>
          </NavDropdown>
          <Nav.Item className="me-3">
            {/* <Link href="/onedayclass/create">
              <a className="text-light me-3">클래스등록</a>
            </Link> */}
          </Nav.Item>
          <Nav.Item>
            {/* <Link href="/reservations/list">
              <a className="text-light me-3">나의클래스관리</a>
            </Link> */}
          </Nav.Item>
          {/* <Nav.Item>
            <NavDropdown title="나의 정보">
              <NavDropdown.Item href="/reservation">
                나의 클래스
              </NavDropdown.Item>
              <NavDropdown.Item href="/inquiry">1:1문의</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav.Item> */}
        </div>
      </Container>
    </Navbar>
  );
};

export default HeadBar;
