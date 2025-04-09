import { NextResponse } from 'next/server';
import sql from '@/lib/db';

// GET all numbrs from the databse
export async function GET() {
  try {
    const numbers = await sql`
      SELECT * FROM numbers
      ORDER BY id ASC
    `;
    return NextResponse.json(numbers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch numbers' }, { status: 500 });
  }
}

// POST a new numbr to the databse
export async function POST(request: Request) {
  try {
    const { value } = await request.json();
    
    if (typeof value !== 'number') {
      return NextResponse.json({ error: 'Value must be a number' }, { status: 400 });
    }

    const [newNumber] = await sql`
      INSERT INTO numbers (value)
      VALUES (${value})
      RETURNING *
    `;

    return NextResponse.json(newNumber, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create number' }, { status: 500 });
  }
}

// PUT update a number in the databaase
export async function PUT(request: Request) {
  try {
    const { id, value } = await request.json();
    
    if (typeof id !== 'number' || typeof value !== 'number') {
      return NextResponse.json({ error: 'ID and value must be numbers' }, { status: 400 });
    }

    const [updatedNumber] = await sql`
      UPDATE numbers
      SET value = ${value}
      WHERE id = ${id}
      RETURNING *
    `;

    if (!updatedNumber) {
      return NextResponse.json({ error: 'Number not found' }, { status: 404 });
    }

    return NextResponse.json(updatedNumber);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update number' }, { status: 500 });
  }
}

// DELETE a number
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    if (typeof id !== 'number') {
      return NextResponse.json({ error: 'ID must be a number' }, { status: 400 });
    }

    const [deletedNumber] = await sql`
      DELETE FROM numbers
      WHERE id = ${id}
      RETURNING *
    `;

    if (!deletedNumber) {
      return NextResponse.json({ error: 'Number not found' }, { status: 404 });
    }

    return NextResponse.json(deletedNumber);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete number' }, { status: 500 });
  }
} 