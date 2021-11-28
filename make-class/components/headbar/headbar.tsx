import React from "react";
import Link from "next/link";
import { Navbar, Container, Nav } from "react-bootstrap";
import style from "./headbar.module.css";
import { NavDropdown } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../provider";

const HeadBar = () => {
  const router = useRouter();
  const id = router.query.inquiryId as string;
  const dispatch = useDispatch<AppDispatch>();

  let inquiryItem = useSelector((state: RootState) =>
    state.inquiry.data.find((item) => item && item.inquiryId === +id)
  );

  return (
    <Navbar className={style.headbar}>
      <Container className="w-100">
        <Navbar.Brand className="ms-3">
          <Link href="/onedayclass">
            <h3 className={style.headbar} style={{ cursor: "pointer" }}>
              MAKE :CLASS
            </h3>
          </Link>
        </Navbar.Brand>
        <div>
          {/* <Nav.Item className="me-3">
            <Link href="/inquiry">
              <a className="text-light me-3">1:1문의</a>
            </Link>
          </Nav.Item> */}
          <NavDropdown
            // style={{ color: "red", fontWeight: "bold" }}
            title="나의 리스트"
            id="nav-dropdown"
            className={style.NavDropdown}
          >
            <NavDropdown.Item href="/reservation">나의 클래스</NavDropdown.Item>
            {!inquiryItem && (
              <NavDropdown.Item
                onClick={() => {
                  router.push(`/inquiry/list`);
                }}
              >
                1:1 문의
              </NavDropdown.Item>
            )}
            <NavDropdown.Item
              className="me-3"
              onClick={() => {
                router.push(
                  `http://ec2-3-34-43-49.ap-northeast-2.compute.amazonaws.com`
                );
              }}
            >
              클래스관리
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default HeadBar;
