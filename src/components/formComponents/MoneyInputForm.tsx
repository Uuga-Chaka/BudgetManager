import {
  Controller,
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
  const _onChange = (value: string, onChange: (...event: unknown[]) => void) => {
    const {formatted} = formatCurrency({value});
    onChange(formatted);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      disabled={disabled}
      shouldUnregister={shouldUnregister}
      render={({field: {onChange, value, ...fieldRest}, fieldState: {error}}) => {
        return (
          <Input
            {...fieldRest}
            value={value}
            onChangeText={text => _onChange(text, onChange)}
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
