import Image from "next/image";
import React, { useEffect } from "react";
import NavBar from "../../components/nav";
import Layout from "../../components/layout";
import router, { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../provider";
import { useDispatch, useSelector } from "react-redux";
// import { requestFetchNextOnedays } from "../../middleware/modules/oneday";
import onedays from "../reservation";
import { OneDayItem } from "../../provider/modules/oneday ";
import OnedayDetail from "./detail/[id]";
import axios from "axios";
import { GetServerSideProps } from "next";

export interface OnedayProp {
  item: OneDayItem[];
}
const Index = ({ item }: OnedayProp) => {
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
                  width: "calc((100% - 4rem) / 4)",
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
          {/* {!oneday.isLast && (
          <div className="d-flex justify-content-center mt-4">
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault(); // 기본 동작 방지
                dispatch(
                  requestFetchNextOnedays({
                    page: oneday.page + 1,
                    size: oneday.pageSize,
                  })
                );
              }}
              className="link-secondary fs-6 text-nowrap"
            >
              더보기
            </a>
          </div>
        )} */}
        </section>
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  // SSR일 때 매개변수를 받는 방법
  // /public-photos/id
  // const id = context.params?.id;

  // Fetch data from external API
  const res = await axios.get<OneDayItem[]>(
    `http://localhost:8080/onedayclass`
  );
  const item = res.data;
  // const photo = {
  //   albumId: 1,
  //   id: 1,
  //   title: "accusamus beatae ad facilis cum similique qui sunt",
  //   url: "https://via.placeholder.com/600/92c952",
  //   thumbnailUrl: "https://via.placeholder.com/150/92c952",
  // };
  // Pass data to the page via props
  return { props: { item } };
}

export default Index;
