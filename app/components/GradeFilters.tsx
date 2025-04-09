'use client';

import { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';

interface GradeFiltersProps {
  onFilterChange: (filter: 'all' | 'averages' | 'passing' | 'highPerforming') => void;
}

export function GradeFilters({ onFilterChange }: GradeFiltersProps) {
  const [filter, setFilter] = useState<'all' | 'averages' | 'passing' | 'highPerforming'>('all');

  const handleFilterChange = (newFilter: 'all' | 'averages' | 'passing' | 'highPerforming') => {
    setFilter(newFilter);
    onFilterChange(newFilter);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <ButtonGroup variant="contained">
        <Button
          color={filter === 'all' ? 'primary' : 'inherit'}
          onClick={() => handleFilterChange('all')}
        >
          Show All Data
        </Button>
        <Button
          color={filter === 'averages' ? 'primary' : 'inherit'}
          onClick={() => handleFilterChange('averages')}
        >
          Class Averages
        </Button>
        <Button
          color={filter === 'passing' ? 'primary' : 'inherit'}
          onClick={() => handleFilterChange('passing')}
        >
          Passing Average
        </Button>
        <Button
          color={filter === 'highPerforming' ? 'primary' : 'inherit'}
          onClick={() => handleFilterChange('highPerforming')}
        >
          High Performing
        </Button>
      </ButtonGroup>
    </div>
  );
} 