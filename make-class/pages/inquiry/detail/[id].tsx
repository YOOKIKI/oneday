import Layout from "../../../components/layout";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../../provider";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { InquiryItem, removeInquiry } from "../../../provider/modules/inquiry";
import {
  requestFetchInquiryItem,
  requestFetchPagingInquirys,
} from "../../../middleware/modules/inquiry";
import { GetServerSideProps } from "next";
import axios from "axios";

export interface InquiryProp {
  item: InquiryItem;
}

const Detail = ({ item }: InquiryProp) => {
  const inquiry = useSelector((state: RootState) => state.inquiry);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const inquiryId = router.query.inquiryId as String;
  console.log(inquiryId);

  useEffect(() => {
    if (!inquiry.isFetched) {
      const inquiryPageSize = localStorage.getItem("reservation_page_size");
      dispatch(
        requestFetchPagingInquirys({
          page: 0,
          size: inquiryPageSize ? +inquiryPageSize : inquiry.pageSize,
        })
      );
    }
  }, [dispatch, inquiry.isFetched, inquiry.pageSize]);

  const isRemoveCompleted = useSelector(
    (state: RootState) => state.inquiry.isRemoveCompleted
  );

  useEffect(() => {
    // isRemoveCompleted && router.push(`/inquiry/edit/${inquiryId}`);
    isRemoveCompleted && router.push("/inquiry");
  }, [isRemoveCompleted, router]);

  const customer = useSelector((state: RootState) => state.customer);

  useEffect(() => {
    if (customer.customerId > 0) {
      dispatch(requestFetchInquiryItem(customer.customerId));
    }
  }, [dispatch, inquiry.isFetched, inquiry.pageSize]);

  return (
    <Layout>
      <>
        <section style={{ width: "50vw" }} className="mx-3">
          <h2 className="text-center">문의내역 자세히 보기</h2>
          <div className="detail-wrap d-flex" style={{ width: "80%" }}>
            <table className="table">
              {/* {(!inquiry.isFetched || inquiry.data.length === 0) && ( */}
              <div className="text-center my-5">데이터가 없습니다.</div>
              {/* )} */}
              {/* {inquiry.data.map((item, index) => ( */}
              {/* <tr key={`inquiry-item-${index}`}> */}
              <tr>
                <th>클래스명</th>
                <td>{item.oneDayClassName}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.tel}</td>
              </tr>
              {/* ))} */}
            </table>
          </div>
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
                  dispatch(removeInquiry(+inquiryId));
                  router.push("/inquiry/list");
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
      </>
    </Layout>
  );
};

// export async function getServerSideProps() {
export const getServerSideProps: GetServerSideProps = async (context) => {
  const inquiryId = context.params?.inquiryId;
  const res = await axios.get<InquiryItem[]>(
    `${process.env.NEXT_PUBLIC_API_BASE}/inquiry/${inquiryId}`
  );
  const item = res.data;

  return { props: { item } };
};

export default Detail;
