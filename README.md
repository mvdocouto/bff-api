# Api de Cores

API que fornece as cores hexadecimais para cada um dos tipos de Pokemons cadastrados em [PokeAPI](https://pokeapi.co/api/v2/type).

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/) - Web Framework
- [Mongoose](https://mongoosejs.com/) - Biblioteca para interação com MongoDB
- [Joi](https://joi.dev/api/) - Biblioteca de validação de dados baseada em schemas
- [Dotenv](https://github.com/motdotla/dotenv#readme) - Biblioteca para utilização de variáveis de ambiente

## Instalação

Para instalar as dependencias basta acessar o terminal e rodar

```
yarn install
```
Na raiz do projeto existe o arquivo ``.env`` onde estão as configurações da url do banco de dados e a porta onde a aplicação ira rodar. Coso não seja fornecdo uma porta o valor default é a **8000**.

```
PORT=8000
DATABASE_URL=mongodb://localhost:27017/colors
```

## Executando a API

O serviço possui os sequintes comandos para a execução:

```
yarn dev

```

```
yarn start
```

```
yarn test
```

```
yarn lint
```

- **start** executa o serviço em produção.
- **dev** executa em modo desenvolvimento reiniciando o serviço a cada alteração do código.
- **test** executa os testes da aplicação.
- **lint** valida a estrutura dos códigos.

### Observação 
O serviço não executa se as variáveis de ambiente não estiverem configuradas corretamente. Como no exemplo:
``Error: Config validation error: "DATABASE_URL" is required`` 

## Endpoints