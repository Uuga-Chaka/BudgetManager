import React from 'react';

import {render} from '@testing-library/react-native';

import {useAppTheme} from '@app/theme/useAppTheme';

import Button from '../Button'; // Adjust path

// Mock the theme hook
jest.mock('@app/theme/useAppTheme');

const mockTheme = {
  theme: {
    colors: {
      primary: '#007AFF',
      background: '#FFFFFF',
      transparent: 'transparent',
      basicTrans_100: 'rgba(0,0,0,0.1)',
      primary_700: '#0051A8',
      black: '#000000',
    },
    spacing: {s: 8},
    radius: {s: 4},
  },
  colors: {
    primary: '#007AFF',
    primary_700: '#0051A8',
    transparent: 'transparent',
    basicTrans_100: 'rgba(0,0,0,0.1)',
  },
};

describe('Button Component', () => {
  beforeEach(() => {
    (useAppTheme as jest.Mock).mockReturnValue(mockTheme);
  });

  it('renders the children text correctly', () => {
    const screen = render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeTruthy();
  });
});
