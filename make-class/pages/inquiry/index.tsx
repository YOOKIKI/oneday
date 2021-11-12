import Layout from "../../components/layout";
import React from "react";
import Link from "next/link";
import { Table, Button } from "react-bootstrap";
// import { InquiryItem } from "../../provider/modules/inquiry";
import router, { useRouter } from "next/router";
import { getTimeString } from "../../lib/string";
import { useSelector } from "react-redux";
import { RootState } from "../../provider";

const Inquiry = () => {
  const oneday = useSelector((state: RootState) => state.oneday);
  const router = useRouter();

  return (
    <Layout>
      <section>
        <h1>1:1문의</h1>
        <h4>문의할 클래스를 선택해주세요</h4>
      </section>
      <Table responsive="sm" style={{ width: "640px" }}>
        <thead>
          <tr>
            <th></th>
            <th>클래스명</th>
            <th>강의일정</th>
            <th>신청일</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {oneday.data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              {/* <td>{item.inquiryId}</td> */}
              <td>{item.onedayclassName}</td>
              <td>{item.startDateData}</td>
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
        </tbody>
      </Table>
    </Layout>
  );
};

export default Inquiry;
