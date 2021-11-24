import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Inquiry from "../../pages/inquiry";

export interface InquiryItem {
  // id: number;
  inquiryId?: number;
  customerId: number;
  title: string;
  name: string;
  tel: string;
  email: string;
  description: string;
  answer?: string;
  createdTime: number;
  oneDayClassId: number;
  oneDayClassName: string;
}

export interface InquiryRequest {
  inquiryId?: number;
  title: string;
  name: string;
  tel: string;
  email: string;
  description?: string;
  answer?: string;
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
  data: InquiryItem[];
  isFetched: boolean; // 서버에서 데이터를 받아왔는지에 대한 여부
  isAddCompleted?: boolean; // 데이터 추가가 완료되었는지 여부
  isRemoveCompleted?: boolean; // 데이터 삭제가 완료되었는지 여부
  isModifyCompleted?: boolean; // 데이터 수정이 완료되었는지 여부
  totalElements?: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast?: boolean;
}

const initialState: InquiryState = {
  data: [],
  isFetched: false,
  page: 0,
  // pageSize: onedayPageSize ? +onedayPageSize : 8,
  pageSize: 8,
  totalPages: 0,
};


const inquirySlice = createSlice({  
  name: "inquiry",
  initialState,
  reducers: {
    addInquiry: (state, action: PayloadAction<InquiryItem>) => {
      const inquiry = action.payload;

      state.data.unshift(inquiry);
      state.isAddCompleted = true;
    },

    initialCompleted: (state) => {
      delete state.isAddCompleted;
      delete state.isRemoveCompleted;
      delete state.isModifyCompleted;
    },
    
    removeInquiry: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      state.data.splice(
        state.data.findIndex((item) => item.inquiryId === id),
        1
      );
      state.isRemoveCompleted = true; 
    },
    modifyInquiry: (state, action: PayloadAction<InquiryItem>) => {
    
      const modifyItem = action.payload;
    
      const InquiryItem = state.data.find((item) => item.inquiryId === modifyItem.inquiryId);

      if (InquiryItem) {
        InquiryItem.oneDayClassName = modifyItem.oneDayClassName;
        InquiryItem.title = modifyItem.title;
        InquiryItem.name = modifyItem.name;
        InquiryItem.tel = modifyItem.tel;
        InquiryItem.email = modifyItem.email;
        InquiryItem.description = modifyItem.description;
        InquiryItem.answer = modifyItem.answer;
      }
      state.isModifyCompleted = true; 
    },
    initialInquiryItem: (state, action: PayloadAction<InquiryItem>) => {
      const inquiry = action.payload;
 
      state.data = [{ ...inquiry }];
    },

    initialInquiry: (state, action: PayloadAction<InquiryItem[]>) => {
      const inquirys = action.payload;

      state.data = inquirys;
  
      state.isFetched = true;
    },
    addTotalpages: (state) => {
      state.totalPages++;
    },
    // payload값으로 state를 초기화하는 reducer 필요함
    initialPagedInquiry: (state, action: PayloadAction<InquiryPage>) => {
      // 백엔드에서 받아온 데이터
      // 컨텐트
      state.data = action.payload.data;
      // 페이징 데이터
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.isLast = action.payload.isLast;
      // 데이터를 받아옴으로 값을 남김
      state.isFetched = true;
    },
    // initialNextInquiry: (state, action: PayloadAction<InquiryPage>) => {
    //   // 백엔드에서 받아온 데이터를 기존데이터 뒤로 합침
    //   // 컨텐트
    //   state.data = state.data.concat(action.payload.data);
    //   // 페이징 데이터
    //   state.totalElements = action.payload.totalElements;
    //   state.totalPages = action.payload.totalPages;
    //   state.page = action.payload.page;
    //   state.pageSize = action.payload.pageSize;
    //   state.isLast = action.payload.isLast;
    //   // 데이터를 받아옴으로 값을 남김
    //   state.isFetched = true;
    // },
  },
});

export const {
  addInquiry,
  removeInquiry,
  modifyInquiry,
  initialInquiryItem,
  initialInquiry,
  initialCompleted,
  addTotalpages,
  initialPagedInquiry,
  // initialNextInquiry,
} = inquirySlice.actions;


export default inquirySlice.reducer;