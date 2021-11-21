import { fork } from "redux-saga/effects";
import inquirySaga from "./modules/inquiry";
import onedaySaga from "./modules/oneday"
import reservationSaga from "./modules/reservation";

export default function* rootSaga() {
  yield fork(onedaySaga);
  yield fork(reservationSaga);
  yield fork(inquirySaga);
}