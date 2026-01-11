import React, {type PropsWithChildren} from 'react';

import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';

import {styles} from './AppKeyBoardAwareScrollView.styles';

export default function AppKeyBoardAwareScrollView({children}: PropsWithChildren) {
  return (
    <KeyboardAwareScrollView
      bottomOffset={50}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}>
      {children}
    </KeyboardAwareScrollView>
  );
}
