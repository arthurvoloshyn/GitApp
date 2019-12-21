import { REHYDRATE } from 'redux-persist/lib/constants';
import { handleActions } from 'modules/helpers';

import { ActionTypes } from 'constants/index';

const { HIDE_ALERT, SHOW_ALERT } = ActionTypes;

export const appState = {
  alerts: [],
};

export default {
  app: handleActions(
    {
      [REHYDRATE]: draft => {
        draft.alerts = [];
      },
      [HIDE_ALERT]: (draft, { payload: { id } }) => {
        draft.alerts = draft.alerts.filter(d => d.id !== id);
      },
      [SHOW_ALERT]: (draft, { payload }) => {
        draft.alerts.push(payload);
      },
    },
    appState,
  ),
};
