'use client';

import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { NumberForm } from '../components/NumberForm';
import NumbersTable from '../components/NumbersTable';

interface Number {
  id: number;
  value: number;
}

export default function NumbersPage() {
  const [numbers, setNumbers] = useState<Number[]>([]);

  useEffect(() => {
    fetchNumbers();
  }, []);

  const fetchNumbers = async () => {
    try {
      const response = await fetch('/api/numbers');
      const data = await response.json();
      setNumbers(data);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  const handleAddNumber = async (value: number) => {
    try {
      const response = await fetch('/api/numbers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
      });

      if (response.ok) {
        fetchNumbers();
      }
    } catch (error) {
      console.error('Error adding number:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Numbers
      </Typography>
      <NumberForm onSubmit={handleAddNumber} />
      <NumbersTable numbers={numbers} />
    </Box>
  );
} 