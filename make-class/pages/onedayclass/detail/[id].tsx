import Layout from "../../../components/layout";
import React, { MutableRefObject, useRef } from "react";
import { useRouter } from "next/router";
import { Button, Card } from "react-bootstrap";
import { GetServerSideProps } from "next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../provider";
import { OneDayItem } from "../../../provider/modules/oneday ";
import { getTimeString } from "../../../lib/string";
import axios from "axios";
import { ReservationItem } from "../../../provider/modules/reservation";
import { requestAddReservation } from "../../../middleware/modules/reservation";
import style from "../../../pages/onedayclass/hover.module.css";

export interface OnedayProp {
  item: OneDayItem;
}

const OnedayDetail = ({ item }: OnedayProp) => {
  const nameInput = useRef() as MutableRefObject<HTMLInputElement>;
  const telInput = useRef() as MutableRefObject<HTMLInputElement>;
  const countSelect = useRef() as MutableRefObject<HTMLSelectElement>;
  const timeSelect = useRef() as MutableRefObject<HTMLSelectElement>;
  const dayInput = useRef() as MutableRefObject<HTMLInputElement>;

  const router = useRouter();

  const id = router.query.id as String; //클릭했을때 물고 들어오는 원데이클래스의 id

  const dispatch = useDispatch<AppDispatch>();

  const createReservation = (onedayItemId: number) => {
    const name = nameInput.current.value;
    const tel = telInput.current.value;
    const count = countSelect.current.value;
    const time = timeSelect.current.value;
    const day = dayInput.current.value;

    const reservationItem: ReservationItem = {
      oneDayClassId: onedayItemId,
      name: name,
      tel: tel,
      reservationTime: time,
      reservationDay: day,
      person: +count,
      price:
        item && item.price > 0 ? item.price * +countSelect.current.value : 0,
      capacity: item && item.capacity ? item.capacity : 0,
      title: item && item ? item.title : "",
      createdTime: new Date().getTime(),
    };

    if (reservationItem) {
      console.log(" 예약  시작! ");
      dispatch(requestAddReservation(reservationItem)); //비동기
      console.log(" 예약  끝 ! ");
    }
  };

  return (
    <Layout>
      <h2
        className="text-center"
        style={{
          marginRight: "250px",
          fontWeight: "lighter",
          color: "#4f5d75",
          textDecorationLine: "underline",
          textUnderlinePosition: "under",
        }}
      >
        {item.title}
      </h2>
      <div className="d-flex mt-5">
        {/* 디테일 */}
        <div
          className="text-nowrap d-flex"
          style={{ width: "80%", justifyContent: "center" }}
        >
          <div
            style={{ width: "30rem", borderRadius: "10px 10px 10px 10px" }}
            className="text-center"
          >
            <img
              src={item.photoUrl}
              className="img-thumbnail"
              width={"500px"}
            />
            <body className="m-3">
              <>
                <div>클래스 사진</div>
                <div className="mb-2 text-muted">
                  모집인원수 : {item.capacity}
                </div>
                <div className="mb-2 text-muted">
                  클래스 일정 : {item.startDay} - {item.endDay}
                </div>
                <div className="mb-2 text-muted">
                  수업 시간 : {item.startTime} ~ {item.endTime}
                </div>
                <div className="mb-2 text-muted">
                  수강료 : {new Intl.NumberFormat().format(item.price)}원
                </div>
                <div>{item.description}</div>
              </>
            </body>
          </div>
        </div>

        {/* 예약 */}
        <div
          className="reserve-wrap d-flex justify-content-center ms-5 me-5"
          style={{
            width: "270px",
            backgroundColor: "#5c6d8b33",
            borderRadius: "10px 10px 10px 10px",
          }}
        >
          <div className="text-nowrap mt-4">
            {/* <tr>
              <th scope="row">클래스명</th>
              <td>{item.title}</td>
            </tr> */}

            <div>
              <p className="textBold">이름</p>
              <div>
                <input
                  className="form-control me-1"
                  type="text"
                  placeholder="이름"
                  ref={nameInput}
                />
              </div>
            </div>
            <div>
              <p className="textBold">연락처</p>
              <div>
                <input
                  className="form-control"
                  type="text"
                  placeholder="010-123-4567"
                  ref={telInput}
                />
              </div>
            </div>
            <div>
              <p className="textBold">인원 수</p>
              <select className="form-select" ref={countSelect}>
                <option>인원 수</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div>
              <input type="date" ref={dayInput} style={{ cursor: "pointer" }} />
              <p className="textBold">예약시간</p>
              <select
                className="form-select"
                ref={timeSelect}
                style={{ cursor: "pointer" }}
              >
                <option>시간</option>
                <option value="10:00 - 11:00">10:00 - 11:00</option>
                <option value="11:00 - 12:00">11:00 - 12:00</option>
                <option value="12:00 - 13:00">12:00 - 13:00</option>
                <option value="13:00 - 14:00">13:00 - 14:00</option>
                <option value="14:00 - 15:00">14:00 - 15:00</option>
                <option value="15:00 - 16:00">15:00 - 16:00</option>
                <option value="16:00 - 17:00">16:00 - 17:00</option>
                <option value="17:00 - 18:00">17:00 - 18:00</option>
                <option value="18:00 - 19:00">18:00 - 19:00</option>
                <option value="19:00 - 20:00">19:00 - 20:00</option>
                <option value="20:00 - 21:00">20:00 - 21:00</option>
                <option value="21:00 - 22:00">21:00 - 22:00</option>
              </select>
            </div>
            <div className={style.hover}>
              <Button
                className="outline-secondary text-nowrap "
                id="button-addon2"
                style={{
                  backgroundColor: "#6373919d",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  createReservation(item.oneDayClassId);
                  router.push("/onedayclass");
                }}
              >
                예약하기
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className={style.hover}>
        <Button
          className="btn btn-secondary me-1"
          onClick={() => {
            router.push("/onedayclass");
          }}
        >
          목록
        </Button>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;

  const res = await axios.get<OneDayItem[]>(
    `${process.env.NEXT_PUBLIC_API_BASE}/onedayclass/${id}`
  );
  const item = res.data;

  return { props: { item } };
};

export default OnedayDetail;
