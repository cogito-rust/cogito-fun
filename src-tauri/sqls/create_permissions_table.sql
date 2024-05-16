-- create permission table
CREATE TABLE IF NOT EXISTS permissions (
    id INIT PRIMARY KEY NOT NULL,
    code VARCHAR(20) NOT NULL,
    description VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
