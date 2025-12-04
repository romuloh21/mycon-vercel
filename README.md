# MYCON - Personal Finance Management System

## 📋 Sobre o Projeto

MYCON é um sistema completo de gerenciamento financeiro pessoal desenvolvido em Next.js, que permite aos usuários controlar seus orçamentos, despesas e visualizar dados financeiros através de dashboards interativos e responsivos.

## 🚀 Funcionalidades

### 💰 Gestão de Orçamentos
- **Criação de Orçamentos**: Interface intuitiva para criar novos orçamentos com ícones personalizados
- **Visualização em Cards**: Orçamentos exibidos em cards responsivos com indicadores visuais
- **Progresso Visual**: Barras de progresso mostrando percentual gasto vs. planejado
- **Edição e Exclusão**: Funcionalidades completas de CRUD para orçamentos

### 💳 Controle de Despesas
- **Adicionar Despesas**: Modal para inclusão rápida de novas despesas
- **Lista de Despesas**: Tabela responsiva com todas as transações
- **Filtros por Orçamento**: Visualização de despesas por categoria
- **Edição de Despesas**: Interface para modificar despesas existentes

### 📊 Dashboard Interativo
- **Resumo Financeiro**: Card principal com saldo restante e indicadores
- **Gráficos Dinâmicos**: 
  - Gráfico de barras (gastos mensais dos últimos 6 meses)
  - Gráfico de pizza (distribuição por categoria)
  - Gráfico de linha (gastos no cartão de crédito - 30 dias)
- **Carteira Digital**: Carousel com diferentes tipos de conta (conta corrente, cartão, poupança)
- **Transações Recentes**: Lista das últimas 5 transações
- **Indicadores de Saúde**: Métricas de saúde financeira em tempo real

### 🎨 Interface e UX
- **Design Responsivo**: Totalmente adaptado para mobile, tablet e desktop
- **Animações Suaves**: Transições e animações CSS personalizadas
- **Tema Glass Morphism**: Efeitos de vidro e blur para modernidade
- **Navegação Intuitiva**: Sidebar colapsível com navegação clara

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 14.2.2**: Framework React para produção
- **React 18**: Biblioteca para interfaces de usuário
- **Tailwind CSS**: Framework CSS utilitário
- **Lucide React**: Biblioteca de ícones moderna
- **Recharts**: Biblioteca para gráficos responsivos

### Backend & Database
- **Drizzle ORM**: ORM TypeScript-first para Node.js
- **Neon Database**: Banco de dados PostgreSQL serverless
- **Clerk**: Autenticação e gerenciamento de usuários

### UI Components
- **Shadcn/UI**: Componentes de UI reutilizáveis
- **Radix UI**: Primitivos de UI acessíveis
- **React Hook Form**: Gerenciamento de formulários
- **Sonner**: Sistema de notificações toast

## 📱 Responsividade

O projeto foi completamente otimizado para diferentes dispositivos:

- **Mobile First**: Design prioriza a experiência mobile
- **Breakpoints Inteligentes**: `sm:`, `md:`, `lg:`, `xl:`
- **Navegação Adaptativa**: Sidebar desktop + navigation mobile
- **Cards Flexíveis**: Layouts que se adaptam ao tamanho da tela
- **Modals Responsivos**: Dialogs que funcionam bem em qualquer tela

## 🎯 Funcionalidades Principais

### Dashboard Principal (`/dashboard`)
- Resumo financeiro completo
- 7 módulos organizados:
  1. **Hero Stats**: Saldo principal e ações rápidas
  2. **Histórico Mensal**: Gráfico de gastos dos últimos 6 meses
  3. **Sua Carteira**: Cards com diferentes contas
  4. **Gastos por Categoria**: Gráfico de pizza com distribuição
  5. **Meus Limites**: Orçamentos recentes com progresso
  6. **Transações Recentes**: Últimas movimentações
  7. **Cartão de Crédito**: Gastos dos últimos 30 dias

### Orçamentos (`/dashboard/budgets`)
- **Grid Responsivo**: Layout adaptável para diferentes telas
- **Criação Intuitiva**: Modal com seletor de emoji e validação
- **Cards Informativos**: Cada orçamento com informações completas
- **Indicadores Visuais**: Barras de progresso e status coloridos

### Despesas (`/dashboard/expenses`)
- **Listagem Completa**: Todas as despesas do usuário
- **Adicionar Rapidamente**: Botão flutuante para nova despesa
- **Filtragem**: Por orçamento e período
- **Tabela Responsiva**: Funciona bem em mobile e desktop

### Detalhes do Orçamento (`/dashboard/expenses/[id]`)
- **Visão Específica**: Foco em um orçamento individual
- **Gestão de Despesas**: Adicionar/editar despesas do orçamento
- **Ações Avançadas**: Editar e excluir orçamento
- **Confirmações**: Dialogs de confirmação para ações críticas

