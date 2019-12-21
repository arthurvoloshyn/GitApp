import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import treeChanges from 'tree-changes';
import { appColor } from 'modules/theme';

import { getRepos, showAlert, switchMenu } from 'actions';
import { STATUS } from 'constants/index';

import {
  ButtonGroup,
  Button,
  Flex,
  Heading,
  Link,
  Image,
  Paragraph,
  theme,
  utils,
} from 'styled-minimal';
import Loader from 'components/Loader';

const { responsive, spacer } = utils;
const {
  grays: { gray60 },
} = theme;

const GitHubGrid = styled.ul`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${spacer(2)};
  grid-template-columns: 100%;
  list-style: none;
  margin: ${spacer(4)} auto 0;
  padding: 0;
  /* stylelint-disable */
  ${/* istanbul ignore next */ p =>
    responsive({
      ix: `
        grid-gap: ${spacer(3)(p)};
        width: 90%;
      `,
      md: `
        grid-template-columns: repeat(2, 1fr);
        width: 100%;
      `,
      lg: `
        grid-template-columns: repeat(3, 1fr);
      `,
      xl: `
        grid-gap: ${spacer(4)(p)};
        grid-template-columns: repeat(4, 1fr);
      `,
    })};
  /* stylelint-enable */

  > li {
    display: flex;
  }
`;

const Item = styled(Link)`
  align-items: center;
  border: solid 0.1rem ${appColor};
  border-radius: 0.4rem;
  overflow: hidden;
  padding: ${spacer(3)};
  text-align: center;
  width: 100%;
  /* stylelint-disable */
  ${/* istanbul ignore next */ p =>
    responsive({
      md: `
        padding: ${spacer(3)(p)};
      `,
      lg: `
        padding: ${spacer(4)(p)};
      `,
    })};
  /* stylelint-enable */

  p {
    color: #000;
  }

  img {
    height: 8rem;
    margin-bottom: ${spacer(2)};
  }
`;

const ItemHeader = styled.div`
  margin-bottom: ${spacer(3)};

  small {
    color: ${gray60};
  }
`;

export class GitHub extends Component {
  state = {
    query: 'react',
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    github: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { query } = this.state;
    const { dispatch } = this.props;

    dispatch(getRepos(query));
  }

  componentDidUpdate(prevProps) {
    const {
      dispatch,
      github: {
        repos: { message },
      },
    } = this.props;
    const { changedTo } = treeChanges(prevProps, this.props);
    const alertSettings = { variant: 'danger' };

    if (changedTo('github.repos.status', STATUS.ERROR)) {
      dispatch(showAlert(message, alertSettings));
    }
  }

  handleClick = ({
    currentTarget: {
      dataset: { query },
    },
  }) => {
    const { dispatch } = this.props;

    this.setState({
      query,
    });

    dispatch(switchMenu(query));
  };

  render() {
    const { query } = this.state;
    const {
      github: {
        repos: { data: reposData, status },
      },
    } = this.props;
    const data = reposData[query] || [];
    let output;

    if (status === STATUS.SUCCESS) {
      if (data.length) {
        output = (
          <GitHubGrid data-type={query} data-testid="GitHubGrid">
            {reposData[query].map(
              ({ id, html_url, name, description, owner: { avatar_url, login } }) => (
                <li key={id}>
                  <Item href={html_url} target="_blank">
                    <Image src={avatar_url} alt={login} />
                    <ItemHeader>
                      <Heading as="h5" lineHeight={1}>
                        {name}
                      </Heading>
                      <small>{login}</small>
                    </ItemHeader>
                    <Paragraph>{description}</Paragraph>
                  </Item>
                </li>
              ),
            )}
          </GitHubGrid>
        );
      } else {
        output = <h3>Nothing found</h3>;
      }
    } else {
      output = <Loader block />;
    }

    return (
      <div key="GitHub" data-testid="GitHubWrapper">
        <Flex justifyContent="center">
          <ButtonGroup role="group" aria-label="GitHub Selector" data-testid="GitHubSelector">
            <Button
              animate={query === 'react' && status === 'running'}
              bordered={query !== 'react'}
              size="lg"
              data-query="react"
              onClick={this.handleClick}
            >
              React
            </Button>
            <Button
              animate={query === 'redux' && status === 'running'}
              bordered={query !== 'redux'}
              size="lg"
              data-query="redux"
              onClick={this.handleClick}
            >
              Redux
            </Button>
          </ButtonGroup>
        </Flex>
        {output}
      </div>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = ({ github }) => ({ github });

export default connect(mapStateToProps)(GitHub);
