import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(10px);
  background-color: ${({ theme }) => 
    theme.name === 'dark' 
      ? 'rgba(22, 24, 29, 0.9)' 
      : 'rgba(255, 255, 255, 0.9)'
  };
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSizeXl};
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSizeLg};
  }
`;

const LogoIcon = styled.span`
  font-size: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 24px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const ThemeToggle = styled.button`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 2px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundTertiary};
    transform: rotate(20deg) scale(1.1);
  }

  &:active {
    transform: rotate(20deg) scale(0.95);
  }
`;

export const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <LogoIcon>🎬</LogoIcon>
          <span>AnimeHub</span>
        </Logo>
        <Nav>
          <ThemeToggle 
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </ThemeToggle>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};
