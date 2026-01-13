# Team PRI — Agência de Design e Software

Nossa Landing page moderna e elegante criada com Next.js, React e TailwindCSS.

## 🚀 Tecnologias

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **TailwindCSS**
- **Swiper.js** (Carrossel de depoimentos)
- **Lucide React** (Ícones)

## 📦 Instalação

1. Instale as dependências:

```bash
npm install
```

ou

```bash
yarn install
```

ou

```bash
pnpm install
```

## 🏃 Executando o projeto

### Modo de desenvolvimento:

```bash
npm run dev
```

ou

```bash
yarn dev
```

ou

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build para produção:

```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
Team PRI/
├── app/
│   ├── globals.css          # Estilos globais e TailwindCSS
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página inicial
├── components/
│   ├── Header.tsx           # Header fixo com seletor de idioma
│   ├── Hero.tsx             # Seção Hero
│   ├── Services.tsx         # Seção de Serviços
│   ├── Portfolio.tsx        # Seção de Portfólio/Projetos
│   ├── Testimonials.tsx     # Carrossel de Depoimentos
│   ├── Footer.tsx           # Rodapé
│   └── LanguageSwitcher.tsx # Seletor de idioma (PT/EN/ES)
├── public/                  # Arquivos estáticos
├── next.config.js           # Configuração do Next.js
├── tailwind.config.js       # Configuração do TailwindCSS
├── tsconfig.json            # Configuração do TypeScript
└── package.json             # Dependências do projeto
```

## 🎨 Características

- ✅ Design moderno e elegante
- ✅ 100% responsivo
- ✅ Animações suaves
- ✅ Gradientes animados
- ✅ Carrossel de depoimentos
- ✅ Efeitos hover interativos
- ✅ Paleta de cores tech (roxo, azul, rosa neon)
- ✅ Seção de portfólio com filtros por categoria
- ✅ Seletor de idioma (PT/EN/ES) - preparado para i18n
- ✅ Header fixo com scroll

## 🎯 Componentes

### Hero
- Título chamativo com gradiente
- Botão CTA estiloso
- Background com gradiente animado
- Shapes decorativos

### Serviços
- 4 cards de serviços
- Ícones do Lucide React
- Efeitos hover com gradiente
- Animações de entrada

### Portfólio
- Grid de projetos com filtros por categoria
- 3 categorias: Designer, Landing Pages, Sistemas
- Cards interativos com hover effects
- Tags de tecnologias
- Links para projetos externos
- Animações de entrada suaves

### Depoimentos
- Carrossel com Swiper.js
- 3 depoimentos fictícios
- Avatares gerados automaticamente
- Design minimalista

### Footer
- Logo estilizado
- Menu de navegação
- Links de redes sociais
- Design escuro elegante

### Header & Idioma
- Header fixo que aparece no scroll
- Seletor de idioma (Português, English, Español)
- Preparado para integração com i18n (next-intl)

## 📝 Personalização

Você pode personalizar:
- Cores no arquivo `tailwind.config.js`
- Conteúdo dos componentes em `components/`
- Estilos globais em `app/globals.css`
- Projetos do portfólio em `components/Portfolio.tsx`
- Textos e traduções (preparado para i18n)

## 🌍 Internacionalização

O projeto possui suporte completo para múltiplos idiomas (Português, Inglês, Espanhol e Francês) usando um sistema de Context API customizado. As traduções estão em `messages/` e são gerenciadas pelo `LanguageContext`.

## 📧 Configuração de Email

O formulário de contato está configurado para enviar emails para `teampri.business@gmail.com` usando Gmail com senha de app.

### Como configurar:

1. **Crie uma senha de app do Gmail:**
   - Acesse sua conta Google: https://myaccount.google.com
   - Vá em **Segurança** → **Verificação em duas etapas** (ative se ainda não estiver)
   - Depois, vá em **Segurança** → **Senhas de app**
   - Selecione **App**: "Email" e **Dispositivo**: "Outro (nome personalizado)"
   - Digite "Team PRI Site" e clique em **Gerar**
   - **Copie a senha gerada** (16 caracteres, sem espaços)

2. **Crie o arquivo `.env.local` na raiz do projeto:**
   ```env
   GMAIL_USER=teampri.business@gmail.com
   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
   ```
   ⚠️ **Importante:** Cole a senha de app sem espaços (remova os espaços entre os grupos de 4 caracteres)

3. **Reinicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

**Nota:** Sem a configuração das variáveis, o formulário ainda funcionará, mas apenas registrará os dados no console do servidor (modo desenvolvimento).

### Dicas:
- A senha de app é diferente da sua senha normal do Gmail
- Não compartilhe a senha de app publicamente
- Se precisar gerar uma nova senha de app, você pode revogar a antiga em **Senhas de app**

## 👥 Team PRI

Equipe composta por:
- **Paulo** - Designer
- **Roni** - Desenvolvedor Full-stack
- **Iago** - Desenvolvedor Full-stack

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

