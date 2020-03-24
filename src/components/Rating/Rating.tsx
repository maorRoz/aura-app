import React from 'react';
import BaseRating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

export type RatingProps = {
  value: number;
  onChange: (newValue: number) => void;
  label?: string;
};

export const Rating = ({ value, onChange, label }: RatingProps) => (
  <>
    {label && <Typography component="legend">{label}</Typography>}
    <BaseRating
      name="rating"
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue ?? 1);
      }}
    />
  </>
);
