import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: ${({ $fullHeight }) => $fullHeight ? '60vh' : '200px'};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 64px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  opacity: 0.5;
`;

const ErrorTitle = styled.h3`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-width: 500px;
`;

export const ErrorMessage = ({ 
  title = 'Oops! Something went wrong', 
  message, 
  onRetry,
  fullHeight = false 
}) => {
  return (
    <ErrorContainer $fullHeight={fullHeight}>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorTitle>{title}</ErrorTitle>
      {message && <ErrorText>{message}</ErrorText>}
      {onRetry && (
        <Button onClick={onRetry}>
          Try Again
        </Button>
      )}
    </ErrorContainer>
  );
};
