import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import config from 'config';
import { login } from 'actions/index';

import { Button, Container, Text, utils } from 'styled-minimal';
import Background from 'components/Background';
import Icon from 'components/Icon';
import Logo from 'components/Logo';

const { spacer, responsive } = utils;
const { name } = config;

const HomeContainer = styled(Container)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: ${spacer(3)};
  text-align: center;

  svg {
    height: 10rem;
    width: auto;

    ${/* sc-custom '@media-query' */ responsive({
      lg: `
        height: 15rem;
     `,
    })};
  }
`;

const Heading = styled.h1`
  color: #fff;
  font-size: 3.5rem;
  line-height: 1.4;
  margin-bottom: ${spacer(3)};
  margin-top: 0;
  text-align: center;

  ${/* sc-custom '@media-query' */ responsive({
    lg: `
      font-size: 4rem;
    `,
  })};
`;

export const Home = ({ dispatch, user: { status } }) => (
  <Background key="Home" data-testid="HomeWrapper">
    <HomeContainer verticalPadding>
      <Header>
        <Logo type="logo" />
      </Header>
      <Heading>{name}</Heading>
      <Button
        animate={status === 'running'}
        onClick={() => dispatch(login())}
        size="xl"
        textTransform="uppercase"
        data-testid="Login"
      >
        <Icon name="sign-in" />
        <Text ml={2}>Start</Text>
      </Button>
    </HomeContainer>
  </Background>
);

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Home);
