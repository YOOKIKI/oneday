import Layout from "../../../components/layout";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../../provider";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import inquiry, {
  addInquiry,
  InquiryItem,
  removeInquiry,
} from "../../../provider/modules/inquiry";
import { getTimeString } from "../../../lib/string";

const detail = () => {
  const titleInput = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const telInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const descriptionTxta = useRef<HTMLTextAreaElement>(null);

  const inquiryData = useSelector((state: RootState) => state.inquiry.data);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const id = router.query.id as String;
  console.log(id);

  const inquiryItem = useSelector((state: RootState) =>
    state.inquiry.data.find((item) => item.id === +id)
  );

  // const handleAddClick = () => {
  //   const item: InquiryItem = {
  //     id: inquiryData.length ? inquiryData[0].id + 1 : 1,
  //     title: titleInput.current ? titleInput.current.value : "",
  //     name: nameInput.current ? nameInput.current.value : "",
  //     tel: telInput.current ? telInput.current.value : "",
  //     email: emailInput.current ? emailInput.current.value : "",
  //     description: descriptionTxta.current ? descriptionTxta.current.value : "",
  //     createdTime: new Date().getTime(),
  //   };

  //   console.log(item);
  //   dispatch(addInquiry(item));

  //   router.push("/inquiry");
  // };

  const isRemoveCompleted = useSelector(
    (state: RootState) => state.inquiry.isRemoveCompleted
  );

  useEffect(() => {
    isRemoveCompleted && router.push(`/inquiry/edit/${id}`);
  }, [isRemoveCompleted, router]);

  const handleDeleteClick = () => {
    dispatch(removeInquiry(+id));

    router.push("/inquiry/list");
  };

  return (
    <Layout>
      <article>
        <section style={{ width: "46vw" }} className="mx-auto">
          <h2 className="text-center">문의내역 자세히 보기</h2>
          {!inquiryItem && (
            <div className="text-center my-5">데이터가 없습니다.</div>
          )}
          {inquiryItem && (
            <table className="table">
              <tbody>
                <tr>
                  <th></th>
                  <td>{inquiryItem.id}</td>
                </tr>
                <tr>
                  <th>클래스명</th>
                  <td>{inquiryItem.classId}</td>
                </tr>
                <tr>
                  <th>문의명</th>
                  <td>{inquiryItem.title}</td>
                </tr>
                <tr>
                  <th>수강생명</th>
                  <td>{inquiryItem.name}</td>
                </tr>
                <tr>
                  <th>연락처</th>
                  <td>{inquiryItem.tel}</td>
                </tr>
                <tr>
                  <th>이메일</th>
                  <td>{inquiryItem.email}</td>
                </tr>
                <tr>
                  <th>내용</th>
                  <td>{inquiryItem.description}</td>
                </tr>
                <tr>
                  <th>작성일</th>
                  <td>{getTimeString(inquiryItem.createdTime)}</td>
                </tr>
              </tbody>
            </table>
          )}

          <div className="d-flex">
            <div style={{ width: "50%" }}>
              <Button
                className="btn btn-secondary me-1"
                onClick={() => {
                  router.push("/inquiry/list");
                }}
              >
                목록
              </Button>

              <Button
                className="btn btn-secondary me-1"
                onClick={() => {
                  router.push(`/inquiry/edit/${id}`);
                }}
              >
                수정
              </Button>
              <Button
                className="btn btn-secondary me-1"
                onClick={() => {
                  handleDeleteClick();
                }}
              >
                삭제
              </Button>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default detail;
