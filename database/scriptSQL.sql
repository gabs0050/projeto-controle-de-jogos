
#Ativa o database a ser utilizado
use db_controle_jogos_bb;

#Cria a tabela de jogos
create table tbl_jogo (
	id 				INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome 			VARCHAR(80) NOT NULL,
    data_lancamento DATE NOT NULL,
    versao 			VARCHAR(10) NOT NULL,
    tamanho			VARCHAR(10),
    descricao 		TEXT,
    foto_capa 		VARCHAR(200),
    link 			VARCHAR(200)
)

-- SHOW TABLES;
-- DESC tbl_jogo;