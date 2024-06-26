-- Drop tables without dependencies or with dependencies that are also being dropped
DROP TABLE IF EXISTS Subscription;
DROP TABLE IF EXISTS Licitacao;
DROP TABLE IF EXISTS Leilao;
DROP TABLE IF EXISTS FoundObject;
DROP TABLE IF EXISTS LostObject;
DROP TABLE IF EXISTS GeneralUser;
DROP TABLE IF EXISTS UserPolice;
DROP TABLE IF EXISTS PolicePost;
DROP TABLE IF EXISTS atributes_object;
DROP TABLE IF EXISTS Category_attribute;
DROP TABLE IF EXISTS Objeto;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS Address;


-- Creating Address table with PostGIS
CREATE TABLE Address (
    id SERIAL PRIMARY KEY,
    street VARCHAR(255),
    country VARCHAR(255),
    city VARCHAR(255),
    zip VARCHAR(20),
    location VARCHAR(255),
        UNIQUE (location),
    radius INTEGER
);

-- Creating Category table
CREATE TABLE Category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
        UNIQUE (name)
);

-- Tabela para armazenar objetos
CREATE TABLE Objeto (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255), -- Título do objeto
    specific_date TIMESTAMP, -- Data e hora específica
    start_date DATE, -- Data de início
    end_date DATE, -- Data de fim
    description TEXT, -- Descrição do objeto
    category INTEGER, -- Categoria do objeto
        FOREIGN KEY (category) REFERENCES Category(id) ON DELETE CASCADE,
    address INTEGER,
        FOREIGN KEY (address) REFERENCES Address(id) ON DELETE CASCADE
);

-- Creating Category_attribute table
CREATE TABLE Category_attribute (
    id SERIAL PRIMARY KEY,
    attribute VARCHAR(255),
    category_id INTEGER,
        FOREIGN KEY (category_id) REFERENCES Category(id) ON DELETE CASCADE,
    UNIQUE (attribute, category_id)
);

-- Creating atributes_object table
CREATE TABLE atributes_object (
    id SERIAL PRIMARY KEY,
    object_id INTEGER,
        FOREIGN KEY (object_id) REFERENCES Objeto(id) ON DELETE CASCADE,
    category_attribute_id INTEGER,
        FOREIGN KEY (category_attribute_id) REFERENCES Category_attribute(id) ON DELETE CASCADE,
    value VARCHAR(255),
    UNIQUE (object_id, category_attribute_id)
);

-- Creating Policepost table
CREATE TABLE PolicePost (
    id SERIAL PRIMARY KEY,
    location INTEGER,
    stationnumber VARCHAR(255),
        UNIQUE (stationnumber),
    	FOREIGN KEY (location) REFERENCES Address(id) ON DELETE CASCADE
);

-- Creating UserPolice table inheriting from Users
CREATE TABLE UserPolice (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
        UNIQUE (email),
    password VARCHAR(255),
    internalId VARCHAR(255),
    postoPolice INTEGER,
		UNIQUE (internalId),
        FOREIGN KEY (postoPolice) REFERENCES PolicePost(id) ON DELETE CASCADE
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
        FOREIGN KEY (address) REFERENCES Address(id) ON DELETE CASCADE,
    phoneNumber VARCHAR(9),
        UNIQUE (phoneNumber),
    status BOOLEAN,
    idCivil VARCHAR(255),
    idFiscal VARCHAR(255),
		UNIQUE (idCivil),
		UNIQUE (idFiscal)
);


-- Tabelas específicas para tipos de objetos
CREATE TABLE FoundObject (
    id SERIAL PRIMARY KEY,
    objeto_id INTEGER,
        UNIQUE (objeto_id),
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    genero VARCHAR(50),
    birthday DATE,
    idCivil VARCHAR(255),
    idFiscal VARCHAR(255),
    phoneNumber VARCHAR(9),
    police INTEGER,
    possibleOwner INTEGER,
    delivered BOOLEAN,
        FOREIGN KEY (objeto_id) REFERENCES Objeto(id) ON DELETE CASCADE,
        FOREIGN KEY (police) REFERENCES UserPolice(id) ON DELETE CASCADE,
        FOREIGN KEY (possibleOwner) REFERENCES GeneralUser(id) ON DELETE CASCADE
);


CREATE TABLE LostObject (
    id SERIAL PRIMARY KEY,
    objeto_id INTEGER,
        UNIQUE (objeto_id),
    generalUser INTEGER,
        FOREIGN KEY (objeto_id) REFERENCES Objeto(id) ON DELETE CASCADE,
        FOREIGN KEY (generalUser) REFERENCES GeneralUser(id) ON DELETE CASCADE
);



-- Creating Leilao table
CREATE TABLE Leilao (
    id SERIAL PRIMARY KEY,
    valor_base NUMERIC,
    data_inicio TIMESTAMP,
    data_fim TIMESTAMP,
    maior_licitacao NUMERIC,
    objeto INTEGER,
        FOREIGN KEY (objeto) REFERENCES FoundObject(id) ON DELETE CASCADE
);

-- Creating Licitação table
CREATE TABLE Licitacao (
    id SERIAL PRIMARY KEY,
    valor_licitacao NUMERIC,
    data TIMESTAMP,
    id_user INTEGER,
        FOREIGN KEY (id_user) REFERENCES GeneralUser(id) ON DELETE CASCADE,
    leilao INTEGER,
        FOREIGN KEY (leilao) REFERENCES Leilao(id) ON DELETE CASCADE,
        UNIQUE(leilao, id_user, valor_licitacao)
);

-- Creating Subscription table
CREATE TABLE Subscription (
    id SERIAL PRIMARY KEY,
    id_user INTEGER,
        FOREIGN KEY (id_user) REFERENCES GeneralUser(id) ON DELETE CASCADE,
    id_leilao INTEGER,
        FOREIGN KEY (id_leilao) REFERENCES Leilao(id) ON DELETE CASCADE
);
