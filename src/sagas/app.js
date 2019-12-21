/**
 * @module Sagas/App
 * @desc App
 */
import { all, put, select, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from 'constants/index';

const { SWITCH_MENU, EXCEPTION, GITHUB_GET_REPOS } = ActionTypes;

/**
 * Switch Menu
 *
 * @param {Object} action
 *
 */
export function* switchMenu({ payload }) {
  try {
    const repos = yield select(({ github }) => github.repos);
    const { data } = repos;
    const { query } = payload;

    /* istanbul ignore else */
    if (!data[query] || !data[query].length) {
      yield put({
        type: GITHUB_GET_REPOS,
        payload,
      });
    }
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: EXCEPTION,
      payload: err,
    });
  }
}

/**
 * App Sagas
 */
export default function* root() {
  yield all([takeLatest(SWITCH_MENU, switchMenu)]);
}
