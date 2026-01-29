import React, {type ReactElement, type ReactNode, useMemo, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  type TextInput,
  type TextInputProps,
} from 'react-native';

import {type ListRenderItem} from '@shopify/flash-list';
import {KeyboardController} from 'react-native-keyboard-controller';

import {useAppKeyboardContext} from '@app/components/AppKeyBoardAwareScrollView/AppKeyBoardAwareScrollView';
import {type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';

import Input from '../Input/Input';

const stylesProps = (showPopover: boolean, theme: ThemeProps) => {
  const {radius, colors, spacing} = theme;
  const styles = StyleSheet.create({
    inputContainer: {
      opacity: showPopover ? 0 : 1,
    },
    inputPopoverContainer: {
      display: showPopover ? 'flex' : 'none',
      position: 'absolute',
      width: '100%',
      zIndex: 1,
    },
    listContainer: {
      backgroundColor: colors.background,
      borderColor: colors.basicTrans_100,
      borderRadius: radius.s,
      borderWidth: 1,
      maxHeight: 200,
    },
    listItemPressable: {
      padding: spacing.l,
    },
  });
  return styles;
};

// TODO: create union type to differentiate between object data and primary type data
type AutocompleteProps<T> = {
  data: T[];
  ListEmptyComponent?: ReactElement;
  onSelectItem?: (data: T) => void;
  defaultValue?: T;
  getSelectedItemLabel: (data: T) => string;
} & TextInputProps;

type AutocompletePropsDefault<T extends string> = {
  filterOptions?: never;
  renderItem: (item: T) => ReactNode;
  customRender?: never;
};

type AutocompletePropsCustom<T extends object> = {
  filterOptions?: (data: T[], value: string) => T[];
  renderItem?: never;
  customRender: (item: T) => ReactNode;
};

type AutoProps<T> = AutocompleteProps<T> &
  (T extends object
    ? AutocompletePropsCustom<T>
    : T extends string
      ? AutocompletePropsDefault<T>
      : never);

export default function Autocomplete<T>({
  data,
  renderItem,
  ListEmptyComponent,
  onSelectItem,
  filterOptions,
  customRender,
  defaultValue,
  ...textInputProps
}: AutoProps<T>) {
  const {theme} = useAppTheme();

  const [showPopover, setShowPopover] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const popoverInputRef = useRef<TextInput>(null);
  const [value, setValue] = useState<string>('');
  const styles = stylesProps(showPopover, theme);

  const {setIsScrollEnabled} = useAppKeyboardContext();

  const _onFocus = () => {
    popoverInputRef.current?.focus();
    setShowPopover(true);
  };

  const _onBlur = () => {
    popoverInputRef.current?.blur();
    setShowPopover(false);
  };

  const onChangeText = (value: string) => {
    setValue(value);
  };

  const handleSelectedItem = (item: T) => {
    onSelectItem?.(item);
    onChangeText(item);
    KeyboardController.dismiss();
  };

  // TODO: verify if it's necessary to  check if the passed array contains objects or strings
  const handleDataFilter = useMemo(() => {
    if (!value) return data;
    if (filterOptions) return filterOptions(data, value);
    return data.filter(e => String(e).toLowerCase().includes(value));
  }, [value, data, filterOptions]);

  const pressableWrapper: ListRenderItem<T> = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleSelectedItem(item)}
        style={styles.listItemPressable}>
        {renderItem(item)}
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <Input
          {...textInputProps}
          label="moneda"
          inputRef={inputRef}
          value={value}
          testID="autocomplete_input"
          onFocus={_onFocus}
          onChangeText={onChangeText}
        />
      </View>
      <View testID="autocomplete_popover_input_container" style={styles.inputPopoverContainer}>
        <Input
          {...textInputProps}
          label="moneda"
          inputRef={popoverInputRef}
          testID="autocomplete_popover_input"
          onBlur={_onBlur}
          value={value}
          onChangeText={onChangeText}
        />
        <ScrollView
          style={styles.listContainer}
          onTouchStart={() => {
            KeyboardController.dismiss({keepFocus: true});
            setIsScrollEnabled(false);
          }}
          onTouchEnd={() => setIsScrollEnabled(true)}>
          {handleDataFilter.length
            ? handleDataFilter.map((e, i) => pressableWrapper({item: e, index: i}))
            : ListEmptyComponent}
        </ScrollView>
      </View>
    </View>
  );
}
