import { ChangeEvent, FocusEvent } from "react";
import { LoginTextField } from "./styled/LoginTextField";

type RequiredTextFieldType = {
  id: string,
    label: string,
    name?: string,
    autoComplete: string,
    autoFocus?: boolean,
    type?: string,
    error?: boolean,
    onChange: { (e: ChangeEvent<any>): void; <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any> ? void : (e: string | ChangeEvent<any>) => void; },
    onBlur: { (e: FocusEvent<any, Element>): void; <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void; },
    value: {},
    errorText?: string,
}

export function RequiredTextField(props: RequiredTextFieldType) {

  const {
    id,
    label,
    name,
    autoComplete,
    autoFocus,
    type,
    error,
    onChange,
    onBlur,
    value,
    errorText
  } = props;
  
  return (
    <LoginTextField
      margin="normal"
      required
      fullWidth
      id={id}
      label={label}
      name={name ?? id}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      value={value}
      error={error}
      helperText= {error ? errorText ? errorText : 'Incorrect entry. Failed validation.' : ''}
      type={type ? type : 'text'}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}