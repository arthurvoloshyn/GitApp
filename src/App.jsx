import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styled, { css, ThemeProvider } from 'styled-components';
import treeChanges from 'tree-changes';

import history from 'modules/history';
import theme, { headerHeight } from 'modules/theme';
import { utils } from 'styled-minimal';

import config from 'config';
import { showAlert } from 'actions';

import Home from 'routes/Home';
import Private from 'routes/Private';
import NotFound from 'routes/NotFound';

import Header from 'components/Header';
import SystemAlerts from 'components/SystemAlerts';

import GlobalStyles from 'components/GlobalStyles';
import RoutePublic from 'components/RoutePublic';
import RoutePrivate from 'components/RoutePrivate';

const { px } = utils;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  opacity: 1 !important;
  position: relative;
  transition: opacity 0.5s;
`;

const MainPrivate = ({ isAuthenticated }) =>
  isAuthenticated &&
  css`
    padding: ${px(headerHeight)} 0 0;
  `;

const Main = styled.main`
  min-height: 100vh;

  ${MainPrivate};
`;

export class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { dispatch } = this.props;
    const { changedTo } = treeChanges(prevProps, this.props);
    const alertSettings = { variant: 'success', icon: 'bell' };

    /* istanbul ignore else */
    if (changedTo('user.isAuthenticated', true)) {
      dispatch(showAlert('Hello! And welcome!', alertSettings));
    }
  }

  render() {
    const { dispatch, user } = this.props;
    const { name } = config;
    const { isAuthenticated } = user;

    return (
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <AppWrapper logged={isAuthenticated}>
            <Helmet
              defer={false}
              htmlAttributes={{ lang: 'pt-br' }}
              encodeSpecialCharacters={true}
              defaultTitle={name}
              titleTemplate={`%s | ${name}`}
              titleAttributes={{ itemprop: 'name', lang: 'pt-br' }}
            />
            {isAuthenticated && <Header dispatch={dispatch} user={user} />}
            <Main isAuthenticated={isAuthenticated}>
              <Switch>
                <RoutePublic isAuthenticated={isAuthenticated} path="/" exact component={Home} />
                <RoutePrivate
                  isAuthenticated={isAuthenticated}
                  path="/private"
                  component={Private}
                />
                <Route component={NotFound} />
              </Switch>
            </Main>
            <SystemAlerts />
            <GlobalStyles />
          </AppWrapper>
        </ThemeProvider>
      </Router>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = ({ user }) => ({ user });

export default hot(connect(mapStateToProps)(App));
