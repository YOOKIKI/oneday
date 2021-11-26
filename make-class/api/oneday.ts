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

export interface OneDayItemRequest {
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
  
  modify : (oneDayClassId: number, oneDayItem: OneDayItemRequest) =>
    createAxiosInstance().put<OneDayItemResponse>
      (`${process.env.NEXT_PUBLIC_API_BASE}/onedayclass/${oneDayClassId}`,
      oneDayItem),

  // category : ()
};

export default onedayApi;