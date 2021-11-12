import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import reservation from "../../api/oneday";

export interface ReservationItem {
  id: number;
  onedayclassName: string;
  name: string;
  tel: string;
  capacity: string;
  price: string;
  description?: string;  
  createdTime: number;
  startDateData: string;
  endDateData: string;
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
  data: [
    {
      id: 2,
      onedayclassName: "핸드메이드",
      name: "수강생",
      tel:"010-222-2222",
      capacity: "2명",
      price: "30000원",
      description: "hi",
      createdTime: new Date().getTime(),
      startDateData: "12월1일",
      endDateData: "12월 3일"
    },
    {
      id: 1,
      onedayclassName: "플라워",
      name: "예약자",
      tel:"010-111-1111",
      capacity: "1명",
      price: "15000원",
      description: "hello",
      createdTime: new Date().getTime(),
      startDateData: "12월9일",
      endDateData: "12월 9일"
    }
  ],
  isFetched: false,
  page: 0,
  // pageSize: onedayPageSize ? +onedayPageSize : 8,
  pageSize: 2,
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
        ReservationItem.onedayclassName = modifyItem.onedayclassName;
        ReservationItem.name = modifyItem.name;
        ReservationItem.tel = modifyItem.tel;
        ReservationItem.capacity = modifyItem.capacity;
        ReservationItem.price = modifyItem.price;
        ReservationItem.description = modifyItem.description;
        ReservationItem.startDateData = modifyItem.startDateData;
        ReservationItem.endDateData = modifyItem.endDateData;
        
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