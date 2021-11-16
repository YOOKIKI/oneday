import axios from "axios";
import { createAxiosInstance } from "./_request";

export interface InquiryPagingReponse {
 content: InquiryItemResponse[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface InquiryItemResponse {
  inquiryId: number;
  oneDayClassId: string;
  onedayclassName: string;
  title: string;
  name: string;
  tel: string;
  email: string;
  description?: string;
  answer: string;
  createdTime: number;
}

export interface InquiryItemRequest {
  inquiryId: number;
  oneDayClassId: string;
  onedayclassName: string;
  title: string;
  name: string;
  tel: string;
  email: string;
  description?: string;
  answer: string;
  createdTime: number;
}



const inquiryApi = {
  get: (inquiryId: number) =>
    createAxiosInstance().get<InquiryItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/inquirys/${inquiryId}`),
  fetch: () =>
    createAxiosInstance().get<InquiryItemResponse[]>(
      `${process.env.NEXT_PUBLIC_API_BASE}/inquirys`),
  
  fetchPaging: (page: number, size: number) =>
    createAxiosInstance().get<InquiryPagingReponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/inquirys/paging?page=${page}&size=${size}`
    ),
  
  add:(inquiryItem: InquiryItemRequest) =>
    createAxiosInstance().post<InquiryItemResponse>(
      `${process.env.REACT_APP_API_BASE}/inquirys`,
      inquiryItem
    ),

  remove: (inquiryId:number) => 
    createAxiosInstance().delete<boolean>(
      `${process.env.NEXT_PUBLIC_API_BASE}/inquirys/${inquiryId}`),

  modify: (inquiryId: number, inquiryItem: InquiryItemRequest) =>
    createAxiosInstance().put<InquiryItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/inquirys/${inquiryId}`,
      inquiryItem
    ),

};


export default inquiryApi;