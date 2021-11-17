// import Head from "next/head";
// import Link from "next/link";
import React from "react";
import styles from "./ReservationBar.module.css";
import { useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { AppDispatch, RootState } from "../../provider";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  addReservation,
  ReservationItem,
} from "../../provider/modules/reservation";
import { requestFetchNextOnedays } from "../../middleware/modules/oneday";

export default function reservation() {
  const reservation = useSelector((state: RootState) => state.reservation);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (!reservation.isFetched) {
      const reservationPageSize = localStorage.getItem("reservation_page_size");

      dispatch(
        requestFetchPagingOnedays({
          page: 0,
          size: reservationPageSize
            ? +reservationPageSize
            : reservation.pageSize,
        })
      );
    }
  }, [dispatch, reservation.isFetched, reservation.pageSize]);

  return (
    <div>
      <nav className={styles.resbar}>
        <form>
          <thead>
            <tr></tr>
          </thead>
          <tbody className="text-nowrap">
            <tr>
              <th scope="row">클래스명</th>
              {/* <td>{Item.onedayclassName}</td> */}
            </tr>
            <tr>
              <th></th>
            </tr>
            <tr>
              <th scope="row">이름</th>
              <td>
                <input
                  className="form-control"
                  type="text"
                  placeholder="이름"
                  ref={nameInput}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">연락처</th>
              <td>
                <input
                  className="form-control"
                  type="text"
                  placeholder="010-123-4567"
                  ref={telInput}
                />
              </td>
            </tr>
            <tr>
              <th>인원 수</th>
              <Form.Select aria-label="Default select example">
                <option>인원 수</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
            </tr>

            <tr>
              <th scope="row">참고사항</th>
              <td>
                <textarea
                  className="form-control"
                  ref={descriptionTxta}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </form>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            className="outline-secondary"
            id="button-addon2"
            onClick={() => {
              handleAddClick();
            }}
          >
            예약하기
          </Button>
        </div>
      </nav>
    </div>
  );
}

const Item = [
  {
    id: 2,
    onedayclassName: "핸드메이드",
    name: "수강생",
    tel: "010-222-2222",
    capacity: "2명",
    price: "30000원",
    description: "hi",
    createdTime: new Date().getTime(),
    startDateData: "12월1일",
    endDateData: "12월 3일",
  },
  {
    id: 1,
    onedayclassName: "플라워",
    name: "예약자",
    tel: "010-111-1111",
    capacity: "1명",
    price: "15000원",
    description: "hello",
    createdTime: new Date().getTime(),
    startDateData: "12월9일",
    endDateData: "12월 9일",
  },
];
