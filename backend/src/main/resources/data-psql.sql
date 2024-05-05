create table IF NOT EXISTS autoservice_manager_user
(
    id       bigserial
        primary key,
    password varchar(255),
    role     varchar(255)
        constraint autoservice_manager_user_role_check
            check ((role)::text = 'ROLE_ADMIN'::text),
    username varchar(255)
);

INSERT INTO autoservice_manager_user (id, password, role, username)
VALUES (1, '$2a$10$FLoqjXRFCplOEu3Jst3gt.Aco1ejRRBKFm9eeknPgpGGywctah9OK', 'ROLE_ADMIN', 'admin') ON CONFLICT DO NOTHING;