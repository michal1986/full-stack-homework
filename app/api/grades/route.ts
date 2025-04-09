import { NextResponse } from 'next/server';
import sql from '@/lib/db';

// GET all grads from the databse
export async function GET() {
  try {
    const result = await sql`
      SELECT id, class, grade
      FROM grades
      ORDER BY id DESC
    `;
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching grades:', error);
    return NextResponse.json({ error: 'Failed to fetch grades' }, { status: 500 });
  }
}

// POST a new grad to the databse
export async function POST(request: Request) {
  try {
    const { class: className, grade } = await request.json();

    // Validate input
    if (!className || !grade) {
      return NextResponse.json(
        { error: 'Class and grade are required' },
        { status: 400 }
      );
    }

    if (grade < 1 || grade > 6) {
      return NextResponse.json(
        { error: 'Grade must be between 1 and 6' },
        { status: 400 }
      );
    }

    // Validate that grade is a whole number or .5
    const roundedGrade = Math.round(grade * 2) / 2;
    if (roundedGrade !== grade) {
      return NextResponse.json(
        { error: 'Grade must be a whole number or .5 (e.g., 1, 1.5, 2, 2.5, etc.)' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO grades (class, grade)
      VALUES (${className}, ${grade})
      RETURNING id, class, grade
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error adding grade:', error);
    return NextResponse.json(
      { error: 'Failed to add grade' },
      { status: 500 }
    );
  }
}

// PUT update a grad in the databse
export async function PUT(request: Request) {
  try {
    const { id, class: classType, grade } = await request.json();
    
    if (typeof id !== 'number' || !['A', 'B', 'C', 'D', 'E'].includes(classType) || typeof grade !== 'number') {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    const [updatedGrade] = await sql`
      UPDATE grades
      SET class = ${classType}, grade = ${grade}
      WHERE id = ${id}
      RETURNING *
    `;

    if (!updatedGrade) {
      return NextResponse.json({ error: 'Grade not found' }, { status: 404 });
    }

    return NextResponse.json(updatedGrade);
  } catch (error) {
    console.error('Error updating grade:', error);
    return NextResponse.json({ error: 'Failed to update grade' }, { status: 500 });
  }
}

// DELETE a grad from the databse
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    if (typeof id !== 'number') {
      return NextResponse.json({ error: 'ID must be a number' }, { status: 400 });
    }

    const [deletedGrade] = await sql`
      DELETE FROM grades
      WHERE id = ${id}
      RETURNING *
    `;

    if (!deletedGrade) {
      return NextResponse.json({ error: 'Grade not found' }, { status: 404 });
    }

    return NextResponse.json(deletedGrade);
  } catch (error) {
    console.error('Error deleting grade:', error);
    return NextResponse.json({ error: 'Failed to delete grade' }, { status: 500 });
  }
} 