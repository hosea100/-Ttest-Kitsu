import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const Icon = styled.div`
  font-size: 64px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizeLg};
`;

const PlaceholderPage = ({ title = "Coming Soon", message = "This page is under development." }) => {
  return (
    <Container>
      <Icon>🎬</Icon>
      <Title>{title}</Title>
      <Message>{message}</Message>
    </Container>
  );
};

export default PlaceholderPage;