import ReservationReducer, {
  addReservation,
  initialCompleted  
} from "../../provider/modules/reservation";
import { createAction, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ReservationItem } from "../../provider/modules/reservation";
import {
  call,
  put,
  takeEvery
} from "@redux-saga/core/effects";
import api, { ReservationRequest, ReservationResponse } from "../../api/reservation";
import { AxiosResponse } from "axios";
import { endProgress, startProgress } from "../../provider/modules/progress";
import { addAlert } from "../../provider/modules/alert";


export const requestAddReservation = createAction<ReservationItem>(
  `${ReservationReducer.name}/requestAddReservation`
);


export const requestAddReservationNext = createAction<ReservationItem>(
  `${ReservationReducer.name}/requestAddReservationNext`
);

export const requestFetchReservations = createAction(
  `${ReservationReducer.name}/requestFetchReservations`
);

export const requestFetchReservationItem = createAction<number>(
  `${ReservationReducer.name}/requestFetchReservationItem`
);

export const requestModifyReservation = createAction<ReservationItem>(
  `${ReservationReducer.name}/requestModifyReservation`
);

function* addDataNext(action: PayloadAction<ReservationItem>) {
  yield console.log("--addDataNext--");
  yield console.log(action);

  try {
    // action의 payload로 넘어온 객체
    const reservationItemPayload = action.payload;

    // spinner 보여주기
    yield put(startProgress());
    
    // rest api로 보낼 요청객체
    const reservationItemRequest: ReservationRequest = {
      id: reservationItemPayload.id,
      oneDayClassID: reservationItemPayload.oneDayClassID,
      name: reservationItemPayload.name,
      tel: reservationItemPayload.tel,
      totalAmount: reservationItemPayload.totalAmount,
      reservationData: reservationItemPayload.reservationData,
      capacity: reservationItemPayload.capacity,
      className: reservationItemPayload.className,
      status: reservationItemPayload.status,
      createdTime: reservationItemPayload.createdTime,
    };

    // ------ 1. rest api에 post로 데이터 보냄
    // call(함수, 매개변수1, 매개변수2...) -> 함수를 호출함

    // 함수가 Promise를 반환하면, (비동기함수)
    // Saga 미들웨어에서 현재 yield에 대기상태로 있음
    // Promise가 resolve(처리완료)되면 다음 yield로 처리가 진행됨
    // reject(거부/에러)되면 예외를 던짐(throw) -> try ... catch문으로 받을 수 있음.

    // await api.add(photoItemRequest) 이 구문과 일치함
    // 결과값을 형식을 지졍해야함
    const result: AxiosResponse<ReservationResponse> = yield call(
      api.add,
      reservationItemRequest
    );

    // spinner 사라지게 하기
    yield put(endProgress());

    // ------ 2. redux state를 변경함
    // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성
    const reservationItem: ReservationItem = {
      id: result.data.id,
      oneDayClassID: result.data.oneDayClassID,
      name: result.data.name,
      tel: result.data.tel,
      reservationData: result.data.reservationData,
      totalAmount: result.data.totalAmount,
      capacity: result.data.capacity,
      status: result.data.status,
      createdTime: result.data.createdTime,
      className: result.data.className
    };

    // dispatcher(액션)과 동일함
    // useDispatch로 dispatcher 만든 것은 컴포넌트에서만 가능
    // put이펙트를 사용함
    yield put(addReservation(reservationItem));

    // completed 속성 삭제
    yield put(initialCompleted());

    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "success", message: "저장되었습니다." })
    );
  } catch (e: any) {
    // 에러발생
    // spinner 사라지게 하기
    yield put(endProgress());
    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "danger", message: e.message })
    );
  }
}

export default function* reservationSaga() {
  yield takeEvery(requestAddReservation, addDataNext);
  yield takeEvery(requestAddReservationNext, addDataNext);

}