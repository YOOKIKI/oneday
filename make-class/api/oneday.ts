import axios from "axios";
import { createAxiosInstance } from "./_request";

export interface OneDayPagingReponse {
  content: OneDayItemResponse[];
   last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface OneDayItemResponse {
 oneDayClassId: number;
  managerOneDayClassId: string;
  onedayclassName: string;
  price: string;
  title: string;
  description?: string;
  managerName: string;
  capacity: string;
  photoUrl: string;
  fileType: string;
  fileName: string;
  createdTime: number;
  startTime: string;
  endTime: string;
  category: string;
}

export interface OneDayItemRequest {
  oneDayClassId: number;
  managerOneDayClassId: string;
  onedayclassName: string;
  price: string;
  title: string;
  description?: string;
  managerName: string;
  capacity: string;
  photoUrl: string;
  fileType: string;
  fileName: string;
  createdTime: number;
  startTime: string;
  endTime: string;
  category: string;
}

const OneDayApi = {

  get: (oneDayClassId: number) =>
     createAxiosInstance().get<OneDayItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/onedays/${oneDayClassId}`
    ),
  fetch: () =>
    createAxiosInstance().get<OneDayItemResponse[]>(
      `${process.env.NEXT_PUBLIC_API_BASE}/onedays`
    ),

  fetchPaging: (page: number, size: number) =>
    createAxiosInstance().get<OneDayItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/onedays/paging?page=${page}&size=${size}`
    ),
  add: (onedayItem: OneDayItemResponse) =>
    createAxiosInstance().post<OneDayItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/onedays`,
      onedayItem
    ),
   remove: (oneDayClassId: number) =>
     createAxiosInstance().delete<boolean>(`${process.env.NEXT_PUBLIC_API_BASE}/onedays/${oneDayClassId}`),

   modify: (oneDayClassId: number, onedayItem: OneDayItemResponse) =>
     createAxiosInstance().put<OneDayItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/onedays/${oneDayClassId}`,
      onedayItem
    ),
};

export default OneDayApi;