-- A copier dans le terminal de PostrgreSQL pour créer la db ainsi que ses données d'exemples
-- https://www.postgresql.org/download/
-- .env à modifier avec les logs de votre db local


CREATE TYPE interaction_type AS ENUM('content', 'comment', 'like');

CREATE TABLE users
(
	id_user SERIAL,
	email VARCHAR(20),
	firstname VARCHAR(20),
	lastname VARCHAR(20),
	passwordh VARCHAR(255),
	last_interaction CHAR(10) DEFAULT 0,
	interaction interaction_type,
	admin_status BOOLEAN DEFAULT false,
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

CREATE TABLE likes
(
	id_like SERIAL,
	content_id INTEGER,
	author_id INTEGER,
	CONSTRAINT likes_pk PRIMARY KEY (id_like),
	CONSTRAINT likes_fk1 FOREIGN KEY (content_id) REFERENCES content (id_content),
	CONSTRAINT likes_fk2 FOREIGN KEY (author_id) REFERENCES users (id_user)
);

INSERT INTO public.users (email,firstname,lastname,passwordh,last_interaction,interaction,admin_status) VALUES
	 ('notauser@gmail.fr','Julien','Carré','$2b$10$f45MLVQyukzcrUqfiDd4u.lHb923hSciQAnB4VlLQ3EBI3Y9vOJT2','3       ','content',false),
	 ('admin@admin.com','Admin','account','$2b$10$wIe85FXX85jrtltiGknAZuKYpQff2LNVmWUOgUSE8TIckiKhaUgoy','3       ','like',true),
	 ('malcom@gmail.fr','Prettier','malcom','$2b$10$FYp33Mdw.0LTzwtSt4L1QOKRraCbc512C945U.73mlbVsdJmd03Om','2       ','like',false);
	 
INSERT INTO public."content" (text_content,"date",media,media_content,id_author) VALUES
	 ('Bonjour je m''appelle Malcom je suis nouveau au sein de l''entreprise, j''intégre le service comptabilité ce mardi','2022-03-05',false,NULL,3),
	 ('Bienvenue à tous sur notre nouvelle plateforme interne ! ','2022-03-05',false,NULL,2),
	 ('Super resto entre collègues ce midi ','2022-03-05',true,'http://localhost:3000/images/resizedtoa-heftiba-DQKerTsQwi0-unsplash.jpg15473387035.jpg',1),
	 ('J''ai passé un excellent weekend dans cet hotel ','2022-03-05',true,'http://localhost:3000/images/resizedmarcus-loke-WQJvWU_HZFo-unsplash.jpg15474997218.jpg',3),
	 ('Fabian Kahl est le fils d''un antiquaire thuringeois, Holger Kahl, et de son épouse Kerstin3. Il grandit dans une maison de bois à colombages typique de la Lusace à Oberoppurg4. En l''an 20004, la famille Kahl achète le château de Brandenstein près de Ranis et le restaure5. Avec son père et son frère Tobias, il écume les marchés aux puces, les foires d''antiquité, les salles de vente, etc.1.

Après ses études secondaires et des études de design, il devient antiquaire dans des salons d''antiquaires et des foires d''antiquités7. Il a l''entier soutien de ses parents8 et pendant trois mois9 tient un magasin au Kurfürstendamm de Berlin10.

En 2012, il s''installe à Leipzig2. De 201312 à 203, il dirige la galerie d''art moderne SansvoiX13, avec un lounge bar3 et un espace événementiel15 donnant des spectacles hebdomadaires8. La galerie expose entre autres Luigi Colani, HR Giger9 et les Tachelesgruppe de Berlin. Il y a douze segments du Mur de Berlin à son inventaire11. Le projet a cependant échoué d''après Kahl à cause de problèmes de construction et de location9 Aujourd''hui, il s''occupe avec son frère et son père de l''entreprise d''antiquités du château de Brandenstein8,17.

C''est sur un marché du site d''agra de Markkleeberg près de Leipzig18 qu''il est découvert en 2013 par une équipe de la ZDF et invité à un casting. Il est sélectionné et dès lors anime l''émission Bares für Rares qui existe depuis 201319. Kahl est aussi invité à d''autres émissions, comme ZDF-Fernsehgarten20,21, Kölner Treff22, Riverboat5, MDR um 423, selbstbestimmt! Das Magazin3, DAS!18, NDR Talk Show24, stern TV25, MDR Sputnik,21 Wer weiß denn sowas?27, ainsi que Willkommen bei Carmen Nebel28. Kahl joue du piano, peint et a écrit une pièce de théâtre et des poèmes3. En mars 2018, il publie son livre Der Schatzsucher29, mi autobiographie, mi livre de conseils dans le domaine des antiquités30.

Le style vestimentaire de Kahl, sa coiffure, ses boucles d''oreilles et ses piercings (notamment celui entre les narines) montrent un faible pour le style gothique qu''il a adopté à l''âge de seize ans31,32, mais depuis quelque temps il ne se considère pas toutefois comme complètement gothique22. La presse le qualifie d''« oiseau de paradis » du monde du marché de l''antiquité1,7,33. En septembre 2018, il cesse de porter les cheveux longs et de les teindre et porte désormais les cheveux très courts34. Depuis l''âge de quinze ans, il est végétarien35 Kahl habite à Leipzig32 et a habité en 2019 pendant une courte période à Cologne31. Il se tourne aussi vers la photographie.','2022-03-05',false,NULL,3);

INSERT INTO public."comments" (data_comment,"date",content_id,id_author_comment) VALUES
	 ('Bienvenue !','2022-03-05',1,1),
	 ('Fabian Kahl (né le 3 octobre 1991 en Thuringe)1,2 est un marchand d''art et antiquaire allemand, connu pour son animation de l''émission de télévision de la ZDF Bares für Rares et pour son « look » médiatique dans toute l''Allemagne.','2022-03-05',5,3),
	 ('ça a l''air déclicieux','2022-03-05',3,3);
	 
INSERT INTO public.likes (content_id,author_id) VALUES
	 (2,1),
	 (3,2),
	 (3,3),
	 (5,3),
	 (2,3);
	 
	 