import React from "react";
import NavBar from "../../components/nav";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import { OneDayItem } from "../../provider/modules/oneday ";
import axios from "axios";

export interface OnedayProp {
  item: OneDayItem[];
}
const Index = ({ item }: OnedayProp) => {
  const router = useRouter();

  return (
    <>
      <Layout>
        <NavBar />
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
