import React from 'react';
import styled from 'styled-components';

import { SigninForm } from 'components';

export const App: React.FC = () => (
  <Container>
    <SigninForm />
  </Container>
);

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
