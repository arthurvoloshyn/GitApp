// @flow
/**
 * @module Actions/App
 * @desc App Actions
 */

import uid from 'nanoid';
import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

const { SWITCH_MENU, HIDE_ALERT, SHOW_ALERT } = ActionTypes;

export { goBack, go, push, replace } from 'modules/history';

export const { hideAlert, showAlert, switchMenu } = createActions({
  [SWITCH_MENU]: (query: string) => ({ query }),
  [HIDE_ALERT]: (id: string) => ({ id }),
  [SHOW_ALERT]: (message: string, { variant, id, position, icon, timeout }: Object) => {
    const newTimeOut = variant === 'danger' ? 0 : 5;

    return {
      id: id || uid(),
      icon,
      message,
      position: position || 'bottom-right',
      variant: variant || 'dark',
      timeout: typeof timeout === 'number' ? timeout : newTimeOut,
    };
  },
});
