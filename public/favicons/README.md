# Favicons para Klonatec

## Arquivos necessários:

Para completar a configuração do favicon, você precisa criar os seguintes arquivos PNG na pasta `/public/`:

- `favicon-16x16.png` (16x16 pixels)
- `favicon-32x32.png` (32x32 pixels) 
- `favicon-192x192.png` (192x192 pixels)
- `favicon-512x512.png` (512x512 pixels)
- `apple-touch-icon.png` (180x180 pixels)

## Como gerar:

1. Use uma imagem base com a logo da Klonatec
2. Converta para PNG nas dimensões especificadas
3. Use ferramentas como:
   - Online: https://favicon.io/favicon-converter/
   - Photoshop/GIMP
   - Comando: `convert logo.png -resize 16x16 favicon-16x16.png`

## Design:

- Cor de fundo: #F5793B (laranja da marca)
- Logo "K" ou símbolo da Klonatec
- Fonte: Arial Bold
- Tamanho: proporcional para cada dimensão

## Arquivos já configurados:

- ✅ `site.webmanifest` - Manifest PWA
- ✅ Meta tags no Layout.astro
- ✅ Apple touch icon configurado
- ✅ Theme color: #F5793B
- ✅ Background color: #0f172a
