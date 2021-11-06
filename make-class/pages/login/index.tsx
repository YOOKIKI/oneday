import Layout from "../../components/layout";
import { InputGroup } from "react-bootstrap";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import Router from "next/dist/server/router";
import Link from "next/link";
import HeadBar from "../../components/headbar/headbar";

export default function login() {
  return (
    <Layout>
      <article className="flex-center">
        <h1>Make Class</h1>
        <a>로그인이 필요한 서비스입니다.</a>
      </article>
      <div style={{ width: "408px" }}>
        {/* <InputGroup className="mb-3 ">
          <FormControl
            placeholder="아이디"
            aria-label="Id"
            aria-describedby="basic-addon2"
          />
        </InputGroup>
        <InputGroup className="mb-3 ">
          <FormControl
            placeholder="비밀번호"
            aria-label="pw"
            aria-describedby="basic-addon2"
          />
          <Button className="outline-secondary" id="button-addon2">
            Login
          </Button>
        </InputGroup> */}
        <FloatingLabel controlId="floatingInput" label="Id" className="mb-3">
          <Form.Control type="Id" placeholder="Id" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>
        <Button className="outline-secondary" id="button-addon2">
          로그인
        </Button>
      </div>
    </Layout>
  );
}
