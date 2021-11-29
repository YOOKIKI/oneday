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

  const handlePageSizeChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    dispatch(
      requestFetchNextReservations({
        page: reservation.page,
        size: +e.currentTarget.value,
      })
    );
  };

  return (
    <Layout>
      <div className="mx-auto ">
        <div className="text-center">
          <h1
            style={{
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
          <h6 className="text-muted mt-3">
            고객님께서 수강할 클래스 예약입니다.
          </h6>
          <h6 className="text-muted  mt-1">
            클래스명을 클릭하시면 해당 원데이클래스 정보 페이지로 이동합니다
          </h6>
        </div>

        <div className="justify-content-md-center d-flex">
          <Table
            responsive="sm"
            style={{ width: "800px" }}
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
                <th>클래스명</th>
                <th>예약자명</th>
                <th>예약인원</th>
                <th>총 수강료</th>
                <th>수업일정</th>
              </tr>
            </thead>
            <tbody className={style.hover}>
              {/* {(!onedayClessList.isFetched ||
            onedayClessList.data.length === 0) && (
            <div className="text-center my-5">클래스가 없습니다.</div>
          )} */}
              {reservation.isFetched &&
                reservation.data.map((item, index) => (
                  <tr
                    key={`reservation-item-${index}`}
                    className={style.hover}
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
        </div>
        {!reservation.isLast && (
          <div className="text-center d-flex justify-content-center">
            <div className="mt-2">
              <a
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    requestFetchNextReservations({
                      page: reservation.page + 1,
                      size: reservation.pageSize,
                    })
                  );
                }}
                className="link-secondary fs-6 text-nowrap"
                style={{ cursor: "pointer" }}
              >
                더보기
              </a>
            </div>
            <div className="text-center d-flex justify-content-center mx-2">
              <select
                className="form-select form-select-sm me-2"
                style={{ width: "60px" }}
                value={reservation.pageSize}
                onChange={(e) => {
                  handlePageSizeChanged(e);
                }}
              >
                {[2, 4, 6, 8, 10].map((size) => (
                  <option key={`select-${size}`} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-secondary me-2"
                onClick={() => {
                  dispatch(
                    requestFetchNextReservations({
                      page: 0,
                      size: reservation.pageSize,
                    })
                  );
                }}
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReservationList;
