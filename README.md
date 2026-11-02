# 💰 Controle de Gastos Pessoais

Uma aplicação web intuitiva, moderna e responsiva para gestão financeira pessoal diária. O projeto permite registrar receitas e despesas, calcular automaticamente o saldo líquido em tempo real e gerenciar transações por meio de um fluxo **CRUD completo** (Criação, Leitura, Edição e Exclusão).

Desenvolvido artesanalmente com **JavaScript Puro (Vanilla)** e **ES Modules**, priorizando o domínio profundo dos fundamentos da web, manipulação de DOM e consumo de APIs RESTful sem depender de frameworks.

---

## ✨ Funcionalidades Principais

* **➕ Registro Rápido:** Cadastro de transações com nome, valor e categoria (*Entrada* ou *Gasto*).
* **📊 Saldo em Tempo Real:** Cálculo dinâmico do saldo geral acumulado (`Entradas − Gastos`) utilizando o método `.reduce()` do JavaScript, com estilização visual condicional (verde para saldo positivo, vermelho para negativo).
* **📜 Histórico Interativo:** Visualização em lista de todas as movimentações, com formatação monetária brasileira oficial (`R$ 1.500,00`) através da API nativa `Intl.NumberFormat`.
* **✏️ Edição Dinâmica com Modal:** Interface moderna utilizando a tag nativa `<dialog>` com efeito visual de *glassmorphism* (fundo translúcido e desfoque). Ao clicar no lápis, os dados da transação são pré-carregados para alteração via requisição `PUT`.
* **❌ Exclusão Segura:** Remoção instantânea de transações do banco de dados local via requisição `DELETE`.
* **🎨 Design & Animações:** Layout moderno construído com CSS Flexbox e animações fluidas de entrada com `@keyframes`.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5 Semântico:** Estruturação acessível, uso da API nativa `<dialog>` e `<header>/<main>/<article>`.
* **CSS3 Moderno:** Flexbox layout, variáveis, pseudo-elementos, *backdrop-filter* (efeito de vidro) e animações `@keyframes`.
* **JavaScript ES6+ (Vanilla):** 
  * Arquitetura modular com **ES Modules** (`import` / `export` nativo).
  * Consumo de API RESTful assíncrono com `Fetch API` e `async/await`.
  * Manipulação direta da árvore do DOM (`createElement`, `append`, `addEventListener`).
  * API nativa de internacionalização (`Intl.NumberFormat`).
* **JSON-Server:** Simulação de um backend RESTful completo rodando localmente para persistência de dados em arquivo JSON.
* **FontAwesome:** Ícones vetoriais integrados de forma semântica em botões de ação.

---

## 📂 Estrutura do Projeto

O código foi desacoplado em módulos independentes seguindo o princípio da responsabilidade única:

```text
├── index.html            # Estrutura semântica e template do modal
├── style.css             # Folha de estilos, paleta de cores e animações
├── index.js              # Ponto de entrada, escuta de formulários e inicialização
├── fetchTransactions.js  # Módulo de requisição inicial e cálculo de saldo
├── showTransaction.js   # Módulo responsável por renderizar cada card no DOM
├── formatter.js          # Módulo centralizado de formatação de moedas (BRL)
├── db.example.json       # Modelo de dados fictícios para inicialização
├── package.json          # Gerenciador de dependências e scripts de execução
└── .gitignore            # Proteção de arquivos locais e pastas pesadas
```

---

## 🚀 Como Rodar o Projeto na Sua Máquina

### Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu computador.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/esdrasioseph/expense-control.git
   cd expense-control
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Crie o seu arquivo de banco de dados a partir do exemplo:**
   * No Windows (PowerShell):
     ```powershell
     Copy-Item db.example.json db.json
     ```
   * No Linux / macOS:
     ```bash
     cp db.example.json db.json
     ```

4. **Inicie o servidor local (API REST):**
   ```bash
   npm run json-server
   ```
   *O servidor estará rodando em `http://localhost:3000`.*

5. **Abra o projeto no navegador:**
   * Basta abrir o arquivo `index.html` utilizando a extensão **Live Server** do VS Code (ou qualquer servidor estático local).

---

## 🧠 Aprendizados e Decisões de Arquitetura

* **Por que ES Modules?** A separação do código em pequenos módulos (`showTransaction.js`, `fetchTransactions.js`, `formatter.js`) evita arquivos gigantes e facilita a manutenção sem a necessidade de ferramentas pesadas de empacotamento (*bundlers*).
* **Dado Puro vs. Dado Exibido:** O banco de dados (`db.json`) armazena valores estritamente numéricos para garantir a precisão matemática dos cálculos. A maquiagem visual com símbolo de moeda (`R$`) e vírgulas ocorre exclusivamente no momento da renderização em tela.
* **Respeito ao Top Layer:** Uso do elemento `<dialog>` em detrimento de `divs` com `z-index` manual, aproveitando o comportamento nativo de acessibilidade do navegador (fechamento automático com a tecla `Esc` e renderização na camada superior do documento).

---

Feito com dedicação e código artesanal por [Esdras Ioseph](https://github.com/esdrasioseph). 🚀

