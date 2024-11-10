# Projeto de Automação com Cypress - Psicomanager

Este projeto de automação foi desenvolvido com Cypress para realizar testes automatizados como parte do processo de avaliação para a empresa Psicomanager.

## Pré-requisitos

Para executar o projeto, você precisará instalar o `ntl` globalmente, que facilita a execução de scripts. Siga as instruções abaixo.

### 1. Instalar o `ntl` Globalmente

Para instalar o `ntl`, execute o comando abaixo:

```bash
npm i -g ntl
```

###2. Instalar Dependências do Projeto
Dentro da pasta raiz do projeto, instale as dependências necessárias:

```bash
npm install
```

##Executando os Testes
Você pode escolher entre rodar os testes no navegador ou diretamente no terminal.

###Executar Testes em um Navegador (Modo Interativo)
Para abrir os testes no navegador Cypress, use o comando:
```bash
ntl
```
Em seguida, selecione a opção:
```bash
cypress:web
```
##Executar Testes no Terminal (Modo Headless)
Para executar os testes apenas no terminal (modo headless), utilize o mesmo comando ntl e selecione a opção:
```bash
cypress:headless
```
