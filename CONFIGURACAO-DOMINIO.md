# 🌐 Configuração do Domínio klonatec.com

## 📋 Checklist de Configuração

### ✅ 1. Deploy no Vercel
```bash
vercel --prod
```

### ✅ 2. Configurar DNS na King Hostinger

**Acesse:** https://www.kinghost.com.br/
- **Meus Domínios** → **klonatec.com**
- **DNS** → **Gerenciar DNS**

**Adicionar registros:**
```
Tipo: A
Nome: @
Valor: 76.76.19.61
TTL: 3600

Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
TTL: 3600
```

### ✅ 3. Configurar no Vercel Dashboard

**Acesse:** https://vercel.com/dashboard
- **Seu projeto** → **Settings** → **Domains**
- **Add Domain**: `klonatec.com`
- **Add Domain**: `www.klonatec.com`

### ✅ 4. Verificar Status

**Aguardar propagação DNS (24-48h):**
- ✅ `klonatec.com` → Funcionando
- ✅ `www.klonatec.com` → Funcionando
- ✅ HTTPS automático
- ✅ SSL certificado

## 🔧 Comandos Úteis

```bash
# Verificar DNS
nslookup klonatec.com

# Verificar SSL
curl -I https://klonatec.com

# Deploy automático
git push origin main
```

## 📱 URLs Finais

- **Principal**: https://klonatec.com
- **WWW**: https://www.klonatec.com
- **Admin**: https://vercel.com/dashboard

## 🚀 Benefícios

- ✅ **SSL Gratuito**: HTTPS automático
- ✅ **CDN Global**: Carregamento rápido
- ✅ **Deploy Automático**: Git push = deploy
- ✅ **Domínio Personalizado**: klonatec.com
- ✅ **SEO Otimizado**: Meta tags configuradas
