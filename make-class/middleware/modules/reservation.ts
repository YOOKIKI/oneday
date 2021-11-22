import ReservationReducer, {
  addReservation,
  initialCompleted,  
  initialNextReservation,  
  initialReservation,  
  loadReservation,
  ReservationPage,
  ReservationResponse
} from "../../provider/modules/reservation";
import { createAction, nanoid, PayloadAction } from "@reduxjs/toolkit";
import reservation, { ReservationItem } from "../../provider/modules/reservation";
import {
  call,
  put,
  takeEvery
} from "@redux-saga/core/effects";
import api, { ReservationItemResponse, ReservationPagingReponse, ReservationRequest } from "../../api/reservation";
import { AxiosResponse } from "axios";
import { endProgress, startProgress } from "../../provider/modules/progress";
import { addAlert } from "../../provider/modules/alert";
import { takeLatest } from "redux-saga/effects";

// export interface OneDayClassIdRequest {
//   oneDayClassId: number; page: number;
//   size: number;}

export interface PageRequest {
  page: number;
  size: number;
}

export const requestAddReservation = createAction<ReservationItem>(
  `${ReservationReducer.name}/requestAddReservation`
);


export const requestAddReservationNext = createAction<ReservationItem>(
  `${ReservationReducer.name}/requestAddReservationNext`
);

export const requestFetchReservations = createAction(
  `${ReservationReducer.name}/requestFetchReservations`
);

// export const requestFetchReservationItem = createAction<OneDayClassIdRequest>(
//   `${ReservationReducer.name}/requestFetchReservationItem`
// );

export const requestFetchNextReservations = createAction<PageRequest>(
  `${ReservationReducer.name}/requestFetchNextReservations`
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

    console.log("예약 보낼때 " + reservationItemPayload);

    // spinner 보여주기
    yield put(startProgress());
    
    // rest api로 보낼 요청객체
    const reservationItemRequest: ReservationRequest = {
      oneDayClassId: reservationItemPayload.oneDayClassId,
      name: reservationItemPayload.name,
      tel: reservationItemPayload.tel,
      price: reservationItemPayload.price,
      reservationTime: reservationItemPayload.reservationTime,
      reservationDay: reservationItemPayload.reservationDay,
      capacity: reservationItemPayload.capacity,
      person: reservationItemPayload.person,
      title: reservationItemPayload.title,
      createdTime: reservationItemPayload.createdTime,
    };

    const result: AxiosResponse<ReservationItemResponse> = yield call(
      api.add,
      reservationItemRequest
    );

    // spinner 사라지게 하기
    yield put(endProgress());

    const reservationItem: ReservationItem = {
      id: result.data.id,
      oneDayClassId: result.data.oneDayClassId,
      name: result.data.name,
      tel: result.data.tel,
      reservationDay: result.data.reservationDay,
      reservationTime: result.data.reservationTime,
      price: result.data.price,
      capacity: result.data.capacity,
      status: result.data.status,
      createdTime: result.data.createdTime,
      title: result.data.title,
      person:result.data.person
    };

    yield put(addReservation(reservationItem));

    // completed 속성 삭제
    yield put(initialCompleted());

    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "success", message: "저장되었습니다." })
    );
  } catch (e: any) {
    // spinner 사라지게 하기
    yield put(endProgress());
    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "danger", message: e.message })
    );
  }
}

function* fetchData() {
  yield console.log("--fetchData--");

    
  const result: AxiosResponse<ReservationItem[]> = yield call(api.fetch);

  yield put(endProgress);

  // const ReservationItem: ReservationResponse = {
    // data: result.data.map(
  const reservations = result.data.map(
      (item) =>
      ({
        id: item.id,
        oneDayClassId: item.oneDayClassId,
        name: item.name,
        tel: item.tel,
        reservationDay: item.reservationDay,
        reservationTime: item.reservationTime,
        price: item.price,
        person: item.person,
        capacity: item.capacity,
        title: item.title,
        status: item.status,
        createdTime: item.createdTime
      } as ReservationItem)
    )
  
    
    yield put(initialReservation(reservations));
}

function* fetchNextData(action: PayloadAction<PageRequest>) {
  yield console.log("--fetchNext Data--");


  const page = action.payload.page;
  const size = action.payload.size;
    
  yield put(startProgress());

  localStorage.setItem("reservation_page_size", size.toString());
  try {
    const result: AxiosResponse<ReservationPagingReponse> = yield call(
      api.fetchPaging,
      page,
      size
    );

    yield put(endProgress());

    const reservationPage: ReservationPage = {
      data: result.data.content.map(
        (item) =>
          ({
            id: item.id,
            oneDayClassId: item.oneDayClassId,
            name: item.name,
            tel: item.tel,
            reservationDay: item.reservationDay,
            reservationTime: item.reservationTime,
            price: item.price,
            person: item.person,
            capacity: item.capacity,
            title: item.title,
            status: item.status,
            createdTime: item.createdTime
          } as ReservationItem)
      ),
      totalElements: result.data.totalEements,
      totalPages: result.data.totalEements,
      page: result.data.number,
      pageSize: result.data.size,
      isLast: result.data.last,
    };

    yield put(initialNextReservation(reservationPage));
  } catch (e: any) {
     yield put(endProgress());
    yield put(
      addAlert({ id: nanoid(), variant: "danger", message: e.message })
    );
  }
}

export default function* reservationSaga() {
  yield takeEvery(requestAddReservation, addDataNext);
  // yield takeLatest(requestFetchReservations, fetchData);
  yield takeLatest(requestFetchNextReservations, fetchNextData)
}