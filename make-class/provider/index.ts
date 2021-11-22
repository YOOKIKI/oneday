import { configureStore } from "@reduxjs/toolkit";
// import rootSaga from "../middleware";
import onedayReduer from "./modules/oneday "
import inquiryReduer from "./modules/inquiry";
import progressReducer from "./modules/progress";
import alertReducer from "./modules/alert";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "../middleware";
import customerReducer from "../provider/modules/customer";
import reservationReducer from "../provider/modules/reservation";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    oneday: onedayReduer,
    inquiry: inquiryReduer,
    progress: progressReducer,
    alert: alertReducer,
    customer: customerReducer,
    reservation: reservationReducer
  },
  middleware: [sagaMiddleware],
  devTools: true,
});
  
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;