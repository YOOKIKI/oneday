import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import reservation from "../../api/reservation";

export interface ReservationItem {
  id?: number;
  oneDayClassID: number;
  name: string;
  tel: string;
  reservationDay?: string;
  reservationTime: string;
  price: number;
  person: number;
  capacity: number;
  title: string;
  status?: boolean;
  createdTime: number;
}

export interface ReservationItemResponse {
  data: ReservationItem[];
}

// export interface ReservationPage {
//   data: ReservationItem[];
//   totalElements: number;
//   // totalPages: number;
//   // page: number;
//   // pageSize: number;
//   isLast: boolean;
// }

interface ReservationState {
  data: ReservationItem[];
  isFetched: boolean;
  isAddCompleted?: boolean;
  isRemoveCompleted?: boolean; 
  isModifyCompleted?: boolean; 
  totalElements?: number;
  // totalPages: number;
  // page: number;
  // pageSize: number;
  isLast?: boolean;
}

const initialState: ReservationState = {
  data: [],
  isFetched: false,
  // page: 0,
  // // pageSize: onedayPageSize ? +onedayPageSize : 8,
  // pageSize: 8,
  // totalPages: 0,
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
    //   initialNextReservation: (state, action: PayloadAction<ReservationPage>) => {
    //     // 백엔드에서 받아온 데이터를 기존데이터 뒤로 합침
    //     // 컨텐트
    //     state.data = state.data.concat(action.payload.data);
    //     // 데이터를 받아옴으로 값을 남김
    //     state.isFetched = true;
    // },
  }
});


export const {
  addReservation,
  modifyReservation,
  initialReservationItem,
  initialReservation,
  initialCompleted
} = reservationSlice.actions;


export default reservationSlice.reducer;