CREATE TABLE IF NOT EXISTS grades (
  id SERIAL PRIMARY KEY,
  class VARCHAR(50) NOT NULL,
  grade INTEGER NOT NULL CHECK (grade >= 0 AND grade <= 100)
);

-- Insert some sample data
INSERT INTO grades (class, grade) VALUES
  ('Math', 85),
  ('Science', 92),
  ('History', 78),
  ('Math', 88),
  ('Science', 95),
  ('History', 82)
ON CONFLICT DO NOTHING; 