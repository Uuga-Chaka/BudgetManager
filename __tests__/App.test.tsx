import React from 'react';
import {Animated} from 'react-native';

import {render} from '@testing-library/react-native';
import {useKeyboardAnimation} from 'react-native-keyboard-controller';

function TestComponent() {
  const {height} = useKeyboardAnimation();

  return <Animated.View testID="view" style={{transform: [{translateY: height}]}} />;
}

describe('basic keyboard interaction', () => {
  it('should have different styles depends on position', () => {
    const screen = render(<TestComponent />);

    expect(screen.getByTestId('view')).toHaveStyle({transform: [{translateY: 0}]});

    (useKeyboardAnimation as jest.Mock).mockReturnValue({
      height: new Animated.Value(150),
      progress: new Animated.Value(0.5),
    });
    screen.update(<TestComponent />);

    expect(screen.getByTestId('view')).toHaveStyle({
      transform: [{translateY: 150}],
    });

    (useKeyboardAnimation as jest.Mock).mockReturnValue({
      height: new Animated.Value(300),
      progress: new Animated.Value(1),
    });
    screen.update(<TestComponent />);

    expect(screen.getByTestId('view')).toHaveStyle({
      transform: [{translateY: 300}],
    });
  });
});
