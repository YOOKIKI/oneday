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
          <Link href="/">
            <a className="text-light me-3">ONEDAYCLASS</a>
          </Link>
        </Navbar.Brand>
        <div className={style.headbar}>
          {/* <Nav.Item className="me-3">
            <Link href="/inquiry">
              <a className="text-light me-3">1:1문의</a>
            </Link>
          </Nav.Item> */}
          <NavDropdown title="내역" id="login">
            <NavDropdown.Item href="/reservation">
              클래스 예약내역
            </NavDropdown.Item>
            <NavDropdown.Item href="/inquiry/list">
              1:1 문의내역
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Item className="me-3">
            <Link href="/onedayclass/create">
              <a className="text-light me-3">클래스등록</a>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link href="/login">
              <a className="text-light me-3">클래스관리</a>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <NavDropdown title="로그인" id="login">
              <NavDropdown.Item href="/reservation">
                나의 클래스
              </NavDropdown.Item>
              <NavDropdown.Item href="/inquiry">1:1문의</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/onedayclass/create">
                클래스 등록
              </NavDropdown.Item>
            </NavDropdown>
          </Nav.Item>
        </div>
      </Container>
    </Navbar>
  );
};

export default HeadBar;
