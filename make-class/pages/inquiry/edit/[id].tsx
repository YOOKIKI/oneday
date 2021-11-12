import Layout from "../../../components/layout";
import { useEffect, useRef } from "react";
import { Form, Button, InputGroup, FormControl, Table } from "react-bootstrap";
import React from "react";
import { AppDispatch, RootState } from "../../../provider";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  addInquiry,
  InquiryItem,
  modifyInquiry,
} from "../../../provider/modules/inquiry";

const edit = () => {
  const classIdInput = useRef<HTMLInputElement>(null);
  const onedayclassNameInput = useRef<HTMLInputElement>(null);
  const titleInput = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const telInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const descriptionTxta = useRef<HTMLTextAreaElement>(null);

  const inquiryData = useSelector((state: RootState) => state.inquiry.data);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const isModifyCompleted = useSelector(
    (state: RootState) => state.inquiry.isModifyCompleted
  );
  useEffect(() => {
    isModifyCompleted && router.push("/inquiry");
  }, [isModifyCompleted, router]);

  const handleAddClick = () => {
    const item: InquiryItem = {
      id: inquiryData.length ? inquiryData[0].id + 1 : 1,
      // classId: inquiryData.length ? inquiryData[0].id + 1 : 1,
      classId: classIdInput.current ? classIdInput.current.value : "",
      onedayclassName: onedayclassNameInput.current
        ? onedayclassNameInput.current.value
        : "",
      title: titleInput.current ? titleInput.current.value : "",
      name: nameInput.current ? nameInput.current.value : "",
      tel: telInput.current ? telInput.current.value : "",
      email: emailInput.current ? emailInput.current.value : "",
      description: descriptionTxta.current ? descriptionTxta.current.value : "",
      createdTime: new Date().getTime(),
    };

    console.log(item);
    dispatch(addInquiry(item));

    const Item = (item: InquiryItem) => {
      dispatch(modifyInquiry(item));
    };

    router.push("/inquiry/list");
  };

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
                <FormControl placeholder="제목" />
              </InputGroup>
            </td>
          </tr>
          <tr>
            <th>이름</th>
            <td>
              <InputGroup className="mb-3">
                <FormControl placeholder="이름" />
              </InputGroup>
            </td>
          </tr>
          <tr>
            <th>연락처</th>
            <td>
              <InputGroup className="mb-3">
                <FormControl placeholder="010-123-4567" />
              </InputGroup>
            </td>
          </tr>
          <tr>
            <th>이메일</th>
            <td>
              <InputGroup className="mb-3">
                <FormControl placeholder="010-123-4567" />
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
        <Button
          className="outline-secondary"
          id="button-addon2"
          onClick={() => {
            handleAddClick();
          }}
        >
          수정하기
        </Button>
      </div>
    </Layout>
  );
};

export default edit;
