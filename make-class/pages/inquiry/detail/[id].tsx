import Layout from "../../../components/layout";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../../provider";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { removeInquiry } from "../../../provider/modules/inquiry";
import { getTimeString } from "../../../lib/string";
import { requestFetchInquiryItem } from "../../../middleware/modules/inquiry";
import { requestFetchPagingOnedays } from "../../../middleware/modules/oneday";

const detail = () => {
  const inquiry = useSelector((state: RootState) => state.inquiry);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const inquiryId = router.query.inquiryId as String;
  console.log(inquiryId);

  let inquiryItem = useSelector((state: RootState) =>
    state.inquiry.data.find((item) => item.inquiryId === +inquiryId)
  );

  if (inquiryId) {
    if (!inquiryItem) {
      dispatch(requestFetchInquiryItem(+inquiryId));
    }
  }

  const isRemoveCompleted = useSelector(
    (state: RootState) => state.inquiry.isRemoveCompleted
  );

  useEffect(() => {
    // isRemoveCompleted && router.push(`/inquiry/edit/${inquiryId}`);
    isRemoveCompleted && router.push("/inquiry");
  }, [isRemoveCompleted, router]);

  useEffect(() => {
    if (!inquiry.isFetched) {
      const onedayPageSize = localStorage.getItem("inquiry_page_size");

      dispatch(
        requestFetchPagingOnedays({
          page: 0,
          size: onedayPageSize ? +onedayPageSize : inquiry.pageSize,
        })
      );
    }
  }, [dispatch, inquiry.isFetched, inquiry.pageSize]);

  const handleDeleteClick = () => {
    dispatch(removeInquiry(+inquiryId));

    router.push("/inquiry/list");
  };

  return (
    <Layout>
      <article>
        <section style={{ width: "50vw" }} className="mx-3">
          <h2 className="text-center">문의내역 자세히 보기</h2>
          {!inquiryItem && (
            <div className="text-center my-5">문의한 내역이 없네요!</div>
          )}
          {inquiryItem && (
            <table className="table">
              <tbody>
                <tr>
                  <th></th>
                  <td>{inquiryItem.inquiryId}</td>
                </tr>
                <tr>
                  <th>클래스명</th>
                  <td>{inquiryItem.onedayclassName}</td>
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
                  router.push(`/inquiry/edit/${inquiryId}`);
                }}
              >
                수정
              </Button>
              <Button
                className="btn btn-secondary me-1"
                onClick={() => {
                  // dispatch(removeInquiry(+inquiryId));
                  // router.push("/inquiry/list");
                  handleDeleteClick();
                }}
              >
                삭제
              </Button>
              {(!inquiry.isFetched || inquiry.data.length === 0) && (
                <div className="text-center my-5">
                  아직 도착한 답변이 없네요!
                </div>
              )}
              {inquiry.isFetched &&
                inquiry.data.length > 0 &&
                inquiry.data.map((item, index) => (
                  <div className="card" key={`inquiry-item-${index}`}>
                    <div className="card-header">답변이 도착했어요!</div>
                    <div className="card-body">
                      <blockquote className="blockquote mb-0">
                        <p>{item.description}</p>
                      </blockquote>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default detail;
