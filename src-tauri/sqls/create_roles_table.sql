-- create roles table
CREATE TABLE IF NOT EXISTS roles (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL UNIQUE
);
