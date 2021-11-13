import React from "react";
import Layout from "../../components/layout";
import { Table, Button } from "react-bootstrap";
import { InquiryItem } from "../../provider/modules/inquiry";
import router, { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../provider";
import { getTimeString } from "../../lib/string";

// const Item = [
//   {
//     id: 1,
//     title: "문의합니다",
//     name: "수강생",
//     onedayclassName: "",
//     createdTime: new Date().getTime(),
//   },
//   {
//     id: 2,
//     title: "문의",
//     name: "수강생",
//     onedayclassName: "",
//     createdTime: new Date().getTime(),
//   },
// ];

const List = () => {
  const inquiry = useSelector((state: RootState) => state.inquiry);
  const router = useRouter();

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
            <th></th>
            <th>문의명</th>
            <th>수강생명</th>
            <th>연락처</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {inquiry.data.map((item, index) => (
            <tr key={`inquiry-item-${index}`}>
              <td>{item.id}</td>
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
                    router.push(`/inquiry/detail/${item.id}`);
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
        </tbody>
      </Table>
    </Layout>
  );
};

export default List;
