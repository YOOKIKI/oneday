import { fork } from "redux-saga/effects";
import onedaySaga from "./modules/oneday"

export default function* rootSaga() {
  yield fork(onedaySaga);
  // yield fork(inquirySaga);
}