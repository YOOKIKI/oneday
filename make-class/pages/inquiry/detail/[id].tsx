import Layout from "../../../components/layout";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../../provider";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { InquiryItem, removeInquiry } from "../../../provider/modules/inquiry";
import style from "../inquiry.module.css";

const Detail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const inquiry = useSelector((state: RootState) => state.inquiry);

  const id = router.query.id as String;
  console.log(id);

  let inquiryItem = useSelector((state: RootState) =>
    state.inquiry.data.find((item) => item.inquiryId === +id)
  );

  // useEffect(() => {
  //   if (!inquiry.isFetched) {
  //     const inquiryPageSize = localStorage.getItem("inquiry_page_size");

  //     dispatch(
  //       requestFetchPagingInquirys({
  //         page: 0,
  //         size: inquiryPageSize ? +inquiryPageSize : inquiry.pageSize,
  //       })
  //     );
  //   }
  // }, [dispatch, inquiry.isFetched, inquiry.pageSize]);

  const isRemoveCompleted = useSelector(
    (state: RootState) => state.inquiry.isRemoveCompleted
  );

  useEffect(() => {
    // isRemoveCompleted && router.push(`/inquiry/edit/${inquiryId}`);
    isRemoveCompleted && router.push("/inquiry");
  }, [isRemoveCompleted, router]);

  return (
    <Layout>
      <>
        <section style={{ width: "60vw" }} className="text-center mx-3">
          <h2
            className="text-center"
            style={{
              fontWeight: "lighter",
              color: "#4f5d75",
              textDecorationLine: "underline",
              textUnderlinePosition: "under",
            }}
          >
            문의내역 자세히 보기
          </h2>
          <h6 className="text-muted  mt-3">고객님께서 문의한 내용입니다.</h6>
          <div className="detail-wrap d-flex" style={{ width: "80%" }}>
            <table className="table ">
              {inquiryItem && (
                <thead>
                  <tr className={style.inquiry}>
                    <th>클래스명</th>
                    <td>{inquiryItem.oneDayClassName}</td>
                  </tr>
                  <tr className={style.inquiry}>
                    <th>제목</th>
                    <td>{inquiryItem.title}</td>
                  </tr>
                  <tr className={style.inquiry}>
                    <th>이름</th>
                    <td>{inquiryItem.name}</td>
                  </tr>
                  <tr className={style.inquiry}>
                    <th>연락처</th>
                    <td>{inquiryItem.tel}</td>
                  </tr>
                  <tr className={style.inquiry}>
                    <th>이메일</th>
                    <td>{inquiryItem.email}</td>
                  </tr>
                  <tr className={style.inquiry}>
                    <th>문의내용</th>
                    <td>{inquiryItem.description}</td>
                  </tr>
                  <tr className={style.inquiry}>
                    <th>답변</th>
                    <td>{inquiryItem.answer}</td>
                  </tr>
                </thead>
              )}
            </table>
          </div>
          <div className="d-flex mt-2">
            <div style={{ width: "50%" }}>
              <div className="outline-secondary text-nowrap">
                <Button
                  className="btn btn-secondary me-1"
                  onClick={() => {
                    router.push("/inquiry/list");
                  }}
                >
                  목록
                </Button>
                {/* <Button
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
                    dispatch(removeInquiry(+id));
                    router.push("/inquiry/list");
                  }}
                >
                  삭제
                </Button> */}
              </div>
              {/* {!inquiry.isFetched && (
                <div className="text-center my-5">
                  아직 도착한 답변이 없네요!
                </div>
              )}
              {inquiry.isFetched && (
                <div className="card">
                  <div className="card-header">답변이 도착했어요!</div>
                  <div className="card-body">
                    <blockquote className="blockquote mb-0">
                      <p>{inquiryItem?.answer}</p>
                    </blockquote>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
};

export default Detail;
