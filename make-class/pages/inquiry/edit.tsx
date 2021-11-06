import Layout from "../../components/layout";
import Link from "next/link";
import { Form, Button, InputGroup, FormControl, Table } from "react-bootstrap";
import React from "react";

export default function create() {
  return (
    <Layout>
      <div className="flex-center">
        <h3>1:1상담 문의</h3>
        <a>수정하실 내용을 아래 입력해주세요.</a>
      </div>
      <Table responsive="lg">
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>제목</th>
            <td>
              <InputGroup className="d-flex">
                <FormControl
                  placeholder="제목"
                  aria-label="제목"
                  aria-describedby="제목"
                />
              </InputGroup>
            </td>
          </tr>
          <tr>
            <th>이름</th>
            <td>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="이름"
                  aria-label="이름"
                  aria-describedby="이름"
                />
              </InputGroup>
            </td>
          </tr>
          <tr>
            <th>연락처</th>
            <td>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="010-123-4567"
                  aria-label="010-123-4567"
                  aria-describedby="010-123-4567"
                />
              </InputGroup>
            </td>
          </tr>
          <tr>
            <th>내용</th>
            <td>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control as="textarea" rows={10} />
                </Form.Group>
              </Form>
            </td>
          </tr>
        </tbody>
      </Table>
      <div>
        <Button className="outline-secondary" id="button-addon2">
          수정하기
        </Button>
      </div>
    </Layout>
  );
}
