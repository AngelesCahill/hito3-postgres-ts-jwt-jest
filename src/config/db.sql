DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS projects;

CREATE TABLE users (
    uid SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    username VARCHAR(50) NOT NULL
);

CREATE TABLE projects (
    uid SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL UNIQUE,
    description VARCHAR(300) NOT NULL,
    imgurl VARCHAR(300) NOT NULL
);

INSERT INTO users (email, password, username)
VALUES ('test1@test.com', '123123', 'Test1');
INSERT INTO users (email, password, username)
VALUES ('test2@test.com', '123123', 'Test2');

INSERT INTO projects (title, description, imgurl) 
VALUES ('Project 1', 'Description project 1', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMbl00OZ12aMJzxIU9yR4_3SrnlidhNfRo8Q&s');
INSERT INTO projects (title, description, imgurl) 
VALUES ('Project 2', 'Description project 2', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMbl00OZ12aMJzxIU9yR4_3SrnlidhNfRo8Q&s');
INSERT INTO projects (title, description, imgurl) 
VALUES ('Project 3', 'Description project 3', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMbl00OZ12aMJzxIU9yR4_3SrnlidhNfRo8Q&s');
INSERT INTO projects (title, description, imgurl) 
VALUES ('Project 4', 'Description project 4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMbl00OZ12aMJzxIU9yR4_3SrnlidhNfRo8Q&s');

SELECT * FROM users;
SELECT * FROM projects;