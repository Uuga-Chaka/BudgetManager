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

import {ChevronLeftIcon} from '@app/assets/Icons';
import {type OnboardingParamList} from '@app/navigation/navigation.types';
import {type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';

import Text from '../core/Text/Text';

type AppLayoutProps = {
  route: RouteProp<OnboardingParamList, keyof OnboardingParamList>;
  navigation: NativeStackNavigationProp<OnboardingParamList>;
  options: NativeStackNavigationOptions;
} & PropsWithChildren;

const colorArray = ['#F8818C', '#FDD9D5', '#000000', '#E1265C', '#70094F', '#000000'];

const blobSize = 1000;

const styleProps = (theme: ThemeProps) => {
  const styles = StyleSheet.create({
    headerContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      height: 56,
      justifyContent: 'flex-start',
      padding: theme.spacing.s,
      width: '100%',
    },
    headerSideSlot: {
      alignItems: 'flex-start',
      width: 32,
    },
    headerTitle: {
      flex: 1,
      textAlign: 'center',
    },
    layout: {
      alignContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: theme.sizes.m,
    },
  });
  return styles;
};

export default function AppLayout({children, navigation, options}: AppLayoutProps) {
  const canGoBack = navigation.canGoBack();
  const {theme} = useAppTheme();
  const renderBackAction = () => {
    if (!canGoBack) return <></>;
    return (
      <ChevronLeftIcon
        color={theme.colors.backgroundReverse}
        size={32}
        onPress={() => navigation.goBack()}
      />
    );
  };

  const styles = styleProps(theme);

  return (
    <>
      <Background />
      <View style={styles.headerContainer}>
        {canGoBack && renderBackAction()}
        <Text variant="s2" style={styles.headerTitle}>
          {options.title}
        </Text>
        {canGoBack && <View style={styles.headerSideSlot} />}
      </View>
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
    // eslint-disable-next-line react-native/no-inline-styles
    <Canvas style={{width, height, position: 'absolute', top: 0, left: 0}}>
      <Fill color={'black'} />
      {colorArray.map((color, i) => {
        return (
          <Group
            // eslint-disable-next-line @eslint-react/no-array-index-key
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
