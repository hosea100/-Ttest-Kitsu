import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  flex-wrap: wrap;
`;

const PageInfo = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizeMd};
  padding: 0 ${({ theme }) => theme.spacing.md};
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSizeSm};
  }
`;

const PageNumber = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`;

const PageButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const PageButton = styled(Button)`
  min-width: 40px;
  padding: 10px;
  
  ${({ $active, theme }) => $active && `
    background-color: ${theme.colors.primary};
    color: white;
    pointer-events: none;
  `}

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 36px;
    padding: 8px;
    font-size: ${({ theme }) => theme.typography.fontSizeSm};
  }
`;

export const Pagination = ({ 
  currentPage, 
  onPageChange, 
  hasMore,
  showPageNumbers = true,
  maxPageButtons = 5 
}) => {
  const hasPrev = currentPage > 0;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(0, currentPage - Math.floor(maxPageButtons / 2));
    
    for (let i = 0; i < maxPageButtons; i++) {
      const pageNum = startPage + i;
      pages.push(pageNum);
    }
    
    return pages;
  };

  const pageNumbers = showPageNumbers ? getPageNumbers() : [];

  return (
    <PaginationContainer>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        $variant="outline"
        aria-label="Previous page"
      >
        ← Previous
      </Button>

      {showPageNumbers && (
        <PageButtons>
          {pageNumbers.map(pageNum => (
            <PageButton
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              $active={pageNum === currentPage}
              $variant={pageNum === currentPage ? 'primary' : 'ghost'}
              aria-label={`Go to page ${pageNum + 1}`}
              aria-current={pageNum === currentPage ? 'page' : undefined}
            >
              {pageNum + 1}
            </PageButton>
          ))}
        </PageButtons>
      )}

      <PageInfo>
        Page <PageNumber>{currentPage + 1}</PageNumber>
      </PageInfo>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasMore}
        $variant="outline"
        aria-label="Next page"
      >
        Next →
      </Button>
    </PaginationContainer>
  );
};
