USE `yeeplus_backend`;

INSERT INTO role(name) VALUES('ROLE_ADMIN');
INSERT INTO role(name) VALUES('ROLE_USER');

INSERT INTO user VALUES(1, '2018-06-13 14:20:55', '2018-06-13 14:20:55', '/', 'admin@gmail.com', 'admin', '$2a$10$0bPiQvp4O1K9B6tvA4eyFuNKLtv8hKlflro4vePalgQhhFwWtYHEi', 'admin');
INSERT INTO user VALUES(2, '2018-06-13 14:20:56', '2018-06-13 14:20:56', '/', 'wayne@gmail.com', 'wayne', '$2a$10$0bPiQvp4O1K9B6tvA4eyFuNKLtv8hKlflro4vePalgQhhFwWtYHEi', 'wayne');

INSERT INTO user_role VALUES(1, 1);
INSERT INTO user_role VALUES(2, 2);

INSERT INTO forum VALUES(1, 'Announcement', 'announcement');
INSERT INTO forum VALUES(2, 'General', 'general');
INSERT INTO forum VALUES(3, 'Feedback', 'feedback');
