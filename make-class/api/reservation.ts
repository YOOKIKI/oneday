import { createAxiosInstance } from "./_request";

export interface ReservationResponse {
  id: number;
  oneDayClassID: number;
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
  reservationDate?: string;
  reservationTime: string;
  price: number;
  person: number;
  capacity: number;
  title: string;
  status?: boolean;
  createdTime: number;
}


const reservationApi = {
  get: (id: number) => createAxiosInstance().get<ReservationResponse>(
    `${process.env.NEXT_PUBLIC_API_BASE}/reservations/${id}`
  ),

  fetch: () =>
    createAxiosInstance().get<ReservationResponse[]>(
      `${process.env.NEXT_PUBLIC_API_BASE}/reservations`
    ),
  
  add: (reservationItem: ReservationRequest) =>
    createAxiosInstance().post<ReservationResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/reservations`,reservationItem
    ),
  
  remove: (id: number) =>
    createAxiosInstance().delete<boolean>(
      `${process.env.NEXT_PUBLIC_API_BASE}/reservations/${id}`
    ),
  
  modify: (id: number, reservationItem: ReservationRequest) =>
    createAxiosInstance().put<ReservationResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/reservations/${id}`,
      reservationItem
    ),
};

export default reservationApi;