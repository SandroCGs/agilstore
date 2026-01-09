AgilStore - Gerenciamento de Produtos

Aplicação para gerenciamento de inventário de produtos da loja AgilStore. Permite adicionar, listar, atualizar, excluir e buscar produtos, com persistência em JSON. Desenvolvido em Node.js com NestJS.

Tecnologias utilizadas

Node.js

NestJS

TypeScript

Class-validator

Persistência em arquivo JSON (data/produtos.json)

Como rodar localmente

Clonar o repositório:

git clone <URL_DO_REPOSITORIO>


Instalar dependências:

npm install


Rodar a aplicação em modo desenvolvimento:

npm run start:dev


Por padrão, o servidor inicia em http://localhost:3000.

Endpoints disponíveis
Produtos
Método	Rota	Descrição
GET	/produtos	Listar todos os produtos
GET	/produtos/:id	Buscar produto por ID
POST	/produtos	Adicionar novo produto
PUT	/produtos/:id	Atualizar produto existente
DELETE	/produtos/:id	Excluir produto
Estrutura de produto
{
  "id": 123456789,
  "nome": "Nome do Produto",
  "categoria": "Categoria",
  "quantidade": 10,
  "preco": 299.90
}

Observações

IDs são gerados automaticamente ao criar um produto.

Validações são aplicadas em todos os campos obrigatórios.

Dados são persistidos em data/produtos.json.

Busca por parte do nome e filtragem são opcionais e não implementadas nesta versão.