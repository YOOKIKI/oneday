import Layout from "../../components/layout";
import React, { useEffect } from "react";
import Link from "next/link";
import { Table, Button } from "react-bootstrap";
// import { InquiryItem } from "../../provider/modules/inquiry";
import router, { useRouter } from "next/router";
import { getTimeString } from "../../lib/string";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../provider";
import { requestFetchNextOneday } from "../../middleware/modules/oneday";

const Inquiry = () => {
  const inquiry = useSelector((state: RootState) => state.inquiry);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const onedayClessList = useSelector((state: RootState) => state.oneday);

  useEffect(() => {
    dispatch(requestFetchNextOneday());
  }, []);

  return (
    <Layout>
      <section>
        <h1>1:1문의</h1>
        <h4>문의할 클래스를 선택해주세요</h4>
      </section>
      <Table responsive="sm" style={{ width: "640px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>클래스명</th>
            <th>신청일</th>
          </tr>
        </thead>
        <tbody>
          {(!onedayClessList.isFetched ||
            onedayClessList.data.length === 0) && (
            <div className="text-center my-5">클래스가 없습니다.</div>
          )}
          {onedayClessList.data.map((item, index) => (
            <tr key={`inquiry-item-${index}`}>
              <td>{item.oneDayClassId}</td>
              {/* <td>{item.inquiryId}</td> */}
              <td>{item.title}</td>
              {/* <td>{item.startDateData}</td> */}
              <td style={{ marginLeft: "100px" }}>
                {/* <Link href="/inquiry/create"> */}
                <Button
                  className="bg-light "
                  size="sm"
                  onClick={() => {
                    router.push(`/inquiry/create/${item.oneDayClassId}`);
                  }}
                >
                  {" "}
                  문의하기
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};

export default Inquiry;
