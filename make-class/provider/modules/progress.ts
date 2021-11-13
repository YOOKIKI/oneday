import { createSlice } from "@reduxjs/toolkit";

interface InquiryState {
  status: boolean;
}

const initialState: InquiryState = {
  status: false,
};

const inquirySlice = createSlice({
 name: "inquiry",
  initialState,
  reducers: {
    startProgress: (state) => {
      state.status = true;
    },
    endProgress: (state) => {
      state.status = false;
    },
  },
});

export const { startProgress, endProgress } = inquirySlice.actions;
export default inquirySlice.reducer;
