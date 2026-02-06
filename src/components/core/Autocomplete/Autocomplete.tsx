import React, {type ReactElement, type ReactNode, useMemo, useRef, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View, type TextInput} from 'react-native';

import {KeyboardController} from 'react-native-keyboard-controller';

import {useAppKeyboardContext} from '@app/components/AppKeyBoardAwareScrollView/AppKeyBoardAwareScrollView';
import {type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';
import {isPrimitive} from '@app/utils/functions';

import Input, {type InputCoreProps} from '../Input/Input';

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

type BaseAutocompleteProps<T> = {
  data: T[];
  ListEmptyComponent?: ReactElement;
  onSelectItem?: (data: T) => void;
  value?: string;
  onTextChange?: (value: string) => void;
  defaultValue?: T;
};

interface PrimitiveAutocompleteProps<T> extends BaseAutocompleteProps<T> {
  customRenderItem?: (item: T) => ReactNode;
  filterOptions?: (data: T[], value: string) => T[];
  getSelectedItemLabel?: (data: T) => string;
}

interface ObjectAutocompleteProps<T> extends BaseAutocompleteProps<T> {
  customRenderItem: (item: T) => ReactNode;
  filterOptions: (data: T[], value: string) => T[];
  getSelectedItemLabel: (data: T) => string;
}

type AutocompleteProps<T> = (T extends object
  ? ObjectAutocompleteProps<T>
  : PrimitiveAutocompleteProps<T>) &
  InputCoreProps;

// TODO: Add warning hook to handle all the possible mistakes that could be product of bad data

const Autocomplete = <T,>({
  data,
  customRenderItem,
  ListEmptyComponent,
  onSelectItem,
  filterOptions,
  getSelectedItemLabel,
  defaultValue,
  ...textInputProps
}: AutocompleteProps<T>): ReactNode => {
  const {theme} = useAppTheme();

  const [showPopover, setShowPopover] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const popoverInputRef = useRef<TextInput>(null);
  const [value, setValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<T | undefined>(defaultValue);
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

  const defaultRender = (data: T) => {
    if (isPrimitive(data)) return String(data);
    return '';
  };

  const handleSelectedItem = (item: T) => {
    onSelectItem?.(item);
    onChangeText(getSelectedItemLabel?.(item) ?? defaultRender(item));
    setSelectedValue(item);
    KeyboardController.dismiss();
    setShowPopover(false);
  };

  // TODO: verify if it's necessary to  check if the passed array contains objects or strings
  const handleDataFilter = useMemo(() => {
    if (!value) return data;
    if (filterOptions && typeof data === 'object') return filterOptions(data, value);
    return data.filter(e => String(e).toLowerCase().includes(value));
  }, [value, data, filterOptions]);

  const pressableWrapper = ({item, index}: {item: T; index: number}) => {
    if (!customRenderItem && isPrimitive(item))
      return (
        <TouchableOpacity
          key={index}
          onPress={() => handleSelectedItem(item)}
          style={styles.listItemPressable}>
          {String(item)}
        </TouchableOpacity>
      );
    return (
      <TouchableOpacity key={index} onPress={() => handleSelectedItem(item)}>
        {customRenderItem?.(item)}
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <Input
          {...textInputProps}
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
};

export default Autocomplete;
