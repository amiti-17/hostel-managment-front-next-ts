import React from 'react';
import LoginHeader from './components/LoginHeader';
import { LoginLayoutBox } from './styled/LoginLayoutBox';

export default function LoginLayout({ children } : { children: React.ReactNode }): JSX.Element {
  return (
    <LoginLayoutBox>
      <LoginHeader />
      {children}
    </LoginLayoutBox>
  );
}