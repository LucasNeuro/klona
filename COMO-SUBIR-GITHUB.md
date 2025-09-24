# 🚀 Como Subir o Projeto no GitHub

## **Passo 1: Criar Repositório no GitHub**
1. Acesse [github.com](https://github.com)
2. Clique em "New repository"
3. Nome: `klonatec-site`
4. Descrição: "Site institucional da Klonatec - Integração Inteligente de Softwares"
5. Marque "Public" ou "Private"
6. **NÃO** marque "Add README" (já temos um)
7. Clique "Create repository"

## **Passo 2: Preparar o Projeto Local**

### **No Terminal (PowerShell):**
```bash
# Navegar para a pasta do projeto
cd C:\Users\anima\OneDrive\Desktop\clonatec\klonatec-site

# Inicializar git (se ainda não foi feito)
git init

# Adicionar todos os arquivos
git add .

# Primeiro commit
git commit -m "🚀 Initial commit - Klonatec site completo"

# Conectar com o repositório remoto (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/klonatec-site.git

# Enviar para o GitHub
git push -u origin main
```

## **Passo 3: Verificar se Funcionou**
- Acesse seu repositório no GitHub
- Verifique se todos os arquivos estão lá
- O README.md deve aparecer automaticamente

## **📁 Arquivos que Serão Enviados:**
- ✅ `src/` - Código fonte
- ✅ `public/` - Arquivos estáticos
- ✅ `package.json` - Dependências
- ✅ `README.md` - Documentação
- ✅ `astro.config.mjs` - Configuração
- ✅ `tailwind.config.mjs` - CSS

## **🔒 Arquivos que NÃO Serão Enviados:**
- ❌ `.env` - Chaves secretas (já está no .gitignore)
- ❌ `node_modules/` - Dependências (já está no .gitignore)
- ❌ `.astro/` - Cache do Astro (já está no .gitignore)

## **🚀 Próximos Passos (Opcional):**
1. **Deploy Automático**: Conectar com Vercel/Netlify
2. **GitHub Pages**: Para hospedar gratuitamente
3. **Actions**: Para CI/CD automático

---

**Dica**: Se der erro de autenticação, use GitHub CLI ou configure SSH keys!
