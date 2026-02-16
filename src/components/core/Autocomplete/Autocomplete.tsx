import {type ReactElement, type ReactNode, useEffect, useMemo, useRef, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View, type TextInput} from 'react-native';

import {KeyboardController} from 'react-native-keyboard-controller';

import {useAppKeyboardContext} from '@app/components/AppKeyBoardAwareScrollView/AppKeyBoardAwareScrollView';
import {type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';
import {isPrimitive} from '@app/utils/functions';

import Input, {type InputCoreProps} from '../Input/Input';
import TouchableInput from '../TouchableInput/TouchableInput';

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
      zIndex: 99999,
    },
    listContainer: {
      backgroundColor: colors.background,
      borderColor: colors.basicTrans_100,
      borderRadius: radius.s,
      borderWidth: 1,
      maxHeight: 200,
      zIndex: 99999,
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
  defaultSelection?: T;
  filterOptions?: (data: T[], value: string) => T[];
  disableFilter?: boolean;
};

interface PrimitiveAutocompleteProps<T> extends BaseAutocompleteProps<T> {
  customRenderItem?: (item: T) => ReactNode;
  getSelectedItemLabel?: (data: T) => string;
}

interface ObjectAutocompleteProps<T> extends BaseAutocompleteProps<T> {
  customRenderItem: (item: T) => ReactNode;
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
  defaultSelection,
  disableFilter,
  ...textInputProps
}: AutocompleteProps<T>): ReactNode => {
  const {theme} = useAppTheme();

  const derivedLabel = useMemo(() => {
    return defaultSelection ? getSelectedItemLabel?.(defaultSelection) : '';
  }, [defaultSelection, getSelectedItemLabel]);

  const [showPopover, setShowPopover] = useState(false);
  const popoverInputRef = useRef<TextInput>(null);
  const [value, setValue] = useState<string>(derivedLabel ?? '');
  const styles = stylesProps(showPopover, theme);

  const {setIsScrollEnabled} = useAppKeyboardContext();

  const _onBlur = () => {
    // popoverInputRef.current?.blur();
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
    KeyboardController.dismiss();
    setShowPopover(false);
  };

  useEffect(() => {
    if (showPopover) {
      const timer = setTimeout(() => {
        popoverInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [showPopover]);

  const handleDataFilter = useMemo(() => {
    if (!value || disableFilter) return data;
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
      <View style={styles.inputContainer} pointerEvents={showPopover ? 'none' : 'auto'}>
        <TouchableInput
          label={textInputProps.label}
          value={value}
          placeholder={textInputProps.placeholder}
          onPress={() => setShowPopover(true)}
        />
      </View>
      <View testID="autocomplete_popover_input_container" style={styles.inputPopoverContainer}>
        <Input
          {...textInputProps}
          inputRef={popoverInputRef}
          testID={`autocomplete_popover_input_${textInputProps.label}`}
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
