import React from "react";
import Link from "next/link";
import HeadBar from "../components/headbar/headbar";
import NavBar from "../components/nav";
import router from "next/router";
import { OneDayItem } from "../provider/modules/oneday ";
import axios from "axios";

export interface OnedayProp {
  item: OneDayItem[];
}

const MainIndex = ({ item }: OnedayProp) => {
  return (
    <div style={{ marginLeft: "5rem", marginRight: "5rem" }}>
      <HeadBar />
      {/* <Link href="/onedayclass">
        <h1>Make Class</h1>
      </Link> */}
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
                  style={{ objectFit: "cover" }}
                  // layout="responsive"
                  // objectFit="cover"
                  width={220}
                  height={150}
                />
                <div className="card-body">
                  <h6 className="text-text" style={{ fontSize: "10px" }}>
                    {item.category}
                  </h6>
                  <h5 className="card-title">{item.title}</h5>
                  <h6 className="text-muted">{item.description}</h6>
                  <h6
                    className="text-text"
                    style={{ fontSize: "13px", textAlignLast: "end" }}
                  >
                    {new Intl.NumberFormat().format(item.price)}원
                  </h6>
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
