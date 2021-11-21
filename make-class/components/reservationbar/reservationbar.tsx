// import Head from "next/head";
// import Link from "next/link";
import React from "react";
import styles from "./ReservationBar.module.css";
import { useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { OneDayItem } from "../../provider/modules/oneday ";

export interface OnedayProp {
  item: OneDayItem[];
}

const reservationbar = ({ item }: OnedayProp) => {
  const nameInput = useRef<HTMLInputElement>(null);
  const descriptionTxta = useRef<HTMLTextAreaElement>(null);
  const telInput = useRef<HTMLInputElement>(null);

  return (
    <div>
      <nav className={styles.resbar}>
        <form>
          <div className="text-nowrap">
            {/* <tr>
              <th scope="row">클래스명</th>
              <td>{item.title}</td>
            </tr> */}

            <div>
              <h5>이름</h5>
              <div>
                <input
                  className="form-control"
                  type="text"
                  placeholder="이름"
                  ref={nameInput}
                />
              </div>
            </div>
            <div>
              <h3>연락처</h3>
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
              <h3>인원 수</h3>
              <Form.Select aria-label="Default select example">
                <option>인원 수</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
            </div>

            <div>
              <h3>참고사항</h3>
              <h4>
                <textarea
                  className="form-control"
                  ref={descriptionTxta}
                ></textarea>
              </h4>
              <Button
                className="outline-secondary text-nowrap"
                id="button-addon2"
                onClick={() => {
                  // ();
                }}
              >
                예약하기
              </Button>
            </div>
          </div>
        </form>
        <div></div>
      </nav>
    </div>
  );
};

export default reservationbar;
