# Projeto de Cotação de Moedas

Este projeto foi desenvolvido para buscar dados da cotação de 10 itens (moedas, ações, etc.) através da API https://hgbrasil.com/status/finance/. Ele conta com uma tela inicial de login e cadastro, verificação de sessão ativa e visualização das cotações com variação diária em verde ou vermelho. O usuário também pode selecionar um elemento e observar sua evolução de preços em um gráfico.

## Instalação

Para instalar este projeto, siga os seguintes passos:

1. Faça o clone do repositório: `git clone https://github.com/matheusqf/real-time-quotes.git`
2. Entre na pasta do projeto: `cd real-time-quotes`
3. Instale as dependências: `npm i`
4. Inicie o projeto: `npm start`

## Requerimentos

- Conectar a aplicação à API https://hgbrasil.com/status/finance/ e buscar dados da cotação de 10 itens (moedas, ações, etc.)
- Tela inicial de login e cadastro
- Verificação de sessão ativa
- Visualização das cotações com variação diária em verde (para positivas) ou vermelho (para negativas)
- Responsividade
- Utilizar Rotas adequadamente (e de acordo com a autenticação)
- Redirecionar para uma página de "Not found" caso a rota esteja errada

## Utilização de Proptypes

Este projeto utiliza a biblioteca Proptypes para checar os tipos dos props que o componente está recebendo.

## Autenticação de Login

Este projeto utiliza autenticação de login cadastrado em localStorage. O login é feito através de email e senha. Após 1 minuto de inatividade (esse tempo pode ser ajustável pelo código), o aplicativo detecta a ausência do usuário e o desconecta automaticamente.

## Contato

Para mais informações, feedbacks ou dúvidas, entre em contato, ficarei feliz:

- Email: matheus.ica@gmail.com
- LinkedIn: https://linkedin.com/in/matheusqf/
- GitHub: https://github.com/matheusqf/

## Nota

Este projeto não se destina a ser utilizado em produção. Algumas funcionalidades podem estar incompletas ou não estar completamente testadas.
