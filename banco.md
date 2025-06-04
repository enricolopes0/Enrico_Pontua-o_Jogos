CREATE DATABASE IF NOT EXISTS jogos_escolares;
USE jogos_escolares;

CREATE TABLE IF NOT EXISTS jogadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    jogo VARCHAR(100) NOT NULL,
    pontuacao INT NOT NULL,
    nivel VARCHAR(50)
);
