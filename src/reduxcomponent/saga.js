import { put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";

function* workerSagaTimeline() {
  yield put("TIMELINE_CLICK_TOGGLE_STATE");
}

function* workerSagaMyuploads() {
  console.log("in worker saga");
  yield put("MYUPLOADS_CLICK_TOGGLE_STATE");
}

const axiosCallPost = async (params) => {
  console.log("-- params---", params);
  const { url, data, token } = params;

  const response = await axios.post("http:me.com", data);
  return response;
};

function* workerSagaLoginStatus() {
  const status = yield call(axiosCallPost, {
    url: "http:me.com",
    data: {
      a: "p",
      c: "m",
    },
  });
  yield setTimeout();
  if (status == 200) {
    put("LOGIN");
  }
}

export function* watcherSaga() {
  takeLatest("TIMELINE_CLICK_TOGGLE_STATE", workerSagaTimeline);
  takeLatest("MYUPLOADS_CLICK_TOGGLE_STATE", workerSagaMyuploads);
  takeLatest("LOGIN", workerSagaLoginStatus);
}
