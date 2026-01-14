import {useState} from 'react';
import {type LayoutChangeEvent} from 'react-native';

import {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const ANIMATION_DURATION = 250;

export default function useAccordionAnimation() {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const heightRef = useSharedValue(0);

  const handleCardOpen = () => {
    setIsCardOpen(s => !s);
  };

  const derivedHeight = useDerivedValue(() =>
    withTiming(heightRef.value * Number(isCardOpen), {
      duration: ANIMATION_DURATION,
      easing: Easing.ease,
      reduceMotion: ReduceMotion.Never,
    }),
  );

  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  const onHandlingLayout = (e: LayoutChangeEvent) => {
    heightRef.value = e.nativeEvent.layout.height;
  };

  return {
    bodyStyle,
    derivedHeight,
    handleCardOpen,
    isCardOpen,
    onHandlingLayout,
  };
}
