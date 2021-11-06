import Layout from "../../components/layout";
import React from "react";
import Link from "next/link";
import { Table, Button } from "react-bootstrap";

export default function inquiry() {
  return (
    <Layout>
      <h1>1:1문의</h1>
      <h4>문의할 클래스를 선택해주세요</h4>
      <Table responsive="sm" style={{ width: "640px" }}>
        <thead>
          <tr>
            <th></th>
            <th>문의명</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>문의명</td>
            <td>작성일</td>
            <td style={{ width: "130px" }}>
              <Link href="/inquiry/create">
                <Button className="bg-light " size="sm">
                  {" "}
                  문의하기
                </Button>
              </Link>
            </td>
          </tr>
        </tbody>
      </Table>
    </Layout>
  );
}
