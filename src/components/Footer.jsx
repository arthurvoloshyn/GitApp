import React from 'react';
import styled from 'styled-components';

import { Container, Flex } from 'styled-minimal';

const FooterWrapper = styled.footer`
  border-top: 0.1rem solid #ddd;
`;

const Footer = () => (
  <FooterWrapper>
    <Container py={3}>
      <Flex justifyContent="space-between">
        <iframe
          title="GitHub Stars"
          src="https://ghbtns.com/github-btn.html?user=ArturW1998&repo=GitApp&type=star&count=true"
          frameBorder="0"
          scrolling="0"
          width="110px"
          height="20px"
        />
        <iframe
          title="GitHub Follow"
          src="https://ghbtns.com/github-btn.html?user=ArturW1998&type=follow&count=true"
          frameBorder="0"
          scrolling="0"
          width="140px"
          height="20px"
        />
      </Flex>
    </Container>
  </FooterWrapper>
);

export default Footer;