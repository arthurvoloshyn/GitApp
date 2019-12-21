import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { utils } from 'styled-minimal';

import { hideAlert } from 'actions';

import Transition from 'components/Transition';
import Alert from 'components/Alert';

const { spacer, responsive } = utils;

const Base = styled.div`
  position: fixed;
  z-index: 1000;

  > div {
    > * + * {
      margin-top: ${spacer(3)};
    }
  }
`;

const TopLeft = styled(Base)`
  left: ${spacer(3)};
  top: ${spacer(3)};
  width: 26rem;

  ${/* sc-custom '@media-query' */ responsive({
    md: `
      width: 32rem;
    `,
  })};
`;

const TopRight = styled(Base)`
  right: ${spacer(3)};
  top: ${spacer(3)};
  width: 26rem;

  ${/* sc-custom '@media-query' */ responsive({
    md: `
      width: 32rem;
    `,
  })};
`;

const BottomLeft = styled(Base)`
  bottom: ${spacer(3)};
  left: ${spacer(3)};
  width: 26rem;

  ${/* sc-custom '@media-query' */ responsive({
    md: `
      width: 32rem;
    `,
  })};
`;

const BottomRight = styled(Base)`
  bottom: ${spacer(3)};
  right: ${spacer(3)};
  width: 26rem;

  ${/* sc-custom '@media-query' */ responsive({
    md: `
      width: 32rem;
    `,
  })};
`;

const SystemAlertsWrapper = styled.div`
  pointer-events: none;
  position: fixed;
  z-index: 1000;
`;

export class SystemAlerts extends PureComponent {
  timeouts = {};

  static propTypes = {
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentDidUpdate() {
    const {
      app: { alerts },
      dispatch,
    } = this.props;

    /* istanbul ignore else */
    if (alerts.length) {
      alerts.forEach(({ timeout, id }) => {
        if (timeout && !this.timeouts[id]) {
          this.timeouts[id] = setTimeout(() => {
            dispatch(hideAlert(id));
          }, timeout * 1000);
        }
      });
    }
  }

  componentWillUnmount() {
    Object.keys(this.timeouts).forEach(d => {
      clearTimeout(this.timeouts[d]);
    });
  }

  handleClick = e => {
    e.preventDefault();
    const {
      currentTarget: {
        dataset: { id },
      },
    } = e;
    const { dispatch } = this.props;

    dispatch(hideAlert(id));
  };

  renderAlerts = position => {
    const {
      app: { alerts },
    } = this.props;
    const items = alerts.filter(d => d.position === position);

    if (!items.length) {
      return null;
    }

    return items.map(({ id, icon, variant, message }) => (
      <Alert key={id} id={id} icon={icon} handleClickClose={this.handleClick} variant={variant}>
        {message}
      </Alert>
    ));
  };

  render() {
    return (
      <SystemAlertsWrapper key="SystemAlerts">
        <TopLeft>
          <Transition transition="slideDown">{this.renderAlerts('top-left')}</Transition>
        </TopLeft>
        <TopRight>
          <Transition transition="slideDown">{this.renderAlerts('top-right')}</Transition>
        </TopRight>
        <BottomLeft>
          <Transition transition="slideUp">{this.renderAlerts('bottom-left')}</Transition>
        </BottomLeft>
        <BottomRight>
          <Transition transition="slideUp">{this.renderAlerts('bottom-right')}</Transition>
        </BottomRight>
      </SystemAlertsWrapper>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = ({ app }) => ({ app });

export default connect(mapStateToProps)(SystemAlerts);
