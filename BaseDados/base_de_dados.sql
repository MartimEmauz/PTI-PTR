
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
        UNIQUE (stationnumber),
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
    idCivil VARCHAR(255),
    idFiscal VARCHAR(255),
		UNIQUE (idCivil),
		UNIQUE (idFiscal)
);

-- Creating FoundObject table
CREATE TABLE FoundObject (
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    genero VARCHAR(50),
    birthday DATE,
    idCivil VARCHAR(255),
    idFiscal VARCHAR(255),
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


-- Creating Leilao table
CREATE TABLE Leilao (
    id SERIAL PRIMARY KEY,
    valor_base NUMERIC,
    data_inicio TIMESTAMP,
    data_fim TIMESTAMP,
    maior_licitacao NUMERIC,
    objeto INTEGER,
        FOREIGN KEY (objeto) REFERENCES Objeto(id)
);

-- Creating Licitação table
CREATE TABLE Licitacao (
    id SERIAL PRIMARY KEY,
    valor_licitacao NUMERIC,
    data TIMESTAMP,
    id_user INTEGER,
        FOREIGN KEY (id_user) REFERENCES GeneralUser(id),
    leilao INTEGER,
        FOREIGN KEY (leilao) REFERENCES Leilao(id),
        UNIQUE(leilao, id_user, valor_licitacao)
);

-- Creating Subscription table
CREATE TABLE Subscription (
    id SERIAL PRIMARY KEY,
    id_user INTEGER,
        FOREIGN KEY (id_user) REFERENCES GeneralUser(id),
    id_leilao INTEGER,
        FOREIGN KEY (id_leilao) REFERENCES Leilao(id)
);


INSERT INTO Category (name) VALUES
('Eletrónicos'),
('Documentos'),
('Chaves'),
('Acessórios'),
('Roupas'),
('Outros');

INSERT INTO Category_attribute (attribute, category_id) VALUES
('Marca', 1),
('Modelo', 1);

-- Inserir atributos para Documentos
INSERT INTO Category_attribute (attribute, category_id) VALUES
('Tipo', 2),
('Emissor', 2),
('Data de Emissão', 2);

-- Inserir atributos para Chaves
INSERT INTO Category_attribute (attribute, category_id) VALUES
('Tipo', 3),
('Material', 3),
('Quantidade de Dentes', 3);

-- Inserir atributos para Acessórios
INSERT INTO Category_attribute (attribute, category_id) VALUES
('Tipo', 4),
('Material', 4),
('Cor', 4);

-- Inserir atributos para Roupas
INSERT INTO Category_attribute (attribute, category_id) VALUES
('Tamanho', 5),
('Cor', 5),
('Marca', 5);

-- Inserindo registros na tabela PolicePost sem especificar a localização
INSERT INTO PolicePost (location, stationnumber) VALUES (NULL, 101);
INSERT INTO PolicePost (location, stationnumber) VALUES (NULL, 102);
INSERT INTO PolicePost (location, stationnumber) VALUES (NULL, 103);
INSERT INTO PolicePost (location, stationnumber) VALUES (NULL, 104);
INSERT INTO PolicePost (location, stationnumber) VALUES (NULL, 105);
INSERT INTO PolicePost (location, stationnumber) VALUES (NULL, 106);