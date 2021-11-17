import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import reservation from "../../api/oneday";

export interface ReservationItem {
  id: number;
  name: string;
  tel: string;
  reservationDate: string;
  totalAmount: number;
  detailCnt: number;
  firstReservationName: string;
  status: boolean; // 상태
  createdTime: number; // 생성시간
}

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
  // pageSize: onedayPageSize ? +onedayPageSize : 8,
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
    initialCompleted: (state) => {
      delete state.isAddCompleted;
      delete state.isRemoveCompleted;
      delete state.isModifyCompleted;
    },
    removeReservation: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      
      state.data.splice(
        state.data.findIndex((item) => item.id === id),
        1
      );
      state.isRemoveCompleted = true; 
    },
    modifyReservation: (state, action: PayloadAction<ReservationItem>) => {
    
      const modifyItem = action.payload;
    
      const ReservationItem = state.data.find((item) => item.id === modifyItem.id);

      if (ReservationItem) {
        ReservationItem.id = modifyItem.id;
        ReservationItem.reservationId = modifyItem.reservationId;
        ReservationItem.onedayclassName = modifyItem.onedayclassName;
        ReservationItem.name = modifyItem.name;
        ReservationItem.tel = modifyItem.tel;
        ReservationItem.capacity = modifyItem.capacity;
        ReservationItem.price = modifyItem.price;
        ReservationItem.reservationDate = modifyItem.reservationDate;
        ReservationItem.price = modifyItem.price;
        ReservationItem.totalAmount = modifyItem.totalAmount;
        
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
    addTotalpages: (state) => {
      state.totalPages++;
    },

    initialPagedReservation: (state, action: PayloadAction<ReservationPage>) => {

      state.data = action.payload.data;

      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.isLast = action.payload.isLast;
 
      state.isFetched = true;
    },
    initialNextReservation: (state, action: PayloadAction<ReservationPage>) => {

      state.data = state.data.concat(action.payload.data);

      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.isLast = action.payload.isLast;
      state.isFetched = true;
    },
  },
});


export const {
  addReservation,
  removeReservation,
  modifyReservation,
  initialReservationItem,
  initialReservation,
  initialCompleted,
  addTotalpages,
  initialPagedReservation,
  initialNextReservation,
} = reservationSlice.actions;


export default reservationSlice.reducer;