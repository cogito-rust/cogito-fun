-- create role-permissions table
CREATE TABLE IF NOT EXISTS role_permissions (
    id INT PRIMARY KEY NOT NULL,
    role_id INT NOT NULL REFERENCES roles(id),
    permission_id INT NOT NULL REFERENCES permissions(id)
);