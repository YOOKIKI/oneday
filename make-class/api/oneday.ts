import axios from "axios";
import { OneDayItem } from "../provider/modules/oneday ";
import { createAxiosInstance } from "./_request";


export interface OneDayItemResponse {
  oneDayClassId: number;
  title: string;
  capacity: number;
  photoUrl: string;
  fileType: string;
  fileName: string;
  managerName: string;
  category: string;
  description?: string;
  startDay: string;
  endDay: string;
  startTime: string;
  endTime: string;
  price: number;
  createdTime: number;
}

// export interface OneDayItemRequest {
//   oneDayClassId: number;
//   managerOneDayClassId: string;
//   onedayclassName: string;
//   price: number;
//   title: string;
//   description?: string;
//   managerName: string;
//   capacity: string;
//   photoUrl: string;
//   fileType: string;
//   fileName: string;
//   createdTime: number;
//   startTime: string;
//   endTime: string;
//   category: string;
// }

const onedayApi = {
  get: (oneDayClassId: number) =>
     createAxiosInstance().get<OneDayItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/onedayclass/${oneDayClassId}`
    ),
  fetch: () =>
    createAxiosInstance().get<OneDayItemResponse[]>(
      `${process.env.NEXT_PUBLIC_API_BASE}/onedayclass`
    ),

  // fetchPaging: (page: number, size: number) =>
  //   createAxiosInstance().get<OneDayPagingReponse>(
  //     `${process.env.NEXT_PUBLIC_API_BASE}/onedayclass/paging?page=${page}&size=${size}`
  //   ),
};

export default onedayApi;