-- create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
    id INT PRIMARY KEY NOT NULL,
    user_id INIT NOT NULL REFERENCES users(id),
    role_id INT NOT NULL REFERENCES roles(id)
);