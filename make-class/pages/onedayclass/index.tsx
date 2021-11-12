import { useRouter } from "next/router";
import React from "react";
import NavBar from "../../components/nav";
import Layout from "../../components/layout";
import router from "next/router";
import oneday, { OnedayItem } from "../../provider/modules/oneday ";
import { useSelector } from "react-redux";
import { RootState } from "../../provider";

// interface IndexProp {
//   item: OnedayItem[];
// }

// const Item = [
//   {
//     id: 1,
//     onedayclassName: "oneday강좌1",
//     description: "oneday는..",
//     photoUrl: require("../../public/clss.png").default.src,
//   },
//   {
//     id: 2,
//     onedayclassName: "oneday강좌2",
//     description: "oneday는...2",
//     photoUrl: require("../../public/clss.png").default.src,
//   },
// ];

const Index = () => {
  const oneday = useSelector((state: RootState) => state.oneday);
  const router = useRouter();

  return (
    <Layout>
      <NavBar />
      <section>
        <p>{/* <Link href="/oneday">more..</Link> */}</p>
        <div style={{ display: "flex" }}>
          {oneday.data.map((item, index) => (
            <div
              key={`oneday-item-${index}`}
              className="card"
              style={{
                width: "calc((100% - 3rem) / 4)",
                marginLeft: index % 4 === 0 ? "0" : "1rem",
                marginTop: index > 3 ? "1rem" : "0",
              }}
            >
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  router.push(`/onedayclass/detail/${item.id}`);
                }}
              >
                <img
                  src={item.photoUrl}
                  style={{
                    width: "220",
                    height: "150",
                    // objectFit: "cover",
                  }}
                  className="card-img-top"
                  alt={item.onedayclassName}
                  // layout="fill"
                  // objectFit="cover"

                  // width={220}
                  // height={150}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.onedayclassName}</h5>
                  <h6 className="text-muted">{item.description}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <button
          className="btn btn-primary"
          onClick={() => {
            router.push("/oneday/create");
          }}
        >
          <i className="bi bi-plus" />
          추가
        </button> */}
      </section>
    </Layout>
  );
};

export default Index;
