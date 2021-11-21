import InquiryReducer, {
  addInquiry,
  initialCompleted,
  initialInquiry,
} from "../../provider/modules/inquiry";
import { createAction, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { InquiryItem } from "../../provider/modules/inquiry";
import {
  call,
  put,
  takeEvery,
  takeLatest,
} from "@redux-saga/core/effects";
import api, {
  InquiryItemRequest,
  InquiryItemResponse,
} from "../../api/inquiry";
import { AxiosResponse } from "axios";
import { endProgress, startProgress } from "../../provider/modules/progress";
import { addAlert } from "../../provider/modules/alert";


export const requestAddInquiry = createAction<InquiryItem>(
  `${InquiryReducer.name}/requestAddInquiry`
);


export const requestFetchInquirys = createAction<number>( 
  `${InquiryReducer.name}/requestFetchPagingInquirys`
);



function* addDataNext(action: PayloadAction<InquiryItem>) {
  yield console.log("--addDataNext--");
  yield console.log(action);

  try {
    const inquiryItemPayload = action.payload;

      yield put(startProgress());
      
      console.log(inquiryItemPayload.oneDayClassName)

      const inquiryItemRequest: InquiryItemRequest = {
        customerId: inquiryItemPayload.customerId,
      oneDayClassId: inquiryItemPayload.oneDayClassId,
      oneDayClassName: inquiryItemPayload.oneDayClassName,
      title: inquiryItemPayload.title,
      name: inquiryItemPayload.name,
      tel: inquiryItemPayload.tel,
      email: inquiryItemPayload.email,
      description: inquiryItemPayload.description,
      createdTime: inquiryItemPayload.createdTime,
      };
      
      console.log(inquiryItemRequest);

    const result: AxiosResponse<InquiryItemResponse> = yield call(
      api.add,
      inquiryItemRequest
    );

    yield put(endProgress());


    if (result) {
        const inquiryItem: InquiryItem = {
           customerId: result.data.customerId,
        oneDayClassId: result.data.oneDayClassId,
        oneDayClassName: result.data.oneDayClassName,
        title: result.data.title,
        name: result.data.name,
        tel: result.data.tel,
        email: result.data.email,
        description: result.data.description,
        answer: result.data.answer,
        createdTime: result.data.createdTime,
        inquiryId: result.data.inquiryId,
      };
      
      yield put(addInquiry(inquiryItem));
      yield put(initialCompleted());

      yield put(
        addAlert({ id: nanoid(), variant: "success", message: "저장되었습니다." })
      );
    }

  } catch (e: any) {
    yield put(endProgress());

    yield put(
      addAlert({ id: nanoid(), variant: "danger", message: e.message })
    );
  }
}


 function* fetchInquiryData(action: PayloadAction<number>) {
     yield console.log("--fetchInquiryData--");
     
     const customerId = action.payload;

  const result: AxiosResponse<InquiryItemResponse[]> = yield call(api.fetch, customerId);

  yield put(endProgress());

  // OInquiryItemReponse[] => InquiryItem[]
  const inquiry: InquiryItem[] = result.data.map(
    (item) =>
      (
          {
        customerId: item.customerId,
        oneDayClassId: item.oneDayClassId,
        oneDayClassName: item.oneDayClassName,
        title: item.title,
        name: item.name,
        tel: item.tel,
        email: item.email,
        description: item.description,
        answer: item.answer,
        createdTime: item.createdTime,
        inquiryId: item.inquiryId,
      } as InquiryItem)
     );
     
     console.log(inquiry);

  // state 초기화 reducer 실행
  yield put(initialInquiry(inquiry));
}

// 숫자 페이징 목록 조회

export default function* inquirySaga() {
    yield takeEvery(requestAddInquiry, addDataNext);
    yield takeLatest(requestFetchInquirys, fetchInquiryData);
}