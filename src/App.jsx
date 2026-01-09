import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { GlobalStyles } from './styles/GlobalStyles';
import PlaceholderPage from './pages/PlaceholderPage';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Router>
        <AppContainer>
          <Routes>
            <Route path="/" element={<PlaceholderPage title="Home Page" message="Anime list coming soon..." />} />
            <Route path="/anime/:id" element={<PlaceholderPage title="Detail Page" message="Anime details coming soon..." />} />
            <Route path="*" element={<PlaceholderPage title="404 Not Found" message="This page doesn't exist yet." />} />
          </Routes>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;