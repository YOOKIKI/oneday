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
      <div className="mx-auto">
        <div className="text-center">
          <h1
            style={{
              fontWeight: "lighter",
              color: "#4f5d75",
              textDecorationLine: "underline",
              textUnderlinePosition: "under",
            }}
          >
            1:1문의하기
          </h1>
          <h6 className="text-muted  mt-3">문의할 클래스를 선택해주세요</h6>
        </div>
        <div className="justify-content-md-center d-flex">
          <Table
            responsive="sm"
            style={{ cursor: "pointer", width: "800px" }}
            className="text-center  mt-3"
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
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Inquiry;
