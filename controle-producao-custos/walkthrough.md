# Walkthrough - Aplicativo de Controle de Produção e Custos (Agri Doce)

Desenvolvemos um aplicativo completo de página única (SPA) para gerenciamento de insumos, ficha técnica (cálculo de custos), custos de produção de recheios (sub-receitas), ordens de produção (lotes) e exportação de backups JSON. O aplicativo segue rigorosamente as regras estéticas das imagens de inspiração (minimalista, elegante, estilo editorial da Pentagram e BASIC/DEPT).

Além disso, o aplicativo foi configurado para empacotamento nativo multiplataforma: **Electron** para PC/Desktop e **Capacitor** para Celular/Mobile.

---

## Estrutura do Projeto e Empacotamento

Os arquivos foram alocados em uma subpasta dedicada no workspace: `controle-producao-custos/`

1.  **[index.html](file:///c:/Users/artsc/Desktop/CLIENTES/SITE%20ANTIGRAVITY/SITE%20LAIS/controle-producao-custos/index.html)**:
    *   Estruturação semântica em HTML5.
    *   Navegação dinâmica baseada em abas: *Dashboard*, *Insumos (Estoque)*, *Recheios*, *Receitas & Custos*, *Ordens de Produção* e *Backup & Dados*.
    *   Aba dedicada a **Recheios** com tabela completa contendo custo de ingredientes, rateio de tempo de preparo e mão de obra, margem de custos fixos, rendimento do lote e custo unitário.
    *   Modais interativos para criação/edição de receitas (fichas técnicas), criação/edição de custos de recheios e visualização detalhada de custos e impressão.
2.  **[style.css](file:///c:/Users/artsc/Desktop/CLIENTES/SITE%20ANTIGRAVITY/SITE%20LAIS/controle-producao-custos/style.css)**:
    *   Foco em tipografia premium usando Google Fonts (Outfit e Inter).
    *   Estilo editorial: linhas finas sólidas de `1px` dividindo o layout de abas e tabelas, fundo off-white suave, cores em preto profundo e verde floresta.
    *   Animações de transição de abas e modais suaves, além da animação de foco (`.flash-focus`).
    *   Responsividade mobile-first completa.
3.  **[app.js](file:///c:/Users/artsc/Desktop/CLIENTES/SITE%20ANTIGRAVITY/SITE%20LAIS/controle-producao-custos/app.js)**:
    *   Lógica de gerenciamento de estado e persistência local via `localStorage`.
    *   **Pré-carregamento automático**: Insumos comuns (incluindo Gás de Cozinha e Peito de Frango), recheios modelo ("Recheio de Frango Desfiado" e "Recheio de Carne Moída") e receitas fornecidas no PDF da Agri Doce são carregados de forma inteligente.
    *   **Conversão Inteligente de Unidades**: A lógica suporta conversões automáticas entre unidades compatíveis (`kg` para `g` e vice-versa, `L` para `ml` e vice-versa, além de `unidades`).
    *   **Cálculo da Ficha Técnica e Sub-receitas (Recheios)**:
        *   Cálculo do custo de sub-receitas (recheios) agregando os insumos.
        *   Cálculo automático de Mão de Obra com base na fórmula: `(Custo_Hora / 60) * Tempo_Preparo_Minutos`.
        *   Custo proporcional de insumos, recheios ou receitas base adicionados.
        *   Cálculo de Margem de Lucro desejada com sugestão automática do preço ideal de venda e margem líquida.
    *   **Abatimento e Devolução de Estoque Recursivo**: Ordens de produção verificam se há estoque de matérias-primas e deduzem as proporções correspondentes. Caso uma receita utilize recheios ou massas base compostos, o algoritmo realiza o abatimento recursivo dos insumos básicos. Ao desfazer a ordem, as quantidades são devolvidas ao estoque na mesma lógica.
    *   **Mecanismo de Impressão**: Layout limpo projetado especificamente para impressão física ou PDF de fichas técnicas individuais (tanto para receitas finais quanto para recheios).
    *   **Módulo de Backups**: Permite exportar o banco de dados em JSON ou importar backups antigos com tratamento seguro para inclusão de novos campos.

### Módulos do Aplicativo Nativo
4.  **[package.json](file:///c:/Users/artsc/Desktop/CLIENTES/SITE%20ANTIGRAVITY/SITE%20LAIS/controle-producao-custos/package.json)**:
    *   Gerenciador de dependências locais do Node.js, contendo os pacotes `electron`, `@capacitor/core`, `@capacitor/cli` e `@capacitor/android`.
    *   Scripts utilitários pré-configurados:
        *   `npm run build`: Roda o compilador de distribuição.
        *   `npm start`: Compila e inicia a janela desktop no PC.
        *   `npm run cap:sync`: Sincroniza os arquivos estáticos compilados com o Capacitor Mobile.
5.  **[build.js](file:///c:/Users/artsc/Desktop/CLIENTES/SITE%20ANTIGRAVITY/SITE%20LAIS/controle-producao-custos/build.js)**:
    *   Script que isola o código final na subpasta `www/` para evitar que os arquivos de configuração do Electron/Capacitor interfiram nos pacotes do celular.
6.  **[main.js](file:///c:/Users/artsc/Desktop/CLIENTES/SITE%20ANTIGRAVITY/SITE%20LAIS/controle-producao-custos/main.js)**:
    *   Código de entrada do Electron. Remove a barra de menus para dar aspecto nativo profissional de janela limpa e carrega o arquivo `www/index.html`.
7.  **[capacitor.config.json](file:///c:/Users/artsc/Desktop/CLIENTES/SITE%20ANTIGRAVITY/SITE%20LAIS/controle-producao-custos/capacitor.config.json)**:
    *   Configurações estruturais do aplicativo híbrido para apontar a pasta `www/` como a origem dos arquivos no Android/iOS.

---

## O que foi verificado (Testes)

1.  **Execução Desktop (Electron)**:
    *   Testada a inicialização com `npm start`. A janela abriu na proporção correta (`1280x800`), renderizando a tipografia Outfit e Inter e aplicando a persistência local com sucesso.
2.  **Sincronização Mobile (Capacitor)**:
    *   Adicionada a plataforma Android com sucesso. O Capacitor criou a estrutura do Android Studio, e o comando `npm run cap:sync` espelhou com sucesso os arquivos na pasta do aplicativo nativo.
3.  **Fluxo de Custos de Recheios**:
    *   Validada a lógica de custo proporcional do recheio. Por exemplo, o "Recheio de Frango Desfiado" consome insumos básicos e 150g de Gás de Cozinha, calculando o custo total e o custo proporcional unitário (R$/kg). Ao usar o recheio na receita "Risoles de Carne", o valor é perfeitamente rateado.
4.  **Mão de Obra Baseada em Tempo**:
    *   Verificado que ao cadastrar um tempo de preparo de 45 minutos com uma taxa de R$ 20,00/hora, o sistema calcula exatamente R$ 15,00 de mão de obra (`(20 / 60) * 45`).
5.  **Abatimento e Retorno do Estoque Recursivo**:
    *   Ao lançar um lote de produção do "Risoles de Carne" (que usa a sub-receita "Recheio de Carne Moída"), o estoque de guisado, cebola, alho, óleo, sal, chimichurri, salsinha e gás de botijão diminuiu na quantidade exata e proporcional descrita na receita e na sub-receita.
    *   Ao clicar em "Desfazer" na produção correspondente, todos esses insumos básicos retornaram ao estoque com total exatidão.
6.  **Persistência**:
    *   Ao recarregar o navegador (`F5`) ou reiniciar o aplicativo Electron, todos os dados adicionados, modificados ou removidos persistem perfeitamente.

---

## Desenvolvedor: Fluxo de Trabalho (Workflow)

### Como rodar no PC (Electron)
```bash
npm start
```

### Como gerar o Aplicativo Celular (Android)
1. Certifique-se de ter o **Android Studio** instalado no computador.
2. Execute o comando para sincronizar os arquivos atualizados:
   ```bash
   npm run cap:sync
   ```
3. Abra o projeto Android no Android Studio:
   ```bash
   npx cap open android
   ```
4. No Android Studio, clique em **Build > Build Bundle(s) / APK(s) > Build APK(s)**. O Android Studio gerará o arquivo `.apk` pronto para instalar no seu celular.
