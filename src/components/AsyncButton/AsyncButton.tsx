import React, { ReactNode, CSSProperties, MouseEvent } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

export const ButtonCircularProgress = () => (
  <CircularProgress
    color="inherit"
    size={24}
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: '-12px',
      marginLeft: '-12px'
    }}
  />
);

export type AsyncButtonProps = {
  style?: CSSProperties;
  onClick: (e: MouseEvent<HTMLElement>) => void;
  busy?: boolean;
  disabled?: boolean;
  children: ReactNode;
};

export const AsyncButton = ({
  onClick,
  style,
  busy,
  disabled,
  children
}: AsyncButtonProps) => (
  <Button
    style={style}
    variant="contained"
    color="primary"
    disabled={disabled}
    onClick={onClick}
  >
    {busy && <ButtonCircularProgress />}
    <span style={{ visibility: busy ? 'hidden' : 'visible' }}>{children}</span>
  </Button>
);
