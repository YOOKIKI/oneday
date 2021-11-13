import axios from "axios";

export interface OneDayPagingReponse {
  content: OneDayItemResponse[];
  id: number;
  onedayclassName: string;
  description: string;
  // photoUrl: string;
}

export interface OneDayItemResponse {
  id: number;
  onedayclassName: string;
  description: string;
  // photoUrl: string;
}

export interface OneDayItemRequest {
  id: number;
  onedayclassName: string;
  description: string;
  // photoUrl: string;
}

const OneDayApi = {
  get: (id: number) =>
    axios.get<OneDayItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/onedays/${id}`
    ),
  fetch: () =>
    axios.get<OneDayItemResponse[]>(
      `${process.env.NEXT_PUBLIC_API_BASE}/onedays`
    ),

  fetchPaging: (page: number, size: number) =>
    axios.get<OneDayPagingReponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/onedays/paging?page=${page}&size=${size}`
    ),
  add: (onedayItem: OneDayItemResponse) =>
    axios.post<OneDayItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/onedays`,
      onedayItem
    ),
   remove: (id: number) =>
    axios.delete<boolean>(`${process.env.NEXT_PUBLIC_API_BASE}/onedays/${id}`),

   modify: (id: number, onedayItem: OneDayItemResponse) =>
    axios.put<OneDayItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/onedays/${id}`,
      onedayItem
    ),
};

export default OneDayApi;