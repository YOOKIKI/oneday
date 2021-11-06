import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import {
  Card,
  Row,
  CardGroup,
  Button,
  Nav,
  Navbar,
  Container,
} from "react-bootstrap";
import style from "../components/layout.module.css";
import Link from "next/link";
import HeadBar from "../components/headbar/headbar";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      <Link href="/onedayclass">
        <h1>Make Class</h1>
      </Link>
      <HeadBar />
      <section>
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
        <Card style={{ width: "18rem", marginTop: "10px", left: "20px" }}>
          <Card.Img className="top" src="clss.png" />
          <Card.Body>
            <Card.Title>Class Name</Card.Title>
            <Card.Text>강의 설명</Card.Text>
            <Card.Text>강의 일자</Card.Text>
            <div style={{ cursor: "pointer" }}>
              <Link href="/onedayclass/detail">
                <Button className="primary">자세히 보기</Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem", marginTop: "10px", left: "20px" }}>
          <Card.Img className="top" src="clss.png" />
          <Card.Body>
            <Card.Title>Class Name</Card.Title>
            <Card.Text>강의 설명</Card.Text>
            <Card.Text>강의 일자</Card.Text>
            <div style={{ cursor: "pointer" }}>
              <Link href="/onedayclass/detail">
                <Button className="primary">자세히 보기</Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
};

export default Home;
