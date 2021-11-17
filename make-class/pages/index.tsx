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
// import { requestFetchNextOnedays } from "../middleware/modules/oneday";

const Index = () => {
  const oneday = useSelector((state: RootState) => state.oneday);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!oneday.isFetched) {
      const onedayPageSize = localStorage.getItem("oneday_page_size");

      dispatch(
        requestFetchPagingOneday({
          page: 0,
          size: onedayPageSize ? +onedayPageSize : oneday.pageSize,
        })
      );
    }
  }, [dispatch, oneday.isFetched, oneday.pageSize]);

  return (
    <div style={{ marginLeft: "5rem", marginRight: "5rem" }}>
      <Link href="/onedayclass">
        <h1>Make Class</h1>
      </Link>
      <HeadBar />
      <NavBar />
      <section>
        {!oneday && <div className="text-center my-5">데이터가 없습니다.</div>}
        <div style={{ display: "flex" }}>
          {oneday.isFetched &&
            oneday.data.map((item, index) => (
              <div
                key={`oneday-item-${index}`}
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
                    <h5 className="card-title">{item.oneDayClassId}</h5>
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

export default Index;
