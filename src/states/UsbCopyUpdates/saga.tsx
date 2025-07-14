import { all, put, takeLatest } from "redux-saga/effects";
import actions from "./actions.tsx";
import { callApi } from "../saga.tsx";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  postRequestNoToken,
  postRequestNoTokenXWWW,
} from "../../utils/axios-client.ts";

function* getUpdates(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.usbCopyPro.php", {...action.payload});
    yield put({ type: actions.CHECK_UPDATES_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.CHECK_UPDATES_FAILURE, payload: error });
  }
}

function* getGlobalUpdates(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.usbCopyPro.php", {...action.payload});
    yield put({ type: actions.CHECK_GLOBAL_UPDATES_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.CHECK_GLOBAL_UPDATES_FAILURE, payload: error });
  }
}

function* addDiagnostic(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.usbCopyPro.php", {...action.payload});
    yield put({ type: actions.ADD_DIAGNOSTIC_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.ADD_DIAGNOSTIC_FAILURE, payload: error });
  }
}

function* sendEmail(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.usbCopyPro.php", {...action.payload});
    yield put({ type: actions.SEND_EMAIL_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.SEND_EMAIL_FAILURE, payload: error });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.CHECK_UPDATES, getUpdates)]);
  yield all([takeLatest(actions.CHECK_GLOBAL_UPDATES, getGlobalUpdates)]);
  yield all([takeLatest(actions.ADD_DIAGNOSTIC, addDiagnostic)]);
  yield all([takeLatest(actions.SEND_EMAIL, sendEmail)]);
}
