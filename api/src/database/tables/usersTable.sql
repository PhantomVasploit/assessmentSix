USE assessment_six

CREATE TABLE usersTable(
    id INT IDENTITY(1, 1) PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(MAX) NOT NULL,
    cohort_number INT NOT NULL
)