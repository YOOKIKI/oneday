import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Inquiry from "../../pages/inquiry";

export interface InquiryItem {
  id: number;
  classId: string;
  onedayclassName: string;
  title: string;
  name: string;
  tel: string;
  email: string;
  description?: string;
  createdTime: number;
}

export interface InquiryPage {
  data: InquiryItem[]
  totalElements: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast: boolean;
};


interface InquiryState {
  isRemoveCompleted: any;
  isModifyCompleted: any;
  data: InquiryItem[];
  isFetched: boolean;
}

const initialState: InquiryState = {
  data: [
    {
      id: 2,
      classId: "",
      onedayclassName: "핸드메이드",
      title: "문의합니다",
      name: "수강생",
      tel: "010-1234-5678",
      email: "day@mail.com",
      description: "클래스 문의합니다",
      createdTime: new Date().getTime(),
    },
    {
      id: 1,
      classId: "",
      onedayclassName: "플라워",
      title: "문의",
      name: "수강생",
      tel: "010-8765-4321",
      email: "oneday@mail.com",
      description: "수강일 문의드립니다",
      createdTime: new Date().getTime(),
    }
  ],
  isFetched: false,
  isModifyCompleted: undefined,
  isRemoveCompleted: undefined
};


const inquirySlice = createSlice({  
  name: "inquiry",
  initialState,
  reducers: {
    addInquiry: (state, action: PayloadAction<InquiryItem>) => {
      const inquiry = action.payload;
      console.log("--in reducer function--");
      console.log(inquiry);
      state.data.unshift(inquiry);
      // state.isAddCompleted = true;
    },
    // initialCompleted: (state) => {
    //   delete state.isAddCompleted;
    //   delete state.isRemoveCompleted;
    //   delete state.isModifyCompleted;
    // },
    removeInquiry: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      state.data.splice(
        state.data.findIndex((item) => item.id === id),
        1
      );
      // state.isRemoveCompleted = true; 
    },
    modifyInquiry: (state, action: PayloadAction<InquiryItem>) => {
    
      const modifyItem = action.payload;
    
      const InquiryItem = state.data.find((item) => item.id === modifyItem.id);

      if (InquiryItem) {
        InquiryItem.classId = modifyItem.classId;
        InquiryItem.onedayclassName = modifyItem.onedayclassName;
        InquiryItem.title = modifyItem.title;
        InquiryItem.name = modifyItem.name;
        InquiryItem.tel = modifyItem.tel;
        InquiryItem.email = modifyItem.email;
        InquiryItem.description = modifyItem.description;
      }
      // state.isModifyCompleted = true; 
    },
    // initialInquiryItem: (state, action: PayloadAction<InquiryItem>) => {
    //   const inquiry = action.payload;
 
    //   state.data = [{ ...inquiry }];
    // },

    // initialInquiry: (state, action: PayloadAction<InquiryItem[]>) => {
    //   const inquirys = action.payload;

    //   state.data = inquirys;
  
    //   state.isFetched = true;
    // },
  },
});

export const {
  addInquiry,
  removeInquiry,
  modifyInquiry,
} = inquirySlice.actions;


export default inquirySlice.reducer;