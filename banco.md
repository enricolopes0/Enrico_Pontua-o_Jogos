import mysql.connector

class Jogador:
    def __init__(self, nome, jogo, pontuacao):
        self.nome = nome
        self.jogo = jogo
        self.pontuacao = pontuacao

    def exibir_dados(self):
        return f"Nome: {self.nome}, Jogo: {self.jogo}, Pontuação: {self.pontuacao}"

    def aumentar_pontuacao(self, pontos):
        self.pontuacao += pontos
        print(f"{self.nome} ganhou {pontos} pontos!")

    def zerar_pontuacao(self):
        self.pontuacao = 0
        print(f"A pontuação de {self.nome} foi zerada.")

    def verificar_status(self):
        if self.pontuacao >= 2000:
            return f"{self.nome} desbloqueou o status de Jogador Experiente!"
        else:
            return f"{self.nome} ainda não alcançou o status de Jogador Experiente."

class JogadorPremium(Jogador):
    def __init__(self, nome, jogo, pontuacao, nivel):
        super().__init__(nome, jogo, pontuacao)
        self.nivel = nivel

    def exibir_dados(self):
        return f"Nome: {self.nome}, Jogo: {self.jogo}, Pontuação: {self.pontuacao}, Nível VIP: {self.nivel}"

    def bonus_vip(self):
        bonus = 500
        self.pontuacao += bonus
        print(f"{self.nome} recebeu {bonus} pontos de bônus VIP por ser nível {self.nivel}!")

def conectar_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",  # ou outro usuário
        password="",  # coloque a senha, se houver
        database="jogos_escolares"  # certifique-se de que esse banco existe
    )

def criar_tabela():
    conn = conectar_db()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS jogadores (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100),
            jogo VARCHAR(100),
            pontuacao INT,
            nivel VARCHAR(50)
        )
    """)
    conn.commit()
    conn.close()

def inserir_jogador(jogador):
    conn = conectar_db()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO jogadores (nome, jogo, pontuacao, nivel) 
        VALUES (%s, %s, %s, %s)
    """, (jogador.nome, jogador.jogo, jogador.pontuacao, getattr(jogador, 'nivel', None)))
    conn.commit()
    conn.close()

def consultar_jogadores():
    conn = conectar_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM jogadores")
    jogadores = cursor.fetchall()
    conn.close()
    return jogadores

def excluir_jogador(id):
    conn = conectar_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM jogadores WHERE id = %s", (id,))
    conn.commit()
    conn.close()

def menu():
    criar_tabela()
    while True:
        print("\n====== MENU JOGOS ESCOLARES ======")
        print("1. Cadastrar jogador comum")
        print("2. Cadastrar jogador premium")
        print("3. Ver ranking")
        print("4. Excluir jogador")
        print("5. Sair")
        escolha = input("Escolha uma opção: ")

        if escolha == "1":
            nome = input("Nome do jogador: ")
            jogo = input("Nome do jogo: ")
            pontos = int(input("Pontuação inicial: "))
            jogador = Jogador(nome, jogo, pontos)
            inserir_jogador(jogador)
            print(jogador.exibir_dados())
            print(jogador.verificar_status())

        elif escolha == "2":
            nome = input("Nome do jogador: ")
            jogo = input("Nome do jogo: ")
            pontos = int(input("Pontuação inicial: "))
            nivel = input("Nível VIP (Bronze, Prata, Ouro): ")
            jogador = JogadorPremium(nome, jogo, pontos, nivel)
            jogador.bonus_vip()
            inserir_jogador(jogador)
            print(jogador.exibir_dados())
            print(jogador.verificar_status())

        elif escolha == "3":
            print("\n===== RANKING DOS JOGADORES =====")
            jogadores = consultar_jogadores()
            jogadores.sort(key=lambda x: x[3], reverse=True)
            for j in jogadores:
                print(f"ID: {j[0]} | Nome: {j[1]} | Jogo: {j[2]} | Pontos: {j[3]} | VIP: {j[4]}")

        elif escolha == "4":
            id_excluir = int(input("Digite o ID do jogador a ser excluído: "))
            excluir_jogador(id_excluir)
            print("Jogador excluído com sucesso.")

        elif escolha == "5":
            print("Saindo...")
            break
        else:
            print("Opção inválida! Tente novamente.")

menu()
