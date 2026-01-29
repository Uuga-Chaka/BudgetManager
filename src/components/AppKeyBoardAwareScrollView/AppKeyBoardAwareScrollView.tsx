import React, {
  createContext,
  useRef,
  type PropsWithChildren,
  use,
  useCallback,
  useState,
} from 'react';

import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';

import {styles} from './AppKeyBoardAwareScrollView.styles';

type AppKeyboardContextProps = {
  setIsScrollEnabled: (isEnabled: boolean) => void;
};

const AppKeyboardContext = createContext<AppKeyboardContextProps | null>(null);

export default function AppKeyBoardAwareScrollView({children}: PropsWithChildren) {
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const setIsScrollEnabled = useCallback((_scrollEnabled: boolean) => {
    setScrollEnabled(_scrollEnabled);
  }, []);

  return (
    <AppKeyboardContext value={{setIsScrollEnabled}}>
      <KeyboardAwareScrollView
        bottomOffset={50}
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {children}
      </KeyboardAwareScrollView>
    </AppKeyboardContext>
  );
}

export const useAppKeyboardContext = () => {
  const context = use(AppKeyboardContext);
  if (!context)
    throw new Error(
      '[useAppKeyboardContext.tsx] must be used inside AppKeyboardAwareScrollView component',
    );

  return context;
};
