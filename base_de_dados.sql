-- Drop tables without dependencies or with dependencies that are also being dropped
DROP TABLE IF EXISTS Leilao;
DROP TABLE IF EXISTS Licitacao;
DROP TABLE IF EXISTS FoundObject;
DROP TABLE IF EXISTS LostObject;
DROP TABLE IF EXISTS atributes_object;

-- Drop tables that are parents in inheritance relationships
DROP TABLE IF EXISTS UserPolice;
DROP TABLE IF EXISTS GeneralUser;
DROP TABLE IF EXISTS Users; -- Assuming 'Users' is the correct name instead of 'User'

-- Drop tables that are referenced by foreign keys in other tables
DROP TABLE IF EXISTS Objeto;
DROP TABLE IF EXISTS Category_attribute;
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
    location GEOGRAPHY(Point, 4326),
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
    date VARCHAR(255),
    description TEXT,
    category INTEGER,
        FOREIGN KEY (category) REFERENCES Category(id),
    address INTEGER,
        FOREIGN KEY (address) REFERENCES Address(id)
);

-- Creating Category_attribute table
CREATE TABLE Category_attribute (
    id SERIAL PRIMARY KEY,
    attribute VARCHAR(255),
    category_id INTEGER,
        FOREIGN KEY (category_id) REFERENCES Category(id)
);

-- Creating atributes_object table
CREATE TABLE atributes_object (
    object_id INTEGER,
        FOREIGN KEY (object_id) REFERENCES Objeto(id),
    category_attribute_id INTEGER,
        FOREIGN KEY (category_attribute_id) REFERENCES Category_attribute(id),
    PRIMARY KEY (object_id, category_attribute_id)
);

-- Creating Users table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    gender VARCHAR(50),
    birthday INT,
    status BOOLEAN,
    address INTEGER,
        FOREIGN KEY (address) REFERENCES Address(id)
);

-- Creating UserPolice table inheriting from Users
CREATE TABLE UserPolice (
    internalId INTEGER,
    postoPolice VARCHAR(255),
    stationNumber INTEGER,
		UNIQUE (internalId)
) INHERITS (Users);

-- Creating GeneralUser table inheriting from Users
CREATE TABLE GeneralUser (
    idCivil INTEGER,
    idFiscal INTEGER,
		UNIQUE (idCivil),
		UNIQUE (idFiscal)
) INHERITS (Users);

-- Now that UserPolice and GeneralUser have been created, we can create FoundObject and LostObject

-- Creating FoundObject table inheriting from Objeto
CREATE TABLE FoundObject (
    name VARCHAR(255),
    email VARCHAR(255),
    genero VARCHAR(50),
    birthday INTEGER,
    idFiscal INTEGER,
    idCivil INTEGER,
    phoneNumber INTEGER,
    police INTEGER,
    	FOREIGN KEY (police) REFERENCES UserPolice(internalId)
) INHERITS (Objeto);

-- Creating LostObject table inheriting from Objeto
CREATE TABLE LostObject (
    generalUser INTEGER,
    	FOREIGN KEY (generalUser) REFERENCES GeneralUser(idCivil)
) INHERITS (Objeto);

-- Creating Licitação table
CREATE TABLE Licitacao (
    id SERIAL PRIMARY KEY,
    valor_licitacao NUMERIC,
    data DATE,
    id_user INTEGER,
        FOREIGN KEY (id_user) REFERENCES GeneralUser(idCivil)
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