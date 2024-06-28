-- Populate Address table
INSERT INTO Address (street, country, city, zip, location, radius) VALUES
('Rua da Liberdade', 'Portugal', 'Lisboa', '1000-001', '38.71667,-9.13998', 0),
('Avenida dos Aliados', 'Portugal', 'Porto', '4000-064', '41.14961,-8.61099', 0),
('Rua de Santo António', 'Portugal', 'Coimbra', '3000-150', '40.20331,-8.41025', 0),
('Praça do Comércio', 'Portugal', 'Lisboa', '1100-148', '38.70734,-9.13549', 0),
('Rua de São Francisco', 'Portugal', 'Braga', '4700-329', '41.54983,-8.42732', 0);

-- Populate PolicePost table with locations
INSERT INTO PolicePost (location, stationnumber) VALUES (1, '101');
INSERT INTO PolicePost (location, stationnumber) VALUES (2, '102');
INSERT INTO PolicePost (location, stationnumber) VALUES (3, '103');
INSERT INTO PolicePost (location, stationnumber) VALUES (4, '104');
INSERT INTO PolicePost (location, stationnumber) VALUES (5, '105');

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


-- Populate UserPolice table
INSERT INTO UserPolice (firstName, lastName, email, password, internalId, postoPolice) VALUES
('João', 'Silva', 'joao.silva@police.pt', 'Test123*', '105258812', 1),
('Ana', 'Costa', 'ana.costa@police.pt', 'Test123*', '123546879', 2),
('Carlos', 'Pereira', 'carlos.pereira@police.pt', 'Test123*', '1548569876', 3),
('Maria', 'Fernandes', 'maria.fernandes@police.pt', 'Test123*', '168796397', 4),
('Pedro', 'Gomes', 'pedro.gomes@police.pt', 'Test123*', '5361978941', 5);

-- Populate GeneralUser table
INSERT INTO GeneralUser (firstName, lastName, email, password, gender, birthday, address, phoneNumber, status, idCivil, idFiscal) VALUES
('Miguel', 'Oliveira', 'miguel.oliveira@gmail.com', 'Test123*', 'Masculino', '1990-05-12', 1, '912345678', TRUE, '123456789', '987654321'),
('Rita', 'Martins', 'rita.martins@gmail.com', 'Test123*', 'Feminino', '1985-09-25', 2, '923456789', TRUE, '223456789', '887654321'),
('José', 'Rodrigues', 'jose.rodrigues@gmail.com', 'Test123*', 'Outro', '1978-11-03', 3, '934567890', TRUE, '323456789', '787654321'),
('Sofia', 'Lopes', 'sofia.lopes@gmail.com', 'Test123*', 'Feminino', '1995-02-17', 4, '945678901', TRUE, '423456789', '687654321'),
('Bruno', 'Alves', 'bruno.alves@gmail.com', 'Test123*', 'Masculino', '1983-07-30', 5, '956789012', TRUE, '523456789', '587654321');

-- Populate Objeto table
INSERT INTO Objeto (title, specific_date, start_date, end_date, description, category, address) VALUES
('Telemóvel', '2024-01-10 14:30:00', '2024-01-01', '2024-01-31', 'Telemóvel preto perdido', 1, 1),
('Chaves de Carro', '2024-01-15 16:00:00', '2024-01-01', '2024-01-31', 'Chaves de carro com porta chaves azul', 3, 3),
('Relógio', '2024-01-20 11:45:00', '2024-01-01', '2024-01-31', 'Relógio de pulso prateado', 4, 4),
('Casaco', '2024-01-25 18:00:00', '2024-01-01', '2024-01-31', 'Casaco de inverno vermelho', 5, 5),
('Laptop HP', '2024-06-23 10:00:00', '2024-06-23', '2024-06-30', 'Laptop HP Spectre x360, cor prata', 1, 1),
('Passaporte', '2024-06-23 14:30:00', '2024-06-23', '2024-06-30', 'Passaporte brasileiro emitido em São Paulo', 2, 2),
('Chave de Casa', '2024-06-23 16:45:00', '2024-06-23', '2024-06-30', 'Chave de casa com chaveiro azul', 3, 3),
('Óculos de Sol', '2024-06-23 12:15:00', '2024-06-23', '2024-06-30', 'Óculos de sol Ray-Ban Aviator, cor dourado', 4, 4),
('Blazer', '2024-06-23 18:00:00', '2024-06-23', '2024-06-30', 'Blazer de couro preta, tamanho M', 5, 5);


