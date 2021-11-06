import { Card, Button } from "react-bootstrap";
import Layout from "../../components/layout";
import Link from "next/link";
import React from "react";

export default function create() {
  return (
    <Layout>
      <div className="d-flex">
        <main>
          <h2 className="text-center">클래스 등록과정</h2>
          <Card>
            <Card.Img className="top" src="/clss.png/" />
            <Card.Body>
              <Card.Text>
                클래스 등록 조건 , 클래스 등록하는 방법 순서 , 클래스 등록하기
                위한 로그인 등등의 설명
              </Card.Text>
            </Card.Body>
            <Link href="/onedayclass">
              <Button className="outline-secondary">등록하러 가기</Button>
            </Link>
          </Card>
        </main>
      </div>
    </Layout>
  );
}
