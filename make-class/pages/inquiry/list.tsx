import React, { useEffect } from "react";
import Layout from "../../components/layout";
import { Table, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../provider";
import { getTimeString } from "../../lib/string";
import { requestFetchInquirys } from "../../middleware/modules/inquiry";

const List = () => {
  const inquiry = useSelector((state: RootState) => state.inquiry);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const customer = useSelector((state: RootState) => state.customer);

  useEffect(() => {
    if (customer.customerId > 0) {
      dispatch(requestFetchInquirys(customer.customerId));
    }
  }, []);

  return (
    <Layout>
      <section>
        <h1>1:1문의 내역</h1>
        <h4>문의한 내역을 선택해주세요</h4>
      </section>
      <Table responsive="sm" style={{ width: "640px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>제목</th>
            <th>작성자</th>
            <th>연락처</th>
            <th>작성일시</th>
            <th>문의클래스</th>
            <th>자세히보기</th>
          </tr>
        </thead>
        <tbody>
          {inquiry.isFetched &&
            inquiry.data.map((item, index) => (
              <tr key={`inquiry-item-${index}`}>
                <td>{item.inquiryId}</td>
                <td>{item.title}</td>
                <td>{item.name}</td>
                <td>{item.tel}</td>
                <td>{getTimeString(item.createdTime)}</td>
                <td>{item.oneDayClassName}</td>
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
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Layout>
  );
};

export default List;
