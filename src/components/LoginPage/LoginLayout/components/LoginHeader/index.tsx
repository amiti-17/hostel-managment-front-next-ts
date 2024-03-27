import React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Typography } from '@mui/material';
import { strConstants } from 'config/system/constants/strConstants';
import { LoginPageLockIcon } from './styled/LoginPageLockIcon';

export default function LoginHeader() {
  return (
    <>
      <LoginPageLockIcon>
        <LockOutlinedIcon/>
      </LoginPageLockIcon> 
      <Typography component="h1" variant="h5">
        {strConstants.signIn}
      </Typography>
    </>
  );
}