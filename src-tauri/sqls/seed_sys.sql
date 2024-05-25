-- user data
INSERT INTO user(id, username, password, email, avatar, mobile, is_admin)
VALUES (1, 'root', '123456', null, null, 18520874175, 1);

INSERT INTO user(id, username, password, email, avatar, mobile, is_admin)
VALUES (2, 'sudo', '123456', null, null, null, 1);

INSERT INTO user(id, username, password, email, avatar, mobile, is_admin)
VALUES (3, 'cogito', '123456', null, null, null, 0);


INSERT INTO user(id, username, password, email, avatar, mobile, is_admin)
VALUES (4, 'guest', '123456', null, null, null, 0);

-- roles data
INSERT INTO roles(id, name)
VALUES (1, 'root');

INSERT INTO roles(id, name)
VALUES (2, 'sudo');

INSERT INTO roles(id, name)
VALUES (3, 'admin');

INSERT INTO roles(id, name)
VALUES (4, 'user');

-- permission data
INSERT INTO permissions(id, code, description)
VALUES (1, "app:all", "manage all applications");

INSERT INTO permissions(id, code, description)
VALUES (2, "app:ai", "manage all ai applications");

INSERT INTO permissions(id, code, description)
VALUES (3, "app:tools", "manage all tools applications");

INSERT INTO permissions(id, code, description)
VALUES (4, "app:tools:JsonActor", "manage JsonActor tool application");

-- user_roles data
INSERT INTO user_roles(id, user_id, role_id)
VALUES (1, 1, 1);

INSERT INTO user_roles(id, user_id, role_id)
VALUES (2, 2, 2);

INSERT INTO user_roles(id, user_id, role_id)
VALUES (3, 3, 3);

INSERT INTO user_roles(id, user_id, role_id)
VALUES (4, 4, 4);

-- role_permissions data
INSERT INTO role_permissions(id, role_id, permission_id)
VALUES (1, 1, 1);

INSERT INTO role_permissions(id, role_id, permission_id)
VALUES (2, 1, 2);

INSERT INTO role_permissions(id, role_id, permission_id)
VALUES (3, 3, 3);

INSERT INTO role_permissions(id, role_id, permission_id)
VALUES (4, 4, 4);