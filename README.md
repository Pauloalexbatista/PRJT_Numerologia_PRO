# 🔮 Numerologia PRO

Uma aplicação web moderna e elegante para cálculos de Numerologia Pitagórica, oferecendo mapas numerológicos completos e personalizados.

## ✨ Características

- **Cálculo Completo de Mapa Numerológico**
  - Caminho de Vida (Destino)
  - Número da Alma (Motivação)
  - Número da Personalidade (Impressão)
  - Número de Expressão
  
- **Análises Avançadas**
  - Ano Pessoal e Previsões
  - Ciclos de Vida (Formativo, Produtivo, Colheita)
  - Desafios Principais e Menores
  - Lições Cármicas
  - Tendências Ocultas
  - Análise de Temperamento (Físico, Mental, Emocional, Intuitivo)

- **Exportação em PDF**
  - Geração automática de relatório completo
  - Design profissional e elegante
  - Pronto para impressão

- **Interface Premium**
  - Design moderno com glassmorphism
  - Animações suaves com Framer Motion
  - Totalmente responsivo
  - Modo escuro elegante

## 🛠️ Tecnologias

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animações**: [Framer Motion](https://www.framer.com/motion/)
- **Base de Dados**: [SQLite](https://www.sqlite.org/) (via better-sqlite3)
- **Exportação PDF**: html2canvas + jsPDF
- **Ícones**: [Lucide React](https://lucide.dev/)

## 🚀 Instalação

### Pré-requisitos

- Node.js 20+ instalado
- npm, yarn, pnpm ou bun

### Passos

1. **Clone o repositório**

   ```bash
   git clone <seu-repositorio>
   cd web
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Execute o servidor de desenvolvimento**

   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

4. **Abra no navegador**

   Acesse [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
web/
├── src/
│   ├── app/              # App Router (páginas e rotas)
│   ├── components/       # Componentes React
│   ├── lib/             # Lógica de negócio
│   │   ├── engine.ts    # Motor de cálculo numerológico
│   │   ├── db.ts        # Configuração SQLite
│   │   └── data-definitions.ts  # Significados e interpretações
│   └── styles/          # Estilos globais
├── public/              # Arquivos estáticos
├── numerology.db        # Base de dados SQLite (gerada automaticamente)
└── package.json
```

## 🎯 Como Usar

1. **Insira seus dados**
   - Nome completo de nascimento (como na certidão)
   - Data de nascimento

2. **Visualize seu Destino**
   - O sistema calcula e exibe seu Caminho de Vida

3. **Desbloqueie o Mapa Completo**
   - Clique para revelar todas as análises
   - Explore cada aspecto do seu perfil numerológico

4. **Exporte em PDF**
   - Baixe seu mapa completo em formato PDF
   - Compartilhe ou imprima

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter ESLint

## 📝 Licença

Este projeto é privado e de uso pessoal.

## 🙏 Agradecimentos

Baseado nos princípios da Numerologia Pitagórica Moderna.
