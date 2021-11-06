import React from "react";
import Link from "next/link";
import { Navbar, Container, Nav } from "react-bootstrap";
import style from "./headbar.module.css";
import { NavDropdown } from "react-bootstrap";

const HeadBar = () => {
  return (
    <div className={style.headbar}>
      <Link href="/onedayclass">
        <a className="text-light me-3">ONEDAYCLASS</a>
      </Link>
      <div>
        <Nav.Item>
          <Link href="/inquiry">
            <a className="text-light me-3">1:1문의</a>
          </Link>

          <Link href="/onedayclass/create">
            <a className="text-light me-3">클래스등록</a>
          </Link>
          <Link href="/login">
            <a className="text-light me-3">매니저</a>
          </Link>
        </Nav.Item>
      </div>
      <div>
        <NavDropdown title="로그인" id="login">
          <NavDropdown.Item eventKey="4.1">나의정보</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2">나의 클래스</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.3">1:1문의</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.4">클래스 등록</NavDropdown.Item>
        </NavDropdown>
      </div>
    </div>
  );
};

export default HeadBar;
