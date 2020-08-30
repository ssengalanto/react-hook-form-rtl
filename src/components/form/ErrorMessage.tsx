import React from 'react';
import styled from 'styled-components';
import { ErrorMessage as ErrMsg } from '@hookform/error-message';

type Props = React.ComponentProps<typeof ErrMsg>;

export const ErrorMessage: React.FC<Props> = (props) => (
  <ErrMsg
    data-testid="error-message-component"
    {...props}
    render={({ message }) => (
      <Container>
        <span role="alert">{message}</span>
      </Container>
    )}
  />
);

const Container = styled.div`
  margin-top: 2px;
  position: absolute;

  span {
    color: #ff4d4f;
  }

  span::before {
    display: inline;
    content: '⚠ ';
  }
`;
