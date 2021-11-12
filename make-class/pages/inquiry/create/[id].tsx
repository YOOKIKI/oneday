import { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { AppDispatch, RootState } from "../../../provider";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { addInquiry, InquiryItem } from "../../../provider/modules/inquiry";
import React, { useState } from "react";
import Layout from "../../../components/layout";

const create = () => {
  const titleInput = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const telInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const descriptionTxta = useRef<HTMLTextAreaElement>(null);

  const inquiryData = useSelector((state: RootState) => state.inquiry.data);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleAddClick = () => {
    const item: InquiryItem = {
      id: inquiryData.length ? inquiryData[0].id + 1 : 1,
      title: titleInput.current ? titleInput.current.value : "",
      name: nameInput.current ? nameInput.current.value : "",
      tel: telInput.current ? telInput.current.value : "",
      email: emailInput.current ? emailInput.current.value : "",
      description: descriptionTxta.current ? descriptionTxta.current.value : "",
      createdTime: new Date().getTime(),
    };

    console.log(item);
    dispatch(addInquiry(item));

    router.push("/inquiry/list");
  };

  return (
    <Layout>
      <div style={{ width: "600px" }} className="mx-auto">
        {/* <div className="flex-center"> */}
        <h3>1:1상담 문의</h3>
        <a>문의하실 내용을 아래 입력해주세요.</a>
        {/* </div> */}
        <form>
          <table className="table">
            <thead>
              <tr>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">제목</th>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="제목"
                    ref={titleInput}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">이름</th>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="이름"
                    ref={nameInput}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">연락처</th>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="010-123-4567"
                    ref={telInput}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">이메일</th>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="oneday@mail.com"
                    ref={emailInput}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">내용</th>
                <td>
                  <textarea
                    className="form-control"
                    style={{ height: "40vh" }}
                    ref={descriptionTxta}
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            className="outline-secondary"
            id="button-addon2"
            onClick={() => {
              router.push("/inquiry");
            }}
          >
            목록
          </Button>
          <Button
            className="outline-secondary"
            id="button-addon2"
            onClick={() => {
              handleAddClick();
            }}
          >
            문의하기
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default create;
