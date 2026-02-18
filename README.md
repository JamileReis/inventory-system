*Control Stock — Frontend*

Aplicação web responsável pela interface do sistema de controle de estoque e apoio à produção. Por meio dela, é possível cadastrar e acompanhar matérias-primas, gerenciar produtos e suas composições e visualizar, de forma prática, o que pode ser produzido com base no estoque disponível.

A interface foi pensada para ser simples de usar, rápida e consistente, refletindo imediatamente qualquer alteração feita nos dados.

*Arquitetura*

O gerenciamento de estado foi implementado utilizando Redux Toolkit, seguindo o padrão Flux. A escolha por um estado global centralizado ocorreu porque diferentes partes do sistema dependem das mesmas informações. Uma mudança no estoque, por exemplo, impacta diretamente os cálculos de produção e precisa aparecer imediatamente em todas as telas.

Centralizar esses dados evita inconsistências, reduz a necessidade de comunicação direta entre componentes e facilita a manutenção da aplicação.

*Estrutura principal*

*Store*
É o ponto central onde todo o estado global da aplicação é armazenado. Ela reúne os reducers de cada domínio e permite que qualquer componente acesse os dados atualizados sem precisar gerenciar estados duplicados.

Slices 
Cada funcionalidade principal possui seu próprio slice, responsável por concentrar:

Estado inicial

Reducers

Ações

Operações assíncronas para comunicação com a API

Essa organização mantém o código modular e facilita a evolução do sistema sem afetar outras partes da aplicação.

*Services*
Camada responsável pela comunicação com o backend. Utiliza Axios para realizar requisições HTTP e concentra toda a lógica de acesso à API em um único lugar, evitando repetição de código e dependências diretas nos componentes.

*Funcionalidades*
*Gestão de Matérias-Primas*

Permite controlar os insumos disponíveis no estoque.

Principais operações:

Visualização da lista atual de matérias-primas

Cadastro de novos itens

Remoção de insumos

Atualização automática da interface após cada alteração

Os dados são gerenciados pelo rawMaterialsSlice, garantindo que a interface permaneça sincronizada com o backend.

*Gestão de Produtos e Composições*

Permite administrar os produtos finais e definir quais matérias-primas são necessárias para produzi-los.

Principais características:

Cadastro e exclusão de produtos

Associação de insumos a cada produto

Definição das quantidades necessárias

Visualização da composição diretamente na mesma tela

Manter essas informações juntas reduz a navegação entre páginas e facilita o entendimento da estrutura de produção.

*Sugestão de Produção*

Apresenta quais produtos podem ser fabricados com o estoque atual.

*Funcionalidades:*

Consulta ao backend para obter os cálculos mais recentes

Priorização automática de produtos de maior valor

Exibição clara das quantidades possíveis de produção

Os dados são controlados pelo productionSlice, responsável por solicitar e armazenar a sugestão retornada pela API.

*Tecnologias Utilizadas*

*React*
Responsável pela construção da interface baseada em componentes reutilizáveis.

*Redux Toolkit*
Gerenciamento de estado global com configuração simplificada e suporte integrado para operações assíncronas.

*Axios*
Cliente HTTP utilizado para comunicação com a API REST.

*CSS3*
Estilização personalizada da aplicação.

*Objetivo do Frontend*

Oferecer uma interface intuitiva para operar o sistema de estoque e produção, mantendo todas as telas sincronizadas com os dados atuais e permitindo que o usuário realize as principais operações de forma rápida e sem complexidade desnecessária.
