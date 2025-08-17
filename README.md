# Requisitos e regras de negócio

## RF

- [x] O usuário deve conseguir se cadastrar.
- [x] O usuário deve conseguir se autenticar.
- [x] O usuário deve conseguir acessar os dados do seu perfil.
- [x] O usuário deve conseguir comprar um produto.
- [x] O usuário deve conseguir adicionar um produto ao carrinho.
- [x] O usuário deve conseguir ver o seu historico de compras.
- [x] O usuário deve conseguir ver o seu carrinho.
- [x] O usuário deve conseguir filtrar produtos a partir de sua categoria, preço ou nome.
- [x] O usuário deve conseguir ver detalhes sobre um produto em específico.
- [x] O usuário deve conseguir ver detalhes do pedido (Ex: pago, entregue).
- [x] O usuário administrador deve conseguir adicionar itens ao sistema.
- [x] O usuário administrador deve conseguir adicionar categorias ao sistema.
- [x] O usuário administrador deve conseguir vizualizar o histórico de pedidos.
- [x] O usuário administrador deve conseguir validar a situação de um produto.
- [x] O usuário deve conseguir cancelar um pedido.

## RN

- [x] Apenas administradores podem adicionar produtos.
- [x] Apenas o usuário administrador deve validar a situação de um produto.
- [x] Apenas produtos disponíveis em estoque devem estar disponíveis.
- [x] Um pedido só pode ser cancelado pelo usuário enquanto estiver no status "pendente".
- [x] Não é permitido finalizar uma compra com produtos cuja quantidade no carrinho ultrapasse o estoque disponível.
- [x] Ao finalizar uma compra, a quantidade do produto deve ser reduzida automaticamente.

## RNF

- [x] O banco de dados utilizado deve ser Postgresql
- [x] As requisições de um usuário devem ser feitas a partir de um token JWT
- [x] O backend deve ser desenvolvido com Node.js, Fastify e TypeScript.
- [x] O sistema deve estar containerizado com Docker para facilitar desenvolvimento e implantação.

# 📦 Modelagem

**Entidades:** Usuário, produto, carrinho, pedido, categoria, item pedido, cart item.

---

## 🧍‍♂️ User

- **Atributos:**

  - `id`
  - `name`
  - `email`
  - `password_hash`
  - `role`
  - `created_at`

- **Relacionamentos:**
  - User (1) <-> (N) Order
  - User (1) <-> (1) Cart

---

## 📦 Product

- **Atributos:**

  - `id`
  - `name`
  - `description`
  - `price`
  - `stock`
  - `created_at`
  - `image_url`
  - `category_id`

- **Relacionamentos:**
  - Product (N) <-> (1) Category
  - Product (N) <-> (N) CartItem
  - Product (N) <-> (N) OrderItem

---

## 🛒 Cart

- **Atributos:**

  - `id`
  - `user_id`

- **Relacionamentos:**
  - Cart (1) <-> (1) User
  - Cart (1) <-> (N) CartItem

---

## 🧾 CartItem

- **Atributos:**

  - `cart_id`
  - `product_id`
  - `quantity`

- **Relacionamentos:**
  - CartItem (N) <-> (1) Cart
  - CartItem (N) <-> (1) Product

---

## 📚 Category

- **Atributos:**

  - `id`
  - `name`

- **Relacionamentos:**
  - Category (1) <-> (N) Product

---

## 📑 Order

- **Atributos:**

  - `id`
  - `user_id`
  - `status`
  - `created_at`

- **Relacionamentos:**
  - Order (N) <-> (1) User
  - Order (1) <-> (N) OrderItem

---

## 🧾 OrderItem

- **Atributos:**

  - `order_id`
  - `product_id`
  - `quantity`
  - `price_at_purchase`

- **Relacionamentos:**
  - OrderItem (N) <-> (1) Order
  - OrderItem (N) <-> (1) Product

---

# 🔗 Relacionamentos

## 👤 User

- User (1) <-> (N) Order
- User (1) <-> (1) Cart

## 📦 Product

- Product (N) <-> (1) Category
- Product (N) <-> (N) CartItem
- Product (N) <-> (N) OrderItem

## 📚 Category

- Category (1) <-> (N) Product

## 🛒 Cart

- Cart (1) <-> (1) User
- Cart (1) <-> (N) CartItem

## 🧾 CartItem

- CartItem (N) <-> (1) Cart
- CartItem (N) <-> (1) Product

## 📑 Order

- Order (N) <-> (1) User
- Order (1) <-> (N) OrderItem

## 🧾 OrderItem

- OrderItem (N) <-> (1) Order
- OrderItem (N) <-> (1) Product

## Ciclo dentro da aplicação

# Fluxo da Aplicação - Ecommerce

---

## 1. Criação do usuário

- O sistema cria um novo **User** com seus dados.
- Automaticamente, o sistema cria um **Cart** vazio para esse usuário.

---

## 2. Listagem de produtos

- O usuário vê a listagem de todos os produtos.
- O sistema pode filtrar produtos por **Category** (ex: Roupas, Tênis).
- Cada produto mostrado tem informações como nome, descrição, preço, etc.

---

## 3. Adicionar produto ao carrinho

Quando o usuário clica para adicionar um produto, a aplicação:

- Recebe o `product_id` e a `quantidade` desejada.
- Verifica se já existe um **CartItem** para aquele produto no carrinho do usuário:
  - Se existir, atualiza a quantidade somando o valor novo.
  - Se não existir, cria um novo **CartItem** com o `product_id` e `quantidade`.
- O **Cart** do usuário agora reflete os produtos adicionados.

---

## 4. Visualizar o carrinho

- O usuário acessa o carrinho.
- O sistema lista todos os **CartItems** daquele carrinho, com:
  - Nome do produto
  - Quantidade
  - Preço unitário
  - Preço total (quantidade × preço unitário)
- O sistema mostra o valor total do carrinho.

---

## 5. Finalizar pedido

Quando o usuário opta por finalizar o pedido:

- A aplicação cria um novo registro em **Order**, associando ao usuário e com status inicial (ex: “pendente”).
- Para cada **CartItem** do carrinho, cria um **OrderItem**:
  - Copia o `product_id`
  - Copia a `quantidade`
  - Salva o `price_at_purchase` com o preço atual do produto
- O pedido (**Order**) agora contém todos os **OrderItems**.
- Opcionalmente, o carrinho do usuário é limpo, removendo todos os **CartItems**.

---

## 6. Visualizar pedido

- O usuário pode consultar seus pedidos.
- Cada pedido mostra:
  - Status
  - Data de criação
  - Itens do pedido (**OrderItem**), com produto, quantidade e preço na compra
  - Valor total do pedido
