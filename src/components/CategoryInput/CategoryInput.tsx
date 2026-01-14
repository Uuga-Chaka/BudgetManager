import React, {useState} from 'react';
import {type LayoutChangeEvent, View, type ViewProps} from 'react-native';

import {
  Button,
  Input,
  Select,
  SelectItem,
  StyleService,
  Text,
  type ThemeType,
  useTheme,
} from '@ui-kitten/components';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {ArrowDownIcon, ArrowUpIcon, TrashIcon} from '@app/assets/Icons';
import {size} from '@app/consts/styles';

const styleProps = (theme?: ThemeType) =>
  StyleService.create({
    bodyContainer: {
      gap: size.l,
    },
    headerContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    container: {
      borderColor: theme?.['border-basic-color-3'],
      borderWidth: 1,
      borderRadius: 4,
      backgroundColor: theme?.['background-basic-color-1'],
    },
    body: {
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
    animatedView: {
      overflow: 'hidden',
    },
  });

const Footer = () => (
  <View>
    <Button status="danger" accessoryRight={TrashIcon}>
      Borrar
    </Button>
  </View>
);

const Header = ({
  handleCardOpen,
  isCardOpen,
  ...props
}: {handleCardOpen: () => void; isCardOpen: boolean} & ViewProps) => (
  <View {...props}>
    <View style={styleProps().headerContainer}>
      <Text category="h6">Maldives</Text>
      <Button
        appearance="ghost"
        status="control"
        size="small"
        onPress={handleCardOpen}
        accessoryLeft={isCardOpen ? ArrowDownIcon : ArrowUpIcon}
      />
    </View>
  </View>
);

export default function CategoryInput() {
  const theme = useTheme();
  const styles = styleProps(theme);
  const [isCardOpen, setIsCardOpen] = useState(true);
  const heightRef = useSharedValue(0);

  const handleCardOpen = () => {
    setIsCardOpen(s => !s);
  };

  const derivedHeight = useDerivedValue(() =>
    withTiming(heightRef.value * Number(isCardOpen), {
      duration: 250,
      easing: Easing.ease,
      reduceMotion: ReduceMotion.System,
    }),
  );

  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  const onHandlingLayout = (e: LayoutChangeEvent) => {
    return (heightRef.value = e.nativeEvent.layout.height);
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Header handleCardOpen={handleCardOpen} isCardOpen={isCardOpen} />
        {isCardOpen ? <Text>Working</Text> : <Text>Not working</Text>}
      </View>
      <Animated.View style={[styles.animatedView, bodyStyle]}>
        <View onLayout={onHandlingLayout} style={[styles.bodyContainer, styles.body]}>
          <Input value={''} label={'Nombre del grupo'} />
          <Select label={'Categoria'}>
            <SelectItem title={'Option 1'} />
            <SelectItem title={'Option 2'} />
            <SelectItem title={'Option 3'} />
          </Select>
          <Footer />
        </View>
      </Animated.View>
    </View>
  );
}
