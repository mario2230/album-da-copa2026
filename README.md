# Álbum da Copa - Aplicativo Mobile

## Informações do Aluno

**Nome:** Mario Gonçalves de Freitas Junior
**Curso:** Ensino Médio Integrado com Técnico de Informática para Internet
**Unidade Curricular:** Codificar Aplicações para Dispositivos Móveis

---

## Sobre o Projeto

O **Álbum da Copa** é um aplicativo mobile desenvolvido com **Ionic + Vue.js**, criado com o objetivo de simular um álbum digital de figurinhas da Copa do Mundo.

O sistema permite que usuários realizem autenticação, visualizem jogadores de diferentes seleções, pesquisem figurinhas e acompanhem o progresso do álbum.

O projeto foi desenvolvido utilizando **componentização**, **composables**, **roteamento protegido** e **armazenamento local em memória**, sem uso de banco de dados externo.

---

## Funcionalidades do Aplicativo

### Autenticação de Usuário

* Login com e-mail e senha
* Cadastro de novos usuários
* Recuperação de senha (simulada)
* Validação de senha forte
* Controle de acesso às rotas
* Logout do sistema

### Sistema de Álbum de Figurinhas

* Exibição de figurinhas de jogadores
* Foto do jogador
* Nome do jogador
* Seleção do jogador
* Status da figurinha:

  * Coletada
  * Pendente
* Marcar figurinha como coletada

### Pesquisa e Filtros

* Pesquisa por nome do jogador
* Pesquisa por seleção
* Filtro para visualizar:

  * Todas as figurinhas
  * Figurinhas coletadas
  * Figurinhas pendentes

### Navegação do Aplicativo

* Navegação utilizando Tabs do Ionic
* Tela principal do álbum
* Tela de perfil do usuário
* Proteção de páginas privadas

### Recursos Extras Implementados

* Toasts para feedback visual
* Componentização da interface
* Composables reutilizáveis
* Interface responsiva utilizando componentes do Ionic
* Guard de rotas para autenticação

---

## Tecnologias Utilizadas

* Vue.js 3
* Ionic Framework
* TypeScript
* Vue Router
* Composition API

---

## Estrutura do Projeto

```txt
src/
│── components/
│   ├── AppHeader.vue
│   ├── LoginForm.vue
│   ├── RegisterForm.vue
│   ├── ResetPasswordForm.vue
│   ├── StickerCard.vue
│   └── StickerList.vue
│
│── composables/
│   ├── useAuth.ts
│   └── useAlbum.ts
│
│── views/
│   ├── LoginPage.vue
│   ├── CadastroPage.vue
│   ├── ResetPassPage.vue
│   ├── AlbumPage.vue
│   ├── PerfilPage.vue
│   └── TabsPage.vue
│
└── router/
    └── index.ts
```

## Como Executar o Projeto

1. Instale as dependências:

```bash
npm install
```

2. Execute o projeto:

```bash
ionic serve
```

3. O aplicativo será iniciado no navegador para testes.

---

## Usuário Padrão para Testes

**E-mail:** [admin@email.com](mailto:admin@email.com)
**Senha:** 123456
