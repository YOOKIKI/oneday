import Layout from "../../components/layout";
import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../provider";
import { requestFetchNextOneday } from "../../middleware/modules/oneday";
import styles from "./layout.module.css";

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
      <section className="text-start" style={{ width: "800px" }}>
        <h1
          style={{
            marginRight: "250px",
            fontWeight: "lighter",
            color: "#4f5d75",
            textDecorationLine: "underline",
            textUnderlinePosition: "under",
          }}
        >
          1:1문의
        </h1>
        <h6 className="text-muted">문의할 클래스를 선택해주세요</h6>
      </section>
      <Table
        responsive="sm"
        style={{ cursor: "pointer", width: "800px" }}
        className="text-center"
      >
        <thead>
          <tr
            style={{
              marginRight: "250px",
              fontWeight: "lighter",
              color: "#4f5d75",
            }}
          >
            <th>#</th>
            <th>클래스명</th>
            {/* <th>문의하러 가기</th> */}
          </tr>
        </thead>
        <tbody>
          {/* {(!onedayClessList.isFetched ||
            onedayClessList.data.length === 0) && (
            <div className="text-center my-5">클래스가 없습니다.</div>
          )} */}
          {onedayClessList.data.map((item, index) => (
            <tr
              key={`inquiry-item-${index}`}
              onClick={() => {
                router.push(`/inquiry/create/${item.oneDayClassId}`);
              }}
            >
              <td>{item.category}</td>
              {/* <td>{item.inquiryId}</td> */}
              <td>{item.title}</td>
              {/* <td>{item.startDateData}</td> */}
              <td style={{ marginLeft: "100px" }}>
                {/* <Link href="/inquiry/create"> */}
                {/* <Button
                  className="bg-light text-nowrap"
                  size="sm"
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#6373919d",
                    justifyContent: "center",
                  }}
                >
                  {" "}
                  👉
                </Button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};

export default Inquiry;
