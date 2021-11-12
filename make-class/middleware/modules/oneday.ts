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
import {OnedayItem} from "../../provider/modules/oneday "
import { 
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "@redux-saga/core/effects";
import api, {
  OnedayItemRequest,
  OnedayItemResponse,
  OnedayPagingReponse,
} from "../../api/oneday"
import { dataUrlToFile } from "../../lib/string";
import fileApi from "../../api/file";
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

export const requestAddoneday = createAction<OnedayItem>(
  `${onedayReducer.name}/requestAddOneday`
);

export const requestAddOnedayPaging = createAction<OnedayItem>(
  `${onedayReducer.name}/requestAddOnedayPaging`
);

export const requestAddOnedayNext = createAction<OnedayItem>(
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

export const requestFetchOnedayItem = createAction<number>(
  `${onedayReducer.name}/requestFetchOnedayItem`
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

export const requestModifyOneday = createAction<OnedayItem>(
  `${onedayReducer.name}/requestModifyOneday`
);
function* addDataPaging(action: PayloadAction<OnedayItem>) {
  yield console.log("--addDataPaging--");
  yield console.log(action);

  try {

    const onedayItemPayload = action.payload;

    const file: File = yield call(
      dataUrlToFile,
      onedayItemPayload.photoUrl,
      onedayItemPayload.fileName,
      onedayItemPayload.fileType
    );

    const formFile = new FormData();
    formFile.set("file", file);

    const fileUrl: AxiosResponse<string> = yield call(fileApi.upload, formFile);
    
    const onedayItemRequest: OnedayItemRequest = {
      onedayclassName: onedayItemPayload.onedayclassName,
      // title: "", // 임시로 에러 유발(400)
      description: onedayItemPayload.description,
      // photoUrl: onedayItemPayload.photoUrl,
      photoUrl: fileUrl.data
    };

    const result: AxiosResponse<OnedayItemResponse> = yield call(
      api.add,
      onedayItemRequest
    );

    const onedayData: OnedayItem[] = yield select(
      (state: RootState) => state.oneday.data
    );

    const onedayPageSize: number = yield select(
      (state: RootState) => state.oneday.pageSize
    );

    if (onedayData.length > 0 && onedayData.length == onedayPageSize) {
      const deleteId = onedayData[onedayData.length - 1].id;
      yield put(removeOneday(deleteId));
      yield put(addTotalpages);
    }
    const onedayItem: OnedayItem = {
      id: result.data.id,
      onedayclassName: result.data.onedayclassName,
      price: result.data.price,
      description: result.data.description,
      capacity: result.data.capacity,
      photoUrl: result.data.photoUrl,
      fileType: result.data.fileType,
      fileName: result.data.fileName,
      createdTime: result.data.createdTime,
      startDateData: result.data.startDateData,
      endDateData: result.data.endDateData
    };

     yield put(addOneday(onedayItem));

    
    yield put(initialCompleted());

    
    yield put(
      addAlert({ id: nanoid(), variant: "success", message: "저장되었습니다." })
    );

  } catch (e: any) {
    yield put(endProgress());
    yield put(
      addAlert({ id: nanoid(), variant: "danger", message: e.message })
    );
  }
}


function* addDataNext(action: PayloadAction<OnedayItem>) {
  yield console.log("--addDataNext--");
  yield console.log(action);

  try {
    // action의 payload로 넘어온 객체
    const onedayItemPayload = action.payload;

    // spinner 보여주기
    yield put(startProgress());

    /* --- (추가로직) 2021-11-01 s3 업로드 처리 --- */
    // 1. dataUrl -> file 변환
    const file: File = yield call(
      dataUrlToFile,
      onedayItemPayload.photoUrl,
      onedayItemPayload.fileName,
      onedayItemPayload.fileType
    );

    // 2. form data 객체 생성
    const formFile = new FormData();
    formFile.set("file", file);

    // 3. multipart/form-data로 업로드
    const fileUrl: AxiosResponse<string> = yield call(fileApi.upload, formFile);
    /*-------------------------------------------------------- */

    // rest api로 보낼 요청객체
    const onedayItemRequest: OnedayItemRequest = {
      onedayclassName: onedayItemPayload.onedayclassName,
      // title: "", // 임시로 에러 유발(400)
      capacity: onedayItemPayload.capacity,
      // price: onedayItemPayload.price,
      description: onedayItemPayload.description,
      // photoUrl: photoItemPayload.photoUrl,
      photoUrl: fileUrl.data,
      fileType: onedayItemPayload.fileType,
      fileName: onedayItemPayload.fileName,
      createdTime: onedayItemPayload.createdTime,
      startDateData: onedayItemPayload.startDateData,
      endDateData: onedayItemPayload.endDateData
    };

    // ------ 1. rest api에 post로 데이터 보냄
    // call(함수, 매개변수1, 매개변수2...) -> 함수를 호출함

    // 함수가 Promise를 반환하면, (비동기함수)
    // Saga 미들웨어에서 현재 yield에 대기상태로 있음
    // Promise가 resolve(처리완료)되면 다음 yield로 처리가 진행됨
    // reject(거부/에러)되면 예외를 던짐(throw) -> try ... catch문으로 받을 수 있음.

    // await api.add(photoItemRequest) 이 구문과 일치함
    // 결과값을 형식을 지졍해야함
    const result: AxiosResponse<OnedayItemResponse> = yield call(
      api.add,
      onedayItemRequest
    );

    // spinner 사라지게 하기
    yield put(endProgress());

    // ------ 2. redux state를 변경함
    // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성
    const onedayItem: OnedayItem = {
      id: result.data.id,
      onedayclassName: result.data.onedayclassName,
      price: result.data.price,
      description: result.data.description,
      capacity: result.data.capacity,
      photoUrl: result.data.photoUrl,
      fileType: result.data.fileType,
      fileName: result.data.fileName,
      createdTime: result.data.createdTime,
      startDateData: result.data.startDateData,
      endDateData: result.data.endDateData
    };

    // dispatcher(액션)과 동일함
    // useDispatch로 dispatcher 만든 것은 컴포넌트에서만 가능
    // put이펙트를 사용함
    yield put(addOneday(onedayItem));

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

// Redux 사이드 이펙트
// 1. api 연동
// 2. 파일처리
// 3. 처리중 메시지 보여주기/감추기
// 4. 에러메시지 띄우기
// 서버에서 GET으로 데이터를 가저오고, redux state를 초기화
function* fetchData() {
  yield console.log("--fetchData--");


  const result: AxiosResponse<OnedayItemResponse[]> = yield call(api.fetch);

  yield put(endProgress());

  // OnedayItemReponse[] => OnedayItem[]
  const oneday = result.data.map(
    (item) =>
      ({
        id: item.id,
        title: item.title,
        price: item.price,
      description: item.description,
        capacity: item.capacity,
        photoUrl: item.photoUrl,
        fileType: item.fileType,
        fileName: item.fileName,
      createdTime: item.createdTime,
      startDateData: item.startDateData,
        endDateData: item.endDateData
      } as OnedayItem)
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
  yield put(startProgress());

  try {
    // 백엔드에서 데이터 받아오기
    const result: AxiosResponse<OnedayPagingReponse> = yield call(
      api.fetchPaging,
      page,
      size
    );

    yield put(endProgress());

    const onedayPage: OnedayPage = {
      data: result.data.content.map(
        (item) =>
          ({
            id: item.id,
            title: item.title,
          description: item.description,
            capacity: item.capacity,
            photoUrl: item.photoUrl,
            fileType: item.fileType,
            fileName: item.fileName,
            createdTime: item.createdTime,
          } as OnedayItem)
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
    // yield put(endProgress());
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
    const result: AxiosResponse<OnedayPagingReponse> = yield call(
      api.fetchPaging,
      page,
      size
    );

    yield put(endProgress());

    const onedayPage: OnedayPage = {
      data: result.data.content.map(
        (item) =>
          ({
            id: item.id,
            onedayclassName: item.onedayclassName,
            description: item.description,
            capacity: item.capacity,
            photoUrl: item.photoUrl,
            fileType: item.fileType,
            fileName: item.fileName,
            createdTime: item.createdTime,
            startDateData: item.startDateData,
            endDateData: item.endDateData,
          } as OnedayItem)
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
  const result: AxiosResponse<OnedayItemResponse> = yield call(api.get, id);

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

  yield put(startProgress());

  /* --- (추가로직) 2021-11-01 S3 파일 삭제 로직 추가 --- */
  // redux state에서 id로
  // object key 가져오기 예) https://배포Id.cloudfront.net/objectKey
  const onedayItem: OnedayItem = yield select((state: RootState) =>
    state.oneday.data.find((item) => item.id === id)
  );
  const urlArr = onedayItem.photoUrl.split("/");
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
  const onedayItem: OnedayItem = yield select((state: RootState) =>
    state.oneday.data.find((item) => item.id === id)
  );
  const urlArr = onedayItem.photoUrl.split("/");
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
function* modifyData(action: PayloadAction<OnedayItem>) {
  yield console.log("--modifyData--");

  // action의 payload로 넘어온 객체
  const onedayItemPayload = action.payload;

  

  // 파일이 바뀌었으면 base64파일
  let fileUrl = action.payload.photoUrl;
  if (action.payload.photoUrl.startsWith("data")) {
    /*--- (추가로직) 2021-11-01 S3 파일 삭제 로직 추가 --- */
    // redux state에서 id로
    // object key 가져오기 예) https://배포Id.cloudfront.net/objectKey
    const onedayItemFile: OnedayItem = yield select((state: RootState) =>
      state.oneday.data.find((item) => item.id === onedayItemPayload.id)
    );
    const urlArr = onedayItemFile.photoUrl.split("/");
    const objectKey = urlArr[urlArr.length - 1];

    // file api 호출해서 s3에 파일 삭제
    yield call(fileApi.remove, objectKey);
    /* --- ------------------------------------------------ */

    /* --- (추가로직) 2021-11-01 s3 업로드 처리 --- */
    // 1. dataUrl -> file 변환
    const file: File = yield call(
      dataUrlToFile,
      onedayItemPayload.photoUrl,
      onedayItemPayload.fileName,
      onedayItemPayload.fileType
    );

    // 2. form data 객체 생성
    const formFile = new FormData();
    formFile.set("file", file);

    // 3. multipart/form-data로 업로드
    const fileRes: AxiosResponse<string> = yield call(fileApi.upload, formFile);
    fileUrl = fileRes.data;
    /*-------------------------------------------------------- */
  }

  // rest api로 보낼 요청객체
  const onedayItemRequest: OnedayItemRequest = {
    onedayclassName: onedayItemPayload.onedayclassName,
    description: onedayItemPayload.description,
    // photoUrl: onedayItemPayload.photoUrl,
    photoUrl: fileUrl,
    fileType: onedayItemPayload.fileType,
    fileName: onedayItemPayload.fileName,
  };

  const result: AxiosResponse<OnedayItemResponse> = yield call(
    api.modify,
    onedayItemPayload.id,
    onedayItemRequest
  );


  // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성
  const onedayItem: OnedayItem = {
    id: result.data.id,
    onedayclassName: result.data.onedayclassName,
    description: result.data.description,
    photoUrl: result.data.photoUrl,
    fileType: result.data.fileType,
    fileName: result.data.fileName,
    createdTime: result.data.createdTime,
    startDateData: result.data.startDateData,
    endDateData: result.data.endDateData
    
  };

  // state 변경
  yield put(modifyOneday(onedayItem));

  // completed 속성 삭제
  yield put(initialCompleted());
}

export default function* onedaySaga() {
  yield takeEvery(requestAddOneday, addDataNext);
  yield takeEvery(requestAddOnedayPaging, addDataPaging);
  yield takeEvery(requestAddOnedayNext, addDataNext);

  yield takeEvery(requestFetchOnedayItem, fetchDataItem);
  yield takeLatest(requestFetchOnedays, fetchData);
  yield takeLatest(requestFetchPagingOneday, fetchPagingData);
  yield takeLatest(requestFetchNextOnedays, fetchNextData);

  // 삭제처리
  yield takeEvery(requestRemoveOneday, removeDataNext);
  yield takeEvery(requestRemoveOnedayPaging, removeDataPaging);
  yield takeEvery(requestRemoveOnedayNext, removeDataNext);

  // 수정처리
  yield takeEvery(requestModifyOneday, modifyData);
}
