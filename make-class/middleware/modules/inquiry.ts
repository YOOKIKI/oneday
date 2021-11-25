import InquiryReducer, {
  addInquiry,
  initialCompleted,
  initialInquiry,
  initialPagedInquiry,
  InquiryPage,
  InquiryResponse,
  loadInquiry,
  modifyInquiry,
  removeInquiry,
} from "../../provider/modules/inquiry";
import { createAction, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { InquiryItem } from "../../provider/modules/inquiry";
import {
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "@redux-saga/core/effects";
import api, {
  InquiryItemRequest,
  InquiryItemResponse,
  InquiryPagingReponse,
} from "../../api/inquiry";
import { AxiosResponse } from "axios";
import { endProgress, startProgress } from "../../provider/modules/progress";
import { addAlert } from "../../provider/modules/alert";
import { createAxiosInstance } from "../../api/_request";
import { RootState } from "../../provider";
import { title } from "process";

export interface PageRequest {
  page: number;
  size: number;
}



export const requestAddInquiry = createAction<InquiryItem>(
  `${InquiryReducer.name}/requestAddInquiry`
);

export const requestAddInquiryPaging = createAction<InquiryItem>(
  `${InquiryReducer.name}/requestAddInquiryPaging`
)


export const requestFetchInquiryItem = createAction( 
  `${InquiryReducer.name}/requestFetchInquiryItem`
);

export const requestFetchPagingInquirys = createAction<PageRequest>(
  `${InquiryReducer.name}/requestFetchPagingInquirys`
)

export const requestRemoveInquiry = createAction<number>(
  `${InquiryReducer.name}/requestRemoveInquiry`
)

export const requestModifyInquiry = createAction<InquiryItem>(
  `${InquiryReducer.name}/requestModifyInquiry`
)

function* addDataNext(action: PayloadAction<InquiryItem>) {
  yield console.log("--addDataNext--");
  yield console.log(action);

  try {
    const inquiryItemPayload = action.payload;

      yield put(startProgress());
      
      console.log(inquiryItemPayload.oneDayClassName)

      const inquiryItemRequest: InquiryItemRequest = {
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


 function* fetchData() {
  yield console.log("--fetchInquiryData--");   

   
   
     const result: AxiosResponse<InquiryItem[]> = yield call(api.fetch);

     yield put(endProgress());
     
     const InquiryItem: InquiryResponse = {
       data: result.data.map(
         (item) =>
         ({
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
         } as InquiryItem)),
        };
        console.log(InquiryItem);
        yield put(loadInquiry(InquiryItem))

  }

function* fetchPagingData(action: PayloadAction<PageRequest>) {
  yield console.log("--fetchPagingData--");

  const page = action.payload.page;
  const size = action.payload.size;

  localStorage.setItem("onquiry_page_size", size.toString());

  yield put(startProgress());

  try {
    const result: AxiosResponse<InquiryPagingReponse> = yield call(
      api.fetchPaging,
      page,
      size
    );

    yield put(endProgress());

    const inquiryPage: InquiryPage = {
      data: result.data.content.map(
        (item) =>
        ({
          inquiryId: item.inquiryId,
          oneDayClassId: item.oneDayClassId,
          oneDayClassName: item.oneDayClassName,
          title: item.title,
          name: item.name,
          tel: item.tel,
          email: item.email,
          description: item.description,
          answer: item.answer,
          createdTime: item.createdTime
        } as InquiryItem)
      ),
      totalElements: result.data.totalElements,
      totalPages: result.data.totalElements,
      page: result.data.number,
      pageSize: result.data.size,
      isLast: result.data.last,
    };
    
    yield put(initialPagedInquiry(inquiryPage));
  } catch(e: any) {
    yield put(endProgress());
    yield put(
      addAlert({ id: nanoid(), variant: "danger", message: e.message })
    );
  }
}

function* removeDataItem(action: PayloadAction<number>) {
  yield console.log("--removeData--");

  const id = action.payload;

  yield put(startProgress());

  const inquiryItem: InquiryItem = yield select((state: RootState) =>
    state.inquiry.data.find((item) => item.inquiryId === id)
  );

  const result: AxiosResponse<boolean> = yield call(api.remove, id);

  yield put(endProgress());

  if (result.data) {
    yield put(removeInquiry(id));
  } else {
    yield put(
      addAlert({
        id: nanoid(),
        variant: "danger",
        message: "오류로 저장되지 않았습니다.",
      })
    );
  }
  yield put(initialCompleted());
}

function* modifyData(action: PayloadAction<InquiryItem>) {
  yield console.log("--modifyData--");
  const inquiryItemPayload = action.payload;

  yield put(startProgress());

  const inquiryItemRequest: InquiryItemRequest = {
    oneDayClassName: inquiryItemPayload.oneDayClassName,
    title: inquiryItemPayload.title,
    description: inquiryItemPayload.description,
    name: inquiryItemPayload.name,
    tel: inquiryItemPayload.tel,
    email: inquiryItemPayload.email,
    answer: inquiryItemPayload.answer,
    oneDayClassId: inquiryItemPayload.oneDayClassId,
    createdTime: inquiryItemPayload.createdTime
  }
  const result: AxiosResponse<InquiryItemResponse> = yield call(
    api.modify,
    inquiryItemPayload.oneDayClassId,
    inquiryItemRequest
  );

  yield put(endProgress());

  const inquiryItem: InquiryItem = {
    oneDayClassId: result.data.oneDayClassId,
    title: result.data.title,
    description: result.data.description,
    name: result.data.name,
    tel: result.data.tel,
    email: result.data.email,
    answer: result.data.answer,
    createdTime: result.data.createdTime,
    oneDayClassName: result.data.oneDayClassName
  };
  yield put(modifyInquiry(inquiryItem));
  yield put(initialCompleted());
}

// 숫자 페이징 목록 조회

export default function* inquirySaga() {
  yield takeEvery(requestAddInquiry, addDataNext);
  
  yield takeLatest(requestFetchInquiryItem, fetchData);
  yield takeLatest(requestFetchPagingInquirys, fetchPagingData)

  yield takeEvery(requestRemoveInquiry, removeDataItem);

  yield takeEvery(requestModifyInquiry, modifyData);
}