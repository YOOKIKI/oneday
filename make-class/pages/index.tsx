import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Link from "next/link";
import HeadBar from "../components/headbar/headbar";
import NavBar from "../components/nav";
// import Image from "next/image";
import router from "next/router";
import { GetServerSideProps } from "next";
// import { requestFetchNextOnedays } from "../middleware/modules/oneday";
import { AppDispatch, RootState } from "../provider";
import { useDispatch, useSelector } from "react-redux";
import { requestFetchPagingOneday } from "../middleware/modules/oneday";
import { OneDayItem } from "../provider/modules/oneday ";
import axios from "axios";
// import { requestFetchNextOnedays } from "../middleware/modules/oneday";

export interface OnedayProp {
  item: OneDayItem[];
}

const MainIndex = ({ item }: OnedayProp) => {
  return (
    <div style={{ marginLeft: "5rem", marginRight: "5rem" }}>
      <Link href="/onedayclass">
        <h1>Make Class</h1>
      </Link>
      <HeadBar />
      <NavBar />
      <section>
        <div style={{ display: "flex" }}>
          {item.map((item, index) => (
            <div
              key={`oneday-item-${index}`}
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
                  router.push(`/onedayclass/detail/${item.oneDayClassId}`);
                }}
              >
                <img
                  src={item.photoUrl}
                  className="card-img-top"
                  alt={item.title}
                  // layout="responsive"
                  // objectFit="cover"
                  width={220}
                  height={150}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <h6 className="text-muted">{item.description}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await axios.get<OneDayItem[]>(
    `${process.env.NEXT_PUBLIC_API_BASE}/onedayclass`
  );
  const item = res.data;

  return { props: { item } };
}

export default MainIndex;
