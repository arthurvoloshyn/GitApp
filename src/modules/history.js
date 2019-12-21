// @flow
import { createBrowserHistory } from 'history';
import qs from 'qs';

const history = createBrowserHistory();

const { location } = history;
const { state } = location;
const query = qs.parse(location.search.substr(1));

history.location = {
  ...location,
  query,
  state: {},
};

/* istanbul ignore next */
history.listen(() => {
  history.location = {
    ...location,
    query,
    state: state || {},
  };
});

const { go, goBack, push, replace } = history;

export { go, goBack, push, replace };
export default history;
