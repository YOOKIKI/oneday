import Layout from "../../components/layout";
import React, { useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import ReservationBar from "../../components/reservationbar/reservationbar";
import router, { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { GetServerSideProps } from "next";

export interface ReservationItem {
  id: number;
  inquiryId: string;
  onedayclassName: string;
  price: string;
  description?: string;
  capacity: string;
  photoUrl: string;
  fileType: string;
  fileName: string;
  createdTime: number;
  startDateData: string;
  endDateData: string;
}

interface IndexProp {
  items: ReservationItem[];
}

const ReservationDetail = ({ items }: IndexProp) => {
  const router = useRouter();

  // const id = router.query.id as String;
  // console.log(id);

  return (
    <Layout>
      {/* </div> */}
      <article>
        {items.map((item, index) => (
          <section
            key={`oneday-item-${index}`}
            style={{ width: "46vw" }}
            className="mx-auto"
          >
            <h2 className="text-center">예약내역</h2>
            <div>
              {!items && (
                <div className="text-center my-5">데이터가 없습니다.</div>
              )}
              <div>
                {items && (
                  <table className="table">
                    <tbody>
                      <div>
                        <tr>
                          <th></th>
                        </tr>
                        <tr>
                          <th>이미지</th>
                          <td>
                            <img src={item.photoUrl} width={"100%"} />
                          </td>
                          <td>
                            <ReservationBar />
                          </td>
                        </tr>
                        <tr>
                          <th>클래스명</th>
                          <td>{item.onedayclassName}</td>
                        </tr>
                        <tr>
                          <th>설명</th>
                          <td>{item.description}</td>
                        </tr>
                        <tr>
                          <th>설명</th>
                          <td>{item.description}</td>
                        </tr>
                        <tr>
                          <th>설명</th>
                          <td>{item.description}</td>
                        </tr>
                        <tr>
                          <th>설명</th>
                          <td>{item.description}</td>
                        </tr>
                        <tr>
                          <th>설명</th>
                          <td>{item.description}</td>
                        </tr>
                      </div>
                    </tbody>
                  </table>
                )}
              </div>

              <div className="d-flex">
                <div style={{ width: "50%" }}>
                  <Button
                    className="btn btn-secondary me-1"
                    onClick={() => {
                      router.push("/inauiry");
                    }}
                  >
                    목록
                  </Button>
                </div>
              </div>
            </div>
          </section>
        ))}
      </article>
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

export default ReservationDetail;
