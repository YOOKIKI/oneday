import { useRouter } from "next/router";
import React from "react";
import NavBar from "../../components/nav";
import Layout from "../../components/layout";
import router from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../provider";
import { GetServerSideProps } from "next";

export interface OnedayItem {
  id: number;
  inquiryId: string;
  onedayclassName: string;
  price: string;
  description?: string;
  capacity: string;
  photoUrl: string;
  fileType: string;
  fileName: string;
  createdTime: number;
  startDateData: string;
  endDateData: string;
}

interface IndexProp {
  items: OnedayItem[];
}

const OnedayIndex = ({ items }: IndexProp) => {
  return (
    <Layout>
      <NavBar />
      <section>
        <p>{/* <Link href="/oneday">more..</Link> */}</p>
        <div style={{ display: "flex" }}>
          {items.map((item, index) => (
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
                  router.push(`/onedayclass/detail/${item.id}`);
                }}
              >
                <img
                  src={item.photoUrl}
                  style={{
                    width: "220",
                    height: "150",
                    objectFit: "cover",
                  }}
                  className="card-img-top"
                  alt={item.onedayclassName}
                  // layout="responsive"
                  // objectFit="cover"
                  width={220}
                  height={150}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const items = [
    {
      id: 2,
      inquiryId: "2",
      onedayclassName: "핸드메이드",
      price: "",
      description: "핸드 드로잉",
      capacity: "",
      photoUrl: "/clss.jpg",
      fileType: "",
      fileName: "",
      createdTime: new Date().getTime(),
      startDateData: "12월1일",
      endDateData: "12월 3일",
    },
    {
      id: 1,
      inquiryId: "1",
      onedayclassName: "플라워",
      price: "",
      description: "플라워가드닝",
      capacity: "",
      photoUrl: "/class.jpg",
      fileType: "",
      fileName: "",
      createdTime: new Date().getTime(),
      startDateData: "12월9일",
      endDateData: "12월 9일",
    },
  ];

  return { props: { items } };
};

export default OnedayIndex;
