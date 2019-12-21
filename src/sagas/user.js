/**
 * @module Sagas/User
 * @desc User
 */

import { all, delay, put, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from 'constants/index';

const {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN,
  USER_LOGOUT,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
} = ActionTypes;

/**
 * Login
 */
export function* login() {
  try {
    yield delay(400);

    yield put({
      type: USER_LOGIN_SUCCESS,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: USER_LOGIN_FAILURE,
      payload: err,
    });
  }
}

/**
 * Logout
 */
export function* logout() {
  try {
    yield delay(200);

    yield put({
      type: USER_LOGOUT_SUCCESS,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: USER_LOGOUT_FAILURE,
      payload: err,
    });
  }
}

/**
 * User Sagas
 */
export default function* root() {
  yield all([takeLatest(USER_LOGIN, login), takeLatest(USER_LOGOUT, logout)]);
}
