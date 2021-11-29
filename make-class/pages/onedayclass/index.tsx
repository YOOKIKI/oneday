import React from "react";
import NavBar from "../../components/nav";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import { OneDayItem } from "../../provider/modules/oneday ";
import axios from "axios";
import style from "../../pages/onedayclass/hover.module.css";

export interface OnedayProp {
  item: OneDayItem[];
}
const Index = ({ item }: OnedayProp) => {
  const router = useRouter();

  return (
    <>
      <Layout>
        {/* <NavBar /> */}
        <section>
          <div style={{ display: "flex" }} className={style.hover}>
            {item.map((item, index) => (
              <div
                key={index}
                className="card"
                style={{
                  width: "250px",
                  marginLeft: index % 5 === 0 ? "0" : "1rem",
                  marginTop: index > 6 ? "1rem" : "0",
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
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  const res = await axios.get<OneDayItem[]>(
    `${process.env.NEXT_PUBLIC_API_BASE}/onedayclass`
  );
  const item = res.data;
  return { props: { item } };
}

export default Index;
