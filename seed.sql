CREATE DATABASE verdantDB;

CREATE TABLE products (
    listing_id INT,
    title VARCHAR,
    description TEXT,
    tags TEXT,
    url TEXT,
    num_favorers INT,
    taxonomy_path VARCHAR
)