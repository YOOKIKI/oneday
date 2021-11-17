import Layout from "../../components/layout";
import React, { useEffect, useRef } from "react";
import styles from "./ReservationBar.module.css";
import { Table, Button, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../provider";
import { requestFetchPagingOnedays } from "../../middleware/modules/oneday";

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
      <nav>
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