## 🔧 Arquitetura do Projeto

```
app/
├── globals.css # Estilos globais
├── layout.js # Layout raiz da aplicação
├── page.js # Página inicial
├── _components/ # Componentes compartilhados
│ ├── Header.jsx
│ └── Hero.jsx
├── (auth)/ # Rotas de autenticação
│ ├── sign-in/
│ └── sign-up/
├── (routes)/dashboard/ # Dashboard principal
│ ├── layout.jsx # Layout do dashboard
│ ├── page.jsx # Dashboard home
│ ├── _components/ # Componentes do dashboard
│ │ ├── SideNav.jsx # Navegação lateral
│ │ ├── DashboardHeader.jsx # Cabeçalho
│ │ ├── WalletCarrousel.jsx # Carousel de carteiras
│ │ └── MobileNav.jsx # Navegação mobile
│ ├── budgets/ # Módulo de orçamentos
│ │ ├── page.jsx
│ │ └── _components/
│ │ ├── CreateBudget.jsx
│ │ ├── BudgetItem.jsx
│ │ └── BudgetList.jsx
│ └── expenses/ # Módulo de despesas
│ ├── page.jsx
│ ├── page.jsx # Detalhes do orçamento
│ └── _components/
│ ├── AddExpense.jsx
│ ├── EditBudget.jsx
│ └── ExpenseListTable.jsx
└── api/ # API Routes
└── chat-mycon/route.ts # Endpoint do chatbot
```
## 📊 Banco de Dados

### Schema Principal
```sql
-- Tabela de Orçamentos
Budgets {
  id: serial primary key
  name: varchar(255)
  amount: numeric
  icon: varchar(10)
  createdBy: varchar(255)
  createdAt: timestamp
}

-- Tabela de Despesas
Expenses {
  id: serial primary key
  name: varchar(255)
  amount: numeric
  budgetId: integer (FK)
  createdAt: timestamp
}
```

## 🎨 Design System
### Cores Principais
- Primary: #005CE5 (Azul principal)
- Secondary: #003380 (Azul escuro)
- Success: #10b981 (Verde)
- Warning: #f59e0b (Amarelo)
- Error: #ef4444 (Vermelho)
### Animações
- Float: Animação flutuante para elementos decorativos
- Fade-in: Entrada suave com delay progressivo
- Glow: Efeito de brilho para cards principais
- Hover: Transformações suaves em interações
## 🔐 Autenticação
- Clerk Integration: Sistema - completo de autenticação
- Proteção de Rotas: Middleware para rotas protegidas
- Gestão de Usuários: Perfis e dados de usuário
- Multi-provider: Suporte a diferentes provedores de login
## 📈 Métricas e Analytics
### Cálculos Automáticos
- Saldo Restante: Orçamento total - Gastos totais
- Percentual Gasto: (Gastos / Orçamento) * 100
- Saúde Financeira: Indicador baseado no percentual gasto
- Despesas Mensais: Filtros por mês/ano atual
- Distribuição: Gastos por categoria de orçamento
Visualizações
- Gráficos Responsivos: Recharts com tooltips personalizados
- Formatação de Moeda: Padrão brasileiro (R$ 1.234,56)
- Estados Vazios: Placeholders para dados ausentes
- Loading States: Skeletons durante carregamento
## 🚀 Deploy e Configuração
### Variáveis de Ambiente
```env
# Database
DATABASE_URL=seu_neon_database_url

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=sua_clerk_key
CLERK_SECRET_KEY=sua_clerk_secret
```
### Scripts disponiveis
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

## 📱 Recursos Mobile
- Touch Friendly: Botões e áreas de toque otimizadas
- Swipe Navigation: Navegação por gestos onde apropriado
- Responsive Modals: Dialogs que ocupam tela inteira em mobile
- Sidebar Overlay: Navegação lateral como overlay em mobile
- Optimized Images: Carregamento otimizado de imagens
## 🔄 Funcionalidades Futuras
 - Metas Financeiras: Sistema de objetivos e acompanhamento
 - Relatórios PDF: Exportação de relatórios mensais
 - Notificações: Alertas para gastos e metas
 - Categorias Customizadas: Categorização avançada
 - Multi-moedas: Suporte a diferentes moedas
 - API Externa: Integração com bancos reais
- Backup/Sync: Sincronização entre dispositivos
 - Dark Mode: Tema escuro alternativo
## 👥 Contribuição
Este projeto foi desenvolvido com foco em:

Performance: Otimizações de carregamento e responsividade
UX/UI: Interface intuitiva e moderna
Acessibilidade: Componentes acessíveis com Radix UI
Manutenibilidade: Código limpo e bem estruturado
Escalabilidade: Arquitetura preparada para crescimento

## Status do Projeto: 
- ✅ Funcional e Responsivo
- Última Atualização: Dezembro 2024
- Desenvolvido com: Next.js, React, Tailwind CSS, Drizzle ORM
