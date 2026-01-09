import styled from 'styled-components';

export const Button = styled.button`
  padding: ${({ $size }) => 
    $size === 'small' ? '8px 16px' : 
    $size === 'large' ? '16px 32px' : 
    '12px 24px'
  };
  font-size: ${({ theme, $size }) => 
    $size === 'small' ? theme.typography.fontSizeSm : 
    $size === 'large' ? theme.typography.fontSizeLg : 
    theme.typography.fontSizeMd
  };
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  color: ${({ $variant, theme }) => 
    $variant === 'outline' || $variant === 'ghost' ? theme.colors.text : 'white'
  };
  background-color: ${({ $variant, theme }) => 
    $variant === 'outline' ? 'transparent' :
    $variant === 'ghost' ? 'transparent' :
    $variant === 'secondary' ? theme.colors.backgroundTertiary :
    theme.colors.primary
  };
  border: ${({ $variant, theme }) => 
    $variant === 'outline' ? `2px solid ${theme.colors.primary}` : 'none'
  };
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  text-decoration: none;
  white-space: nowrap;
  
  &:hover {
    background-color: ${({ $variant, theme }) => 
      $variant === 'outline' ? theme.colors.primaryLight :
      $variant === 'ghost' ? theme.colors.surfaceHover :
      $variant === 'secondary' ? theme.colors.border :
      theme.colors.primaryHover
    };
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ $size }) => 
      $size === 'small' ? '6px 12px' : 
      $size === 'large' ? '14px 24px' : 
      '10px 20px'
    };
  }
`;
