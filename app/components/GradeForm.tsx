'use client';

import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Alert,
  Snackbar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

interface GradeFormProps {
  onSubmit: (className: string, grade: number) => void;
}

export function GradeForm({ onSubmit }: GradeFormProps) {
  const [selectedClass, setSelectedClass] = useState('');
  const [grade, setGrade] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const classes = ['MATH', 'SCIENCE', 'HISTORY'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedClass) {
      setError('Please select a class');
      return;
    }

    const gradeNum = parseFloat(grade);
    if (isNaN(gradeNum) || gradeNum < 1 || gradeNum > 6) {
      setError('Grade must be between 1 and 6');
      return;
    }

    // Round to nearest 0.5
    const roundedGrade = Math.round(gradeNum * 2) / 2;
    if (roundedGrade !== gradeNum) {
      setError('Grade must be a whole number or .5 (e.g., 1, 1.5, 2, 2.5, etc.)');
      return;
    }

    onSubmit(selectedClass, roundedGrade);
    setSelectedClass('');
    setGrade('');
    setShowSuccess(true);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        select
        label="Class"
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
        sx={{ width: 200, mr: 2 }}
        error={!!error && !selectedClass}
      >
        {classes.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Grade"
        type="number"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        inputProps={{ 
          min: 1, 
          max: 6, 
          step: 0.5,
          pattern: '^[1-6](\.5)?$'
        }}
        sx={{ width: 200, mr: 2 }}
        error={!!error && (!grade || parseFloat(grade) < 1 || parseFloat(grade) > 6)}
        helperText={error || "Enter a grade between 1 and 6 (whole numbers or .5)"}
      />

      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        disabled={!selectedClass || !grade}
      >
        Add Grade
      </Button>
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Grade added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
} 