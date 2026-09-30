document.addEventListener('DOMContentLoaded', () => {
    // Referências do DOM
    const inputTitulo = document.getElementById('input-titulo');
    const inputSubtitulo = document.getElementById('input-subtitulo');
    const inputTelefone = document.getElementById('input-telefone');
    const inputInstagram = document.getElementById('input-instagram');
    const inputEndereco = document.getElementById('input-endereco');
    const inputHistoria = document.getElementById('input-historia');
    const inputQtdInfo = document.getElementById('input-qtd-info');
    const categoriasContainer = document.getElementById('categorias-container');
    const previewContainer = document.getElementById('visual-catalog-preview');
    
    const btnSalvar = document.getElementById('btn-salvar');
    const btnImprimir = document.getElementById('btn-imprimir');
    const btnReset = document.getElementById('btn-reset');
    const btnCalcTodosUnitarios = document.getElementById('btn-calc-todos-unitarios');
    const btnExportarJson = document.getElementById('btn-exportar-json');
    const btnImportarTrigger = document.getElementById('btn-importar-trigger');
    const inputImportarJson = document.getElementById('input-importar-json');
    const btnGerarJsonCodigo = document.getElementById('btn-gerar-json-codigo');

    // Imagens Ilustrativas Padrão para os Pratos (Alta Definição)
    const DEFAULT_DISH_IMAGES = {
        tortei: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80",
        capeletti: "https://images.unsplash.com/photo-1621996346565-e3d5d6281286?auto=format&fit=crop&w=400&q=80",
        spaguetti: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80",
        macarrao: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=400&q=80",
        pasteis: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=400&q=80",
        croquetes: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80",
        bolinhaQueijo: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=400&q=80",
        coxinha: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=400&q=80",
        risoles: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80",
        salsicha: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=400&q=80",
        empadas: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=400&q=80",
        assados: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=400&q=80",
        folhados: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=400&q=80",
        travesseirinho: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80",
        churros: "https://images.unsplash.com/photo-1624371414361-e670ef4889d5?auto=format&fit=crop&w=400&q=80",
        espetinho: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80",
        palmier: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
        grostoli: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80",
        catarinas: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
        cachorroFolhado: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=400&q=80"
    };

    // Estado Padrão do Catálogo Visual Copelli
    const STATE_PADRAO_VISUAL = {
        titulo: "Copelli Delícias Caseiras",
        subtitulo: "DELÍCIAS CASEIRAS - DESDE 1998",
        telefone: "(54) 99919-8998",
        instagram: "@COPELLI_MASSASESALGADOS",
        endereco: "RUA JOÃO BATISTA ROVANI, 154 - CENTRO - VILA LÂNGARO - RS",
        historia: `A empresa surgiu em 1998 a partir da ideia inicial de sua proprietária, que viu uma oportunidade de negócio na confecção de massas caseiras provenientes das receitas de família trazidas por seus avós maternos da Itália e passadas por sua mãe.

Até 2008, a produção era totalmente artesanal e não havia uma preocupação com as vendas. No entanto, tendo em vista a grande procura pelos produtos, em particular o capeleti, percebeu-se uma possibilidade de expandir os negócios e as vendas, iniciando-se assim um processo de expansão com a procura por melhores formas produtivas que viabilizassem maior qualidade aos produtos, dentre as quais a aquisição de máquinas, embalagens e regulamentação da marca. A partir de 2018 a empresa investiu em novos maquinários melhorando e padronizando ainda mais sua produção.

A Copelli surgiu com o intuito de produzir e desenvolver alimentos congelados que se diferenciassem de seus concorrentes pela qualidade dos ingredientes e processos de produção, visando dessa forma fornecer opções de massas e salgados que associassem a produção industrializada com um sabor caseiro e natural.

Assim, a missão da empresa é produzir e comercializar massas e salgados com alto padrão e diferenciação, oferecendo produtos práticos e frescos, adaptando-os às necessidades e desejos de seus clientes.

Dessa forma, a visão da empresa é ser uma empresa eficiente e dinâmica em seu ramo de atuação, excedendo as expectativas dos clientes, colaboradores e sociedade.

Com relação aos valores fundamentais para quem trabalha na empresa e para o cliente que adquire seus produtos, a proprietária ressalta que a empresa oferece: qualidade, padronização, sabor natural, segurança e confiança. Isto significa que busca-se consumir e produzir um produto saboroso, num ambiente organizacional seguro e harmônico, transmitindo confiança e qualidade ao cliente.

Hoje a empresa produz mais de 60 itens de produtos.`,
        quantidadesInfo: `LINHA COQUETEL
COXINHA, BOLINHA DE QUEIJO, TRAVESSEIRO DE PRESUNTO, CROQUETE DE CARNE, SALSICHA
MÉDIA 85 A 90un POR PACOTE.

LINHA LANCHE - FRITOS
COXINHA G (15 A 16un) POR PACOTE
CROQUETE G (15 A 16un) POR PACOTE
ESPETO G (12un) POR PACOTE
RÍSOLIS G (14 A 15un) POR PACOTE
SALSICHA G (15 A 16un) POR PACOTE

LINHA LANCHE - ASSADOS
FOLHADOS COQUETEL: MÉDIA 55 A 60un POR PACOTE
FOLHADOS LANCHE: MÉDIA DE 12un POR PACOTES
EMPADAS COQUETEL: DE 45 A 50un POR PACOTE
EMPADAS LANCHE: MÉDIA DE 12un POR PACOTES`,
        categorias: [
            {
                id: "massas",
                nome: "Massas",
                ativo: true,
                itens: [
                    { id: 101, produto: "Tortei", detalhe: "Tortei de Moranga .............2Kg", preco: "R$ 9,98", img: DEFAULT_DISH_IMAGES.tortei, ativo: true },
                    { id: 102, produto: "Capeletti", detalhe: "Capeletti de Carne Gado .............2Kg\nCapeletti de Frango ......................2Kg", preco: "R$ 13,98", img: DEFAULT_DISH_IMAGES.capeletti, ativo: true },
                    { id: 103, produto: "Spaguetti", detalhe: "Spaguetti .............2Kg", preco: "R$ 6,45", img: DEFAULT_DISH_IMAGES.spaguetti, ativo: true },
                    { id: 104, produto: "Macarrão", detalhe: "Macarrão .............2Kg", preco: "R$ 6,45", img: DEFAULT_DISH_IMAGES.macarrao, ativo: true }
                ]
            },
            {
                id: "linha-coquetel",
                nome: "Linha Coquetel",
                ativo: true,
                itens: [
                    { id: 201, produto: "Pastéis", detalhe: "Pastéis Carne Gado.......CX 4Kg\nPastéis Frango........CX 4Kg\nPastéis de Queijo............CX 4Kg", preco: "R$ 135,00", img: DEFAULT_DISH_IMAGES.pasteis, ativo: true },
                    { id: 202, produto: "Croquetes", detalhe: "Croquete de Carne........2Kg\nCroquete de Frango......2Kg", preco: "R$ 43,50", img: DEFAULT_DISH_IMAGES.croquetes, ativo: true },
                    { id: 203, produto: "Bolinha de queijo", detalhe: "Bolinha de queijo.......2Kg\nCom orégano.", preco: "R$ 43,50", img: DEFAULT_DISH_IMAGES.bolinhaQueijo, ativo: true },
                    { id: 204, produto: "Coxinha", detalhe: "Coxinha de Frango.......2Kg", preco: "R$ 43,50", img: DEFAULT_DISH_IMAGES.coxinha, ativo: true },
                    { id: 205, produto: "Risoles", detalhe: "Risoles de Frango...................2Kg\nRisoles de Carne....................2Kg\nRisoles de Palmito................2Kg\nRisoles de Pizza......................2Kg\nRisoles de Calabresa..............2Kg", preco: "R$ 43,50", img: DEFAULT_DISH_IMAGES.risoles, ativo: true },
                    { id: 206, produto: "Salsicha", detalhe: "Salsicha Cortada.........2Kg", preco: "R$ 43,50", img: DEFAULT_DISH_IMAGES.salsicha, ativo: true },
                    { id: 207, produto: "Empadas", detalhe: "Empada de Carne............2Kg\nEmpada de Frango .........2Kg\nEmpada de Calabresa e Requeijão........................2Kg", preco: "R$ 59,98", img: DEFAULT_DISH_IMAGES.empadas, ativo: true },
                    { id: 208, produto: "Assados", detalhe: "Assado de Nata de Carne .............2Kg\nAssado de Nata de Frango ...........2Kg\nAssado de Nata Presunto e Queijo ..........................2Kg", preco: "R$ 63,50", img: DEFAULT_DISH_IMAGES.assados, ativo: true },
                    { id: 209, produto: "Folhados", detalhe: "Folhado de Frango .........2Kg\nFolhado de Presunto e Queijo ..........2Kg", preco: "R$ 48,98", img: DEFAULT_DISH_IMAGES.folhados, ativo: true },
                    { id: 210, produto: "Travesseirinho", detalhe: "Travesseirinho Presunto e Queijo...........2Kg\nFrango.....2Kg", preco: "R$ 43,50", img: DEFAULT_DISH_IMAGES.travesseirinho, ativo: true },
                    { id: 211, produto: "Churros", detalhe: "Mini Churros .........2Kg\nDoce de Leite", preco: "R$ 46,98", img: DEFAULT_DISH_IMAGES.churros, ativo: true }
                ]
            },
            {
                id: "linha-lanche",
                nome: "Linha Lanche",
                ativo: true,
                itens: [
                    { id: 301, produto: "Assados", detalhe: "Assado de Nata de Carne .............2Kg\nAssado de Nata de Frango ...........2Kg\nAssado de Nata Presunto e Queijo ..........................2Kg", preco: "R$ 59,98", img: DEFAULT_DISH_IMAGES.assados, ativo: true },
                    { id: 302, produto: "Pastéis", detalhe: "Pastel de Carne Gado .............2Kg\nPastel de Frango ......................2Kg", preco: "R$ 115,92", img: DEFAULT_DISH_IMAGES.pasteis, ativo: true },
                    { id: 303, produto: "Risoles", detalhe: "Risoles de Frango .................2Kg\nRisoles de Carne Gado ........2Kg", preco: "R$ 38,98", img: DEFAULT_DISH_IMAGES.risoles, ativo: true },
                    { id: 304, produto: "Coxinha", detalhe: "Coxinha de Frango .............2Kg", preco: "R$ 38,98", img: DEFAULT_DISH_IMAGES.coxinha, ativo: true },
                    { id: 305, produto: "Travesseirinho", detalhe: "Travesseirinho Presunto e Queijo .............2Kg", preco: "R$ 38,98", img: DEFAULT_DISH_IMAGES.travesseirinho, ativo: true },
                    { id: 306, produto: "Croquetes", detalhe: "Croquete de Carne ................2Kg\nCroquete de Frango ..............2Kg", preco: "R$ 38,98", img: DEFAULT_DISH_IMAGES.croquetes, ativo: true },
                    { id: 307, produto: "Folhados", detalhe: "Folhado de Frango .............2Kg\nFolhado de Presunto e Queijo...............2Kg", preco: "R$ 48,98", img: DEFAULT_DISH_IMAGES.folhados, ativo: true },
                    { id: 308, produto: "Empadas", detalhe: "Empada de Frango .................2Kg\nEmpada de Carne ..................2Kg\nEmpada de Calabresa .............2Kg\nEmpada de Palmito ................2Kg\nEmpada de Bacon ...................2Kg\nEmpada de Brócolis ...............2Kg", preco: "R$ 59,98", img: DEFAULT_DISH_IMAGES.empadas, ativo: true },
                    { id: 309, produto: "Salsicha", detalhe: "Salsicha Empanada ..............2Kg", preco: "R$ 38,98", img: DEFAULT_DISH_IMAGES.salsicha, ativo: true },
                    { id: 310, produto: "Espetinho", detalhe: "Espetinho de Frango .............2Kg", preco: "R$ 47,98", img: DEFAULT_DISH_IMAGES.espetinho, ativo: true }
                ]
            },
            {
                id: "novos-produtos",
                nome: "Novos Produtos",
                ativo: true,
                itens: [
                    { id: 401, produto: "Palmier", detalhe: "Palmier (orelha de mico).............2Kg", preco: "R$ 45,00", img: DEFAULT_DISH_IMAGES.palmier, ativo: true },
                    { id: 402, produto: "Grostoli", detalhe: "Grostoli ......................2Kg", preco: "R$ 42,00", img: DEFAULT_DISH_IMAGES.grostoli, ativo: true },
                    { id: 403, produto: "Catarinas", detalhe: "Chocolate Branco\nChocolate ao Leite\n----------------------\nSalgada sabor Calabresa", preco: "R$ 85,00", img: DEFAULT_DISH_IMAGES.catarinas, ativo: true },
                    { id: 404, produto: "Cachorro Q. Folhado", detalhe: "Cachorro quente folhado ..........2Kg", preco: "R$ 48,98", img: DEFAULT_DISH_IMAGES.cachorroFolhado, ativo: true }
                ]
            }
        ]
    };

    let state = JSON.parse(JSON.stringify(STATE_PADRAO_VISUAL));

    function salvarEstado(mostrarNotificacao = false) {
        try {
            localStorage.setItem('copelli_catalogo_visual_state', JSON.stringify(state));
            if (mostrarNotificacao) {
                mostrarToast("💾 Alterações salvas com sucesso!");
            }
        } catch (e) {
            console.error("Erro ao salvar no localStorage", e);
        }
    }

    function carregarEstado() {
        const dados = localStorage.getItem('copelli_catalogo_visual_state');
        if (dados) {
            try {
                const parsed = JSON.parse(dados);
                if (parsed && parsed.categorias) {
                    state = parsed;
                }
            } catch (e) {
                console.error("Erro ao carregar do localStorage", e);
            }
        }
    }

    function mostrarToast(mensagem) {
        const antigo = document.querySelector('.toast-msg');
        if (antigo) antigo.remove();

        const toast = document.createElement('div');
        toast.className = 'toast-msg';
        toast.textContent = mensagem;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2200);
    }

    // Carregar Estado Salvo
    carregarEstado();
    if (inputTitulo) inputTitulo.value = state.titulo || "";
    if (inputSubtitulo) inputSubtitulo.value = state.subtitulo || "";
    if (inputTelefone) inputTelefone.value = state.telefone || "";
    if (inputInstagram) inputInstagram.value = state.instagram || "";
    if (inputEndereco) inputEndereco.value = state.endereco || "";
    if (inputHistoria) inputHistoria.value = state.historia || "";
    if (inputQtdInfo) inputQtdInfo.value = state.quantidadesInfo || "";

    // Listeners dos Inputs Principais
    [
        [inputTitulo, 'titulo'],
        [inputSubtitulo, 'subtitulo'],
        [inputTelefone, 'telefone'],
        [inputInstagram, 'instagram'],
        [inputEndereco, 'endereco'],
        [inputHistoria, 'historia'],
        [inputQtdInfo, 'quantidadesInfo']
    ].forEach(([elem, prop]) => {
        if (elem) {
            elem.addEventListener('input', (e) => {
                state[prop] = e.target.value;
                salvarEstado();
                renderPreviewPages();
            });
        }
    });

    // Função de Renderização dos Acordeões no Editor
    function renderEditor() {
        categoriasContainer.innerHTML = '';

        state.categorias.forEach((cat, catIndex) => {
            const accDiv = document.createElement('div');
            accDiv.className = 'accordion';

            const accHeader = document.createElement('div');
            accHeader.className = 'accordion-header';
            accHeader.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <input type="checkbox" class="cat-checkbox" data-cat="${catIndex}" ${cat.ativo !== false ? 'checked' : ''} style="accent-color: var(--copelli-red); cursor: pointer;">
                    <span>${cat.nome}</span>
                </div>
                <span>▼</span>
            `;

            accHeader.addEventListener('click', (e) => {
                if (e.target.classList.contains('cat-checkbox')) return;
                accDiv.classList.toggle('active');
            });

            const accBody = document.createElement('div');
            accBody.className = 'accordion-body';

            cat.itens.forEach((item, itemIndex) => {
                const dishCard = document.createElement('div');
                dishCard.className = 'dish-item-card';
                dishCard.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <label style="font-size: 0.8rem; display: flex; align-items: center; gap: 6px;">
                            <input type="checkbox" class="item-checkbox" data-cat="${catIndex}" data-idx="${itemIndex}" ${item.ativo !== false ? 'checked' : ''}>
                            <span>Exibir prato</span>
                        </label>
                        <button type="button" class="btn-remove-dish" data-cat="${catIndex}" data-idx="${itemIndex}" style="background: none; border: none; color: #ff5252; cursor: pointer; font-size: 0.75rem;">🗑️ Remover</button>
                    </div>

                    <div style="display: flex; gap: 10px; margin-bottom: 8px; align-items: center;">
                        <img src="${item.img || DEFAULT_DISH_IMAGES.coxinha}" class="dish-img-preview" id="img-prev-${catIndex}-${itemIndex}">
                        <div style="flex: 1;">
                            <label style="font-size: 0.7rem; color: #aaa; text-transform: uppercase;">Trocar Foto (URL ou arquivo)</label>
                            <input type="file" class="dish-img-upload" data-cat="${catIndex}" data-idx="${itemIndex}" accept="image/*" style="font-size: 0.75rem; color: #fff;">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Nome do Prato</label>
                        <input type="text" data-cat="${catIndex}" data-idx="${itemIndex}" data-field="produto" value="${item.produto || ''}">
                    </div>

                    <div class="form-group">
                        <label>Detalhes / Sabores / Peso</label>
                        <textarea rows="2" data-cat="${catIndex}" data-idx="${itemIndex}" data-field="detalhe">${item.detalhe || ''}</textarea>
                    </div>

                    <div class="form-group">
                        <label>Preço Exibido (Opicional)</label>
                        <input type="text" data-cat="${catIndex}" data-idx="${itemIndex}" data-field="preco" value="${item.preco || ''}">
                    </div>
                `;
                accBody.appendChild(dishCard);
            });

            accDiv.appendChild(accHeader);
            accDiv.appendChild(accBody);
            categoriasContainer.appendChild(accDiv);
        });

        // Listeners das checkboxes de categoria
        document.querySelectorAll('.cat-checkbox').forEach(chk => {
            chk.addEventListener('change', (e) => {
                const cIdx = parseInt(e.target.getAttribute('data-cat'), 10);
                state.categorias[cIdx].ativo = e.target.checked;
                salvarEstado();
                renderPreviewPages();
            });
        });

        // Listeners das checkboxes de pratos
        document.querySelectorAll('.item-checkbox').forEach(chk => {
            chk.addEventListener('change', (e) => {
                const cIdx = parseInt(e.target.getAttribute('data-cat'), 10);
                const iIdx = parseInt(e.target.getAttribute('data-idx'), 10);
                state.categorias[cIdx].itens[iIdx].ativo = e.target.checked;
                salvarEstado();
                renderPreviewPages();
            });
        });

        // Listeners de upload de imagem por prato
        document.querySelectorAll('.dish-img-upload').forEach(fileInput => {
            fileInput.addEventListener('change', (e) => {
                const cIdx = parseInt(e.target.getAttribute('data-cat'), 10);
                const iIdx = parseInt(e.target.getAttribute('data-idx'), 10);
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(evt) {
                        state.categorias[cIdx].itens[iIdx].img = evt.target.result;
                        salvarEstado();
                        renderEditor();
                        renderPreviewPages();
                    };
                    reader.readAsDataURL(file);
                }
            });
        });

        // Listeners dos inputs de texto dos pratos
        document.querySelectorAll('.dish-item-card input[type="text"], .dish-item-card textarea').forEach(input => {
            input.addEventListener('input', (e) => {
                const cIdx = parseInt(e.target.getAttribute('data-cat'), 10);
                const iIdx = parseInt(e.target.getAttribute('data-idx'), 10);
                const field = e.target.getAttribute('data-field');
                state.categorias[cIdx].itens[iIdx][field] = e.target.value;
                salvarEstado();
                renderPreviewPages();
            });
        });
    }

    // Função de Renderização das 8 Páginas A4 no Preview Direito
    function renderPreviewPages() {
        previewContainer.innerHTML = '';

        // PÁGINA 1: CAPA ILUSTRADA
        const p1 = document.createElement('div');
        p1.className = 'a4-sheet page-cover';
        p1.innerHTML = `
            <div class="page-cover-overlay"></div>
            <div class="copelli-ribbon-logo">
                <div class="ribbon-banner">
                    <span class="ribbon-wheat-icon">🌾</span>
                    <div class="ribbon-title">Copelli</div>
                    <div class="ribbon-subtitle">${state.subtitulo}</div>
                </div>
            </div>
        `;
        previewContainer.appendChild(p1);

        // PÁGINA 2: HISTÓRIA & QUEM SOMOS
        const p2 = document.createElement('div');
        p2.className = 'a4-sheet page-history';
        const historiaParagrafos = (state.historia || '').split('\n\n').map((p, idx) => {
            if (idx === 0 && p.length > 0) {
                const emChar = p.charAt(0);
                const rest = p.slice(1);
                return `<p><span class="drop-cap">${emChar}</span>${rest}</p>`;
            }
            return `<p>${p}</p>`;
        }).join('');

        p2.innerHTML = `
            <div class="gold-border-top-left"></div>
            <div class="gold-border-bottom-right"></div>
            <div class="history-content">
                ${historiaParagrafos}
            </div>
        `;
        previewContainer.appendChild(p2);

        // PÁGINAS 3, 4, 5, 6: CATEGORIAS DE PRODUTOS (Massas, Coquetel, Lanche, Novos Produtos)
        state.categorias.forEach((cat, catIdx) => {
            if (cat.ativo === false) return;

            const page = document.createElement('div');
            page.className = 'a4-sheet page-category';

            let gridClass = 'dish-grid-3col';
            let plateShapeClass = 'dish-plate-oval';

            if (cat.id === 'massas') {
                gridClass = 'dish-grid-2col';
                plateShapeClass = 'dish-plate-circle';
            } else if (cat.id === 'novos-produtos') {
                gridClass = 'dish-grid-2col';
                plateShapeClass = 'dish-plate-circle';
            }

            const itensHtml = cat.itens
                .filter(item => item.ativo !== false)
                .map(item => `
                    <div class="dish-card">
                        <div class="${plateShapeClass}">
                            <img src="${item.img || DEFAULT_DISH_IMAGES.coxinha}" alt="${item.produto}">
                        </div>
                        <div class="dish-title">${item.produto}</div>
                        <div class="dish-sublist">${(item.detalhe || '').replace(/\n/g, '<br>')}</div>
                        ${item.preco ? `<div class="dish-price-badge">${item.preco}</div>` : ''}
                    </div>
                `).join('');

            page.innerHTML = `
                <div class="page-header-slogan">A VERDADEIRA QUALIDADE EM SALGADOS</div>
                <div class="category-banner">${cat.nome}</div>
                <div class="${gridClass}">
                    ${itensHtml}
                </div>
            `;
            previewContainer.appendChild(page);
        });

        // PÁGINA 7: QUANTIDADES POR PACOTE & SLOGAN
        const p7 = document.createElement('div');
        p7.className = 'a4-sheet page-quantities';
        const qtdParagrafos = (state.quantidadesInfo || '').split('\n\n').map(bloco => {
            const linhas = bloco.split('\n');
            const tituloBloco = linhas[0] || '';
            const desc = linhas.slice(1).join('<br>');
            return `
                <div class="quantities-box">
                    <h4>${tituloBloco}</h4>
                    <p>${desc}</p>
                </div>
            `;
        }).join('');

        p7.innerHTML = `
            <div class="quantities-title">Quantidades por pacote.</div>
            <div class="quantities-grid">
                ${qtdParagrafos}
            </div>
            <div class="slogan-watermark">
                OS MELHORES SALGADOS PARA OS MELHORES MOMENTOS
            </div>
        `;
        previewContainer.appendChild(p7);

        // PÁGINA 8: CONTRACAPA / CONTATOS
        const p8 = document.createElement('div');
        p8.className = 'a4-sheet page-backcover';
        p8.innerHTML = `
            <div class="gold-frame-outer"></div>
            <div class="gold-frame-inner"></div>

            <div class="backcover-logo">
                <div class="ribbon-banner">
                    <span class="ribbon-wheat-icon">🌾</span>
                    <div class="ribbon-title">Copelli</div>
                    <div class="ribbon-subtitle">${state.subtitulo}</div>
                </div>
            </div>

            <div class="backcover-contacts">
                <div>${state.endereco}</div>
                <div class="backcover-social">${state.instagram}</div>
                <div class="backcover-phone">📱 ${state.telefone}</div>
            </div>
        `;
        previewContainer.appendChild(p8);
    }

    // Botão Salvar
    if (btnSalvar) {
        btnSalvar.addEventListener('click', () => {
            salvarEstado(true);
        });
    }

    // Botão Imprimir PDF
    if (btnImprimir) {
        btnImprimir.addEventListener('click', () => {
            window.print();
        });
    }

    // Botão Restaurar Padrões
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            if (confirm("Deseja restaurar as 8 páginas do catálogo visual para o modelo original da Copelli?")) {
                localStorage.removeItem('copelli_catalogo_visual_state');
                state = JSON.parse(JSON.stringify(STATE_PADRAO_VISUAL));
                if (inputTitulo) inputTitulo.value = state.titulo;
                if (inputSubtitulo) inputSubtitulo.value = state.subtitulo;
                if (inputTelefone) inputTelefone.value = state.telefone;
                if (inputInstagram) inputInstagram.value = state.instagram;
                if (inputEndereco) inputEndereco.value = state.endereco;
                if (inputHistoria) inputHistoria.value = state.historia;
                if (inputQtdInfo) inputQtdInfo.value = state.quantidadesInfo;
                renderEditor();
                renderPreviewPages();
                mostrarToast("Catálogo padrão de 8 páginas restaurado!");
            }
        });
    }

    // Exportar Backup JSON
    if (btnExportarJson) {
        btnExportarJson.addEventListener('click', () => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", `catalogo-visual-copelli-${new Date().toISOString().substring(0, 10)}.json`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
            mostrarToast("📥 Backup JSON exportado!");
        });
    }

    // Importar Backup JSON
    if (btnImportarTrigger && inputImportarJson) {
        btnImportarTrigger.addEventListener('click', () => {
            inputImportarJson.click();
        });

        inputImportarJson.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    try {
                        const imported = JSON.parse(evt.target.result);
                        if (imported && imported.categorias) {
                            state = imported;
                            salvarEstado();
                            if (inputTitulo) inputTitulo.value = state.titulo || "";
                            if (inputSubtitulo) inputSubtitulo.value = state.subtitulo || "";
                            if (inputTelefone) inputTelefone.value = state.telefone || "";
                            if (inputInstagram) inputInstagram.value = state.instagram || "";
                            if (inputEndereco) inputEndereco.value = state.endereco || "";
                            if (inputHistoria) inputHistoria.value = state.historia || "";
                            if (inputQtdInfo) inputQtdInfo.value = state.quantidadesInfo || "";
                            renderEditor();
                            renderPreviewPages();
                            mostrarToast("📤 Backup JSON importado com sucesso!");
                        }
                    } catch (err) {
                        alert("Erro ao ler o arquivo JSON selecionado.");
                    }
                };
                reader.readAsText(file);
            }
        });
    }

    // Copiar Código dos Dados para o ZIP
    if (btnGerarJsonCodigo) {
        btnGerarJsonCodigo.addEventListener('click', () => {
            const jsonStr = JSON.stringify(state, null, 2);
            navigator.clipboard.writeText(jsonStr).then(() => {
                mostrarToast("📋 Dados copiados para a área de transferência!");
                alert("Os dados do Catálogo Visual foram COPIADOS!\n\nCole (Ctrl+V) aqui no nosso chat para atualizar a versão oficial.");
            }).catch(() => {
                prompt("Copie todo o texto abaixo:", jsonStr);
            });
        });
    }

    // Inicialização
    renderEditor();
    renderPreviewPages();
});
