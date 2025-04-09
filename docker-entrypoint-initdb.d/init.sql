CREATE TABLE numbers (
    id SERIAL PRIMARY KEY,
    value INTEGER NOT NULL
);

CREATE TABLE school_subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    enabled BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE grades (
    id SERIAL PRIMARY KEY,
    class VARCHAR(100) NOT NULL,
    grade INTEGER NOT NULL CHECK (grade >= 1 AND grade <= 6),
    FOREIGN KEY (class) REFERENCES school_subjects(name)
);

INSERT INTO school_subjects (name, enabled) VALUES
    ('MATH', true),
    ('SCIENCE', true),
    ('HISTORY', true);

INSERT INTO numbers (value) VALUES
    (10),
    (20),
    (30),
    (40),
    (50);

-- MATH: High performing class
INSERT INTO grades (class, grade) VALUES
    ('MATH', 6),
    ('MATH', 6),
    ('MATH', 4),
    ('MATH', 6),
    ('MATH', 3),
    ('MATH', 6),
    ('MATH', 4),
    ('MATH', 6),
    ('MATH', 5),
    ('MATH', 6);

-- SCIENCE: Passing performance
INSERT INTO grades (class, grade) VALUES
    ('SCIENCE', 4),
    ('SCIENCE', 3),
    ('SCIENCE', 3),
    ('SCIENCE', 5),
    ('SCIENCE', 4),
    ('SCIENCE', 2),
    ('SCIENCE', 4),
    ('SCIENCE', 1),
    ('SCIENCE', 4),
    ('SCIENCE', 5);

-- HISTORY: Below passing
INSERT INTO grades (class, grade) VALUES
    ('HISTORY', 4),
    ('HISTORY', 3),
    ('HISTORY', 3),
    ('HISTORY', 2),
    ('HISTORY', 3),
    ('HISTORY', 1),
    ('HISTORY', 3),
    ('HISTORY', 5),
    ('HISTORY', 6),
    ('HISTORY', 3);