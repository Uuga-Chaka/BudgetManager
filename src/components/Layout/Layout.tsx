import {memo, type PropsWithChildren} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';

import {type RouteProp} from '@react-navigation/native';
import {
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
  Canvas,
  Fill,
  Group,
  Oval,
  RadialGradient,
  Turbulence,
  vec,
} from '@shopify/react-native-skia';

import {type OnboardingParamList} from '@app/navigation/navigation.types';
import {useAppTheme} from '@app/theme/useAppTheme';

import {size} from '../../consts/styles';

const styles = StyleSheet.create({
  layout: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: size.m,
  },
});

type AppLayoutProps = {
  route: RouteProp<OnboardingParamList, keyof OnboardingParamList>;
  navigation: NativeStackNavigationProp<OnboardingParamList>;
  options: NativeStackNavigationOptions;
} & PropsWithChildren;

const colorArray = ['#F8818C', '#FDD9D5', '#000000', '#E1265C', '#70094F', '#000000'];

const blobSize = 1000;

export default function AppLayout({children, navigation}: AppLayoutProps) {
  const canGoBack = navigation.canGoBack();
  // const {colors, statusBarStyle} = useAppTheme();

  // const renderBackAction = () => {
  //   if (!canGoBack) return <></>;
  // };

  return (
    <>
      <Background />
      <View style={styles.layout}>{children}</View>
    </>
  );
}

const Background = memo(() => {
  const {width, height} = useWindowDimensions();

  const blobPositions = colorArray.map(() => ({
    translateX: Math.random() * width,
    translateY: Math.random() * height,
  }));

  return (
    <Canvas style={{width, height, position: 'absolute', top: 0, left: 0}}>
      <Fill color={'black'} />
      {colorArray.map((color, i) => {
        return (
          <Group
            key={`blob-${i} + ${color}`}
            transform={[
              {translateX: blobPositions[i].translateX},
              {translateY: blobPositions[i].translateY},
            ]}>
            <RadialGradient c={vec(0, 0)} r={blobSize / 2} colors={[color, color + '00']} />
            <Oval x={-(blobSize / 2)} y={-(blobSize / 2)} width={blobSize} height={blobSize} />
          </Group>
        );
      })}

      <Fill blendMode={'colorDodge'}>
        <Turbulence freqX={0.4} freqY={0.4} octaves={2} />
      </Fill>
    </Canvas>
  );
});
