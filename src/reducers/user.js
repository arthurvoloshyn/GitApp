import { handleActions } from 'modules/helpers';

import { STATUS, ActionTypes } from 'constants/index';

const { USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_LOGOUT_SUCCESS } = ActionTypes;
const { IDLE, RUNNING, READY } = STATUS;

export const userState = {
  isAuthenticated: false,
  status: IDLE,
};

export default {
  user: handleActions(
    {
      [USER_LOGIN]: draft => {
        draft.status = RUNNING;
      },
      [USER_LOGIN_SUCCESS]: draft => {
        draft.isAuthenticated = true;
        draft.status = READY;
      },
      [USER_LOGOUT]: draft => {
        draft.status = RUNNING;
      },
      [USER_LOGOUT_SUCCESS]: draft => {
        draft.isAuthenticated = false;
        draft.status = IDLE;
      },
    },
    userState,
  ),
};
