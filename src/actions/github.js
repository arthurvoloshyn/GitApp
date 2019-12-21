// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

const { GITHUB_GET_REPOS } = ActionTypes;

export const { githubGetRepos: getRepos } = createActions({
  [GITHUB_GET_REPOS]: (query: string) => ({ query }),
});
