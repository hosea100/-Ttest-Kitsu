import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: ${({ $fullHeight }) => $fullHeight ? '60vh' : '200px'};
  gap: ${({ theme }) => theme.spacing.md};
`;

const Spinner = styled.div`
  width: ${({ $size }) => $size || '48px'};
  height: ${({ $size }) => $size || '48px'};
  border: 4px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizeMd};
`;

export const Loading = ({ text = 'Loading...', size, fullHeight = false }) => {
  return (
    <LoadingContainer $fullHeight={fullHeight}>
      <Spinner $size={size} />
      {text && <LoadingText>{text}</LoadingText>}
    </LoadingContainer>
  );
};

// Skeleton loading for cards
const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.backgroundSecondary} 0%,
    ${({ theme }) => theme.colors.backgroundTertiary} 50%,
    ${({ theme }) => theme.colors.backgroundSecondary} 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: ${({ theme }) => theme.borderRadius.md};

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

export const SkeletonCard = styled(SkeletonBase)`
  width: 100%;
  height: ${({ $height }) => $height || '400px'};
`;

export const SkeletonText = styled(SkeletonBase)`
  height: ${({ $height }) => $height || '16px'};
  width: ${({ $width }) => $width || '100%'};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;
