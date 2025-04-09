import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const filter = url.searchParams.get('filter');

    let query;
    if (filter === 'passing') {
      // Show all classes, but only include grades > 3.3 (equivalent to 55 on 1-6 scale)
      query = sql`
        WITH passing_grades AS (
          SELECT class, grade
          FROM grades
          WHERE grade > 3.3
        )
        SELECT g.class, 
               COALESCE(AVG(pg.grade), 0) as average
        FROM (SELECT DISTINCT class FROM grades) g
        LEFT JOIN passing_grades pg ON g.class = pg.class
        GROUP BY g.class
        ORDER BY g.class
      `;
    } else if (filter === 'highPerforming') {
      // Show only classes where the average grade is > 4.2 (equivalent to 70 on 1-6 scale)
      query = sql`
        WITH class_averages AS (
          SELECT class, AVG(grade) as average
          FROM grades
          GROUP BY class
        )
        SELECT class, average
        FROM class_averages
        WHERE average > 4.2
        ORDER BY class
      `;
    } else {
      // Calculate averages for all grades
      query = sql`
        SELECT class, AVG(grade) as average
        FROM grades
        GROUP BY class
        ORDER BY class
      `;
    }

    const result = await query;
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching grade averages:', error);
    return NextResponse.json({ error: 'Failed to fetch grade averages' }, { status: 500 });
  }
} 