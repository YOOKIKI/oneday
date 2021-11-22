import Layout from "../../components/layout";
import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../provider";
import { getTimeString } from "../../lib/string";
import {
  requestFetchNextReservations,
  requestFetchReservations,
} from "../../middleware/modules/reservation";

const reservationList = () => {
  const reservation = useSelector((state: RootState) => state.reservation);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   if (!reservation.isFetched) {
  //     const reservationPageSize = localStorage.getItem("reservation_page_size");

  //   }
  // },
  // dispatch, reservation.isFetched, reservation.pageSize]);

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
      <section>
        <h1>클래스 예약내역</h1>
        {!reservation && (
          <div className="text-center my-5">예약내역이 없습니다</div>
        )}
        <h4>예약한 클래스 내역입니다</h4>
        <h6>
          클래스명을 클릭하시면 해당 원데이클래스의 상세정보 페이지로 이동합니다
        </h6>
      </section>
      <Table responsive="sm" style={{ width: "640px" }}>
        <thead>
          <tr>
            <th>클래스명</th>
            <th>강의일정</th>
            <th>강의 시간</th>
            <th>수강생</th>
            <th>인원수</th>
            <th>가격</th>
            <th>연락처</th>
            {/* <th>클래스 보기</th> */}
          </tr>
        </thead>
        <tbody>
          {reservation.isFetched &&
            reservation.data.map((item, index) => (
              <tr key={`reservation-item-${index}`}>
                <td
                  onClick={() => {
                    router.push(`/onedayclass/detail/${item.oneDayClassId}`);
                  }}
                >
                  {item.title}
                </td>
                <td>{item.reservationDay}</td>
                <td>{item.reservationTime}</td>
                <td>{item.name}</td>
                <td>{item.person}</td>
                <td>{item.price}</td>
                <td>{item.tel}</td>
                {/* <td style={{ width: "130px" }}>
                  <Button
                    className="bg-light "
                    size="sm"
                    onClick={() => {
                      router.push(`/onedayclass/detail/${item.oneDayClassId}`);
                    }}
                  >
                    {" "}
                    자세히
                  </Button>
                </td> */}
              </tr>
            ))}
        </tbody>
      </Table>
    </Layout>
  );
};

export default reservationList;
