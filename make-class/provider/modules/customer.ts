import { createSlice } from "@reduxjs/toolkit";


export interface Customer{
  name: string;
  customerId: number;
}


const initialState:Customer  = {
  name: "노유정",
  customerId: 1
};


const customerSlice = createSlice({
  name: "customer",
  initialState,  
  reducers: {},
});

export default customerSlice.reducer;