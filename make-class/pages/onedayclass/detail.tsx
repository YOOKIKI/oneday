import Layout from "../../components/layout";
import Link from "next/link";
import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";

export default function detail() {
  return (
    <Layout>
      <div className="d-flex">
        <h2>클래스 명</h2>
      </div>
      <div className="flex">
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <Image src="/clss.png/" />
            </Col>
            <Col xs={6} md={4}>
              <Image src="/clss.png/" roundedCircle />
            </Col>
            <Col xs={6} md={4}>
              <Image src="/clss.png/" thumbnail />
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
