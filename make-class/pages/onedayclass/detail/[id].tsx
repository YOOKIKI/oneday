import Layout from "../../../components/layout";
import React, { useEffect } from "react";
import Sidebar from "../../../components/sidebar/sidebar";
import ReservationBar from "../../../components/reservationbar/reservationbar";
import router, { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { GetServerSideProps } from "next";
import { useSelector } from "react-redux";
import { RootState } from "../../../provider";

// export interface OnedayItem {
//   id: number;
//   inquiryId: string;
//   onedayclassName: string;
//   price: string;
//   description?: string;
//   capacity: string;
//   photoUrl: string;
//   fileType: string;
//   fileName: string;
//   createdTime: number;
//   startDateData: string;
//   endDateData: string;
// }

// interface IndexProp {
//   items: OnedayItem[];
// }

const OnedayDetail = () => {
  const router = useRouter();

  const id = router.query.id as String;
  console.log(id);

  const onedayItem = useSelector((state: RootState) =>
    state.oneday.data.find((item) => item.id === +id)
  );

  return (
    <Layout>
      <section style={{ width: "46vw" }} className="mx-auto">
        <h2 className="text-center">원데이 클래스</h2>

        {!onedayItem && (
          <div className="text-center my-5">데이터가 없습니다.</div>
        )}
        <div>
          {onedayItem && (
            <table className="table">
              <tbody>
                <tr>
                  <th></th>
                </tr>
                <tr>
                  <th></th>
                  <td>
                    <img src={onedayItem.photoUrl} width={"100%"} />
                  </td>
                  <td>
                    <ReservationBar />
                  </td>
                </tr>
                <tr>
                  <th>클래스명</th>
                  <td>{onedayItem.onedayclassName}</td>
                </tr>
                <tr>
                  <th>price</th>
                  <td>{onedayItem.price}</td>
                </tr>
                <tr>
                  <th>capacity</th>
                  <td>{onedayItem.capacity}</td>
                </tr>
                <tr>
                  <th>일정</th>
                  <td>{onedayItem.startDateData}</td>
                  <td>{onedayItem.endDateData}</td>
                </tr>
                <tr>
                  <th>설명</th>
                  <td>{onedayItem.description}</td>
                </tr>
                {/* <tr>
                  <th>설명</th>
                  <td>{onedayItem.description}</td>
                </tr> */}
              </tbody>
            </table>
          )}
        </div>

        <div className="d-flex">
          <div style={{ width: "50%" }}>
            <Button
              className="btn btn-secondary me-1"
              onClick={() => {
                router.push("/onedayclass");
              }}
            >
              목록
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const items = [
    {
      id: 2,
      inquiryId: "2",
      onedayclassName: "핸드메이드",
      price: "",
      description: "onedayclass..",
      capacity: "",
      photoUrl: "/clss.jpg",
      fileType: "",
      fileName: "",
      createdTime: new Date().getTime(),
      startDateData: "12월1일",
      endDateData: "12월 3일",
    },
    {
      id: 1,
      inquiryId: "1",
      onedayclassName: "플라워",
      price: "",
      description: "onedayclass..",
      capacity: "",
      photoUrl: "/class.jpg",
      fileType: "",
      fileName: "",
      createdTime: new Date().getTime(),
      startDateData: "12월9일",
      endDateData: "12월 9일",
    },
  ];

  return { props: { items } };
};

export default OnedayDetail;
