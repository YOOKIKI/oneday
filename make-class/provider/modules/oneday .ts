import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import oneday from "../../api/oneday";

export interface OneDayItem {
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
    },
  },
});


export const {
  initialNextOneday
} = onedaySlice.actions;


export default onedaySlice.reducer;