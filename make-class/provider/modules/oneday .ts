import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import oneday from "../../api/oneday";

export interface OneDayItem {
  oneDayClassId: number;
  managerOneDayClassId: string;
  onedayclassName: string;
  price: string;
  title: string;
  description?: string;
  managerName: string;
  capacity: string;
  photoUrl: string;
  fileType: string;
  fileName: string;
  createdTime: number;
  startTime: string;
  endTime: string;
  category: string;
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
  data: [
    // {
    //   oneDayClassId: 2,
    //   managerOneDayClassId: "2",
    //   onedayclassName: "핸드메이드",
    //   price: "",
    //   title: "",
    //   managerName: "",
    //   category: "",
    //   description: "onedayclass..",
    //   capacity: "",
    //   photoUrl: "/clss.jpg",
    //   fileType: "",
    //   fileName: "",
    //   createdTime: new Date().getTime(),
    //   startTime: "12월1일",
    //   endTime: "12월 3일"
    // },
    // {
    //   oneDayClassId: 1,
    //   managerOneDayClassId: "1",
    //   onedayclassName: "플라워",
    //   price: "",
    //   title: "",
    //   managerName: "",
    //   category: "",
    //   description: "onedayclass..",
    //   capacity: "",
    //   photoUrl: "/class.jpg",
    //   fileType: "",
    //   fileName: "",
    //   createdTime: new Date().getTime(),
    //   startTime: "12월9일",
    //   endTime: "12월 9일"
    // },
  ],
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
    addOneday: (state, action: PayloadAction<OneDayItem>) => {
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
        state.data.findIndex((item) => item.oneDayClassId === id),
        1
      );
      state.isRemoveCompleted = true; 
    },
    modifyOneday: (state, action: PayloadAction<OneDayItem>) => {
    
      const modifyItem = action.payload;
    
      const OnedayItem = state.data.find((item) => item.oneDayClassId === modifyItem.oneDayClassId);

      if (OnedayItem) {
        OnedayItem.managerName = modifyItem.managerName;
        OnedayItem.managerOneDayClassId = modifyItem.managerOneDayClassId;
        OnedayItem.onedayclassName = modifyItem.onedayclassName;
        OnedayItem.price = modifyItem.price;
        OnedayItem.title = modifyItem.title;
        OnedayItem.managerName = modifyItem.managerName;
        OnedayItem.category = modifyItem.category;
        OnedayItem.capacity = modifyItem.capacity;
        OnedayItem.description = modifyItem.description;
        OnedayItem.photoUrl = modifyItem.photoUrl;
        OnedayItem.fileName = modifyItem.fileName;
        OnedayItem.fileType = modifyItem.fileType;
        OnedayItem.startTime = modifyItem.startTime;
        OnedayItem.endTime = modifyItem.endTime;
      }
      state.isModifyCompleted = true; 
    },
    initialOnedayItem: (state, action: PayloadAction<OneDayItem>) => {
      const oneday = action.payload;
      state.data = [{ ...oneday }];
    },

    initialOneday: (state, action: PayloadAction<OneDayItem[]>) => {
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