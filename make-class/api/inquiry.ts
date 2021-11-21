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
  customerId: number;
  inquiryId: number;
  oneDayClassId: number;
  oneDayClassName: string;
  title: string;
  name: string;
  tel: string;
  email: string;
  description: string;
  answer: string;
  createdTime: number;
}

export interface InquiryItemRequest {
  inquiryId?: number;
  customerId: number;
  oneDayClassId: number;
  oneDayClassName: string;
  title: string;
  name: string;
  tel: string;
  email: string;
  description: string;
  answer?: string;
  createdTime: number;
}

const inquiryApi = {
  
  fetch: (customerId: number) =>
    createAxiosInstance().get<InquiryItemResponse[]>(
      `${process.env.NEXT_PUBLIC_API_BASE}/inquirys/${customerId}`),
  
  add:(inquiryItem: InquiryItemRequest) =>
    createAxiosInstance().post<InquiryItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/inquirys`,
      inquiryItem
    ),

};


export default inquiryApi;