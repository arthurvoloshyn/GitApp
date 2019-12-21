// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

const { USER_LOGIN, USER_LOGOUT } = ActionTypes;

export const { userLogin: login, userLogout: logOut } = createActions({
  [USER_LOGIN]: () => ({}),
  [USER_LOGOUT]: () => ({}),
});
