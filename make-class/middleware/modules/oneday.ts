import { call, put, takeLatest } from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import onedayApi from "../../api/oneday";
import onedayReducer, { initialNextOneday, OneDayClassItemResponse, OneDayItem }from "../../provider/modules/oneday "

export interface PageRequest {
  page: number;
  size: number;
}

export const requestFetchOneday = createAction(
  `${onedayReducer.name}/requestFetchOneday`
);

export const requestFetchPagingOneday = createAction<PageRequest>(
  `${onedayReducer.name}/requestFetchPagingOneday`
);

export const requestFetchNextOneday = createAction<PageRequest>(
  `${onedayReducer.name}/requestFetchNextOneday`
);

export const requestFetchOnedayItem = createAction<number>(
  `${onedayReducer.name}/requestFetchOnedayItem`
);

function* fetchData() {
  yield console.log("--fetchData--");

  const result: AxiosResponse<OneDayItem[]> = yield call(onedayApi.fetch);

  const OneDayItem: OneDayClassItemResponse = {
    data: result.data.map(
      (item) =>
      ({
        oneDayClassId: item.oneDayClassId,
        title: item.title,
        capacity: item.capacity,
        photoUrl: item.photoUrl,
        fileType: item.fileType,
        fileName: item.fileName,
        managerName: item.managerName,
        category: item.category,
        description: item.description,
        startDay: item.startDay,
        endDay: item.endDay,
        startTime: item.startTime,
        endTime: item.endTime,
        price: item.price,
        createdTime: item.createdTime,
      } as OneDayItem)
    ),
  };
  yield put(initialNextOneday(OneDayItem))
 }
  export default function* onedaySaga() {
yield takeLatest(requestFetchNextOneday, fetchData)
  }
  