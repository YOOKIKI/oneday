import Layout from "../../../components/layout";
import React, { useEffect } from "react";
import Sidebar from "../../../components/sidebar/sidebar";
import ReservationBar from "../../../components/reservationbar/reservationbar";
import router, { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { GetServerSideProps } from "next";
import { useSelector } from "react-redux";
import { RootState } from "../../../provider";

const OnedayDetail = () => {
  const router = useRouter();

  const id = router.query.id as String;
  console.log(id);

  const onedayItem = useSelector((state: RootState) =>
    state.oneday.data.find((item) => item.oneDayClassId === +id)
  );

  return (
    <Layout>
      <body style={{ float: "inline-end" }}>
        <section style={{ width: "46vw" }}>
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
                    <td>{onedayItem.title}</td>
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
                    <td>{onedayItem.startTime}</td>
                    <td>{onedayItem.endTime}</td>
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
      </body>
    </Layout>
  );
};

export default OnedayDetail;
