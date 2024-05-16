-- create user table
CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY NOT NULL,
    username TEXT NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    avatar VARCHAR(100),
    mobile VARCHAR(20),
    is_admin TINYINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);