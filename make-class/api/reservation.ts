import { ReservationItem } from "../provider/modules/reservation";
import { createAxiosInstance } from "./_request";

export interface ReservationPagingReponse {
  content: ReservationItem[];
  last: boolean;
  totalEements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ReservationItemResponse {
  id: number;
  oneDayClassId: number;
  name: string;
  tel: string;
  reservationDay: string;
  reservationTime: string;
  price: number;
  person: number;
  capacity: number;
  title: string;
  status: boolean;
  createdTime: number;
}

export interface ReservationRequest {
  id?: number;
  oneDayClassId: number;
  name: string;
  tel: string;
  reservationDay: string;
  reservationTime: string;
  price: number;
  person: number;
  capacity: number;
  title: string;
  status?: boolean;
  createdTime: number;
}

const reservationApi = {
  get: (oneDayClassId: number) => createAxiosInstance().get<ReservationItemResponse>(
    `${process.env.NEXT_PUBLIC_API_BASE}/reservations/${oneDayClassId}`
  ),

  fetch: () =>
    createAxiosInstance().get<ReservationItemResponse[]>(
      `${process.env.NEXT_PUBLIC_API_BASE}/reservations`
    ),
  
  fetchPaging:(page: number, size: number) =>
    createAxiosInstance().get<ReservationPagingReponse>(
    `${process.env.NEXT_PUBLIC_API_BASE}/reservations/paging?page=${page}&size=${size}`
  ),
  
  add: (reservationItem: ReservationRequest) =>
    createAxiosInstance().post<ReservationItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/reservations`,reservationItem
    ),
  
  remove: (id: number) =>
    createAxiosInstance().delete<boolean>(
      `${process.env.NEXT_PUBLIC_API_BASE}/reservations/${id}`
    ),
  
  modify: (id: number, reservationItem: ReservationRequest) =>
    createAxiosInstance().put<ReservationItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/reservations/${id}`,
      reservationItem
    ),
};

export default reservationApi;