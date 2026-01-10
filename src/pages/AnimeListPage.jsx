import React from 'react';
import styled from 'styled-components';
import { useAnimeList } from '../hooks/useAnime';

import { SkeletonCard } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { AnimeCard } from '../components/AnimeCard';
import { Pagination } from '../components/Pagination';

const PageContainer = styled.main`
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  }
`;

const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizeXxl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSizeXl};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizeLg};
  color: ${({ theme }) => theme.colors.textSecondary};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSizeMd};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const SkeletonGrid = styled(Grid)``;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const AnimeListPage = () => {
  const { 
    data, 
    loading, 
    error, 
    currentPage, 
    hasMore, 
    goToPage,
    refresh 
  } = useAnimeList(0, 10);

  if (error) {
    return (
      <PageContainer>
        <ErrorMessage 
          message={error}
          onRetry={refresh}
          fullHeight
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <Title>Discover Anime</Title>
        <Subtitle>Explore thousands of anime series and movies</Subtitle>
      </Header>

      {loading ? (
        <SkeletonGrid>
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCard key={index} $height="350px" />
          ))}
        </SkeletonGrid>
      ) : data.length === 0 ? (
        <EmptyState>
          <EmptyIcon>📺</EmptyIcon>
          <h3>No anime found</h3>
          <p>Try refreshing the page</p>
        </EmptyState>
      ) : (
        <>
          <Grid>
            {data.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </Grid>

          <Pagination
            currentPage={currentPage}
            onPageChange={goToPage}
            hasMore={hasMore}
            showPageNumbers={true}
          />
        </>
      )}
    </PageContainer>
  );
};