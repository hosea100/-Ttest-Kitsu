import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.article`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: ${({ theme }) => theme.shadows.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  animation: fadeIn 0.3s ease-out;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 140%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.slow};

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const ImagePlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.backgroundSecondary},
    ${({ theme }) => theme.colors.backgroundTertiary}
  );
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.7) 50%,
    transparent 100%
  );
  padding: ${({ theme }) => theme.spacing.lg};
  transform: translateY(0);
  transition: transform ${({ theme }) => theme.transitions.normal};
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizeMd};
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizeSm};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSizeXs};
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
`;

const RatingBadge = styled(Badge)`
  background-color: ${({ theme }) => 
    theme.name === 'dark' 
      ? 'rgba(255, 193, 7, 0.2)' 
      : 'rgba(255, 193, 7, 0.1)'
  };
  color: #FFC107;
`;

export const AnimeCard = ({ anime }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    // Delete console.log in production
    console.log('Anime clicked:', anime);
    console.log(`Navigate to anime: ${anime.attributes.canonicalTitle}`);
  };

  const getTitle = () => {
    return anime.attributes.canonicalTitle || 
          anime.attributes.titles?.en || 
          anime.attributes.titles?.en_jp ||
          'Untitled';
  };

  const getJapaneseTitle = () => {
    return anime.attributes.titles?.ja_jp || 
          anime.attributes.titles?.en_jp ||
          '無題';
  };

  const getImageUrl = () => {
    return anime.attributes.posterImage?.medium || 
          anime.attributes.posterImage?.small ||
          anime.attributes.posterImage?.large ||
          '🎬';
  };

  const getRating = () => {
    const rating = anime.attributes.averageRating;
    return rating ? parseFloat(rating).toFixed(1) : '0.0';
  };

  const imageUrl = getImageUrl();

  return (
    <Card onClick={handleClick} role="button" tabIndex={0}>
      <ImageContainer>
        {imageUrl && !imageError ? (
          <Image 
            src={imageUrl} 
            alt={getTitle()}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <ImagePlaceholder>🎬</ImagePlaceholder>
        )}
      </ImageContainer>
      <Content>
        <Title>{getTitle()}</Title>
        {getJapaneseTitle() && (
          <Subtitle>{getJapaneseTitle()}</Subtitle>
        )}
        <MetaInfo>
          {getRating() && (
            <RatingBadge>⭐ {getRating()}</RatingBadge>
          )}
          {anime.attributes.subtype && (
            <Badge>{anime.attributes.subtype}</Badge>
          )}
        </MetaInfo>
      </Content>
    </Card>
  );
};
