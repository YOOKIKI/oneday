import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReservationItem } from "./reservation";

export interface OneDayItem { // 예약이 들어있아야합니다
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
  reservation?: ReservationItem[];
}

export interface OneDayClassItemResponse {
  data: OneDayItem[];
}

export interface OnedayPage {
  data: OneDayItem[];
  totalElements: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast: boolean;
}

interface OnedayState {
  data: OneDayItem[];
  isFetched: boolean;
  isAddCompleted?: boolean; // 리덕스 할 때 끄기
  isRemoveCompleted?: boolean; 
  isModifyCompleted?: boolean; 
  totalElements?: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast?: boolean;
}

const initialState: OnedayState = {
  data: [],
  isFetched: false,
  page: 0,
  pageSize: 8,
  totalPages: 0,
};


const onedaySlice = createSlice({
  name: "oneday",
  initialState,  
  reducers: {
    initialNextOneday: (state, action: PayloadAction<OneDayClassItemResponse>) => {
      state.data = action.payload.data;
      state.isFetched = true;
    },

    modifyOneday: (state, action: PayloadAction<OneDayItem>) => {
      const modifyItem = action.payload;
      const OneDayItem = state.data.find((item) => item.oneDayClassId === modifyItem.oneDayClassId)
      if (OneDayItem) {
        OneDayItem.title = modifyItem.title;
        OneDayItem.capacity = modifyItem.capacity;
        OneDayItem.photoUrl = modifyItem.photoUrl;
        OneDayItem.fileType = modifyItem.fileType;
        OneDayItem.managerName = modifyItem.managerName;
        OneDayItem.category = modifyItem.category;
        OneDayItem.description = modifyItem.description;
        OneDayItem.startDay = modifyItem.startDay;
        OneDayItem.endDay = modifyItem.endDay;
        OneDayItem.startTime = modifyItem.startTime;
        OneDayItem.endTime = modifyItem.endTime;
        OneDayItem.price = modifyItem.price;
        OneDayItem.createdTime = modifyItem.createdTime;
      }
      state.isModifyCompleted = true;
    
    }
  },
});


export const {
  initialNextOneday,
  modifyOneday
} = onedaySlice.actions;


export default onedaySlice.reducer;