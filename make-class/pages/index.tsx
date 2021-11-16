import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Link from "next/link";
import HeadBar from "../components/headbar/headbar";
import NavBar from "../components/nav";
import Image from "next/image";
import router from "next/router";
import { GetServerSideProps } from "next";
import {
  requestFetchNextOnedays,
  requestFetchPagingOnedays,
} from "../middleware/modules/oneday";
import { AppDispatch, RootState } from "../provider";
import { useDispatch, useSelector } from "react-redux";

// export interface OnedayItem {
//   id: number;
//   inquiryId: string;
//   onedayclassName: string;
//   price: string;
//   description?: string;
//   capacity: string;
//   photoUrl: string;
//   fileType: string;
//   fileName: string;
//   createdTime: number;
//   startDateData: string;
//   endDateData: string;
// }

// export interface OneDayPagingReponse {
//   content: OnedayItem[];
//    last: boolean;
//   totalElements: number;
//   totalPages: number;
//   size: number;
//   number: number;
// }

// interface IndexProp {
//   items: OneDayPagingReponse;
// }

// const Index = ({ items }: IndexProp) => {

const Index = () => {
  const oneday = useSelector((state: RootState) => state.oneday);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!oneday.isFetched) {
      const onedayPageSize = localStorage.getItem("oneday_page_size");

      dispatch(
        requestFetchPagingOnedays({
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
        {(!oneday.isFetched || oneday.data.length === 0) && (
          <div className="text-center my-5">데이터가 없습니다.</div>
        )}
        <div style={{ display: "flex" }}>
          {oneday.isFetched &&
            oneday.data.length > 0 &&
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
                  <Image
                    src={item.photoUrl}
                    className="card-img-top"
                    alt={item.onedayclassName}
                    layout="responsive"
                    objectFit="cover"
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
      </section>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
// const items = [
//   {
//     id: 2,
//     inquiryId: "2",
//     onedayclassName: "핸드메이드",
//     price: "",
//     description: "onedayclass..",
//     capacity: "",
//     photoUrl: "/clss.jpg",
//     fileType: "",
//     fileName: "",
//     createdTime: new Date().getTime(),
//     startDateData: "12월1일",
//     endDateData: "12월 3일",
//   },
//   {
//     id: 1,
//     inquiryId: "1",
//     onedayclassName: "플라워",
//     price: "",
//     description: "onedayclass..",
//     capacity: "",
//     photoUrl: "/class.jpg",
//     fileType: "",
//     fileName: "",
//     createdTime: new Date().getTime(),
//     startDateData: "12월9일",
//     endDateData: "12월 9일",
//   },
// ];

// return { props: { items } };

export default Index;
