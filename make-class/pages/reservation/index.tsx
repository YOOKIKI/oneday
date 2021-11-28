import Layout from "../../components/layout";
import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../provider";
import { requestFetchNextReservations } from "../../middleware/modules/reservation";
import style from "../../pages/onedayclass/hover.module.css";

const ReservationList = () => {
  const reservation = useSelector((state: RootState) => state.reservation);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!reservation.isFetched) {
      const reservationPageSize = localStorage.getItem("reservation_page_size");

      dispatch(
        requestFetchNextReservations({
          page: 0,
          size: reservationPageSize
            ? +reservationPageSize
            : reservation.pageSize,
        })
      );
    }
  }, [dispatch, reservation.isFetched, reservation.pageSize]);

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
          클래스 예약내역
        </h1>
        {!reservation && (
          <div className="text-center my-5">예약내역이 없습니다</div>
        )}
        <h6 className="text-muted">
          클래스명을 클릭하시면 해당 원데이클래스의 상세정보 페이지로 이동합니다
        </h6>
      </section>
      {/* <div style={{ display: "d-flex" }}> */}
      {/* {reservation.isFetched &&
        reservation.data.map((item, index) => (
          <div
            key={`reservation-item-${index}`}
            className="card mb-3 text-center"
            style={{
              cursor: "pointer",
              maxWidth: "500px",
              height: "150px",
            }}
            // onMouseOver={}
          >
            <div className="row g-0">
              <div className="col-md-8">
                <div
                  className="card-body"
                  onClick={() => {
                    router.push(`/onedayclass/detail/${item.oneDayClassId}`);
                  }}
                >
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">
                    예약자명 : {item.name} 연락처 : {item.tel}
                  </p>
                  <p className="card-text">
                    {" "}
                    수업일정 : {item.reservationDay} / {item.reservationTime}
                  </p>
                  <small className="text-muted">
                    예약인원 : {item.person} / 총 수강료 :
                    {new Intl.NumberFormat().format(item.price)}원
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))} */}
      {/* </div> */}

      <Table responsive="sm" style={{ width: "800px" }} className="text-center">
        <thead>
          <tr
            style={{
              marginRight: "250px",
              fontWeight: "lighter",
              color: "#4f5d75",
            }}
          >
            <th>클래스명</th>
            <th>예약자명</th>
            <th>예약인원</th>
            <th>총 수강료</th>
            <th>수업일정</th>
          </tr>
        </thead>
        <tbody>
          {/* {(!onedayClessList.isFetched ||
            onedayClessList.data.length === 0) && (
            <div className="text-center my-5">클래스가 없습니다.</div>
          )} */}
          {reservation.isFetched &&
            reservation.data.map((item, index) => (
              <tr
                key={`reservation-item-${index}`}
                className={style.hover1}
                style={{
                  cursor: "pointer",
                  maxWidth: "500px",
                }}
                onClick={() => {
                  router.push(`/onedayclass/detail/${item.oneDayClassId}`);
                }}
              >
                <td>{item.title}</td>
                <td>{item.name}</td>
                <td>{item.person}</td>
                <td>{new Intl.NumberFormat().format(item.price)}원</td>
                <td>
                  {item.reservationDay} / {item.reservationTime}
                </td>

                <td style={{ marginLeft: "100px" }}>
                  {/* <Link href="/inquiry/create"> */}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Layout>
  );
};

export default ReservationList;
