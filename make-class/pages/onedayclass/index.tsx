import Image from "next/image";
import React, { useEffect } from "react";
import NavBar from "../../components/nav";
import Layout from "../../components/layout";
import router, { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../provider";
import { useDispatch, useSelector } from "react-redux";
import {
  requestFetchNextOnedays,
  requestFetchPagingOnedays,
} from "../../middleware/modules/oneday";
import onedays from "../reservation";

const OnedayIndex = () => {
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

  const handlePageSizeChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    dispatch(
      requestFetchPagingOnedays({
        page: oneday.page,
        size: +e.currentTarget.value,
      })
    );
  };

  return (
    <Layout>
      <NavBar />
      <section>
        {/* 버튼
        <div className="d-flex justify-content-end mb-2">
          <select
            className="form-select form-select-sm me-2"
            style={{ width: "60px" }}
            value={oneday.pageSize}
            onChange={(e) => {
              handlePageSizeChanged(e);
            }}
          >
            {[2, 4, 8, 12].map((size) => (
              <option key={`select-${size}`} value={size}>
                {size}
              </option>
            ))}
          </select>
          <button
            className="btn btn-secondary me-2"
            onClick={() => {
              dispatch(
                requestFetchPagingOnedays({
                  page: 0,
                  // page: oneday.page,
                  size: oneday.pageSize,
                })
              );
            }}
          >
            <i className="bi bi-arrow-clockwise"></i>
            새로고침
          </button>
        </div> */}
        <p>{/* <Link href="/oneday">more..</Link> */}</p>
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
  );
};

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

// interface IndexProp {
//   items: OnedayItem[];
// }

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const items = [
//     {
//       id: 2,
//       inquiryId: "2",
//       onedayclassName: "핸드메이드",
//       price: "",
//       description: "핸드 드로잉",
//       capacity: "",
//       photoUrl: "/clss.jpg",
//       fileType: "",
//       fileName: "",
//       createdTime: new Date().getTime(),
//       startDateData: "12월1일",
//       endDateData: "12월 3일",
//     },
//     {
//       id: 1,
//       inquiryId: "1",
//       onedayclassName: "플라워",
//       price: "",
//       description: "플라워가드닝",
//       capacity: "",
//       photoUrl: "/class.jpg",
//       fileType: "",
//       fileName: "",
//       createdTime: new Date().getTime(),
//       startDateData: "12월9일",
//       endDateData: "12월 9일",
//     },
//   ];

// return { props: { items } };
// };

export default OnedayIndex;
