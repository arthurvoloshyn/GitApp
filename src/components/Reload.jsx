import React from 'react';
import styled from 'styled-components';

import { Button, Heading } from 'styled-minimal';

export const ReloadWrapper = styled.div`
  button {
    pointer-events: all;
  }
`;

const Reload = () => {
  const handleReload = () => window.location.reload();
  return (
    <ReloadWrapper>
      <Heading as="h6" mb={3}>
        There's a new version of this app!
      </Heading>
      <Button variant="dark" bordered size="sm" onClick={handleReload}>
        Reload
      </Button>
    </ReloadWrapper>
  );
};

export default Reload;
