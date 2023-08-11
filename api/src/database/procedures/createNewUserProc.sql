USE assessment_six;
GO

CREATE PROCEDURE createNewUserProc(@first_name VARCHAR(255), @last_name VARCHAR(255), @email VARCHAR(255), @password VARCHAR(MAX), @cohort_number INT)
AS
BEGIN
    INSERT INTO usersTable(first_name, last_name, email, password, cohort_number)
    VALUES (@first_name, @last_name, @email, @password, @cohort_number)
END