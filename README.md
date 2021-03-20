# Executar o projeto
Para executar o projeto é preciso ter instalado: [Node](https://nodejs.org/en/download) e [NPM](npmjs.com).
Tendo todos os itens citados instalados basta rodar o comando "npm install" ou "npm i" e criar um arquivo .env com as mesmas chaves contidas no .env.exemple e colocando os valores corretos para que possa executar o projeto na sua maquina.
Para rodar o projeto em modo de desenvolvimento rode o comando: npm run dev.
Para rodar o processo de build e depois subir o projeto em ambiente externo rode os comandos: npm run build e em seguida npm start.
Para rodar os testes rode o comando: npm test.

Opções para LOG_MODE:
- combined
- common
- dev
- short
- tiny

Observações:
- O NPM vem por padrão ao instalar o Node.
- Para ambiente de desenvolvimento utilizar a porta 3030, a porta fica como variavél de ambiente para que possa rodar de forma pratica e simples em servidores externos.
