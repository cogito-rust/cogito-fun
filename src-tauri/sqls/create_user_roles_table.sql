-- create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
    id INT PRIMARY KEY NOT NULL,
    user_id INT NOT NULL REFERENCES user(id),
    role_id INT NOT NULL REFERENCES roles(id),
);