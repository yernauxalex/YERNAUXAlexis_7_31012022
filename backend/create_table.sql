
CREATE TABLE users
(
	id_user SERIAL,
	email VARCHAR(20),
	firstname VARCHAR(20),
	lastname VARCHAR(20),
	passwordh VARCHAR(255),
	last_interaction CHAR(10),
	CONSTRAINT users_pk PRIMARY KEY (id_user)
);

CREATE TABLE content
(
	id_content SERIAL,
	text_content TEXT,
	date DATE DEFAULT CURRENT_DATE,
	media BOOLEAN,
	media_content VARCHAR(255),
	id_author INTEGER,
	CONSTRAINT content_pk PRIMARY KEY (id_content),
	CONSTRAINT content_fk FOREIGN KEY (id_author) REFERENCES users (id_user)
);

CREATE TABLE comments
(
	id_comment SERIAL,
	data_comment TEXT,
	date DATE DEFAULT CURRENT_DATE,
	content_id INTEGER,
	id_author_comment INTEGER,
	CONSTRAINT comments_pk PRIMARY KEY (id_comment),
	CONSTRAINT comments_fk1 FOREIGN KEY (content_id) REFERENCES content (id_content),
	CONSTRAINT comments_fk2 FOREIGN KEY (id_author_comment) REFERENCES users (id_user)
);

-- DROP TABLE 
DELETE FROM comments;
DELETE FROM content;
DELETE FROM users;

DROP TABLE comments;
DROP TABLE content;
DROP TABLE users;
