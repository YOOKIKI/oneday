import React, { useEffect } from "react";
import Layout from "../../components/layout";
import { Table, Button } from "react-bootstrap";
import { InquiryItem } from "../../provider/modules/inquiry";
import router, { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../provider";
import { getTimeString } from "../../lib/string";
import { requestFetchPagingOnedays } from "../../middleware/modules/oneday";

const List = () => {
  const inquiry = useSelector((state: RootState) => state.inquiry);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!inquiry.isFetched) {
      const inquiryPageSize = localStorage.getItem("inquiry_page_size");

      dispatch(
        requestFetchPagingOnedays({
          page: 0,
          size: inquiryPageSize ? +inquiryPageSize : inquiry.pageSize,
        })
      );
    }
  }, [dispatch, inquiry.isFetched, inquiry.pageSize]);
  // const isModifyCompleted = useSelector(
  // (state: RootState) => state.inquiry.isModifyCompleted

  return (
    <Layout>
      <section>
        <h1>1:1문의 내역</h1>
        <h4>문의한 내역을 선택해주세요</h4>
      </section>
      <Table responsive="sm" style={{ width: "640px" }}>
        <thead>
          <tr>
            <th>문의명</th>
            <th>수강생명</th>
            <th>연락처</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {(!inquiry.isFetched || inquiry.data.length === 0) && (
            <div className="text-center my-5">문의하신 1:1이 없네요</div>
          )}
          <div style={{ display: "flex" }}>
            {inquiry.isFetched &&
              inquiry.data.length > 0 &&
              inquiry.data.map((item, index) => (
                <tr key={`inquiry-item-${index}`}>
                  <td>{item.inquiryId}</td>
                  <td>{item.title}</td>
                  <td>{item.name}</td>
                  <td>{item.tel}</td>
                  <td>{getTimeString(item.createdTime)}</td>
                  <td style={{ width: "130px" }}>
                    {/* <Link href="/inquiry/edit"> */}

                    <Button
                      className="bg-light "
                      size="sm"
                      onClick={() => {
                        router.push(`/inquiry/detail/${item.inquiryId}`);
                      }}
                    >
                      {" "}
                      자세히
                    </Button>
                    {/* 
                <Link href="/inquiry">
                  <Button
                    className="bg-light ms-2"
                    size="sm"
                    onClick={() => {
                      handDeleteClick();
                    }}
                  >
                    {" "}
                    삭제
                  </Button>
                </Link> */}
                  </td>
                </tr>
              ))}
          </div>
        </tbody>
      </Table>
    </Layout>
  );
};

export default List;
