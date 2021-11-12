// import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import HeadBar from "../components/headbar/headbar";
import NavBar from "../components/nav";
// import { OneDayItemResponse } from "./api/oneday";
// import OnedayApi from "./api/oneday";
import Image from "next/image";
import router from "next/router";
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

const Index = ({ items }: IndexProp) => {
  return (
    <div>
      <Link href="/onedayclass">
        <h1>Make Class</h1>
      </Link>
      <HeadBar />
      <NavBar />
      <section>
        <p>{/* <Link href="/oneday">more..</Link> */}</p>
        <div style={{ display: "flex" }}>
          {items.map((item, index) => (
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
                  <h6 className="text-muted"></h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const items = [
    {
      id: 1,
      onedayclassName: "oneday",
      description: "oneday",
      photoUrl: "/clss.jpg",
    },
    {
      id: 2,
      onedayclassName: "oneday",
      description: "oneday",
      photoUrl: "/clss.jpg",
    },
  ];

  return { props: { items } };
};

export default Index;
