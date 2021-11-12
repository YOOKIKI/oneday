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

// export default function ReservationBar() {
//   return (
//     <nav className={styles.resbar}>
//       <div>

//       </div>
//     </nav>
//   );
// }

const Item = [
  {
    id: 1,
    onedayclassName: "oneday강좌1",
    price: "",
    name: "",
    tel: "",
    capacity: "",
    description: "oneday는..",
  },
  {
    id: 2,
    onedayclassName: "oneday강좌2",
    price: "",
    name: "",
    tel: "",
    capacity: "",
    description: "oneday는..",
  },
];

export default function ReservationBar() {
  const onedayclassNameInput = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const telInput = useRef<HTMLInputElement>(null);
  const capacityInput = useRef<HTMLInputElement>(null);
  const descriptionTxta = useRef<HTMLTextAreaElement>(null);
  const priceInput = useRef<HTMLInputElement>(null);

  const inquiryData = useSelector((state: RootState) => state.inquiry.data);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleAddClick = () => {
    const item: ReservationItem = {
      id: inquiryData.length ? inquiryData[0].id + 1 : 1,
      onedayclassName: onedayclassNameInput.current
        ? onedayclassNameInput.current.value
        : "",
      price: priceInput.current ? priceInput.current.value : "",
      name: nameInput.current ? nameInput.current.value : "",
      tel: telInput.current ? telInput.current.value : "",
      capacity: capacityInput.current ? capacityInput.current.value : "",
      description: descriptionTxta.current ? descriptionTxta.current.value : "",
      createdTime: new Date().getTime(),
      startDateData: new Date().getTime(),
      endDateData: new Date().getTime(),
    };

    console.log(item);
    dispatch(addReservation(item));

    router.push("/inquiry");
  };

  return (
    <div>
      <nav className={styles.resbar}>
        <form>
          <thead>
            <tr></tr>
          </thead>
          <tbody>
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
