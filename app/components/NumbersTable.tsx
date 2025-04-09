'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  keyframes,
  Box,
} from '@mui/material';
import { ANIMATION_CONFIG } from '../config/animation';

interface Number {
  id: number;
  value: number;
}

interface NumbersTableProps {
  numbers: Number[];
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function NumbersTable({ numbers }: NumbersTableProps) {
  if (numbers.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        No numbers added yet. Add some numbers to see them in pairs!
      </Typography>
    );
  }

  // Create pairs of adjacent numbers
  const pairs = [];
  for (let i = 0; i < numbers.length - 1; i++) {
    pairs.push({
      id1: numbers[i].id,
      value1: numbers[i].value,
      id2: numbers[i + 1].id,
      value2: numbers[i + 1].value,
      sum: numbers[i].value + numbers[i + 1].value
    });
  }

  return (
    <Box sx={{ mt: 3 }}>
      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          '& .MuiTableCell-root': {
            py: 1.5,
          }
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ 
              backgroundColor: 'primary.main',
              '& .MuiTableCell-head': {
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem',
              }
            }}>
              <TableCell>ID 1</TableCell>
              <TableCell>Number 1</TableCell>
              <TableCell>ID 2</TableCell>
              <TableCell>Number 2</TableCell>
              <TableCell>Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pairs.map((pair, index) => (
              <TableRow
                key={`${pair.id1}-${pair.id2}`}
                sx={{
                  animation: `${fadeIn} ${ANIMATION_CONFIG.duration}s ease-out forwards`,
                  animationDelay: `${index * ANIMATION_CONFIG.delay}s`,
                  opacity: 0,
                  '&:nth-of-type(odd)': {
                    backgroundColor: 'action.hover',
                  },
                  '&:hover': {
                    backgroundColor: 'action.selected',
                  },
                  '& .MuiTableCell-body': {
                    fontSize: '0.95rem',
                  }
                }}
              >
                <TableCell>{pair.id1}</TableCell>
                <TableCell>{pair.value1}</TableCell>
                <TableCell>{pair.id2}</TableCell>
                <TableCell>{pair.value2}</TableCell>
                <TableCell sx={{ 
                  fontWeight: 'bold',
                  color: 'primary.main'
                }}>{pair.sum}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 