-- Populate LostObject table
INSERT INTO LostObject (objeto_id, generalUser) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- Populate FoundObject table
INSERT INTO FoundObject (objeto_id, firstName, lastName, genero, birthday, idCivil, idFiscal, phoneNumber, police, possibleOwner, delivered) VALUES
(6, 'João', 'Ferreira', 'Masculino', '1985-06-15', '623456789', '123654789', '912345679', 1, NULL, FALSE),
(7, 'Ana', 'Santos', 'Feminino', '1990-04-20', '723456789', '223654789', '923456780', 2, NULL, FALSE),
(8, 'Carlos', 'Mendes', 'Masculino', '1983-08-10', '823456789', '323654789', '934567891', 3, NULL, FALSE),
(9, 'Maria', 'Azevedo', 'Feminino', '1975-11-25', '923456789', '423654789', '945678902', 4, NULL, FALSE),
(10, 'Pedro', 'Carvalho', 'Masculino', '1988-03-05', '523456789', '523654789', '956789013', 5, NULL, FALSE);

-- Populate atributes_object table for Telemóvel (Objeto ID = 1)
INSERT INTO atributes_object (object_id, category_attribute_id, value) VALUES
(1, 1, 'Samsung'),
(1, 2, 'Galaxy S20');

-- Populate atributes_object table for Carteira (Objeto ID = 2)
INSERT INTO atributes_object (object_id, category_attribute_id, value) VALUES
(2, 3, 'Carteira de Couro'),
(2, 4, 'Castanho');

-- Populate atributes_object table for Chaves de Carro (Objeto ID = 3)
INSERT INTO atributes_object (object_id, category_attribute_id, value) VALUES
(3, 5, 'Chaves de Carro'),
(3, 6, 'Metal'),
(3, 7, '4');

-- Populate atributes_object table for Relógio (Objeto ID = 4)
INSERT INTO atributes_object (object_id, category_attribute_id, value) VALUES
(4, 8, 'Relógio de Pulso'),
(4, 9, 'Prateado');

-- Populate atributes_object table for Casaco (Objeto ID = 5)
INSERT INTO atributes_object (object_id, category_attribute_id, value) VALUES
(5, 10, 'M'),
(5, 11, 'Vermelho'),
(5, 12, 'Zara');

INSERT INTO atributes_object (object_id, category_attribute_id, value) VALUES
(6, 1, 'HP'),
(6, 2, 'Spectre x360');

-- Atributos para o objeto 'Passaporte'
INSERT INTO atributes_object (object_id, category_attribute_id, value) VALUES
(7, 3, 'Passaporte'),
(7, 4, 'Governo Brasileiro'),
(7, 5, '2023-06-23'); -- Ajuste da data para um formato mais convencional

-- Atributos para o objeto 'Chave de Casa'
INSERT INTO atributes_object (object_id, category_attribute_id, value) VALUES
(8, 6, 'Chave de Casa'),
(8, 7, 'Metal'),
(8, 8, '4');

-- Atributos para o objeto 'Óculos de Sol'
INSERT INTO atributes_object (object_id, category_attribute_id, value) VALUES
(9, 9, 'Óculos de Sol'),
(9, 10, 'Plástico'),
(9, 11, 'Dourado');

-- Atributos para o objeto 'Jaqueta'
INSERT INTO atributes_object (object_id, category_attribute_id, value) VALUES
(10, 12, 'M'),
(10, 13, 'Preto'),
(10, 14, 'Marca X');


-- Populate Leilao table
INSERT INTO Leilao (valor_base, data_inicio, data_fim, maior_licitacao, objeto) VALUES
(100.00, '2024-02-01 10:00:00', '2024-12-10 10:00:00', 0.00, 1),
(200.00, '2024-02-05 12:00:00', '2024-12-15 12:00:00', 0.00, 2),
(150.00, '2024-02-08 14:00:00', '2024-12-18 14:00:00', 0.00, 3),


-- Populate Licitacao table
INSERT INTO Licitacao (valor_licitacao, data, id_user, leilao) VALUES
(110.00, '2024-02-02 11:00:00', 1, 1),
(220.00, '2024-02-06 13:00:00', 2, 2),
(160.00, '2024-02-09 15:00:00', 3, 3),


UPDATE Leilao AS l
SET maior_licitacao = (
    SELECT MAX(valor_licitacao)
    FROM Licitacao
    WHERE leilao = l.id
)
WHERE l.id IN (1, 2, 3, 4, 5);

-- Populate Subscription table
INSERT INTO Subscription (id_user, id_leilao) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

