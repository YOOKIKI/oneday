import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import oneday from "../../api/oneday";

export interface OnedayItem {
  id: number;
  inquiryId: number;
  onedayclassName: string;
  price: string;
  description?: string;
  capacity: string;
  photoUrl: string;
  fileType: string;
  fileName: string;
  createdTime: number;
  startDateData: string;
  endDateData: string;
}

export interface OnedayPage {
  data: OnedayItem[];
  totalElements: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast: boolean;
}

interface OnedayState {
  data: OnedayItem[];
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
  data: [
    {
      id: 2,
      inquiryId: 2,
      onedayclassName: "핸드메이드",
      price: "",
      description: "onedayclass..",
      capacity: "",
      photoUrl: require('../../public/clss.png').default.src,
      fileType: "",
      fileName: "",
      createdTime: new Date().getTime(),
      startDateData: "12월1일",
      endDateData: "12월 3일"
    },
    {
      id: 1,
      inquiryId: 1,
      onedayclassName: "플라워",
      price: "",
      description: "onedayclass..",
      capacity: "",
      photoUrl: require('../../public/clss.png').default.src,
      fileType: "",
      fileName: "",
      createdTime: new Date().getTime(),
      startDateData: "12월9일",
      endDateData: "12월 9일"
    },
  ],
  isFetched: false,
  page: 0,
  // pageSize: onedayPageSize ? +onedayPageSize : 8,
  pageSize: 2,
  totalPages: 0,
};


const onedaySlice = createSlice({
  name: "oneday",
  initialState,  
  reducers: {
    addOneday: (state, action: PayloadAction<OnedayItem>) => {
      const oneday = action.payload;
      console.log("--in reducer function--");
      console.log(oneday);
      state.data.unshift(oneday);
      state.isAddCompleted = true;
    },
    initialCompleted: (state) => {
      delete state.isAddCompleted;
      delete state.isRemoveCompleted;
      delete state.isModifyCompleted;
    },
    removeOneday: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      
      state.data.splice(
        state.data.findIndex((item) => item.id === id),
        1
      );
      state.isRemoveCompleted = true; 
    },
    modifyOneday: (state, action: PayloadAction<OnedayItem>) => {
    
      const modifyItem = action.payload;
    
      const OnedayItem = state.data.find((item) => item.id === modifyItem.id);

      if (OnedayItem) {
        OnedayItem.onedayclassName = modifyItem.onedayclassName;
        OnedayItem.description = modifyItem.description;
        // OnedayItem.photoUrl = modifyItem.photoUrl;
      }
      state.isModifyCompleted = true; 
    },
    initialOnedayItem: (state, action: PayloadAction<OnedayItem>) => {
      const oneday = action.payload;
 
      state.data = [{ ...oneday }];
    },

    initialOneday: (state, action: PayloadAction<OnedayItem[]>) => {
      const onedays = action.payload;

      state.data = onedays;
  
      state.isFetched = true;
    },
    addTotalpages: (state) => {
      state.totalPages++;
    },

    initialPagedOneday: (state, action: PayloadAction<OnedayPage>) => {

      state.data = action.payload.data;

      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.isLast = action.payload.isLast;
 
      state.isFetched = true;
    },
    initialNextOneday: (state, action: PayloadAction<OnedayPage>) => {

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
  addOneday,
  removeOneday,
  modifyOneday,
  initialOnedayItem,
  initialOneday,
  initialCompleted,
  addTotalpages,
  initialPagedOneday,
  initialNextOneday,
} = onedaySlice.actions;


export default onedaySlice.reducer;