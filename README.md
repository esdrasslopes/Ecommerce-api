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
