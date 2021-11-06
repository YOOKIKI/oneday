import Layout from "../../components/layout";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";

export default function Onedayclass() {
  return (
    <>
      <Layout>
        <article className="d-flex">
          <section>모든 클래스</section>
        </article>
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
      </Layout>
    </>
  );
}
