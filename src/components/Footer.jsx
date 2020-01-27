import React from 'react';
import styled from 'styled-components';

import { Container, Flex } from 'styled-minimal';

const FooterWrapper = styled.footer`
  border-top: 0.1rem solid #ddd;
`;

const FooterIframe = styled.iframe`
  overflow: hidden;
  border: none;
`;

const Footer = () => (
  <FooterWrapper>
    <Container py={3}>
      <Flex justifyContent="space-between">
        <FooterIframe
          title="GitHub Stars"
          src="https://ghbtns.com/github-btn.html?user=ArturW1998&repo=GitApp&type=star&count=true"
          width="110"
          height="20"
        />
        <FooterIframe
          title="GitHub Follow"
          src="https://ghbtns.com/github-btn.html?user=ArturW1998&type=follow&count=true"
          width="140"
          height="20"
        />
      </Flex>
    </Container>
  </FooterWrapper>
);

export default Footer;
