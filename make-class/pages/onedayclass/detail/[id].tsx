import Layout from "../../../components/layout";
import Link from "next/link";
import React, { useEffect } from "react";
import Sidebar from "../../../components/sidebar/sidebar";
import ReservationBar from "../../../components/reservationbar/reservationbar";
import router, { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../../provider";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import HeadBar from "../../../components/headbar/headbar";

const OnedayDetail = () => {
  const router = useRouter();

  const id = router.query.id as String;
  console.log(id);

  const onedayItem = useSelector((state: RootState) =>
    state.oneday.data.find((item) => item.id === +id)
  );

  return (
    <Layout>
      {/* <Sidebar /> */}
      {/* <HeadBar /> */}

      {/* <div style={{ justifyContent: "flex-end" }}> */}

      {/* </div> */}
      <article>
        <section style={{ width: "46vw" }} className="mx-auto">
          <h2 className="text-center">원데이 클래스</h2>

          {!onedayItem && (
            <div className="text-center my-5">데이터가 없습니다.</div>
          )}
          {onedayItem && (
            <table className="table">
              <tbody>
                {/* <tr>
                  <th></th>
                  <td>{onedayItem.id}</td>
                </tr> */}
                <tr>
                  <th>클래스명</th>
                  <td>{onedayItem.onedayclassName}</td>
                </tr>
                <tr>
                  <th>설명</th>
                  <td>{onedayItem.description}</td>
                </tr>
                <tr>
                  <th>이미지</th>
                  <td>
                    <img
                      src={onedayItem.photoUrl}
                      // alt={onedayItem.photoUrl}
                      width={"100%"}
                    />
                  </td>
                  <td>
                    <ReservationBar />
                  </td>
                </tr>
              </tbody>
            </table>
          )}

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
              {/* <Button
                className="btn btn-secondary me-1"
                onClick={() => {
                  router.push("/reservation");
                }}
              >
                예약하기
              </Button> */}
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default OnedayDetail;
