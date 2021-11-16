import { createAction, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../provider";
import { AxiosResponse } from "axios";
import onedayReducer, {
  addOneday,
  addTotalpages,
  initialCompleted,
  initialNextOneday,
  initialPagedOneday,
  initialOneday,
  initialOnedayItem,
  modifyOneday,
  OnedayPage,
  removeOneday
} from "../../provider/modules/oneday ";
import {OneDayItem} from "../../provider/modules/oneday "
import { 
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "@redux-saga/core/effects";
import api, {
  OneDayItemRequest,
  OneDayItemResponse,
  OneDayPagingReponse,
} from "../../api/oneday"
import { dataUrlToFile } from "../../lib/string";
import fileApi from "../../api/file";
import { addAlert } from "../../provider/modules/alert";
import { endProgress, startProgress } from "../../provider/modules/progress";
// import { call,
//   put,
//   select,
//   takeEvery,
//   takeLatest,  } from "redux-saga/effects";
// import { addAlert } from "../../provider/modules/alert";
// import { endProgress } from "../../provider/modules/progress";

export interface PageRequest {
  page: number;
  size: number;
}

export const requestAddoneday = createAction<OneDayItem>(
  `${onedayReducer.name}/requestAddOneday`
);

export const requestAddOnedayPaging = createAction<OneDayItem>(
  `${onedayReducer.name}/requestAddOnedayPaging`
);

export const requestAddOnedayNext = createAction<OneDayItem>(
  `${onedayReducer.name}/requestAddOnedayNext`
);

export const requestFetchOnedays = createAction(
  `${onedayReducer.name}/requestFetchOnedays`
);

export const requestFetchPagingOnedays = createAction<PageRequest>(
  `${onedayReducer.name}/requestFetchPagingOnedays`
);

export const requestFetchNextOnedays = createAction<PageRequest>(
  `${onedayReducer.name}/requestFetchNextOnedays`
);

export const requestFetchOneDayItem = createAction<number>(
  `${onedayReducer.name}/requestFetchOneDayItem`
);

export const requestRemoveOneday = createAction<number>(
  `${onedayReducer.name}/requestRemoveOneday`
);

export const requestRemoveOnedayPaging = createAction<number>(
  `${onedayReducer.name}/requestRemoveOnedayPaging`
);

export const requestRemoveOnedayNext = createAction<number>(
  `${onedayReducer.name}/requestRemoveOnedayNext`
);

export const requestModifyOneday = createAction<OneDayItem>(
  `${onedayReducer.name}/requestModifyOneday`
);
// Redux 사이드 이펙트
// 1. api 연동
// 2. 파일처리
// 3. 처리중 메시지 보여주기/감추기
// 4. 에러메시지 띄우기
// 서버에서 GET으로 데이터를 가저오고, redux state를 초기화
function* fetchData() {
  yield console.log("--fetchData--");


  const result: AxiosResponse<OneDayItemResponse[]> = yield call(api.fetch);

  yield put(endProgress());

  // OneDayItemReponse[] => OneDayItem[]
  const oneday = result.data.map(
    (item) =>
      ({
      oneDayClassId: item.oneDayClassId,
      onedayclassName: item.onedayclassName,
      price: item.price,
      title: item.title,
      description: item.description,
      managerName: item.managerName,
      capacity: item.capacity,
      photoUrl: item.photoUrl,
      fileType: item.fileType,
      fileName: item.fileName,
      createdTime: item.createdTime,
      startTime: item.startTime,
      endTime: item.endTime,
      category: item.category
      } as OneDayItem)
  );

  // state 초기화 reducer 실행
  yield put(initialOneday(oneday));
}

// 숫자 페이징 목록 조회
function* fetchPagingData(action: PayloadAction<PageRequest>) {
  yield console.log("--fetchPagingData--");

  const page = action.payload.page;
  const size = action.payload.size;

  localStorage.setItem("oneday_page_size", size.toString());

  // spinner 보여주기
  // yield put(startProgress());

  try {
    // 백엔드에서 데이터 받아오기
    const result: AxiosResponse<OneDayPagingReponse> = yield call(
      api.fetchPaging,
      page,
      size
    );

    yield put(endProgress());

    const onedayPage: OnedayPage = {
      data: result.data.content.map(
        (item) =>
          ({
          oneDayClassId: item.oneDayClassId,
          onedayclassName: item.onedayclassName,
          price: item.price,
          title: item.title,
          description: item.description,
          managerName: item.managerName,
          capacity: item.capacity,
          photoUrl: item.photoUrl,
          fileType: item.fileType,
          fileName: item.fileName,
          createdTime: item.createdTime,
          startTime: item.startTime,
          endTime: item.endTime,
          category: item.category
          } as OneDayItem)
      ),
      totalElements: result.data.totalElements,
      totalPages: result.data.totalPages,
      page: result.data.number,
      pageSize: result.data.size,
      isLast: result.data.last,
    };

    // state 초기화 reducer 실행
    yield put(initialPagedOneday(onedayPage));
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

// 더보기 목록 조회
function* fetchNextData(action: PayloadAction<PageRequest>) {
  yield console.log("--fetchNextData--");

  const page = action.payload.page;
  const size = action.payload.size;

  // spinner 보여주기
  yield put(startProgress());

  try {
    // 백엔드에서 데이터 받아오기
    const result: AxiosResponse<OneDayPagingReponse> = yield call(
      api.fetchPaging,
      page,
      size
    );

    yield put(endProgress());

    const onedayPage: OnedayPage = {
      data: result.data.content.map(
        (item) =>
          ({
          oneDayClassId: item.oneDayClassId,
          onedayclassName: item.onedayclassName,
          price: item.price,
          title: item.title,
          description: item.description,
          managerName: item.managerName,
          capacity: item.capacity,
          photoUrl: item.photoUrl,
          fileType: item.fileType,
          fileName: item.fileName,
          createdTime: item.createdTime,
          startTime: item.startTime,
          endTime: item.endTime,
          category: item.category
          } as OneDayItem)
      ),
      totalElements: result.data.totalElements,
      totalPages: result.data.totalPages,
      page: result.data.number,
      pageSize: result.data.size,
      isLast: result.data.last,
    };

    // state 초기화 reducer 실행
    yield put(initialNextOneday(onedayPage));
  } catch (e: any) {
    // 에러발생
    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "danger", message: e.message })
    );
  }
}
// 1건의 데이터만 조회
function* fetchDataItem(action: PayloadAction<number>) {
  yield console.log("--fetchDataItem--");

  const id = action.payload;

  // 백엔드에서 데이터 받아오기
  const result: AxiosResponse<OneDayItemResponse> = yield call(api.get, id);

  const oneday = result.data;
  if (oneday) {
    // state 초기화 reducer 실행
    yield put(initialOnedayItem(oneday));
  }
}

// 삭제처리
function* removeDataPaging(action: PayloadAction<number>) {
  yield console.log("--removeData--");

  // id값
  const id = action.payload;

  // yield put(startProgress());

  /* --- (추가로직) 2021-11-01 S3 파일 삭제 로직 추가 --- */
  // redux state에서 id로
  // object key 가져오기 예) https://배포Id.cloudfront.net/objectKey
  const oneDayItem: OneDayItem = yield select((state: RootState) =>
    state.oneday.data.find((item) => item.oneDayClassId === id)
  );
  const urlArr = oneDayItem.photoUrl.split("/");
  const objectKey = urlArr[urlArr.length - 1];

  // file api 호출해서 s3에 파일 삭제
  yield call(fileApi.remove, objectKey);
  /* ------------------------------------------------- */

  // rest api 연동
  const result: AxiosResponse<boolean> = yield call(api.remove, id);


  // 반환 값이 true이면
  if (result.data) {
    // state 변경(1건삭제)
    yield put(removeOneday(id));
  } else {
    // alert박스를 추가해줌
    yield put(
      addAlert({
        id: nanoid(),
        variant: "danger",
        message: "오류로 저장되지 않았습니다.",
      })
    );
  }

  // completed 속성 삭제
  yield put(initialCompleted());

  // 현재 페이지 데이터를 다시 가져옴
  // 현재 페이지와 사이즈 값을 읽어옴
  const page: number = yield select((state: RootState) => state.oneday.page);
  const size: number = yield select((state: RootState) => state.oneday.pageSize);

  yield put(requestFetchPagingOnedays({ page, size }));
}

function* removeDataNext(action: PayloadAction<number>) {
  yield console.log("--removeDataNext--");

  // id값
  const id = action.payload;


  /* --- (추가로직) 2021-11-01 S3 파일 삭제 로직 추가 --- */
  // redux state에서 id로
  // object key 가져오기 예) https://배포Id.cloudfront.net/objectKey
  const oneDayItem: OneDayItem = yield select((state: RootState) =>
    state.oneday.data.find((item) => item.oneDayClassId === id)
  );
  const urlArr = oneDayItem.photoUrl.split("/");
  const objectKey = urlArr[urlArr.length - 1];

  // file api 호출해서 s3에 파일 삭제
  yield call(fileApi.remove, objectKey);
  /* ------------------------------------------------- */

  // rest api 연동
  const result: AxiosResponse<boolean> = yield call(api.remove, id);

  // 반환 값이 true이면
  if (result.data) {
    // state 변경(1건삭제)
    yield put(removeOneday(id));
  } else {
    // alert박스를 추가해줌
    yield put(
      addAlert({
        id: nanoid(),
        variant: "danger",
        message: "오류로 저장되지 않았습니다.",
      })
    );
  }

  // completed 속성 삭제
  yield put(initialCompleted());
}

// 수정처리
function* modifyData(action: PayloadAction<OneDayItem>) {
  yield console.log("--modifyData--");

  // action의 payload로 넘어온 객체
  const oneDayItemPayload = action.payload;

  

  // 파일이 바뀌었으면 base64파일
  let fileUrl = action.payload.photoUrl;
  if (action.payload.photoUrl.startsWith("data")) {
    /*--- (추가로직) 2021-11-01 S3 파일 삭제 로직 추가 --- */
    // redux state에서 id로
    // object key 가져오기 예) https://배포Id.cloudfront.net/objectKey
    const oneDayItemFile: OneDayItem = yield select((state: RootState) =>
      state.oneday.data.find((item) => item.oneDayClassId === oneDayItemPayload.oneDayClassId)
    );
    const urlArr = oneDayItemFile.photoUrl.split("/");
    const objectKey = urlArr[urlArr.length - 1];

    // file api 호출해서 s3에 파일 삭제
    yield call(fileApi.remove, objectKey);
    /* --- ------------------------------------------------ */

    /* --- (추가로직) 2021-11-01 s3 업로드 처리 --- */
    // 1. dataUrl -> file 변환
    const file: File = yield call(
      dataUrlToFile,
      oneDayItemPayload.photoUrl,
      oneDayItemPayload.fileName,
      oneDayItemPayload.fileType
    );

    // 2. form data 객체 생성
    const formFile = new FormData();
    formFile.set("file", file);

    // 3. multipart/form-data로 업로드
    // const fileRes: AxiosResponse<string> = yield call(fileApi.upload, formFile);
    // fileUrl = fileRes.data;
    /*-------------------------------------------------------- */
  }

  // rest api로 보낼 요청객체
  const oneDayItemRequest: OneDayItemRequest = {
    onedayclassName: oneDayItemPayload.onedayclassName,
      // title: "", // 임시로 에러 유발(400)
      description: oneDayItemPayload.description,
      photoUrl: fileUrl,
      oneDayClassId: 0,
      managerOneDayClassId:oneDayItemPayload.managerOneDayClassId,
      price: oneDayItemPayload.price,
      title: oneDayItemPayload.title,
      managerName: oneDayItemPayload.managerName,
      capacity: oneDayItemPayload.capacity,
      fileType: oneDayItemPayload.fileType,
      fileName: oneDayItemPayload.fileName,
      createdTime: 0,
      startTime: oneDayItemPayload.startTime,
      endTime: oneDayItemPayload.endTime,
      category: oneDayItemPayload.category,
  };

  const result: AxiosResponse<OneDayItemResponse> = yield call(
    api.modify,
    oneDayItemPayload.oneDayClassId,
    oneDayItemRequest
  );


  // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성
  const oneDayItem: OneDayItem = {
    oneDayClassId: result.data.oneDayClassId,
    onedayclassName: result.data.onedayclassName,
    price: result.data.price,
    title: result.data.title,
    description: result.data.description,
    managerName: result.data.managerName,
    capacity: result.data.capacity,
    photoUrl: result.data.photoUrl,
    fileType: result.data.fileType,
    fileName: result.data.fileName,
    createdTime: result.data.createdTime,
    startTime: result.data.startTime,
    endTime: result.data.endTime,
    category: result.data.category,
    managerOneDayClassId: result.data.managerOneDayClassId
  };

  // state 변경
  yield put(modifyOneday(oneDayItem));

  // completed 속성 삭제
  yield put(initialCompleted());
}

export default function* onedaySaga() {
  yield takeEvery(requestFetchOneDayItem, fetchDataItem);
  yield takeLatest(requestFetchOnedays, fetchData);
  yield takeLatest(requestFetchPagingOnedays, fetchPagingData);
  yield takeLatest(requestFetchNextOnedays, fetchNextData);

  // 삭제처리
  yield takeEvery(requestRemoveOneday, removeDataNext);
  yield takeEvery(requestRemoveOnedayPaging, removeDataPaging);
  yield takeEvery(requestRemoveOnedayNext, removeDataNext);

  // 수정처리
  yield takeEvery(requestModifyOneday, modifyData);
}
