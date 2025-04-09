'use client';

import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface NumberFormProps {
  onSubmit: (value: number) => void;
}

export function NumberForm({ onSubmit }: NumberFormProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(value);
    
    if (isNaN(num)) {
      setError('Please enter a valid number');
      return;
    }
    
    if (num < 1 || num > 100) {
      setError('Number must be between 1 and 100');
      return;
    }
    
    onSubmit(num);
    setValue('');
    setError('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
      <TextField
        label="Enter a number"
        variant="outlined"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setError('');
        }}
        error={!!error}
        helperText={error}
        sx={{ width: 300, mr: 2 }}
      />
      <Button 
        type="submit" 
        variant="contained" 
        disabled={!value}
        sx={{ height: '56px' }}
      >
        Add Number
      </Button>
    </Box>
  );
} 