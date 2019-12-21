import React from 'react';
import styled from 'styled-components';

import Github from 'components/GitHub';

import { Box, Container, Heading, Link, Paragraph, Screen, Text, utils } from 'styled-minimal';

const { spacer } = utils;

const Header = styled.div`
  margin-bottom: ${spacer(3)};
  text-align: center;
`;

const Private = () => (
  <Screen key="Private" data-testid="PrivateWrapper">
    <Container verticalPadding>
      <Header>
        <Heading>Oh hai!</Heading>
        <Paragraph>
          You can get this gitApp{' '}
          <Link href="https://github.com/ArturW1998/GitApp/" target="_blank">
            here
          </Link>
        </Paragraph>
      </Header>
      <Box textAlign="center" mb={4}>
        <Heading as="h5">Here's some GitHub data</Heading>
        <Text fontSize={1}>
          <i>*Just to have some requests in the sagas...</i>
        </Text>
      </Box>
      <Github />
    </Container>
  </Screen>
);

export default Private;
