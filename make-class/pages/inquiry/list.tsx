import React from "react";
import Layout from "../../components/layout";
import Link from "next/link";
import { Table, Button } from "react-bootstrap";

export default function list() {
  return (
    <Layout>
      <h1 className="text-center">1:1문의 내역</h1>
      <div className="d-flex">
        <Table striped bordered hover style={{ width: "480px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>클래스명</th>
              <th>클래스 일정</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>클래스명</td>
              <td>클래스 일정</td>
              <td style={{ width: "130px" }}>
                <Link href="/inquiry/create">
                  <Button className="bg-light " size="sm">
                    {" "}
                    수정
                  </Button>
                </Link>
                <Link href="/inquiry">
                  <Button className="bg-light ms-2" size="sm">
                    {" "}
                    삭제
                  </Button>
                </Link>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Layout>
  );
}
