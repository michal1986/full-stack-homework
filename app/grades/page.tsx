'use client';

import { useState, useEffect } from 'react';
import { GradesTable } from '../components/GradesTable';
import { GradeFilters } from '../components/GradeFilters';
import { GradeForm } from '../components/GradeForm';
import { Grade, AverageGrade } from '../types/grades';

export default function GradesPage() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [averageGrades, setAverageGrades] = useState<AverageGrade[]>([]);
  const [filter, setFilter] = useState<'all' | 'averages' | 'passing' | 'highPerforming'>('all');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [gradesResponse, averagesResponse] = await Promise.all([
        fetch('/api/grades'),
        fetch(`/api/grades/averages?filter=${filter}`)
      ]);
      
      const gradesData = await gradesResponse.json();
      const averagesData = await averagesResponse.json();
      
      setGrades(gradesData);
      setAverageGrades(averagesData);
    } catch (error) {
      console.error('Error fetching grades:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  const handleFilterChange = (newFilter: 'all' | 'averages' | 'passing' | 'highPerforming') => {
    setFilter(newFilter);
  };

  const handleGradeSubmit = async (className: string, grade: number) => {
    try {
      const response = await fetch('/api/grades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ class: className, grade }),
      });

      if (!response.ok) {
        throw new Error('Failed to add grade');
      }

      // Refresh the data after adding a new grade
      await fetchData();
    } catch (error) {
      console.error('Error adding grade:', error);
    }
  };

  if (loading) {
    return <div>Loading grades...</div>;
  }

  return (
    <div>
      <h1>Grades</h1>
      <GradeForm onSubmit={handleGradeSubmit} />
      <GradeFilters onFilterChange={handleFilterChange} />
      <GradesTable
        data={filter === 'all' ? grades : averageGrades}
        viewMode={filter === 'all' ? 'all' : 'averages'}
      />
    </div>
  );
} 