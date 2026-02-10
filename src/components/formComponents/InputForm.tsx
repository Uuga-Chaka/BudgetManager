import {Controller, type FieldValues, type UseControllerProps} from 'react-hook-form';

import Input, {type InputCoreProps} from '../core/Input/Input';

export const InputForm = <T extends FieldValues>({
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
}: UseControllerProps<T> & InputCoreProps & {disableErrorMsg?: boolean}) => {
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
