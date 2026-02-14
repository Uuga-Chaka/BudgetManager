import {Controller, type FieldValues, type UseControllerProps} from 'react-hook-form';

import {formatCurrency} from '@app/utils/currency';

import Input, {type InputCoreProps} from '../core/Input/Input';

export const MoneyInputForm = <T extends FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  disabled,
  shouldUnregister,
  inputStyle,
  containerStyle,
  disableErrorMsg,
  countryCode,
  ...props
}: UseControllerProps<T> & InputCoreProps & {disableErrorMsg?: boolean; countryCode: string}) => {
  const handleMoney = (text: string, onChange: (value: number) => void) => {
    if (!text) {
      onChange(0);
      return;
    }
    const {numericValue} = formatCurrency({value: text, currency: countryCode});
    onChange(numericValue);
  };

  const parseToMoney = (value: string) => {
    const {formatted} = formatCurrency({value, currency: countryCode});
    return formatted;
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
            value={parseToMoney(String(value))}
            onChangeText={text => handleMoney(text, onChange)}
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
