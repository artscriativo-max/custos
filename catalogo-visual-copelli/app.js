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

    // Imagens Ilustrativas em Alta Definição para os Pratos (Clean)
    const DEFAULT_DISH_IMAGES = {
        tortei: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80",
        capeletti: "https://images.unsplash.com/photo-1621996346565-e3d5d6281286?auto=format&fit=crop&w=500&q=80",
        spaguetti: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80",
        macarrao: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=500&q=80",
        pasteis: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",
        croquetes: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80",
        bolinhaQueijo: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=500&q=80",
        coxinha: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=500&q=80",
        risoles: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
        salsicha: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=500&q=80",
        empadas: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",
        assados: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=500&q=80",
        folhados: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=500&q=80",
        travesseirinho: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80",
        churros: "https://images.unsplash.com/photo-1624371414361-e670ef4889d5?auto=format&fit=crop&w=500&q=80",
        espetinho: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=80",
        palmier: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80",
        grostoli: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=500&q=80",
        catarinas: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80",
        cachorroFolhado: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=500&q=80"
    };

    // Estado Padrão do Catálogo Visual Clean (Estilo Salgados Neves)
    const STATE_PADRAO_VISUAL = {
        titulo: "Copelli Delícias Caseiras",
        subtitulo: "DELÍCIAS CASEIRAS - DESDE 1998",
        telefone: "(54) 99919-8998",
        instagram: "@COPELLI_MASSASESALGADOS",
        endereco: "RUA JOÃO BATISTA ROVANI, 154 - CENTRO - VILA LÂNGARO - RS",
        historia: `A empresa surgiu em 1998 a partir da ideia inicial de sua proprietária, que viu uma oportunidade de negócio na confecção de massas caseiras provenientes das receitas de família trazidas por seus avós maternos da Itália e passadas por sua mãe.

Até 2008, a produção era totalmente artesanal e não havia uma preocupação com as vendas. No entanto, tendo em vista a grande procura pelos produtos, em particular o capeleti, percebeu-se uma possibilidade de expandir os negócios e as vendas, iniciando-se assim um processo de expansão com a procura por melhores formas produtivas que viabilizassem maior qualidade aos produtos.

A Copelli surgiu com o intuito de produzir e desenvolver alimentos congelados que se diferenciassem de seus concorrentes pela qualidade dos ingredientes e processos de produção, visando fornecer opções de massas e salgados que associassem a produção industrializada com um sabor caseiro e natural.

Assim, a missão da empresa é produzir e comercializar massas e salgados com alto padrão e diferenciação, oferecendo produtos práticos e frescos. Hoje a empresa produz mais de 60 itens de produtos.`,
        quantidadesInfo: `LINHA COQUETEL
Coxinha, Bolinha de Queijo, Travesseirinho, Croquete de Carne, Salsicha Cortada
Média 80 a 90 unidades por pacote.

LINHA LANCHE - FRITOS
Coxinha G, Croquete G, Risoles G, Travesseiro G, Salsicha G
16 unidades por pacote.

LINHA LANCHE - ASSADOS & EMPADAS
Assados de Nata (16un), Folhados Lanche (12un), Empadas Lanche (12un), Empadas Coquetel (45 a 50un por pacote).`,
        categorias: [
            {
                id: "massas",
                nome: "Massas Caseiras",
                ativo: true,
                itens: [
                    { id: 101, cod: "1", produto: "CAPELLETTI DE FRANGO", detalhe: "Massa caseira artesanal rechada", peso: "400G", qtd: "-", precoUnitario: "", preco: "R$ 12,98", img: DEFAULT_DISH_IMAGES.capeletti, ativo: true },
                    { id: 102, cod: "2", produto: "CAPELLETTI DE GADO", detalhe: "Massa tradicional caseira com carne", peso: "400G", qtd: "-", precoUnitario: "", preco: "R$ 13,98", img: DEFAULT_DISH_IMAGES.capeletti, ativo: true },
                    { id: 105, cod: "5", produto: "MACARRÃO", detalhe: "Massa caseira tradicional", peso: "500G", qtd: "-", precoUnitario: "", preco: "R$ 6,45", img: DEFAULT_DISH_IMAGES.macarrao, ativo: true },
                    { id: 103, cod: "3", produto: "SPAGUETTI", detalhe: "Massa alimentícia tipo spaghetti", peso: "500G", qtd: "-", precoUnitario: "", preco: "R$ 6,45", img: DEFAULT_DISH_IMAGES.spaguetti, ativo: true },
                    { id: 104, cod: "4", produto: "TALHARIM", detalhe: "Massa tipo talharim fresco", peso: "500G", qtd: "-", precoUnitario: "", preco: "R$ 6,45", img: DEFAULT_DISH_IMAGES.spaguetti, ativo: true },
                    { id: 106, cod: "6", produto: "TORTEI DE MORANGA", detalhe: "Massa recheada com moranga temperada", peso: "500G", qtd: "-", precoUnitario: "", preco: "R$ 9,98", img: DEFAULT_DISH_IMAGES.tortei, ativo: true }
                ]
            },
            {
                id: "salgados-coquetel",
                nome: "Salgados Coquetel",
                ativo: true,
                itens: [
                    { id: 212, cod: "23", produto: "ASSADO DE NATA CARNE", detalhe: "Assado de massa folhada de nata", peso: "2KG", qtd: "55 a 65 und/pct", precoUnitario: "R$ 1,06", preco: "R$ 63,50", img: DEFAULT_DISH_IMAGES.assados, ativo: true },
                    { id: 210, cod: "21", produto: "ASSADO DE NATA FRANGO", detalhe: "Assado de nata recheio de frango", peso: "2KG", qtd: "55 a 65 und/pct", precoUnitario: "R$ 1,06", preco: "R$ 63,50", img: DEFAULT_DISH_IMAGES.assados, ativo: true },
                    { id: 211, cod: "22", produto: "ASSADO NATA PRESUNTO/QUEIJO", detalhe: "Assado com presunto e queijo", peso: "2KG", qtd: "55 a 65 und/pct", precoUnitario: "R$ 1,06", preco: "R$ 63,50", img: DEFAULT_DISH_IMAGES.assados, ativo: true },
                    { id: 215, cod: "28", produto: "BOLINHA DE QUEIJO", detalhe: "Bolinha com muçarela e orégano", peso: "2KG", qtd: "80 a 90 und/pct", precoUnitario: "R$ 0,51", preco: "R$ 43,50", img: DEFAULT_DISH_IMAGES.bolinhaQueijo, ativo: true },
                    { id: 402, cod: "79", produto: "CHOCOLATE AO LEITE", detalhe: "Salgado doce recheado", peso: "2KG", qtd: "55 a 60 und/pct", precoUnitario: "R$ 0,92", preco: "R$ 52,98", img: DEFAULT_DISH_IMAGES.churros, ativo: true },
                    { id: 201, cod: "74", produto: "CHURROS DOCE DE LEITE", detalhe: "Mini churros frito crocante", peso: "2KG", qtd: "80 a 90 und/pct", precoUnitario: "R$ 0,55", preco: "R$ 46,98", img: DEFAULT_DISH_IMAGES.churros, ativo: true },
                    { id: 202, cod: "14", produto: "COXINHA DE FRANGO", detalhe: "Massa especial com recheio cremoso", peso: "2KG", qtd: "80 a 90 und/pct", precoUnitario: "R$ 0,51", preco: "R$ 43,50", img: DEFAULT_DISH_IMAGES.coxinha, ativo: true },
                    { id: 403, cod: "109", produto: "COXINHA ENTREVEIRO", detalhe: "Recheio de entreveiro tradicional", peso: "2KG", qtd: "80 a 90 und/pct", precoUnitario: "R$ 0,53", preco: "R$ 44,98", img: DEFAULT_DISH_IMAGES.coxinha, ativo: true },
                    { id: 226, cod: "12", produto: "CROISSANT CHOCOLATE", detalhe: "Massa folhada recheada", peso: "2KG", qtd: "55 a 60 und/pct", precoUnitario: "R$ 0,92", preco: "R$ 52,98", img: DEFAULT_DISH_IMAGES.folhados, ativo: true },
                    { id: 209, cod: "20", produto: "CROQUETE DE CARNE", detalhe: "Carne temperada empanada", peso: "2KG", qtd: "80 a 90 und/pct", precoUnitario: "R$ 0,51", preco: "R$ 43,50", img: DEFAULT_DISH_IMAGES.croquetes, ativo: true },
                    { id: 221, cod: "64", produto: "EMPADA CALABRESA/REQUEIJÃO", detalhe: "Massa podre com calabresa e catupiry", peso: "2KG", qtd: "45 a 50 und/pct", precoUnitario: "R$ 1,26", preco: "R$ 59,98", img: DEFAULT_DISH_IMAGES.empadas, ativo: true },
                    { id: 216, cod: "49", produto: "PASTEL DE FRANGO (CAIXA)", detalhe: "Caixa com 130 unidades fofinhas", peso: "4KG", qtd: "130 und/caixa", precoUnitario: "R$ 1,04", preco: "R$ 135,00", img: DEFAULT_DISH_IMAGES.pasteis, ativo: true }
                ]
            },
            {
                id: "salgados-lanche",
                nome: "Salgados Lanche",
                ativo: true,
                itens: [
                    { id: 307, cod: "36", produto: "ASSADO NATA CARNE GADO", detalhe: "Tamanho lanche assado na hora", peso: "2KG", qtd: "16 und/pct", precoUnitario: "R$ 3,75", preco: "R$ 59,98", img: DEFAULT_DISH_IMAGES.assados, ativo: true },
                    { id: 325, cod: "105", produto: "CATARINA CHOCOLATE PRETO", detalhe: "Torta salgada/doce trançada", peso: "2KG", qtd: "4 und/pct", precoUnitario: "R$ 21,25", preco: "R$ 85,00", img: DEFAULT_DISH_IMAGES.catarinas, ativo: true },
                    { id: 301, cod: "30", produto: "COXINHA DE FRANGO G", detalhe: "Coxinha tamanho lanche grande", peso: "2KG", qtd: "16 und/pct", precoUnitario: "R$ 2,44", preco: "R$ 38,98", img: DEFAULT_DISH_IMAGES.coxinha, ativo: true },
                    { id: 323, cod: "94", produto: "CROISSANT DE CHOCOLATE", detalhe: "Croissant folhado grande", peso: "2KG", qtd: "16 und/pct", precoUnitario: "R$ 3,31", preco: "R$ 52,98", img: DEFAULT_DISH_IMAGES.folhados, ativo: true },
                    { id: 312, cod: "60", produto: "EMPADA DE FRANGO", detalhe: "Empada individual de frango", peso: "2KG", qtd: "12 und/pct", precoUnitario: "R$ 5,00", preco: "R$ 59,98", img: DEFAULT_DISH_IMAGES.empadas, ativo: true },
                    { id: 318, cod: "47", produto: "ESPETINHO FRANGO EMPANADO", detalhe: "Espeto de frango crocante no palito", peso: "2KG", qtd: "20 und/pct", precoUnitario: "R$ 2,40", preco: "R$ 47,98", img: DEFAULT_DISH_IMAGES.espetinho, ativo: true },
                    { id: 319, cod: "53", produto: "FOLHADO DE FRANGO", detalhe: "Folhado grande recheado", peso: "2KG", qtd: "12 und/pct", precoUnitario: "R$ 4,08", preco: "R$ 48,98", img: DEFAULT_DISH_IMAGES.folhados, ativo: true },
                    { id: 330, cod: "105", produto: "GROSTOLI TRADICIONAL", detalhe: "Grostoli açúcar e canela", peso: "2KG", qtd: "Média 25 und/pct", precoUnitario: "R$ 1,68", preco: "R$ 42,00", img: DEFAULT_DISH_IMAGES.grostoli, ativo: true },
                    { id: 310, cod: "59", produto: "PASTEL DE FRANGO LANCHE", detalhe: "Pastel frito tamanho lanche", peso: "4KG", qtd: "40 und/caixa", precoUnitario: "R$ 2,90", preco: "R$ 115,92", img: DEFAULT_DISH_IMAGES.pasteis, ativo: true }
                ]
            },
            {
                id: "novos-produtos",
                nome: "Novos Produtos",
                ativo: true,
                itens: [
                    { id: 401, cod: "108", produto: "PALMIER (ORELHA DE MICO)", detalhe: "Massa folhada crocante açucarada", peso: "2KG", qtd: "Média 30 und/pct", precoUnitario: "R$ 1,50", preco: "R$ 45,00", img: DEFAULT_DISH_IMAGES.palmier, ativo: true },
                    { id: 402, cod: "105", produto: "GROSTOLI CASEIRO", detalhe: "Receita clássica de família italiana", peso: "2KG", qtd: "Média 25 und/pct", precoUnitario: "R$ 1,68", preco: "R$ 42,00", img: DEFAULT_DISH_IMAGES.grostoli, ativo: true },
                    { id: 403, cod: "107", produto: "CATARINA CALABRESA", detalhe: "Catarina salgada recheio especial", peso: "2KG", qtd: "4 und/pct", precoUnitario: "R$ 14,50", preco: "R$ 58,00", img: DEFAULT_DISH_IMAGES.catarinas, ativo: true },
                    { id: 404, cod: "103", produto: "CACHORRO Q. FOLHADO", detalhe: "Salsicha envolta em massa folhada", peso: "2KG", qtd: "15 und/pct", precoUnitario: "R$ 3,27", preco: "R$ 48,98", img: DEFAULT_DISH_IMAGES.cachorroFolhado, ativo: true }
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

    // Função de Auto-Cálculo de Preço Unitário
    function calcularPrecoUnitarioAuto(precoStr, qtdStr) {
        if (!precoStr || !qtdStr) return "";
        const precoLimp = precoStr.replace(/[^\d,.]/g, '').replace(',', '.');
        const precoNum = parseFloat(precoLimp);
        if (isNaN(precoNum) || precoNum <= 0) return "";

        const matches = qtdStr.match(/\d+/g);
        if (!matches || matches.length === 0) return "";

        let qtdNum = 0;
        if (matches.length >= 2) {
            qtdNum = (parseFloat(matches[0]) + parseFloat(matches[1])) / 2;
        } else {
            qtdNum = parseFloat(matches[0]);
        }

        if (isNaN(qtdNum) || qtdNum <= 0) return "";

        const unitario = precoNum / qtdNum;
        return "R$ " + unitario.toFixed(2).replace('.', ',');
    }

    function autoCalcularTodosUnitarios() {
        let alterados = 0;
        state.categorias.forEach(cat => {
            cat.itens.forEach(item => {
                const autoVal = calcularPrecoUnitarioAuto(item.preco, item.qtd);
                if (autoVal) {
                    item.precoUnitario = autoVal;
                    alterados++;
                }
            });
        });
        if (alterados > 0) {
            salvarEstado();
            renderEditor();
            renderPreviewPages();
            mostrarToast(`⚡ ${alterados} valores unitários calculados automaticamente!`);
        } else {
            mostrarToast("⚠️ Nenhuma quantidade/preço válido encontrado para cálculo.");
        }
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
                        <label style="font-size: 0.8rem; display: flex; align-items: center; gap: 6px; cursor: pointer;">
                            <input type="checkbox" class="item-checkbox" data-cat="${catIndex}" data-idx="${itemIndex}" ${item.ativo !== false ? 'checked' : ''}>
                            <span>Exibir produto no catálogo</span>
                        </label>
                        <button type="button" class="btn-remove-dish" data-cat="${catIndex}" data-idx="${itemIndex}" style="background: none; border: none; color: #ff5252; cursor: pointer; font-size: 0.75rem; font-weight: 600;">🗑️ Remover</button>
                    </div>

                    <div style="display: flex; gap: 10px; margin-bottom: 8px; align-items: center;">
                        <img src="${item.img || DEFAULT_DISH_IMAGES.coxinha}" class="dish-img-preview" id="img-prev-${catIndex}-${itemIndex}">
                        <div style="flex: 1;">
                            <label style="font-size: 0.7rem; color: #aaa; text-transform: uppercase;">Trocar Foto do Produto</label>
                            <input type="file" class="dish-img-upload" data-cat="${catIndex}" data-idx="${itemIndex}" accept="image/*" style="font-size: 0.75rem; color: #fff;">
                        </div>
                    </div>

                    <div class="form-group row-group" style="display: flex; gap: 8px; margin-bottom: 8px;">
                        <div style="flex: 1;">
                            <label>Cód</label>
                            <input type="text" data-cat="${catIndex}" data-idx="${itemIndex}" data-field="cod" value="${item.cod || ''}">
                        </div>
                        <div style="flex: 4;">
                            <label>Nome do Produto</label>
                            <input type="text" data-cat="${catIndex}" data-idx="${itemIndex}" data-field="produto" value="${item.produto || ''}">
                        </div>
                    </div>

                    <div class="form-group" style="margin-bottom: 8px;">
                        <label>Sabores / Detalhes</label>
                        <textarea rows="2" data-cat="${catIndex}" data-idx="${itemIndex}" data-field="detalhe">${item.detalhe || ''}</textarea>
                    </div>

                    <div class="form-group row-group" style="display: flex; gap: 8px;">
                        <div style="flex: 2;">
                            <label>Peso</label>
                            <input type="text" data-cat="${catIndex}" data-idx="${itemIndex}" data-field="peso" value="${item.peso || ''}">
                        </div>
                        <div style="flex: 2;">
                            <label>Qtd</label>
                            <input type="text" data-cat="${catIndex}" data-idx="${itemIndex}" data-field="qtd" value="${item.qtd || ''}">
                        </div>
                        <div style="flex: 2;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <label>Val. Unit.</label>
                                <button type="button" class="btn-calc-unit" data-cat="${catIndex}" data-idx="${itemIndex}" style="background: none; border: none; color: #4cd137; cursor: pointer; font-size: 0.7rem; padding: 0; font-weight: 600;" title="Calcular valor unitário automaticamente">⚡ Auto</button>
                            </div>
                            <input type="text" data-cat="${catIndex}" data-idx="${itemIndex}" data-field="precoUnitario" value="${item.precoUnitario || ''}">
                        </div>
                        <div style="flex: 2;">
                            <label>Preço</label>
                            <input type="text" data-cat="${catIndex}" data-idx="${itemIndex}" data-field="preco" value="${item.preco || ''}">
                        </div>
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

        // Listener individual de Auto-Calcular Unitário
        document.querySelectorAll('.btn-calc-unit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cIdx = parseInt(e.target.getAttribute('data-cat'), 10);
                const iIdx = parseInt(e.target.getAttribute('data-idx'), 10);
                const item = state.categorias[cIdx].itens[iIdx];
                const valAuto = calcularPrecoUnitarioAuto(item.preco, item.qtd);
                if (valAuto) {
                    item.precoUnitario = valAuto;
                    salvarEstado();
                    renderEditor();
                    renderPreviewPages();
                    mostrarToast(`⚡ Val. Unitário calculado: ${valAuto}`);
                } else {
                    alert("Preencha o Preço e a Quantidade do produto para auto-calcular.");
                }
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

    // Função de Renderização das 8 Páginas A4 no Preview Direito (Salgados Neves Style)
    function renderPreviewPages() {
        previewContainer.innerHTML = '';

        // PÁGINA 1: CAPA CLEAN & ELEGANTE
        const p1 = document.createElement('div');
        p1.className = 'a4-sheet page-cover';
        p1.innerHTML = `
            <div class="cover-top-brand">
                <div class="copelli-logo-box">
                    <div class="logo-main-title">Copelli</div>
                    <div class="logo-sub-title">${state.subtitulo}</div>
                </div>
            </div>

            <div class="cover-hero-img-container">
                <img src="${DEFAULT_DISH_IMAGES.coxinha}" alt="Salgados Copelli">
                <div class="cover-badge-tag">CATÁLOGO DE PRODUTOS COMPLETO</div>
            </div>

            <div class="cover-footer-contacts">
                <div class="contact-pill">📱 ${state.telefone}</div>
                <div class="contact-pill">📸 ${state.instagram}</div>
            </div>
        `;
        previewContainer.appendChild(p1);

        // PÁGINA 2: HISTÓRIA & QUEM SOMOS (CLEAN)
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
            <div class="history-header-line">
                <h3>Nossa História & Valores</h3>
            </div>
            <div class="history-content">
                ${historiaParagrafos}
            </div>
            <div class="history-footer-banner">
                🌾 Tradição Italiana & Sabor Caseiro desde 1998 com mais de 60 produtos!
            </div>
        `;
        previewContainer.appendChild(p2);

        // PÁGINAS 3, 4, 5, 6: CATEGORIAS DE PRODUTOS (Salgados Neves Card Grid)
        state.categorias.forEach((cat) => {
            if (cat.ativo === false) return;

            const page = document.createElement('div');
            page.className = 'a4-sheet page-category';

            let gridClass = 'neves-card-grid';
            if (cat.id === 'massas' || cat.id === 'novos-produtos') {
                gridClass = 'neves-card-grid-2col';
            }

            const itensHtml = cat.itens
                .filter(item => item.ativo !== false)
                .map(item => `
                    <div class="neves-product-card">
                        <div class="neves-img-box">
                            <img src="${item.img || DEFAULT_DISH_IMAGES.coxinha}" alt="${item.produto}">
                        </div>

                        <div>
                            <div class="neves-card-header">
                                <div class="neves-product-name">${item.produto}</div>
                                ${item.cod ? `<span class="neves-code-badge">Cód ${item.cod}</span>` : ''}
                            </div>

                            <div class="neves-product-details">${(item.detalhe || '').replace(/\n/g, ' · ')}</div>

                            <div class="neves-specs-row">
                                ${item.peso ? `<span class="neves-spec-tag">⚖️ ${item.peso}</span>` : ''}
                                ${item.qtd && item.qtd !== '-' ? `<span class="neves-spec-tag">📦 ${item.qtd}</span>` : ''}
                            </div>
                        </div>

                        <div class="neves-price-container">
                            <span class="neves-unit-price">${item.precoUnitario ? `Unit: ${item.precoUnitario}` : ''}</span>
                            <span class="neves-package-price">${item.preco || ''}</span>
                        </div>
                    </div>
                `).join('');

            page.innerHTML = `
                <div class="category-page-header">
                    <div class="category-page-title">${cat.nome}</div>
                    <div class="category-page-slogan">Copelli Delícias Caseiras</div>
                </div>
                <div class="${gridClass}">
                    ${itensHtml}
                </div>
            `;
            previewContainer.appendChild(page);
        });

        // PÁGINA 7: TABELA DE QUANTIDADES POR PACOTE & SLOGAN
        const p7 = document.createElement('div');
        p7.className = 'a4-sheet page-quantities';

        const qtdLinhasHtml = (state.quantidadesInfo || '').split('\n\n').map(bloco => {
            const linhas = bloco.split('\n');
            const tituloBloco = linhas[0] || '';
            const desc = linhas.slice(1).join('<br>');
            return `
                <tr>
                    <td><strong>${tituloBloco}</strong></td>
                    <td>${desc}</td>
                </tr>
            `;
        }).join('');

        p7.innerHTML = `
            <div class="quantities-title-clean">Rendimento & Quantidades por Pacote</div>
            <div class="quantities-table-container">
                <table class="quantities-table-clean">
                    <thead>
                        <tr>
                            <th style="width: 40%;">Linha de Salgados</th>
                            <th style="width: 60%;">Quantidade Médias por Embalagem</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${qtdLinhasHtml}
                    </tbody>
                </table>
            </div>

            <div class="slogan-banner-clean">
                OS MELHORES SALGADOS PARA OS MELHORES MOMENTOS
            </div>
        `;
        previewContainer.appendChild(p7);

        // PÁGINA 8: CONTRACAPA CLEAN & CONTATOS
        const p8 = document.createElement('div');
        p8.className = 'a4-sheet page-backcover';
        p8.innerHTML = `
            <div class="backcover-card-box">
                <div class="copelli-logo-box" style="margin-bottom: 25px;">
                    <div class="logo-main-title">Copelli</div>
                    <div class="logo-sub-title">${state.subtitulo}</div>
                </div>

                <div class="backcover-contacts-clean">
                    <p style="font-weight: 700; margin-bottom: 10px; font-size: 13pt;">Faça seu pedido conosco!</p>
                    <p>${state.endereco}</p>
                    <p style="margin-top: 10px; color: var(--copelli-gold); font-weight: 700;">📸 ${state.instagram}</p>
                    <div class="backcover-phone-clean">📱 ${state.telefone}</div>
                </div>
            </div>
        `;
        previewContainer.appendChild(p8);
    }

    // Listeners dos Botões Globais
    if (btnSalvar) {
        btnSalvar.addEventListener('click', () => {
            salvarEstado(true);
        });
    }

    if (btnImprimir) {
        btnImprimir.addEventListener('click', () => {
            window.print();
        });
    }

    if (btnCalcTodosUnitarios) {
        btnCalcTodosUnitarios.addEventListener('click', () => {
            autoCalcularTodosUnitarios();
        });
    }

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            if (confirm("Deseja restaurar o catálogo visual para o modelo original da Copelli?")) {
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
                mostrarToast("Catálogo padrão restaurado!");
            }
        });
    }

    if (btnExportarJson) {
        btnExportarJson.addEventListener('click', () => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", `catalogo-visual-copelli-clean-${new Date().toISOString().substring(0, 10)}.json`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
            mostrarToast("📥 Backup JSON exportado!");
        });
    }

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

    if (btnGerarJsonCodigo) {
        btnGerarJsonCodigo.addEventListener('click', () => {
            const jsonStr = JSON.stringify(state, null, 2);
            navigator.clipboard.writeText(jsonStr).then(() => {
                mostrarToast("📋 Dados copiados para a área de transferência!");
                alert("Os dados do Catálogo Visual Clean foram COPIADOS!\n\nCole (Ctrl+V) aqui no nosso chat para atualizar a versão oficial.");
            }).catch(() => {
                prompt("Copie todo o texto abaixo:", jsonStr);
            });
        });
    }

    // Inicialização
    renderEditor();
    renderPreviewPages();
});
