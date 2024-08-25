import subprocess
import threading

# Caminhos dos diretórios onde estão os projetos
diretorio_projeto1 = r'C:\Users\xboxj\OneDrive\Área de Trabalho\ControlePC\backend'
diretorio_projeto2 = r'C:\Users\xboxj\OneDrive\Área de Trabalho\ControlePC\frontend'

def executar_comando_bat(diretorio):
    try:
        # Executa o comando npm start no diretório especificado
        resultado = subprocess.run('npm start', shell=True, check=True, cwd=diretorio, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        print(f'Saída em {diretorio}:\n{resultado.stdout}')
    except subprocess.CalledProcessError as e:
        print(f'Erro ao executar o comando em {diretorio}:\n{e.stderr}')
    except Exception as ex:
        print(f'Ocorreu um erro em {diretorio}: {ex}')

# Cria threads para executar os comandos simultaneamente
thread1 = threading.Thread(target=executar_comando_bat, args=(diretorio_projeto1,))
thread2 = threading.Thread(target=executar_comando_bat, args=(diretorio_projeto2,))

# Inicia as threads
thread1.start()
thread2.start()

# Aguarda ambas as threads terminarem
thread1.join()
thread2.join()
