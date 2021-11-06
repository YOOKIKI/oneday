import React from "react";
import Layout from "../../components/layout";
import Link from "next/link";
import { Table, Button } from "react-bootstrap";

export default function list() {
  return (
    <Layout>
      <h1>1:1문의 내역</h1>
      <div className="d-flex">
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
                <Link href="/inquiry/edit">
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
