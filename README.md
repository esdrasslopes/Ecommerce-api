# Requisitos e regras de negócio

## RF

- [] O usuário deve conseguir se cadastrar.
- [] O usuário deve conseguir se autenticar.
- [] O usuário deve conseguir acessar os dados do seu perfil.
- [] O usuário deve conseguir comprar um produto.
- [] O usuário deve conseguir adicionar um produto ao carrinho.
- [] O usuário deve conseguir ver o seu historico de compras.
- [] O usuário deve conseguir ver o seu carrinho.
- [] O usuário deve conseguir filtrar produtos a partir de sua categoria, preço ou nome.
- [] O usuário deve conseguir ver detalhes sobre um produto em específico.
- [] O usuário deve conseguir ver detalhes do pedido (Ex: pago, entregue).
- [] O usuário administrador deve conseguir adicionar itens ao sistema.
- [] O usuário administrador deve conseguir vizualizar o histórico de pedidos.
- [] O usuário administrador deve conseguir validar a situação de um produto.
- [] O usuário deve conseguir cancelar um pedido.

## RN

- [] Apenas administradores podem adicionar produtos.
- [] Apenas o usuário administrador deve validar a situação de um produto.
- [] Apenas produtos disponíveis em estoque devem estar disponíveis.
- [] Um pedido só pode ser cancelado pelo usuário enquanto estiver no status "pendente".
- [] Não é permitido finalizar uma compra com produtos cuja quantidade no carrinho ultrapasse o estoque disponível.
- [] Ao finalizar uma compra, a quantidade do produto deve ser reduzida automaticamente.

## RNF

- [] O banco de dados utilizado deve ser Postgresql
- [] As requisições de um usuário devem ser feitas a partir de um token JWT
- [] O backend deve ser desenvolvido com Node.js, Fastify e TypeScript.
- [] O sistema deve estar containerizado com Docker para facilitar desenvolvimento e implantação.

# Modelagem

**Entidades:** Usuário, produto, carrinho, pedido, categoria, item pedido.

**User:**

- Atributos: id, name, email, passaword_hash, role, created_at
- Relacionamentos: Order, Cart

**Product:**

- Atributos: id, name, description, price, stock, created_at, image_url
- Relacionamentos: Category, Cart

**Cart:**

- Atributos: id, user_id.
- Relacionamentos: User

**Category:**

- Atributos: id, name
- Relacionamentos: Product

**Order:**

- Atributos: id, user_id, status, created_at

- Relacionamentos: OrderItem

**Ordem Item**

- Atributos: order_id, product_id, quantity, price_at_purchase.
- Relacionamentos: Order, Product.

## Relacionamentos

### User

- User (1) <-> (N) Order
- User (1) <-> (1) Carrinho

### Product

- Product (N) <-> (1) Category
- Product (N) <-> (N) Carrinho
- Product (N) <-> (N) OrderItem

### Category

- Category (1) <-> (N) Product

### Cart

- Cart (1) <-> (1) User
- Cart (1) <-> (N) Product

### Order

- Order (N) <-> (1) User
- Order (1) <-> (N) OrderItem

### OrderItem

- OrderItem (N) <-> (1) Order
- OrderItem (N) <-> (1) Product
