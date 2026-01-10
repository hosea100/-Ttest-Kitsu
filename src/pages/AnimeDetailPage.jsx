import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAnimeDetail } from '../hooks/useAnime';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { Button } from '../components/Button';

const PageContainer = styled.main`
  flex: 1;
  width: 100%;
`;

const Hero = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 300px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 250px;
  }
`;

const CoverImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${({ $url }) => $url});
  background-size: cover;
  background-position: center;
  filter: blur(8px);
  transform: scale(1.1);
  opacity: 0.3;
`;

const HeroOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(
    to top,
    ${({ theme }) => theme.colors.background} 0%,
    transparent 100%
  );
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  position: relative;
  transform: translateY(-100px);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    transform: translateY(-80px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
    transform: translateY(-60px);
  }
`;

const BackButton = styled(Button)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const MainInfo = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 200px 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const PosterContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 140%;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.xl};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 250px;
    margin: 0 auto;
  }
`;

const Poster = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PosterPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.backgroundSecondary},
    ${({ theme }) => theme.colors.backgroundTertiary}
  );
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const TitleGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizeXxl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  line-height: 1.2;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.typography.fontSizeXl};
  }
`;

const JapaneseTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizeLg};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.fontWeightNormal};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.typography.fontSizeMd};
  }
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const MetaLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizeSm};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MetaValue = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizeMd};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
`;

const RatingValue = styled(MetaValue)`
  color: #FFC107;
  font-size: ${({ theme }) => theme.typography.fontSizeLg};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizeXl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Synopsis = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizeMd};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  white-space: pre-line;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSizeSm};
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: ${({ $status, theme }) => {
    switch($status) {
      case 'current': return 'rgba(76, 175, 80, 0.2)';
      case 'finished': return 'rgba(33, 150, 243, 0.2)';
      case 'upcoming': return 'rgba(255, 193, 7, 0.2)';
      default: return theme.colors.primaryLight;
    }
  }};
  color: ${({ $status }) => {
    switch($status) {
      case 'current': return '#4CAF50';
      case 'finished': return '#2196F3';
      case 'upcoming': return '#FFC107';
      default: return '#FF6B6B';
    }
  }};
`;

export const AnimeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useAnimeDetail(id);
  const [imageError, setImageError] = useState(false);

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <PageContainer>
        <Loading text="Loading anime details..." fullHeight />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Content>
          <BackButton onClick={handleBack} $variant="outline">
            ← Back to List
          </BackButton>
          <ErrorMessage message={error} fullHeight />
        </Content>
      </PageContainer>
    );
  }

  if (!data) {
    return (
      <PageContainer>
        <Content>
          <BackButton onClick={handleBack} $variant="outline">
            ← Back to List
          </BackButton>
          <ErrorMessage 
            title="Anime not found"
            message="The anime you're looking for doesn't exist."
            fullHeight
          />
        </Content>
      </PageContainer>
    );
  }

  const { attributes } = data;
  
  const getTitle = () => {
    return attributes.canonicalTitle || 
          attributes.titles?.en || 
          attributes.titles?.en_jp ||
          'Untitled';
  };

  const getJapaneseTitle = () => {
    return attributes.titles?.ja_jp || 
          attributes.titles?.en_jp ||
          '無題';
  };

  const getPosterUrl = () => {
    return attributes.posterImage?.large || 
          attributes.posterImage?.medium ||
          attributes.posterImage?.original ||
          '🎬';
  };

  const getCoverUrl = () => {
    return attributes.coverImage?.large || 
          attributes.coverImage?.original ||
          getPosterUrl();
  };

  const getRating = () => {
    const rating = attributes.averageRating;
    return rating ? parseFloat(rating).toFixed(1) : '0.0';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const posterUrl = getPosterUrl();
  const coverUrl = getCoverUrl();

  return (
    <PageContainer>
      <Hero>
        {coverUrl && <CoverImage $url={coverUrl} />}
        <HeroOverlay />
      </Hero>

      <Content>
        <BackButton onClick={handleBack} $variant="outline">
          ← Back to List
        </BackButton>

        <MainInfo>
          <PosterContainer>
            {posterUrl && !imageError ? (
              <Poster 
                src={posterUrl} 
                alt={getTitle()}
                onError={() => setImageError(true)}
              />
            ) : (
              <PosterPlaceholder>🎬</PosterPlaceholder>
            )}
          </PosterContainer>

          <InfoSection>
            <TitleGroup>
              <Title>{getTitle()}</Title>
              {getJapaneseTitle() && (
                <JapaneseTitle>{getJapaneseTitle()}</JapaneseTitle>
              )}
            </TitleGroup>

            <MetaGrid>
              <MetaItem>
                <MetaLabel>Rating</MetaLabel>
                <RatingValue>⭐ {getRating()}</RatingValue>
              </MetaItem>

              <MetaItem>
                <MetaLabel>Type</MetaLabel>
                <MetaValue>{attributes.subtype || 'N/A'}</MetaValue>
              </MetaItem>

              <MetaItem>
                <MetaLabel>Status</MetaLabel>
                <StatusBadge $status={attributes.status}>
                  {attributes.status || 'Unknown'}
                </StatusBadge>
              </MetaItem>

              <MetaItem>
                <MetaLabel>Episodes</MetaLabel>
                <MetaValue>{attributes.episodeCount || 'N/A'}</MetaValue>
              </MetaItem>

              {attributes.ageRating && (
                <MetaItem>
                  <MetaLabel>Age Rating</MetaLabel>
                  <MetaValue>{attributes.ageRating}</MetaValue>
                </MetaItem>
              )}

              <MetaItem>
                <MetaLabel>Start Date</MetaLabel>
                <MetaValue>{formatDate(attributes.startDate)}</MetaValue>
              </MetaItem>

              {attributes.endDate && (
                <MetaItem>
                  <MetaLabel>End Date</MetaLabel>
                  <MetaValue>{formatDate(attributes.endDate)}</MetaValue>
                </MetaItem>
              )}

              {attributes.popularityRank && (
                <MetaItem>
                  <MetaLabel>Popularity Rank</MetaLabel>
                  <MetaValue>#{attributes.popularityRank}</MetaValue>
                </MetaItem>
              )}
            </MetaGrid>
          </InfoSection>
        </MainInfo>

        {attributes.synopsis && (
          <Section>
            <SectionTitle>Synopsis</SectionTitle>
            <Synopsis>{attributes.synopsis}</Synopsis>
          </Section>
        )}
      </Content>
    </PageContainer>
  );
};
