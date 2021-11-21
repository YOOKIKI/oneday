import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import oneday from "../../api/oneday";
import { ReservationItem } from "./reservation";

export interface OneDayItem { // 이게 원데이 클래스 1개의 타입이죠 ?네 그럼 이안에 예약이 들어있아야ㅐ 합니다 ㅋㅋ 
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
  reservation?: ReservationItem[]; // 이런느낌 으로 아..
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
  isAddCompleted?: boolean; // 리덕스 할 때 끄세영
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
  // pageSize: onedayPageSize ? +onedayPageSize : 8,
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