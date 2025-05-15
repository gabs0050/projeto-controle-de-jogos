
#Ativa o database a ser utilizado

use db_controle_jogos_bb;

--Cria a tabela de jogos
create table tbl_jogo (
	id 				INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome 			VARCHAR(80) NOT NULL,
    data_lancamento DATE NOT NULL,
    versao 			VARCHAR(10) NOT NULL,
    tamanho			VARCHAR(10),
    descricao 		TEXT,
    foto_capa 		VARCHAR(200),
    link 			VARCHAR(200)
);

--Cria a tabela desenvolvedora
CREATE TABLE tbl_desenvolvedora (
    id_desenvolvedora        INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome_desenvolvedora      VARCHAR(100) NOT NULL,
    descricao_desenvolvedora TEXT NULL,
    logo_desenvolvedora      VARCHAR(250) NULL
);

--Cria a tabela sexo
CREATE TABLE tbl_sexo (
  id        INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  sigla     VARCHAR(1) NULL,
  nome_sexo VARCHAR(30) NULL
);

--Cria a tabela usuarios
CREATE TABLE tbl_usuarios (
    id_usuario     INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome_usuario   VARCHAR(80) NOT NULL,
    email          VARCHAR(100) NOT NULL,
    senha          VARCHAR(15) NOT NULL,
    foto_perfil    VARCHAR(250) NULL,
    tbl_sexo_id    INT NOT NULL,
    FOREIGN KEY (tbl_sexo_id) REFERENCES tbl_sexo (id)
);

--Cria a tabela genero
CREATE TABLE tbl_genero (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NULL
);

--Cria a tabela plataforma
CREATE TABLE tbl_plataforma (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NULL
);

--Cria a tabela tipo_moeda
CREATE TABLE tbl_tipo_moeda (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  tipo_moeda VARCHAR(45) NULL
);

-- Cria a tabela preco
CREATE TABLE tbl_preco (
  id INT NOT NULL AUTO_INCREMENT,
  valor DECIMAL(5,2) NOT NULL,
  id_jogo INT NOT NULL,
  id_tipo_moeda INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_jogo) REFERENCES tbl_jogo (id),
  FOREIGN KEY (id_tipo_moeda) REFERENCES tbl_tipo_moeda (id)
);

-- Cria a tabela desenvolvedora_jogo
CREATE TABLE tbl_desenvolvedora_jogo (
  id INT NOT NULL AUTO_INCREMENT,
  id_desenvolvedora INT NOT NULL,
  id_jogo INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_desenvolvedora) REFERENCES tbl_desenvolvedora (id_desenvolvedora),
  FOREIGN KEY (id_jogo) REFERENCES tbl_jogo (id)
);

-- Cria a tabela avaliacoes
CREATE TABLE tbl_avaliacoes (
  id_avaliacao INT NOT NULL AUTO_INCREMENT,
  nota_jogo INT NULL,
  comentario VARCHAR(1000) NULL,
  data_avaliacao DATE NULL,
  id_jogo INT NOT NULL,
  id_usuario INT NOT NULL,
  PRIMARY KEY (id_avaliacao),
  FOREIGN KEY (id_jogo) REFERENCES tbl_jogo (id),
  FOREIGN KEY (id_usuario) REFERENCES tbl_usuarios (id_usuario)
);

-- Cria a tabela plataforma_jogo
CREATE TABLE tbl_plataforma_jogo (
  id INT NOT NULL AUTO_INCREMENT,
  id_jogo INT NOT NULL,
  id_plataforma INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_jogo) REFERENCES tbl_jogo (id),
  FOREIGN KEY (id_plataforma) REFERENCES tbl_plataforma (id)
);

CREATE TABLE tbl_genero_jogo (
  id INT NOT NULL AUTO_INCREMENT,
  id_jogo INT NOT NULL,
  id_genero INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_jogo) REFERENCES tbl_jogo (id),
  FOREIGN KEY (id_genero) REFERENCES tbl_genero (id)
);


-- SHOW TABLES;
-- DESC tbl_jogo;