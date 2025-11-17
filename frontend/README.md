# StockBox - Sistema de Controle de Estoque

Um sistema para controlar itens no estoque: entradas, saídas e quantidade atual.

## Funcionalidades

- **CRUD de Produtos**: Cadastrar, listar, editar e excluir produtos
- **Registro de Movimentações**: Controle completo de entradas e saídas
- **Alerta de Estoque Baixo**: Notificações automáticas para produtos críticos

## Tecnologias

- React 18.3.1
- TypeScript 5.6.3
- Vite 5.4.11
- TailwindCSS 3.4.14
- React Router DOM 6.26.2
- TanStack Query 5.59.20
- Axios 1.7.7
- Zustand 5.0.1

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

Edite as variáveis de ambiente conforme necessário.

## Desenvolvimento

```bash
npm run dev
```

Acesse http://localhost:5173

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Estrutura do Projeto

```
src/
├── app/              # Configuração da aplicação
├── assets/           # Arquivos estáticos
├── core/             # Componentes e utilitários globais
├── domain/           # Módulos de domínio
└── pages/            # Páginas da aplicação
```

## Licença

MIT