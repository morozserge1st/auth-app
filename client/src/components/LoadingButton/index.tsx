import React, { FC } from 'react';
import { Button, ButtonProps, CircularProgress } from '@material-ui/core';

type Props = ButtonProps & {
  loading: boolean;
};

const LoadingButton: FC<Props> = ({ children, loading, disabled, ...props }) => {
  return (
    <Button {...props} disabled={disabled || loading}>
      {loading ? <CircularProgress size={20} /> : children}
    </Button>
  );
};

export default LoadingButton;
