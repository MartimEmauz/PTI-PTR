-- Drop tables without dependencies or with dependencies that are also being dropped
DROP TABLE IF EXISTS FoundObject;
DROP TABLE IF EXISTS LostObject;
DROP TABLE IF EXISTS Subscription;
DROP TABLE IF EXISTS Leilao;
DROP TABLE IF EXISTS Licitacao;
DROP TABLE IF EXISTS GeneralUser;
DROP TABLE IF EXISTS UserPolice;
DROP TABLE IF EXISTS PolicePost;
DROP TABLE IF EXISTS atributes_object;
DROP TABLE IF EXISTS Category_attribute;
DROP TABLE IF EXISTS Objeto;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS Address;

-- Enable PostGIS (if not already enabled)
CREATE EXTENSION IF NOT EXISTS postgis;

-- Creating Address table with PostGIS
CREATE TABLE Address (
    id SERIAL PRIMARY KEY,
    street VARCHAR(255),
    country VARCHAR(255),
    city VARCHAR(255),
    zip VARCHAR(20),
    -- Use the geography type for longitude and latitude
    location VARCHAR(255),
    -- location GEOGRAPHY(Point, 4326),
    radius INTEGER
);

-- Creating Category table
CREATE TABLE Category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

-- Creating Objeto table
CREATE TABLE Objeto (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    specific_date TIMESTAMP,   -- Para armazenar uma data e hora específica
    start_date DATE,           -- Para armazenar o início do intervalo de datas
    end_date DATE,
    description TEXT,
    category INTEGER,
        FOREIGN KEY (category) REFERENCES Category(id),
    address INTEGER,
        FOREIGN KEY (address) REFERENCES Address(id),
    CHECK (
        (specific_date IS NOT NULL AND start_date IS NULL AND end_date IS NULL) OR
        (specific_date IS NULL AND start_date IS NOT NULL AND end_date IS NOT NULL)
    )
);

-- Creating Category_attribute table
CREATE TABLE Category_attribute (
    id SERIAL PRIMARY KEY,
    attribute VARCHAR(255),
    category_id INTEGER,
        FOREIGN KEY (category_id) REFERENCES Category(id),
    UNIQUE (attribute, category_id)
);

-- Creating atributes_object table
CREATE TABLE atributes_object (
    object_id INTEGER,
        FOREIGN KEY (object_id) REFERENCES Objeto(id),
    category_attribute_id INTEGER,
        FOREIGN KEY (category_attribute_id) REFERENCES Category_attribute(id),
    value VARCHAR(255),
    PRIMARY KEY (object_id, category_attribute_id)
);

-- Creating Policepost table
CREATE TABLE PolicePost (
    id SERIAL PRIMARY KEY,
    location INTEGER,
    stationnumber INTEGER,
    	FOREIGN KEY (location) REFERENCES Address(id)
);

-- Creating UserPolice table inheriting from Users
CREATE TABLE UserPolice (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
        UNIQUE (email),
    password VARCHAR(255),
    internalId INTEGER,
    postoPolice INTEGER,
		UNIQUE (internalId),
        FOREIGN KEY (postoPolice) REFERENCES PolicePost(id)
);

-- Creating GeneralUser table inheriting from Users
CREATE TABLE GeneralUser (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
        UNIQUE (email),
    password VARCHAR(255),
    gender VARCHAR(50),
    birthday DATE,
    address INTEGER,
        FOREIGN KEY (address) REFERENCES Address(id),
    phoneNumber INTEGER,
        UNIQUE (phoneNumber),
    status BOOLEAN,
    idCivil INTEGER,
    idFiscal INTEGER,
		UNIQUE (idCivil),
		UNIQUE (idFiscal)
);

-- Creating FoundObject table
CREATE TABLE FoundObject (
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    genero VARCHAR(50),
    birthday DATE,
    idFiscal INTEGER,
    idCivil INTEGER,
    phoneNumber INTEGER,
    police INTEGER,
    	FOREIGN KEY (police) REFERENCES UserPolice(internalId),
    possibleOwner INTEGER,
    	FOREIGN KEY (possibleOwner) REFERENCES GeneralUser(id),
    delivered BOOLEAN
) INHERITS (Objeto);

-- Creating LostObject table
CREATE TABLE LostObject (
    generalUser INTEGER,
    	FOREIGN KEY (generalUser) REFERENCES GeneralUser(id)
) INHERITS (Objeto);

-- Creating Licitação table
CREATE TABLE Licitacao (
    id SERIAL PRIMARY KEY,
    valor_licitacao NUMERIC,
    data DATE,
    id_user INTEGER,
        FOREIGN KEY (id_user) REFERENCES GeneralUser(id)
);

-- Creating Leilao table
CREATE TABLE Leilao (
    id SERIAL PRIMARY KEY,
    valor_base NUMERIC,
    data_inicio DATE,
    data_fim DATE,
    maior_licitacao NUMERIC,
    id_licitacao INTEGER,
        FOREIGN KEY (id_licitacao) REFERENCES Licitacao(id),
    objeto INTEGER,
        FOREIGN KEY (objeto) REFERENCES Objeto(id)
);

-- Creating Subscription table
CREATE TABLE Subscription (
    id SERIAL PRIMARY KEY,
    id_user INTEGER,
        FOREIGN KEY (id_user) REFERENCES GeneralUser(id),
    id_leilao INTEGER,
        FOREIGN KEY (id_leilao) REFERENCES Leilao(id)
);
