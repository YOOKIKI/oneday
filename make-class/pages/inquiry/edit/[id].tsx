import Layout from "../../../components/layout";
import { useEffect, useRef, MutableRefObject } from "react";
import { Form, Button, InputGroup, FormControl, Table } from "react-bootstrap";
import React from "react";
import { AppDispatch, RootState } from "../../../provider";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { InquiryItem, modifyInquiry } from "../../../provider/modules/inquiry";

const InquiryEdit = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const inquiryItem = useSelector((state: RootState) =>
    state.inquiry.data.find((item) => item.inquiryId === +id)
  );

  const dispatch = useDispatch<AppDispatch>();

  const isModifyCompleted = useSelector(
    (state: RootState) => state.inquiry.isModifyCompleted
  );

  useEffect(() => {
    isModifyCompleted && router.push("/inquiry");
  }, [isModifyCompleted, router]);

  const titleInput = useRef() as MutableRefObject<HTMLInputElement>;
  const nameInput = useRef() as MutableRefObject<HTMLInputElement>;
  const telInput = useRef() as MutableRefObject<HTMLInputElement>;
  const emailInput = useRef() as MutableRefObject<HTMLInputElement>;
  const descriptionTxta = useRef() as MutableRefObject<HTMLTextAreaElement>;

  const saveItem = (item: InquiryItem) => {
    dispatch(modifyInquiry(item));
  };

  const handleAddClick = () => {
    console.log("save");
    if (inquiryItem) {
      const item = { ...inquiryItem };
      (item.title = titleInput.current ? titleInput.current.value : ""),
        (item.tel = telInput.current ? telInput.current.value : ""),
        (item.name = nameInput.current ? nameInput.current.value : ""),
        (item.description = descriptionTxta.current
          ? descriptionTxta.current.value
          : ""),
        (item.email = emailInput.current ? emailInput.current.value : ""),
        router.push("/inquiry/list");
      saveItem(item);
    }
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
        {inquiryItem && (
          <tbody>
            <tr>
              <th>클래스명</th>
              <td>{inquiryItem?.oneDayClassName}</td>
            </tr>
            <tr>
              <th>제목</th>
              <td>
                <InputGroup className="d-flex">
                  <FormControl
                    placeholder="제목"
                    defaultValue={inquiryItem?.title}
                    ref={titleInput}
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
                    defaultValue={inquiryItem?.name}
                    ref={nameInput}
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
                    defaultValue={inquiryItem?.tel}
                    ref={telInput}
                  />
                </InputGroup>
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="oneday@oneday.com"
                    defaultValue={inquiryItem?.email}
                    ref={emailInput}
                  />
                </InputGroup>
              </td>
            </tr>
            <tr>
              <th>문의내용</th>
              <td>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    defaultValue={inquiryItem?.description}
                  >
                    <Form.Control as="textarea" rows={10} />
                  </Form.Group>
                </Form>
              </td>
            </tr>
          </tbody>
        )}
      </Table>
      <div>
        <Button
          className="btn btn-secondary me-1"
          id="button-addon2"
          onClick={() => {
            handleAddClick();
          }}
        >
          수정하기
        </Button>
        <Button
          className="btn btn-secondary me-1"
          onClick={() => {
            router.push("/inquiry/list");
          }}
        >
          목록
        </Button>
      </div>
    </Layout>
  );
};

export default InquiryEdit;
