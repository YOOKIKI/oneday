import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import reservation from "../../api/reservation";

export interface ReservationItem {
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

export interface ReservationResponse {
  data: ReservationItem[];
}

// export interface ReservationItemResponse {
//   data: ReservationItem[];
// }

export interface ReservationPage {
  data: ReservationItem[];
  totalElements: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast: boolean;
}

interface ReservationState {
  data: ReservationItem[];
  isFetched: boolean;
  isAddCompleted?: boolean;
  isRemoveCompleted?: boolean; 
  isModifyCompleted?: boolean; 
  totalElements?: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast?: boolean;
}

const initialState: ReservationState = {
  data: [],
  isFetched: false,
  page: 0,
  pageSize: 8,
  totalPages: 0,
};


const reservationSlice = createSlice({
  name: "reservation",
  initialState,  
  reducers: {
    addReservation: (state, action: PayloadAction<ReservationItem>) => {
      const reservation = action.payload;
      console.log("--in reducer function--");
      console.log(reservation);
      state.data.unshift(reservation);
      state.isAddCompleted = true;
    },
    loadReservation: (state, action: PayloadAction<ReservationResponse>) => {
      state.data = action.payload.data;
      console.log("—in reducer function—");
    },
    initialCompleted: (state) => {
      delete state.isAddCompleted;
      delete state.isRemoveCompleted;
      delete state.isModifyCompleted;
    },
    modifyReservation: (state, action: PayloadAction<ReservationItem>) => {
    
      const modifyItem = action.payload;
    
      const ReservationItem = state.data.find((item) => item.id === modifyItem.id);

      if (ReservationItem) {
        ReservationItem.id = modifyItem.id;
        ReservationItem.title = modifyItem.title;
        ReservationItem.name = modifyItem.name;
        ReservationItem.tel = modifyItem.tel;
        ReservationItem.capacity = modifyItem.capacity;
        ReservationItem.reservationDay = modifyItem.reservationDay;
        ReservationItem.reservationTime = modifyItem.reservationTime;
        ReservationItem.price = modifyItem.price;
        ReservationItem.person = modifyItem.person;
        ReservationItem.status = modifyItem.status;
        ReservationItem.createdTime = modifyItem.createdTime;
      }
      state.isModifyCompleted = true;
    },
    initialReservationItem: (state, action: PayloadAction<ReservationItem>) => {
      const reservation = action.payload;
 
      state.data = [{ ...reservation }];
    },

    initialReservation: (state, action: PayloadAction<ReservationItem[]>) => {
      const reservations = action.payload;

      state.data = reservations;
  
      state.isFetched = true;
    },
    initialNextReservation: (state, action: PayloadAction<ReservationPage>) => {
      state.data = action.payload.data;
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.isLast = action.payload.isLast;
      state.isFetched = true;
    },
  }
});


export const {
  addReservation,
  modifyReservation,
  initialReservationItem,
  initialReservation,
  initialCompleted,
  initialNextReservation,
  loadReservation
} = reservationSlice.actions;


export default reservationSlice.reducer;