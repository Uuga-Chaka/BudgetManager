import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';
import {type ReactTestInstance} from 'react-test-renderer';

import {useAppTheme} from '@app/theme/useAppTheme';

import Button from '../Button';

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

  it('applies correct styles for the "filled" variant (default)', () => {
    // @ts-expect-error: When the variant does not exist
    const screen = render(<Button variant="error">Filled</Button>);
    const animatedView = screen.getByRole('button').children[0] as ReactTestInstance;

    expect(animatedView.props.style).toContainEqual(
      expect.objectContaining({backgroundColor: '#007AFF', borderColor: '#007AFF'}),
    );
  });

  it('applies correct styles for the "outline" variant', () => {
    const screen = render(<Button variant="outline">Outline</Button>);
    const animatedView = screen.getByRole('button').children[0] as ReactTestInstance;
    expect(animatedView.props.style).toContainEqual(
      expect.objectContaining({
        backgroundColor: 'transparent',
        borderColor: '#007AFF',
      }),
    );
  });

  it('applies correct styles for the "ghost" variant', () => {
    const screen = render(<Button variant="ghost">Ghost</Button>);
    const animatedView = screen.getByRole('button').children[0] as ReactTestInstance;

    expect(animatedView.props.style).toContainEqual(
      expect.objectContaining({
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      }),
    );
  });

  it('renders icons when IconLeft or IconRight are provided', () => {
    const MockIconLeft = jest.fn(() => <></>);
    const MockIconRight = jest.fn(() => <></>);

    render(
      <Button IconLeft={MockIconLeft} IconRight={MockIconRight}>
        Icon Button
      </Button>,
    );

    expect(MockIconLeft).toHaveBeenCalled();
    expect(MockIconRight).toHaveBeenCalled();
  });

  it('renders icons when IconLeft or IconRight are provided in "ghost" variant', () => {
    const MockIconLeft = jest.fn(() => <></>);
    const MockIconRight = jest.fn(() => <></>);

    render(
      <Button variant="ghost" IconLeft={MockIconLeft} IconRight={MockIconRight}>
        Icon Button
      </Button>,
    );

    expect(MockIconLeft).toHaveBeenCalled();
    expect(MockIconRight).toHaveBeenCalled();
  });

  it('triggers onPress when clicked', () => {
    const onPressMock = jest.fn();
    const screen = render(<Button onPress={onPressMock}>Press Me</Button>);

    fireEvent.press(screen.getByText('Press Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('updates shared values on press interaction', () => {
    const screen = render(<Button>Animate</Button>);
    const button = screen.getByRole('button');

    fireEvent(button, 'onPressIn');
    fireEvent(button, 'onPressOut');
  });
});
