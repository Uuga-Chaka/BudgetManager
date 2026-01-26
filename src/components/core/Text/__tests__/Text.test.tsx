import React from 'react';

import {render} from '@testing-library/react-native';

import {useAppTheme} from '@app/theme/useAppTheme';

import Text from '../Text';

jest.mock('@app/theme/useAppTheme');

jest.mock('../Text.const', () => ({
  fontVariant: {
    p1: {fontSize: 16, fontWeight: '400'},
    h1: {fontSize: 32, fontWeight: 'bold'},
  },
}));

const mockTheme = {
  colors: {
    backgroundReverse: '#000000',
  },
};

describe('Text Component', () => {
  beforeEach(() => {
    (useAppTheme as jest.Mock).mockReturnValue(mockTheme);
  });

  it('renders children correctly', () => {
    const testMessage = 'Hello World';
    const instance = render(<Text>{testMessage}</Text>);
    const textElement = instance.root.findByType('Text' as 'text');

    expect(textElement.props.children).toBe(testMessage);
  });

  it('applies the default variant (p1) when no variant is provided', () => {
    const instance = render(<Text>Default</Text>);
    const textElement = instance.root.findByType('Text' as 'text');

    // Should contain p1 styles from our mock
    expect(textElement.props.style).toContainEqual({
      fontSize: 16,
      fontWeight: '400',
    });
  });

  it('applies the correct styles for a specific variant', () => {
    const instance = render(<Text variant="h1">Heading</Text>);
    const textElement = instance.root.findByType('Text' as 'text');

    expect(textElement.props.style).toContainEqual({
      fontSize: 32,
      fontWeight: 'bold',
    });
  });

  it('applies the theme color (backgroundReverse) to the text', () => {
    const instance = render(<Text>Themed Text</Text>);
    const textElement = instance.root.findByType('Text' as 'text');

    expect(textElement.props.style).toContainEqual({
      color: '#000000',
    });
  });

  it('allows overriding styles via the style prop', () => {
    const customStyle = {color: 'red', marginTop: 10};
    const instance = render(<Text style={customStyle}>Custom</Text>);
    const textElement = instance.root.findByType('Text' as 'text');

    // The style prop is passed last in your component, so it should be at the end of the array
    expect(textElement.props.style).toContainEqual(customStyle);
  });

  it('passes down standard RNText props (like numberOfLines)', () => {
    const instance = render(<Text numberOfLines={2}>Truncated</Text>);
    const textElement = instance.root.findByType('Text' as 'text');

    expect(textElement.props.numberOfLines).toBe(2);
  });
});
