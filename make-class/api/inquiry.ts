import axios from "axios";

export interface InquiryItemResponse {
  id: number;
  classId: string;
  onedayclassName: string;
  title: string;
  name: string;
  tel: string;
  email: string;
  description?: string;
  createdTime: number;
}

export interface InquiryItemRequest {
  classId: string;
  onedayclassName: string;
  title: string;
  name: string;
  tel: string;
  email: string;
  description?: string;
}



const inquiryApi = {
  fetch: () =>
    axios.get<InquiryItemResponse[]>(`${process.env.REACT_APP_API_BASE}/inquirys`),
  
  add:(inquiryItem: InquiryItemRequest) =>
    axios.post<InquiryItemResponse>(
      `${process.env.REACT_APP_API_BASE}/inquirys`,
      inquiryItem
    ),

  remove: (id:number) => 
    axios.delete<boolean>(`${process.env.REACT_APP_API_BASE}/inquirys/${id}`),

  modify: (id: number, inquiryItem: InquiryItemRequest) =>
    axios.put<InquiryItemResponse>(
      `${process.env.REACT_APP_API_BASE}/inquirys/${id}`,
      inquiryItem
    ),

};


export default inquiryApi;