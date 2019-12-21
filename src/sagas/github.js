/**
 * @module Sagas/GitHub
 * @desc GitHub
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'modules/client';

import { ActionTypes } from 'constants/index';

const { GITHUB_GET_REPOS_SUCCESS, GITHUB_GET_REPOS_FAILURE, GITHUB_GET_REPOS } = ActionTypes;

const BASE_PATH = 'https://api.github.com/search';
const SEARCH_PATH = '/repositories';
const SEARCH_PARAM = 'q=';
const SORT_PARAM = 'sort=';
const SORT = 'stars';

/**
 * Get Repos
 *
 * @param {Object} action
 *
 */
export function* getRepos({ payload: { query } }) {
  try {
    const response = yield call(
      request,
      `${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${query}&${SORT_PARAM}${SORT}`,
    );
    const { items } = response;

    yield put({
      type: GITHUB_GET_REPOS_SUCCESS,
      payload: { data: items },
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: GITHUB_GET_REPOS_FAILURE,
      payload: err,
    });
  }
}

/**
 * GitHub Sagas
 */
export default function* root() {
  yield all([takeLatest(GITHUB_GET_REPOS, getRepos)]);
}
