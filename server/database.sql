CREATE TABLE todos(
    Todo_id SERIAL PRIMARY KEY,
    Title VARCHAR(100) NOT NULL,
    Description VARCHAR(255),
    User_id int NOT NULL
);

CREATE TABLE users(
    User_id SERIAL PRIMARY KEY,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Hash VARCHAR(255) NOT NULL
);

