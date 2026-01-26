import React, {type ReactElement, useRef, useState} from 'react';
import {View, type TextInput, type TextInputProps} from 'react-native';

import {FlashList, type ListRenderItem} from '@shopify/flash-list';

import {useAppTheme} from '@app/theme/useAppTheme';

import Input from '../Input/Input';

type AutocompleteProps<T> = {
  data: T[];
  renderItem: ListRenderItem<T>;
  ListEmptyComponent?: ReactElement;
} & TextInputProps;

export default function Autocomplete<T>({
  data,
  renderItem,
  ListEmptyComponent,
  ...textInputProps
}: AutocompleteProps<T>) {
  const {
    theme: {radius},
  } = useAppTheme();
  const [showPopover, setShowPopover] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const popoverInputRef = useRef<TextInput>(null);
  const [value, setValue] = useState('');

  const _onFocus = () => {
    popoverInputRef.current?.focus();
    setShowPopover(true);
  };

  const _onBlur = () => {
    popoverInputRef.current?.blur();
    setShowPopover(false);
  };

  return (
    <>
      <View>
        <Input
          {...textInputProps}
          label="moneda"
          inputRef={inputRef}
          value={value}
          testID="autocomplete_input"
          onFocus={_onFocus}
          onChangeText={setValue}
        />
        <View
          testID="autocomplete_popover_input_container"
          style={{
            display: showPopover ? undefined : 'none',
            position: 'absolute',
            width: '100%',
            zIndex: 1,
          }}>
          <Input
            {...textInputProps}
            label="moneda"
            inputRef={popoverInputRef}
            testID="autocomplete_popover_input"
            onBlur={_onBlur}
          />
          <View style={{backgroundColor: 'white', padding: 12, borderRadius: radius.s}}>
            <FlashList
              data={data || []}
              renderItem={renderItem}
              ListEmptyComponent={ListEmptyComponent}
            />
          </View>
        </View>
      </View>
    </>
  );
}
