import InquiryReducer, {
  addInquiry,
  addTotalpages,
  initialCompleted,
  initialNextInquiry,
  initialPagedInquiry,
  initialInquiry,
  initialInquiryItem,
  modifyInquiry,
  InquiryPage,
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
import { RootState } from "../../provider";
import { dataUrlToFile } from "../../lib/string";
import fileApi from "../../api/file";


export interface PageRequest {
  page: number;
  size: number;
}

export const requestAddInquiry = createAction<InquiryItem>(
  `${InquiryReducer.name}/requestAddInquiry`
);

export const requestAddInquiryPaging = createAction<InquiryItem>(
  `${InquiryReducer.name}/requestAddInquiryPaging`
);

export const requestAddInquiryNext = createAction<InquiryItem>(
  `${InquiryReducer.name}/requestAddInquiryNext`
);

export const requestFetchInquirys = createAction(
  `${InquiryReducer.name}/requestFetchInquirys`
);

export const requestFetchPagingInquirys = createAction<PageRequest>(
  `${InquiryReducer.name}/requestFetchPagingInquirys`
);

export const requestFetchNextInquirys = createAction<PageRequest>(
  `${InquiryReducer.name}/requestFetchNextInquirys`
);

export const requestFetchInquiryItem = createAction<number>(
  `${InquiryReducer.name}/requestFetchInquiryItem`
);

export const requestRemoveInquiry = createAction<number>(
  `${InquiryReducer.name}/requestRemoveInquiry`
);

export const requestRemoveInquiryPaging = createAction<number>(
  `${InquiryReducer.name}/requestRemoveInquiryPaging`
);

export const requestRemoveInquiryNext = createAction<number>(
  `${InquiryReducer.name}/requestRemoveInquiryNext`
);

export const requestModifyInquiry = createAction<InquiryItem>(
  `${InquiryReducer.name}/requestModifyInquiry`
);
function* addDataPaging(action: PayloadAction<InquiryItem>) {
  yield console.log("--addDataPaging--");
  yield console.log(action);

  try {

    const inquiryItemPayload = action.payload;

    const file: File = yield call(
      dataUrlToFile,
      inquiryItemPayload.photoUrl,
      inquiryItemPayload.fileName,
      inquiryItemPayload.fileType
    );

    const formFile = new FormData();
    formFile.set("file", file);

    const fileUrl: AxiosResponse<string> = yield call(fileApi.upload, formFile);
    
    const inquiryItemRequest: InquiryItemRequest = {
      // id: inquiryItemPayload.id,
      classId: inquiryItemPayload.classId,
      onedayclassName: inquiryItemPayload.onedayclassName,
      title: inquiryItemPayload.title,
      name: inquiryItemPayload.name,
      tel: inquiryItemPayload.tel,
      email: inquiryItemPayload.email,
      description: inquiryItemPayload.description,
      // createdTime: inquiryItemPayload.createdTime,
    };

    const result: AxiosResponse<InquiryItemResponse> = yield call(
      api.add,
      inquiryItemRequest
    );

    const inquiryData: InquiryItem[] = yield select(
      (state: RootState) => state.inquiry.data
    );

    const inquiryPageSize: number = yield select(
      (state: RootState) => state.inquiry.pageSize
    );

    if (inquiryData.length > 0 && inquiryData.length == inquiryPageSize) {
      const deleteId = inquiryData[inquiryData.length - 1].id;
      yield put(removeInquiry(deleteId));
      yield put(addTotalpages);
    }
    const inquiryItem: InquiryItem = {
      id: result.data.id,
      classId: result.data.classId,
      onedayclassName: result.data.onedayclassName,
      title: result.data.title,
      name: result.data.name,
      tel: result.data.tel,
      email: result.data.email,
      description: result.data.description,
      createdTime: result.data.createdTime,
    };

     yield put(addInquiry(inquiryItem));

    
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


function* addDataNext(action: PayloadAction<InquiryItem>) {
  yield console.log("--addDataNext--");
  yield console.log(action);

  try {
    // action의 payload로 넘어온 객체
    const inquiryItemPayload = action.payload;

    // spinner 보여주기
    yield put(startProgress());

    /* --- (추가로직) 2021-11-01 s3 업로드 처리 --- */
    // 1. dataUrl -> file 변환
    const file: File = yield call(
      dataUrlToFile,
      inquiryItemPayload.photoUrl,
      inquiryItemPayload.fileName,
      inquiryItemPayload.fileType
    );

    // 2. form data 객체 생성
    const formFile = new FormData();
    formFile.set("file", file);

    // 3. multipart/form-data로 업로드
    const fileUrl: AxiosResponse<string> = yield call(fileApi.upload, formFile);
    /*-------------------------------------------------------- */

    // rest api로 보낼 요청객체
    const inquiryItemRequest: InquiryItemRequest = {
      // id: inquiryItemPayload.id,
      classId: inquiryItemPayload.classId,
      onedayclassName: inquiryItemPayload.onedayclassName,
      title: inquiryItemPayload.title,
      name: inquiryItemPayload.name,
      tel: inquiryItemPayload.tel,
      email: inquiryItemPayload.email,
      description: inquiryItemPayload.description,
      // createdTime: inquiryItemPayload.createdTime,
    };

    // ------ 1. rest api에 post로 데이터 보냄
    // call(함수, 매개변수1, 매개변수2...) -> 함수를 호출함

    // 함수가 Promise를 반환하면, (비동기함수)
    // Saga 미들웨어에서 현재 yield에 대기상태로 있음
    // Promise가 resolve(처리완료)되면 다음 yield로 처리가 진행됨
    // reject(거부/에러)되면 예외를 던짐(throw) -> try ... catch문으로 받을 수 있음.

    // await api.add(photoItemRequest) 이 구문과 일치함
    // 결과값을 형식을 지졍해야함
    const result: AxiosResponse<InquiryItemResponse> = yield call(
      api.add,
      inquiryItemRequest
    );

    // spinner 사라지게 하기
    yield put(endProgress());

    // ------ 2. redux state를 변경함
    // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성
    const inquiryItem: InquiryItem = {
      id: result.data.id,
      classId: result.data.classId,
      onedayclassName: result.data.onedayclassName,
      title: result.data.title,
      name: result.data.name,
      tel: result.data.tel,
      email: result.data.email,
      description: result.data.description,
      createdTime: result.data.createdTime,
    };

    // dispatcher(액션)과 동일함
    // useDispatch로 dispatcher 만든 것은 컴포넌트에서만 가능
    // put이펙트를 사용함
    yield put(addInquiry(inquiryItem));

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


  const result: AxiosResponse<InquiryItemResponse[]> = yield call(api.fetch);

  yield put(endProgress());

  // OInquiryItemReponse[] => InquiryItem[]
  const inquiry = result.data.map(
    (item) =>
      ({
        id: item.id,
        classId: item.classId,
        onedayclassName :item.onedayclassName,
        title: item.title,
        name: item.name,
        tel: item.tel,
        email:item.email,
        description: item.description,
        createdTime: item.createdTime,
      } as InquiryItem)
  );

  // state 초기화 reducer 실행
  yield put(initialInquiry(inquiry));
}

// 숫자 페이징 목록 조회
function* fetchPagingData(action: PayloadAction<PageRequest>) {
  yield console.log("--fetchPagingData--");

  const page = action.payload.page;
  const size = action.payload.size;

  localStorage.setItem("inquiry_page_size", size.toString());

  // spinner 보여주기
  yield put(startProgress());

  try {
    // 백엔드에서 데이터 받아오기
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
            id: item.id,
            classId: item.classId,
            onedayclassName :item.onedayclassName,
            title: item.title,
            name: item.name,
            tel: item.tel,
            email:item.email,
            description: item.description,
            createdTime: item.createdTime,
          } as InquiryItem)
      ),
      totalElements: result.data.totalElements,
      totalPages: result.data.totalPages,
      page: result.data.number,
      pageSize: result.data.size,
      isLast: result.data.last,
    };

    // state 초기화 reducer 실행
    yield put(initialPagedInquiry(inquiryPage));
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
            id: item.id,
      classId: item.classId,
      onedayclassName :item.onedayclassName,
      title: item.title,
      name: item.name,
      tel: item.tel,
      email:item.email,
      description: item.description,
      createdTime: item.createdTime,
          } as InquiryItem)
      ),
      totalElements: result.data.totalElements,
      totalPages: result.data.totalPages,
      page: result.data.number,
      pageSize: result.data.size,
      isLast: result.data.last,
    };

    // state 초기화 reducer 실행
    yield put(initialNextInquiry(inquiryPage));
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
  const result: AxiosResponse<InquiryItemResponse> = yield call(api.get, id);

  const inquiry = result.data;
  if (inquiry) {
    // state 초기화 reducer 실행
    yield put(initialInquiryItem(inquiry));
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
  const inquiryItem: InquiryItem = yield select((state: RootState) =>
    state.inquiry.data.find((item) => item.id === id)
  );
  const urlArr = inquiryItem.photoUrl.split("/");
  const objectKey = urlArr[urlArr.length - 1];

  // file api 호출해서 s3에 파일 삭제
  yield call(fileApi.remove, objectKey);
  /* ------------------------------------------------- */

  // rest api 연동
  const result: AxiosResponse<boolean> = yield call(api.remove, id);


  // 반환 값이 true이면
  if (result.data) {
    // state 변경(1건삭제)
    yield put(removeInquiry(id));
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
  const page: number = yield select((state: RootState) => state.inquiry.page);
  const size: number = yield select((state: RootState) => state.inquiry.pageSize);

  yield put(requestFetchPagingInquirys({ page, size }));
}

function* removeDataNext(action: PayloadAction<number>) {
  yield console.log("--removeDataNext--");

  // id값
  const id = action.payload;


  /* --- (추가로직) 2021-11-01 S3 파일 삭제 로직 추가 --- */
  // redux state에서 id로
  // object key 가져오기 예) https://배포Id.cloudfront.net/objectKey
  const inquiryItem: InquiryItem = yield select((state: RootState) =>
    state.inquiry.data.find((item) => item.id === id)
  );
  const urlArr = inquiryItem.photoUrl.split("/");
  const objectKey = urlArr[urlArr.length - 1];

  // file api 호출해서 s3에 파일 삭제
  yield call(fileApi.remove, objectKey);
  /* ------------------------------------------------- */

  // rest api 연동
  const result: AxiosResponse<boolean> = yield call(api.remove, id);

  // 반환 값이 true이면
  if (result.data) {
    // state 변경(1건삭제)
    yield put(removeInquiry(id));
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
function* modifyData(action: PayloadAction<InquiryItem>) {
  yield console.log("--modifyData--");

  // action의 payload로 넘어온 객체
  const inquiryItemPayload = action.payload;

  

  // 파일이 바뀌었으면 base64파일
  let fileUrl = action.payload.photoUrl;
  if (action.payload.photoUrl.startsWith("data")) {
    /*--- (추가로직) 2021-11-01 S3 파일 삭제 로직 추가 --- */
    // redux state에서 id로
    // object key 가져오기 예) https://배포Id.cloudfront.net/objectKey
    const inquiryItemFile: InquiryItem = yield select((state: RootState) =>
      state.inquiry.data.find((item) => item.id === inquiryItemPayload.id)
    );
    const urlArr = inquiryItemFile.photoUrl.split("/");
    const objectKey = urlArr[urlArr.length - 1];

    // file api 호출해서 s3에 파일 삭제
    yield call(fileApi.remove, objectKey);
    /* --- ------------------------------------------------ */

    /* --- (추가로직) 2021-11-01 s3 업로드 처리 --- */
    // 1. dataUrl -> file 변환
    const file: File = yield call(
      dataUrlToFile,
      inquiryItemPayload.photoUrl,
      inquiryItemPayload.fileName,
      inquiryItemPayload.fileType
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
  const inquiryItemRequest: InquiryItemRequest = {
    
    // id: inquiryItemPayload.id,
      classId: inquiryItemPayload.classId,
      onedayclassName: inquiryItemPayload.onedayclassName,
      title: inquiryItemPayload.title,
      name: inquiryItemPayload.name,
      tel: inquiryItemPayload.tel,
      email: inquiryItemPayload.email,
      description: inquiryItemPayload.description,
      // createdTime: inquiryItemPayload.createdTime,
  };

  const result: AxiosResponse<InquiryItemResponse> = yield call(
    api.modify,
    inquiryItemPayload.id,
    inquiryItemRequest
  );


  // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성
  const inquiryItem: InquiryItem = {
    id: result.data.id,
    classId: result.data.classId,
    onedayclassName: result.data.onedayclassName,
      title: result.data.title,
      name: result.data.name,
      tel: result.data.tel,
      email: result.data.email,
      description: result.data.description,
      createdTime: result.data.createdTime,
    
  };

  // state 변경
  yield put(modifyInquiry(InquiryItem));

  // completed 속성 삭제
  yield put(initialCompleted());
}

export default function* inquirySaga() {
  yield takeEvery(requestAddInquiry, addDataNext);
  yield takeEvery(requestAddInquiryPaging, addDataPaging);
  yield takeEvery(requestAddInquiryNext, addDataNext);

  yield takeEvery(requestFetchInquiryItem, fetchDataItem);
  yield takeLatest(requestFetchInquirys, fetchData);
  yield takeLatest(requestFetchPagingInquiry, fetchPagingData);
  yield takeLatest(requestFetchNextInquirys, fetchNextData);

  // 삭제처리
  yield takeEvery(requestRemoveInquiry, removeDataNext);
  yield takeEvery(requestRemoveInquiryPaging, removeDataPaging);
  yield takeEvery(requestRemoveInquiryNext, removeDataNext);

  // 수정처리
  yield takeEvery(requestModifyInquiry, modifyData);
}
