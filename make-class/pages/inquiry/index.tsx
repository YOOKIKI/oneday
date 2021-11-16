import Layout from "../../components/layout";
import React, { useEffect } from "react";
import Link from "next/link";
import { Table, Button } from "react-bootstrap";
// import { InquiryItem } from "../../provider/modules/inquiry";
import router, { useRouter } from "next/router";
import { getTimeString } from "../../lib/string";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../provider";
import { requestFetchPagingOnedays } from "../../middleware/modules/oneday";

const Inquiry = () => {
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

  return (
    <Layout>
      <section>
        <h1>1:1문의</h1>
        <h4>문의할 클래스를 선택해주세요</h4>
      </section>
      <Table responsive="sm" style={{ width: "640px" }}>
        <thead>
          <tr>
            <th>클래스명</th>
            {/* <th>강의일정</th> */}
            <th>신청일</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {(!inquiry.isFetched || inquiry.data.length === 0) && (
            <div className="text-center my-5">신청하신 클래스가 없습니다.</div>
          )}
          <div style={{ display: "flex" }}>
            {inquiry.isFetched &&
              inquiry.data.length > 0 &&
              inquiry.data.map((item, index) => (
                <tr key={`inquiry-item-${index}`}>
                  <td>{item.inquiryId}</td>
                  {/* <td>{item.inquiryId}</td> */}
                  <td>{item.onedayclassName}</td>
                  {/* <td>{item.startDateData}</td> */}
                  <td>{getTimeString(item.createdTime)}</td>
                  <td style={{ width: "110px" }}>
                    {/* <Link href="/inquiry/create"> */}
                    <Button
                      className="bg-light "
                      size="sm"
                      onClick={() => {
                        router.push(`/inquiry/create/${item.inquiryId}`);
                      }}
                    >
                      {" "}
                      문의하기
                    </Button>
                    {/* </Link> */}
                  </td>
                </tr>
              ))}
          </div>
        </tbody>
      </Table>
    </Layout>
  );
};

export default Inquiry;
