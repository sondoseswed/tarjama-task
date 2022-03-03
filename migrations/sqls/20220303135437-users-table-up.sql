--create table 
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(50) UNIQUE,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
)