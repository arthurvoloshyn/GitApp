import { parseError } from 'modules/client';
import { handleActions } from 'modules/helpers';

import { ActionTypes, STATUS } from 'constants/index';

const { GITHUB_GET_REPOS, GITHUB_GET_REPOS_SUCCESS, GITHUB_GET_REPOS_FAILURE } = ActionTypes;
const { IDLE, RUNNING, SUCCESS, ERROR } = STATUS;

export const githubState = {
  repos: {
    data: {},
    status: IDLE,
    message: '',
    query: '',
  },
};

export default {
  github: handleActions(
    {
      [GITHUB_GET_REPOS]: (draft, { payload: { query } }) => {
        const repos = draft.repos.data[query];

        draft.repos.data[query] = repos || [];
        draft.repos.message = '';
        draft.repos.query = query;
        draft.repos.status = RUNNING;
      },
      [GITHUB_GET_REPOS_SUCCESS]: (draft, { payload: { data } }) => {
        const repos = draft.repos.query;

        draft.repos.data[repos] = data || [];
        draft.repos.status = SUCCESS;
      },
      [GITHUB_GET_REPOS_FAILURE]: (draft, { payload: { message } }) => {
        draft.repos.message = parseError(message);
        draft.repos.status = ERROR;
      },
    },
    githubState,
  ),
};
