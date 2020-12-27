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

### GET /colors
Lista todas as categorias cadastradas e suas respectivas cores.
```
[
    {
        "_id": "5fe8a68b0a0f333989d727d3",
        "category": "normal",
        "color": "#3498DB"
    },
    {
        "_id": "5fe8a6980a0f333989d727d4",
        "category": "fighting",
        "color": "#ECF0F1"
    },
    {
        "_id": "5fe8a6a40a0f333989d727d5",
        "category": "flying",
        "color": "#2E86C1"
    },
    {
        "_id": "5fe8a6b00a0f333989d727d6",
        "category": "poison",
        "color": "#C39BD3"
    }
]

```
Retorna o status:

#### 200 - Categorias listadas com sucesso
#### 500 - Erro ao tentar listar as categorias


### GET /colors?category={categoryValue}
Retorna os dados de uma categoria especifica. Exemplo ``http://localhost:8000/colors?category=fighting``

```
[
    {
        "_id": "5fe8a6980a0f333989d727d4",
        "category": "fighting",
        "color": "#ECF0F1"
    }
]
```

Retorna os seguintes status:
#### 200 - Categoria listada com sucesso

#### 404 - Nenhuma categoria encontrada para este filtro
#### 500 - Erro ao exibir os dados da categoria


### POST /colors

Recebe o seguinte payload no body:
```
{
    "category": "poison",
    "color": "#C39BD3"
}
```
Retorna o seguinte payload:

```
{
    "_id": "5fe8a6b00a0f333989d727d6",
    "category": "poison",
    "color": "#C39BD3",
    "__v": 0
}
```
Retorna os seguintes status:

#### 201 - Categoria cadastrada com sucesso

#### 500 - Erro ao cadastrar uma categoria

### DELETE /colors/{categoriaID}

Retorna o seguinte payload:

```
{
    "message": "Category successfully deleted"
}
```
Retorna os seguintes status:

#### 200 - Categoria excluida com sucesso

#### 404 - Categoria não encontrada

#### 500 - Erro ao excluir uma categoria


