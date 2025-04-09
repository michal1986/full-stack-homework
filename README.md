#### MICHAL DECISIONS ####

1. I decided to use API Routes and not React Server Components because:
   a) this seems to be some kind of dashboard type of app, so SEO is not needed (of course it lacks 'auth' module)
   b) app is rather simple so we won't gain THAT much with RSC, but in future I would consider changing approach

2. Instead of integration / unit tests I wrote very simple Playwright E2E tests
3. Database schema is inside docker-entrypoint-initdb.d/init.sql



#### USEFUL COMMANDS ###

start app:
docker-compose up -d
pnpm dev


stop and remove docker:
docker-compose down -v


check results for tables:

docker exec -it postgres psql -U postgres -c "SELECT * FROM grades;"
docker exec -it postgres psql -U postgres -c "SELECT * FROM numbers;"
docker exec -it postgres psql -U postgres -c "SELECT * FROM school_subjects;"


#### ORIGINAL REQUIREMENTS ####

# Alison Full Stack Developer Assessment

This technical assessment evaluates your proficiency in developing a modern full-stack web application using React, Next.js, and PostgreSQL. You will demonstrate your ability to create web application with database integration and efficient data handling.

## Project Overview

You will build a web application that demonstrates your proficiency in:

- Frontend development with React and Next.js
- Raw SQL database operations
- Data visualization
- Form handling and validation

## Technical Requirements

### Environment Setup

- Install Node.js and pnpm using [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm)
- Set up a PostgreSQL database using Docker.

```bash
docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

- Choose and implement a database connection method:
  - Direct database connection using [`postgres`](https://github.com/porsager/postgres) or any other client
  - ORM (Prisma, Drizzle, or TypeORM) for schema management and connection only
  - Connection pooling recommended for performance optimization

### Project Requirements

You will need to create a Single Page Application (SPA) with the following technical requirements:

The application should implement client-side routing with two main pages accessible via these routes:

- `/numbers` - For number pair calculations
- `/grades` - For grade management and analysis

Include a top navigation bar that provides navigation between pages

The application can utilize a modern UI component library for consistent design and enhanced user experience. While you have flexibility in choosing any UI library, [Material UI](https://mui.com/) is preferred.

For data fetching and database communication, implement one of these approaches:

- [API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) - Create RESTful endpoints in Next.js to handle client-side data fetching with proper error handling and loading states

- [React Server Components (RSC)](https://nextjs.org/docs/app/getting-started/fetching-data) - Leverage server-side rendering for optimal performance, with streaming capabilities and selective hydration

Ensure your implementation includes proper error boundaries, loading indicators, and responsive design principles regardless of your chosen approach.

#### Numbers Page

Create a form with the following:

- A number input field that accepts both positive and negative integers
- A submit button to save the number to the database

Database Schema:
Table name: "numbers"

- id: number type
- value: number type

Features:

1. Display a table showing pairs of adjacent numbers with their sums
3. Auto-refresh table when new numbers are added
4. Implement proper error handling for database operations

Example table format showing adjacent pairs and their sums:

| ID 1 | Number 1 | ID 2 | Number 2 | Sum |
| ---- | -------- | ---- | -------- | --- |
| 1    | 3        | 2    | 5        | 8   |
| 2    | 5        | 3    | 7        | 12  |
| 3    | 7        | 4    | 2        | 9   |
| 4    | 2        | 5    | -15      | -13 |
| 5    | -15      | 6    | 44       | 29  |

#### Grades Page

Create an interactive form with the following requirements:

- Class name selection via dropdown menu (restricted to Math, Science, History)
- Grade input field (numeric, with built-in validation for range 0-100)
- Submit button

Database Schema:
Table name: "grades"
Columns:

- id: number type
- class: enum type
- grade: number type

Implementation Requirements:

1. Create a data table displaying:
    - ID
   - Class name
   - Grade

2. Implement filter controls:
   - "Show All Data" - Displays complete dataset without filtering
   - "Class Averages" - Calculates and displays average grade per class
   - "Passing Average" - Shows class averages for grades > 55
   - "High Performing Classes" - Lists classes with averages > 70

❗ Each filter button should trigger a dedicated SQL query and automatically update the data displayed in the table with the query results

## Technical Constraints

- Must use **raw SQL** queries for database operations
- ORM usage is allowed only for schema creation and seeding, but all data operations must use raw SQL queries

## Bonus Points

- Unit and integration tests
- Performance optimizations
- Input validation
- Error boundary implementation

## Getting Started

1. Fork the repository
2. Clone the forked repository to your local machine
3. Install dependencies: `pnpm install`
4. Start PostgreSQL: Use the Docker command above
5. Run development server: pnpm dev
6. Access the application: <http://localhost:3000>

## Submission Guidelines

- Ensure all features are working
- Include database schema
- Document any assumptions or decisions made during development
- Push your code to your forked repository
- Notify us once you have completed the assessment
