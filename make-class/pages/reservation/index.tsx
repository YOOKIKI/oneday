import Layout from "../../components/layout";
import React, { useRef } from "react";
import Link from "next/link";
// import styles from "./ReservationBar.module.css";
import { Table, Button, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../provider";
import {
  addReservation,
  ReservationItem,
} from "../../provider/modules/reservation";

export default function inquiry() {
  //   const onedayclassNameInput = useRef<HTMLInputElement>(null);
  //   const nameInput = useRef<HTMLInputElement>(null);
  //   const telInput = useRef<HTMLInputElement>(null);
  //   const capacityInput = useRef<HTMLInputElement>(null);
  //   const descriptionTxta = useRef<HTMLTextAreaElement>(null);
  //   const priceInput = useRef<HTMLInputElement>(null);
  //   const startDateDataInput = useRef<HTMLInputElement>(null);
  //   const endDateDataInput = useRef<HTMLInputElement>(null);
  //   const inquiryData = useSelector((state: RootState) => state.inquiry.data);
  //   const dispatch = useDispatch<AppDispatch>();
  //   const router = useRouter();
  //   const handleAddClick = () => {
  //     const item: ReservationItem = {
  //       id: inquiryData.length ? inquiryData[0].inquiryId + 1 : 1,
  //       onedayclassName: onedayclassNameInput.current
  //         ? onedayclassNameInput.current.value
  //         : "",
  //       price: priceInput.current ? priceInput.current.value : "",
  //       name: nameInput.current ? nameInput.current.value : "",
  //       tel: telInput.current ? telInput.current.value : "",
  //       capacity: capacityInput.current ? capacityInput.current.value : "",
  //       description: descriptionTxta.current ? descriptionTxta.current.value : "",
  //       startDateData: startDateDataInput.current
  //         ? startDateDataInput.current.value
  //         : "",
  //       endDateData: endDateDataInput.current
  //         ? endDateDataInput.current.value
  //         : "",
  //       createdTime: new Date().getTime(),
  //     };
  //     console.log(item);
  //     dispatch(addReservation(item));
  //     router.push("/inquiry");
  //   };
  //   return (
  //     <div>
  //       <nav>
  //         <form>
  //           <thead>
  //             <tr></tr>
  //           </thead>
  //           <tbody className="text-nowrap">
  //             <tr>
  //               <th scope="row">클래스명</th>
  //               {/* <td>{Item.onedayclassName}</td> */}
  //             </tr>
  //             <tr>
  //               <th></th>
  //             </tr>
  //             <tr>
  //               <th scope="row">이름</th>
  //               <td>
  //                 <input
  //                   className="form-control"
  //                   type="text"
  //                   placeholder="이름"
  //                   ref={nameInput}
  //                 />
  //               </td>
  //             </tr>
  //             <tr>
  //               <th scope="row">연락처</th>
  //               <td>
  //                 <input
  //                   className="form-control"
  //                   type="text"
  //                   placeholder="010-123-4567"
  //                   ref={telInput}
  //                 />
  //               </td>
  //             </tr>
  //             <tr>
  //               <th>인원 수</th>
  //               <Form.Select aria-label="Default select example">
  //                 <option>인원 수</option>
  //                 <option value="1">1</option>
  //                 <option value="2">2</option>
  //                 <option value="3">3</option>
  //                 <option value="4">4</option>
  //                 <option value="5">5</option>
  //               </Form.Select>
  //             </tr>
  //             <tr>
  //               <th scope="row">참고사항</th>
  //               <td>
  //                 <textarea
  //                   className="form-control"
  //                   ref={descriptionTxta}
  //                 ></textarea>
  //               </td>
  //             </tr>
  //           </tbody>
  //         </form>
  //         <div style={{ display: "flex", justifyContent: "space-between" }}>
  //           <Button
  //             className="outline-secondary"
  //             id="button-addon2"
  //             onClick={() => {
  //               handleAddClick();
  //             }}
  //           >
  //             예약하기
  //           </Button>
  //         </div>
  //       </nav>
  //     </div>
  //   );
  // }
  // const Item = [
  //   {
  //     id: 2,
  //     onedayclassName: "핸드메이드",
  //     name: "수강생",
  //     tel: "010-222-2222",
  //     capacity: "2명",
  //     price: "30000원",
  //     description: "hi",
  //     createdTime: new Date().getTime(),
  //     startDateData: "12월1일",
  //     endDateData: "12월 3일",
  //   },
  //   {
  //     id: 1,
  //     onedayclassName: "플라워",
  //     name: "예약자",
  //     tel: "010-111-1111",
  //     capacity: "1명",
  //     price: "15000원",
  //     description: "hello",
  //     createdTime: new Date().getTime(),
  //     startDateData: "12월9일",
  //     endDateData: "12월 9일",
  //   },
  // ];
}
