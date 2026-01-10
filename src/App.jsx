import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { ThemeProvider } from './context/ThemeContext';
import { GlobalStyles } from './styles/GlobalStyles';

import { Header } from './components/Header';

import PlaceholderPage from './pages/PlaceholderPage';
import { AnimeListPage } from './pages/AnimeListPage';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Footer = styled.footer`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizeSm};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: auto;
`;

function App() {
  const currentYear = moment().format('YYYY');

  return (
    <ThemeProvider>
      <GlobalStyles />
      <Router>
        <AppContainer>
          <Header />
          <Routes>
            {/* Home page */}
            <Route path="/" element={<AnimeListPage />} />
            {/* 404 Fallback */}
            <Route path="*" element={<PlaceholderPage title="404 - Page Not Found"/>} />
          </Routes>
          <Footer>
            <p>© {currentYear} AnimeHub. Data provided by Kitsu API.</p>
          </Footer>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
