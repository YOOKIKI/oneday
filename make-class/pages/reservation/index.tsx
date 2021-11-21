import Layout from "../../components/layout";
import React, { useEffect } from "react";
import styles from "./ReservationBar.module.css";
import { Table, Button, Form, Navbar } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../provider";
import { ReservationItem } from "../../provider/modules/reservation";
import axios from "axios";

export interface reservationProp {
  item: ReservationItem[];
}

const reservations = ({ item }: reservationProp) => {
  const router = useRouter();

  return (
    <>
      <Layout>
        <Navbar />
        <section>
          <div style={{ display: "flex" }}>
            {item.map((item, index) => (
              <div
                key={index}
                className="card"
                style={{
                  width: "250px",
                  marginLeft: index % 4 === 0 ? "0" : "1rem",
                  marginTop: index > 3 ? "1rem" : "0",
                }}
              >
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    router.push(`/onedayclass/detail/${item.oneDayClassID}`);
                  }}
                >
                  <div className="card-body">
                    <p className="card-title">{item.reservationDay}</p>
                    <p>{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  const res = await axios.get<ReservationItem[]>(
    `http://localhost:8080/reservations`
  );
  const item = res.data;
  return { prop: { item } };
}

export default reservations;
