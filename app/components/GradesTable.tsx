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
import { Grade, AverageGrade } from '../types/grades';

interface GradesTableProps {
  data: Grade[] | AverageGrade[];
  viewMode: 'all' | 'averages';
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

export function GradesTable({ data, viewMode }: GradesTableProps) {
  if (data.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        No grades available.
      </Typography>
    );
  }

  const formatAverage = (value: number | string) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return num.toFixed(2);
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 5) return 'success.main';
    if (grade >= 4) return 'info.main';
    if (grade >= 3) return 'warning.main';
    return 'error.main';
  };

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
              {viewMode === 'all' ? (
                <>
                  <TableCell>ID</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Grade</TableCell>
                </>
              ) : (
                <>
                  <TableCell>Subject</TableCell>
                  <TableCell>Average Grade</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={viewMode === 'all' ? (item as Grade).id : (item as AverageGrade).class}
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
                {viewMode === 'all' ? (
                  <>
                    <TableCell>{(item as Grade).id}</TableCell>
                    <TableCell>{(item as Grade).class}</TableCell>
                    <TableCell sx={{ 
                      fontWeight: 'bold',
                      color: getGradeColor((item as Grade).grade)
                    }}>
                      {(item as Grade).grade}
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{(item as AverageGrade).class}</TableCell>
                    <TableCell sx={{ 
                      fontWeight: 'bold',
                      color: getGradeColor(Number((item as AverageGrade).average))
                    }}>
                      {formatAverage((item as AverageGrade).average)}
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 