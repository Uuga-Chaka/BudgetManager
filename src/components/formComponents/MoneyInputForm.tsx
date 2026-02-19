import {
  Controller,
  type Noop,
  type FieldValues,
  type UseControllerProps,
  type FieldPath,
} from 'react-hook-form';

import {formatCurrency} from '@app/utils/currency';

import Input, {type InputCoreProps} from '../core/Input/Input';

export const MoneyInputForm = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  name,
  control,
  rules,
  defaultValue,
  disabled,
  shouldUnregister,
  inputStyle,
  containerStyle,
  disableErrorMsg,
  // TODO: add to formatCurrency countryCode,
  ...props
}: UseControllerProps<TFieldValues, TName, TTransformedValues> &
  InputCoreProps & {disableErrorMsg?: boolean; countryCode: string}) => {
  const _onFocus = (value: string, onChange: (...event: unknown[]) => void) => {
    onChange(String(value));
  };

  const _onBlur = (value: string, onBlur: Noop, onChange: (...event: unknown[]) => void) => {
    const {formatted} = formatCurrency({value});
    onChange(formatted);
    onBlur();
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      disabled={disabled}
      shouldUnregister={shouldUnregister}
      render={({field: {onChange, value, onBlur, ...fieldRest}, fieldState: {error}}) => {
        return (
          <Input
            {...fieldRest}
            value={String(value)}
            onFocus={() => _onFocus(value, onChange)}
            onChangeText={onChange}
            onBlur={() => _onBlur(value, onBlur, onChange)}
            {...props}
            containerStyle={containerStyle}
            textInputStyle={inputStyle}
            // TODO: Implement disabled state
            // disabled={disabled}
            errorMessage={disableErrorMsg ? undefined : error?.message}
            // TODO: Implement isInvalid state
            // isInvalid={!!error}
          />
        );
      }}
    />
  );
};
