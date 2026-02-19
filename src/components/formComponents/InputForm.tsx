import {
  Controller,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

import Input, {type InputCoreProps} from '../core/Input/Input';

export const InputForm = <
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
  ...props
}: UseControllerProps<TFieldValues, TName, TTransformedValues> &
  InputCoreProps & {disableErrorMsg?: boolean}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      disabled={disabled}
      shouldUnregister={shouldUnregister}
      render={({field: {onChange, ...fieldRest}, fieldState: {error}}) => {
        return (
          <Input
            {...fieldRest}
            onChangeText={onChange}
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
