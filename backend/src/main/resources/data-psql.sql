INSERT INTO autoservice_manager_user (id, password, role, username)
VALUES (1, '$2a$10$FLoqjXRFCplOEu3Jst3gt.Aco1ejRRBKFm9eeknPgpGGywctah9OK', 'ROLE_ADMIN', 'admin') ON CONFLICT DO NOTHING;