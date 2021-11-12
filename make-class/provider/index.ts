import { configureStore } from "@reduxjs/toolkit";
// import rootSaga from "../middleware";
import onedayReduer from "./modules/oneday "
import inquiryReduer from "./modules/inquiry";
import createSagaMiddleware from "@redux-saga/core";

// const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    oneday: onedayReduer,
    inquiry: inquiryReduer,
  },
  // middleware: [sagaMiddleware],
  devTools: true,
});
  
// sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;