# 🚀 Klonatec - Integração Inteligente de Softwares

Site institucional da Klonatec, empresa pioneira em Integração Inteligente de Softwares no Brasil.

## 📋 **Sobre o Projeto**

A Klonatec transforma dezenas de softwares fragmentados em uma única solução poderosa com Inteligência Artificial, eliminando desperdícios e maximizando eficiência operacional.

### **🎯 Principais Funcionalidades**

- **Site Responsivo**: Design moderno e adaptável
- **Formulário Inteligente**: Integração com IA para sugestões
- **Integração Supabase**: Salvamento automático de leads
- **SEO Otimizado**: Meta tags, Schema Markup, sitemap
- **PWA Ready**: Manifest e favicons configurados

## 🛠️ **Tecnologias Utilizadas**

- **Astro.js**: Framework moderno para sites estáticos
- **Tailwind CSS**: Framework de CSS utilitário
- **Supabase**: Backend-as-a-Service para banco de dados
- **Mistral AI**: Integração com IA para sugestões
- **JavaScript**: Funcionalidades interativas

## 🚀 **Como Executar**

### **Pré-requisitos**
- Node.js 18+ instalado
- npm ou yarn

### **Instalação**
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/klonatec-site.git

# Entre na pasta do projeto
cd klonatec-site

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

### **Acessar o Site**
Abra [http://localhost:4321](http://localhost:4321) no seu navegador.

## 📁 **Estrutura do Projeto**

```
klonatec-site/
├── src/
│   ├── components/     # Componentes Astro
│   ├── layouts/       # Layouts base
│   └── pages/         # Páginas do site
├── public/            # Arquivos estáticos
├── astro.config.mjs   # Configuração do Astro
├── tailwind.config.mjs # Configuração do Tailwind
└── package.json      # Dependências do projeto
```

## 🔧 **Configuração**

### **Variáveis de Ambiente**
Crie um arquivo `.env` na raiz do projeto:

```env
SUPABASE_URL=sua_url_do_supabase
SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
MISTRAL_API_KEY=sua_chave_do_mistral
```

### **Banco de Dados**
Execute o SQL em `create-table-leads.sql` no Supabase para criar a tabela de leads.

## 📊 **Funcionalidades do Site**

### **Seções Principais**
- **Hero**: Apresentação principal com CTA
- **Problema**: Identificação de desafios
- **Solução**: Como resolvemos os problemas
- **Serviços**: Nossos serviços especializados
- **Investigation**: Processo de investigação
- **Stats**: Estatísticas de economia
- **CTA**: Formulário de contato
- **Footer**: Informações da empresa

### **Formulário Inteligente**
- **Campos**: Nome, email, telefone, empresa, cargo, mensagem
- **IA Integration**: Sugestões automáticas com Mistral AI
- **Modal Customizado**: Interface elegante para sugestões
- **Toast Notifications**: Feedback visual personalizado

## 🎨 **Design System**

### **Cores**
- **Primary**: Laranja (#f97316)
- **Secondary**: Vermelho (#ef4444)
- **Accent**: Amarelo (#eab308)
- **Neutral**: Cinza (#64748b)

### **Tipografia**
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

## 📱 **Responsividade**

O site é totalmente responsivo e otimizado para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🔍 **SEO**

### **Meta Tags**
- Title, description, keywords
- Open Graph (Facebook)
- Twitter Cards
- Schema Markup

### **Arquivos SEO**
- `sitemap.xml`: Mapa do site
- `robots.txt`: Diretrizes para crawlers
- `site.webmanifest`: PWA manifest

## 🚀 **Deploy**

### **Vercel (Recomendado)**
```bash
# Instale a Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### **Netlify**
```bash
# Build do projeto
npm run build

# Upload da pasta dist/
```

### **GitHub Pages**
```bash
# Build
npm run build

# Commit da pasta dist/
git add dist/
git commit -m "Deploy"
git push origin gh-pages
```

## 📈 **Analytics e Monitoramento**

- **Supabase**: Leads e dados de formulário
- **Console Logs**: Debug e monitoramento
- **Error Tracking**: Tratamento de erros

## 🤝 **Contribuição**

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 **Contato**

- **Website**: [klonatec.com](https://klonatec.com)
- **Email**: contato@klonatec.com
- **CNPJ**: 62.449.971/0001-70

---

**Desenvolvido com ❤️ pela equipe Klonatec**