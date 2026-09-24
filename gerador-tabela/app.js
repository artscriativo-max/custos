document.addEventListener('DOMContentLoaded', () => {
    const categoriasContainer = document.getElementById('categorias-container');
    const previewContainer = document.getElementById('catalogo-preview');
    const btnImprimir = document.getElementById('btn-imprimir');
    const btnSalvar = document.getElementById('btn-salvar');
    const btnReset = document.getElementById('btn-reset');
    const inputTitulo = document.getElementById('titulo-catalogo');
    const logoUpload = document.getElementById('logo-upload');
    const chkOrdemAlfabetica = document.getElementById('chk-ordem-alfabetica');

    // Dados padrão originais do catálogo Copelli
    const STATE_PADRAO = {
        titulo: "Catálogo de Produtos - Copelli Delícias Caseiras",
        logoUrl: "",
        ordemAlfabetica: true,
        categorias: [
            {
                id: "massas",
                nome: "Massas",
                ativo: true,
                itens: [
                    { id: 101, cod: "1", produto: "CAPELLETTI DE FRANGO", peso: "400G", qtd: "-", preco: "R$ 12,98", ativo: true },
                    { id: 102, cod: "2", produto: "CAPELLETTI DE GADO", peso: "400G", qtd: "-", preco: "R$ 13,98", ativo: true },
                    { id: 103, cod: "3", produto: "SPAGUETTI", peso: "500G", qtd: "-", preco: "R$ 5,90", ativo: true },
                    { id: 104, cod: "4", produto: "TALHARIM", peso: "500G", qtd: "-", preco: "R$ 5,90", ativo: true },
                    { id: 105, cod: "5", produto: "MACARRÃO", peso: "500G", qtd: "-", preco: "R$ 5,90", ativo: true },
                    { id: 106, cod: "6", produto: "TORTEI", peso: "500G", qtd: "-", preco: "R$ 9,49", ativo: true }
                ]
            },
            {
                id: "salgados-coquetel",
                nome: "Salgados Coquetel",
                ativo: true,
                itens: [
                    { id: 201, cod: "74", produto: "CHURROS DOCE DE LEITE", peso: "2KG", qtd: "80 a 90 und/pct", preco: "R$ 46,98", ativo: true },
                    { id: 202, cod: "14", produto: "COXINHA DE FRANGO", peso: "2KG", qtd: "80 a 90 und/pct", preco: "R$ 38,98", ativo: true },
                    { id: 203, cod: "15", produto: "RISOLES DE FRANGO", peso: "2KG", qtd: "55 a 65 und/pct", preco: "R$ 38,98", ativo: true },
                    { id: 204, cod: "16", produto: "RISOLES DE CARNE", peso: "2KG", qtd: "55 a 65 und/pct", preco: "R$ 38,98", ativo: true },
                    { id: 205, cod: "76", produto: "RISOLIS CALABRESA", peso: "2KG", qtd: "55 a 65 und/pct", preco: "R$ 38,98", ativo: true },
                    { id: 206, cod: "17", produto: "RISOLES DE PALMITO", peso: "2KG", qtd: "55 a 65 und/pct", preco: "R$ 38,98", ativo: true },
                    { id: 207, cod: "46", produto: "RISOLIS DE PIZZA", peso: "2KG", qtd: "55 a 65 und/pct", preco: "R$ 38,98", ativo: true },
                    { id: 208, cod: "18", produto: "CROQUETE DE FRANGO", peso: "2KG", qtd: "80 a 90 und/pct", preco: "R$ 38,98", ativo: true },
                    { id: 209, cod: "20", produto: "CROQUETE DE CARNE", peso: "2KG", qtd: "80 a 90 und/pct", preco: "R$ 38,98", ativo: true },
                    { id: 210, cod: "21", produto: "ASSADO DE NATA DE FRANGO", peso: "2KG", qtd: "55 a 65 und/pct", preco: "R$ 59,98", ativo: true },
                    { id: 211, cod: "22", produto: "ASSADO DE NATA PRESUNTO E QUEIJO", peso: "2KG", qtd: "55 a 65 und/pct", preco: "R$ 59,98", ativo: true },
                    { id: 212, cod: "23", produto: "ASSADO DE NATA DE CARNE GADO", peso: "2KG", qtd: "55 a 65 und/pct", preco: "R$ 59,98", ativo: true },
                    { id: 213, cod: "26", produto: "SALSICHA CORTADA", peso: "2KG", qtd: "80 a 90 und/pct", preco: "R$ 38,98", ativo: true },
                    { id: 214, cod: "27", produto: "TRAVESSEIRINHO PRESUNTO E QUEIJO", peso: "2KG", qtd: "80 a 90 und/pct", preco: "R$ 38,98", ativo: true },
                    { id: 215, cod: "28", produto: "BOLINHA DE QUEIJO COM ORÉGANO", peso: "2KG", qtd: "80 a 90 und/pct", preco: "R$ 38,98", ativo: true },
                    { id: 216, cod: "49", produto: "PASTEL DE CARNE DE FRANGO", peso: "4KG", qtd: "130 und média/caixa", preco: "R$ 115,92", ativo: true },
                    { id: 217, cod: "50", produto: "PASTEL DE CARNE DE GADO", peso: "4KG", qtd: "130 und média/caixa", preco: "R$ 115,92", ativo: true },
                    { id: 218, cod: "56", produto: "PASTEL DE QUEIJO COM ORÉGANO", peso: "4KG", qtd: "130 und média/caixa", preco: "R$ 115,92", ativo: true },
                    { id: 219, cod: "62", produto: "EMPADA DE FRANGO", peso: "2KG", qtd: "45 a 50 und/pct", preco: "R$ 59,98", ativo: true },
                    { id: 220, cod: "63", produto: "EMPADA DE CARNE", peso: "2KG", qtd: "45 a 50 und/pct", preco: "R$ 59,98", ativo: true },
                    { id: 221, cod: "64", produto: "EMPADA DE CALABRESA E REQUEIJÃO", peso: "2KG", qtd: "45 a 50 und/pct", preco: "R$ 59,98", ativo: true },
                    { id: 222, cod: "51", produto: "FOLHADO DE FRANGO", peso: "2KG", qtd: "55 a 60 und/pct", preco: "R$ 46,98", ativo: true },
                    { id: 223, cod: "52", produto: "FOLHADO DE PRESUNTO E QUEIJO", peso: "2KG", qtd: "55 a 60 und/pct", preco: "R$ 46,98", ativo: true },
                    { id: 224, cod: "10", produto: "CROISSANT DE FRANGO", peso: "2KG", qtd: "55 a 60 und/pct", preco: "R$ 46,98", ativo: true },
                    { id: 225, cod: "11", produto: "CROISSANT DE PRESUNTO", peso: "2KG", qtd: "55 a 60 und/pct", preco: "R$ 46,98", ativo: true },
                    { id: 226, cod: "12", produto: "CROISSANT DE CHOCOLATE AO LEITE", peso: "2KG", qtd: "55 a 60 und/pct", preco: "R$ 48,98", ativo: true }
                ]
            },
            {
                id: "salgados-lanche",
                nome: "Salgados Lanche",
                ativo: true,
                itens: [
                    { id: 301, cod: "30", produto: "COXINHA DE FRANGO", peso: "2KG", qtd: "16 und/pct", preco: "R$ 38,98", ativo: true },
                    { id: 302, cod: "31", produto: "CROQUETE DE FRANGO", peso: "2KG", qtd: "16 und/pct", preco: "R$ 38,98", ativo: true },
                    { id: 303, cod: "89", produto: "TRAVESSEIRO DE PRESUNTO E QUEIJO", peso: "2KG", qtd: "16 und/pct", preco: "R$ 38,98", ativo: true },
                    { id: 304, cod: "34", produto: "CROQUETE DE CARNE", peso: "2KG", qtd: "16 und/pct", preco: "R$ 38,98", ativo: true },
                    { id: 305, cod: "35", produto: "RISOLIS DE FRANGO", peso: "2KG", qtd: "16 und/pct", preco: "R$ 38,98", ativo: true },
                    { id: 306, cod: "37", produto: "ASSADO DE NATA FRANGO", peso: "2KG", qtd: "16 und/pct", preco: "R$ 59,98", ativo: true },
                    { id: 307, cod: "36", produto: "ASSADO DE NATA CARNE GADO", peso: "2KG", qtd: "16 und/pct", preco: "R$ 59,98", ativo: true },
                    { id: 308, cod: "39", produto: "RISOLIS DE CARNE GADO", peso: "2KG", qtd: "16 und/pct", preco: "R$ 38,98", ativo: true },
                    { id: 309, cod: "40", produto: "SALSICHA", peso: "2KG", qtd: "16 und/pct", preco: "R$ 38,98", ativo: true },
                    { id: 310, cod: "59", produto: "PASTEL DE CARNE DE FRANGO", peso: "4KG", qtd: "40 und/caixa", preco: "R$ 115,92", ativo: true },
                    { id: 311, cod: "58", produto: "PASTEL DE CARNE DE GADO", peso: "4KG", qtd: "40 und/caixa", preco: "R$ 115,92", ativo: true },
                    { id: 312, cod: "60", produto: "EMPADA DE FRANGO", peso: "2KG", qtd: "12 und/pct", preco: "R$ 59,98", ativo: true },
                    { id: 313, cod: "65", produto: "EMPADA DE CALABRESA", peso: "2KG", qtd: "12 und/pct", preco: "R$ 59,98", ativo: true },
                    { id: 314, cod: "86", produto: "EMPADA DE BRÓCOLIS", peso: "2KG", qtd: "12 und/pct", preco: "R$ 59,98", ativo: true },
                    { id: 315, cod: "61", produto: "EMPADA DE CARNE", peso: "2KG", qtd: "12 und/pct", preco: "R$ 59,98", ativo: true },
                    { id: 316, cod: "88", produto: "EMPADA DE BACON COM AZEITONA", peso: "2KG", qtd: "12 und/pct", preco: "R$ 59,98", ativo: true },
                    { id: 317, cod: "66", produto: "EMPADA DE PALMITO", peso: "2KG", qtd: "12 und/pct", preco: "R$ 59,98", ativo: true },
                    { id: 318, cod: "47", produto: "ESPETINHO DE FRANGO EMPANADO", peso: "2KG", qtd: "20 und/pct", preco: "R$ 47,98", ativo: true },
                    { id: 319, cod: "53", produto: "FOLHADO DE FRANGO", peso: "2KG", qtd: "12 und/pct", preco: "R$ 46,98", ativo: true },
                    { id: 320, cod: "54", produto: "FOLHADO DE PRESUNTO E QUEIJO", peso: "2KG", qtd: "12 und/pct", preco: "R$ 46,98", ativo: true },
                    { id: 321, cod: "102", produto: "CROISSANT DE FRANGO", peso: "2KG", qtd: "16 und/pct", preco: "R$ 46,98", ativo: true },
                    { id: 322, cod: "99", produto: "CROISSANT DE PRESUNTO E QUEIJO", peso: "2KG", qtd: "16 und/pct", preco: "R$ 46,98", ativo: true },
                    { id: 323, cod: "94", produto: "CROISSANT DE CHOCOLATE", peso: "2KG", qtd: "16 und/pct", preco: "R$ 47,98", ativo: true },
                    { id: 324, cod: "93", produto: "CROISSANT DE GOIABA", peso: "2KG", qtd: "16 und/pct", preco: "R$ 47,98", ativo: true },
                    { id: 325, cod: "105", produto: "CATARINA DE CHOCOLATE PRETO", peso: "2KG", qtd: "4 und/pct", preco: "R$ 85,00", ativo: true },
                    { id: 326, cod: "107", produto: "CATARINA DE CHOCOLATE BRANCO", peso: "2KG", qtd: "4 und/pct", preco: "R$ 85,00", ativo: true },
                    { id: 327, cod: "112", produto: "CATARINA DE CALABRESA", peso: "2KG", qtd: "4 und/pct", preco: "R$ 58,00", ativo: true },
                    { id: 328, cod: "103", produto: "DOG FOLHADO", peso: "2KG", qtd: "15 und/pct", preco: "R$ 48,98", ativo: true },
                    { id: 329, cod: "104", produto: "GRAVATINHA FOLHADA", peso: "2KG", qtd: "20 und/pct", preco: "R$ 38,00", ativo: true },
                    { id: 330, cod: "105", produto: "GROSTOLI", peso: "2KG", qtd: "-", preco: "R$ 38,98", ativo: true }
                ]
            }
        ]
    };

    let state = JSON.parse(JSON.stringify(STATE_PADRAO));
    let globalIdCount = 400;

    function salvarEstado(mostrarNotificacao = false) {
        try {
            localStorage.setItem('copelli_catalogo_state', JSON.stringify(state));
            if (mostrarNotificacao) {
                mostrarToast("💾 Alterações salvas com sucesso!");
            }
        } catch (e) {
            console.error("Erro ao salvar no localStorage", e);
        }
    }

    function carregarEstado() {
        const dados = localStorage.getItem('copelli_catalogo_state');
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

    // Carrega os dados salvos anteriormente
    carregarEstado();
    if (inputTitulo) inputTitulo.value = state.titulo || "Catálogo de Produtos - Copelli Delícias Caseiras";
    if (chkOrdemAlfabetica) chkOrdemAlfabetica.checked = state.ordemAlfabetica !== false;

    function ordenarProdutosEstado() {
        if (!state.ordemAlfabetica) return;
        state.categorias.forEach(cat => {
            cat.itens.sort((a, b) => {
                const pA = (a.produto || '').trim();
                const pB = (b.produto || '').trim();
                return pA.localeCompare(pB, 'pt-BR', { sensitivity: 'base', numeric: true });
            });
        });
    }

    // Ordenar estado inicial
    ordenarProdutosEstado();

    // Garantir propriedade ativo em todas as categorias e itens
    state.categorias.forEach(cat => {
        if (cat.ativo === undefined) cat.ativo = true;
        cat.itens.forEach(item => {
            if (item.ativo === undefined) item.ativo = true;
        });
    });

    // Função para renderizar os acordeões no painel
    function renderEditor() {
        categoriasContainer.innerHTML = '';

        state.categorias.forEach((cat, catIndex) => {
            const accDiv = document.createElement('div');
            accDiv.className = 'accordion' + (cat.ativo === false ? ' cat-disabled' : '');
            
            // Header do acordeão com Checkbox da Categoria
            const accHeader = document.createElement('div');
            accHeader.className = 'accordion-header';
            accHeader.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" class="cat-checkbox" data-cat="${catIndex}" ${cat.ativo !== false ? 'checked' : ''} style="width: 18px; height: 18px; cursor: pointer; accent-color: #b33939;">
                    <span style="font-weight: 600; font-size: 1.05rem;">${cat.nome}</span>
                    ${cat.ativo === false ? '<span style="font-size: 0.75rem; color: var(--editor-text-muted); font-weight: normal; margin-left: 5px;">(Oculto no Relatório)</span>' : ''}
                </div>
                <span>▼</span>
            `;
            
            // Toggle do acordeão (ignora clique na checkbox)
            accHeader.addEventListener('click', (e) => {
                if (e.target.classList.contains('cat-checkbox')) return;
                accDiv.classList.toggle('active');
            });

            // Body do acordeão
            const accBody = document.createElement('div');
            accBody.className = 'accordion-body';
            
            // Lista de itens
            const itemsContainer = document.createElement('div');
            itemsContainer.className = 'items-container';
            
            cat.itens.forEach((item, itemIndex) => {
                const itemForm = document.createElement('div');
                itemForm.className = 'item-form';
                itemForm.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; background: rgba(0,0,0,0.25); padding: 6px 10px; border-radius: 4px;">
                        <label style="display: flex; align-items: center; gap: 8px; margin: 0; cursor: pointer; font-size: 0.8rem; color: var(--editor-text); font-weight: 500; text-transform: none; letter-spacing: 0;">
                            <input type="checkbox" class="item-checkbox" data-cat="${catIndex}" data-idx="${itemIndex}" ${item.ativo !== false ? 'checked' : ''} style="width: 16px; height: 16px; cursor: pointer; accent-color: #b33939;">
                            <span>Exibir este produto na folha / relatório</span>
                        </label>
                        <button type="button" class="btn-remove" data-cat="${catIndex}" data-id="${item.id}" style="margin: 0;">🗑️ Remover</button>
                    </div>

                    <div class="form-group row-group" style="grid-template-columns: 1fr 3fr;">
                        <div style="flex: 1;">
                            <label>Cód</label>
                            <input type="text" data-cat="${catIndex}" data-idx="${itemIndex}" data-field="cod" value="${item.cod || ''}">
                        </div>
                        <div style="flex: 4;">
                            <label>Produto</label>
                            <input type="text" data-cat="${catIndex}" data-idx="${itemIndex}" data-field="produto" value="${item.produto || ''}">
                        </div>
                    </div>
                    <div class="form-group row-group" style="grid-template-columns: 1fr 1fr 1fr;">
                        <div style="flex: 2;">
                            <label>Peso/Pct</label>
                            <input type="text" data-cat="${catIndex}" data-idx="${itemIndex}" data-field="peso" value="${item.peso || ''}">
                        </div>
                        <div style="flex: 2;">
                            <label>Qtd</label>
                            <input type="text" data-cat="${catIndex}" data-idx="${itemIndex}" data-field="qtd" value="${item.qtd || ''}">
                        </div>
                        <div style="flex: 2;">
                            <label>Preço</label>
                            <input type="text" data-cat="${catIndex}" data-idx="${itemIndex}" data-field="preco" value="${item.preco || ''}">
                        </div>
                    </div>
                `;
                itemsContainer.appendChild(itemForm);
            });

            // Botão Adicionar Item
            const btnAdd = document.createElement('button');
            btnAdd.type = 'button';
            btnAdd.className = 'btn btn-secondary btn-sm';
            btnAdd.textContent = '+ Adicionar Produto';
            btnAdd.style.marginTop = '10px';
            btnAdd.addEventListener('click', () => {
                state.categorias[catIndex].itens.push({
                    id: globalIdCount++,
                    cod: "",
                    produto: "Novo Produto",
                    peso: "",
                    qtd: "",
                    preco: "",
                    ativo: true
                });
                renderEditor();
                updatePreview();
                document.querySelectorAll('.accordion')[catIndex].classList.add('active');
            });

            accBody.appendChild(itemsContainer);
            accBody.appendChild(btnAdd);
            
            accDiv.appendChild(accHeader);
            accDiv.appendChild(accBody);
            
            categoriasContainer.appendChild(accDiv);
        });

        // Listeners para a checkbox de categoria
        document.querySelectorAll('.cat-checkbox').forEach(chk => {
            chk.addEventListener('change', (e) => {
                const cIdx = parseInt(e.target.getAttribute('data-cat'), 10);
                state.categorias[cIdx].ativo = e.target.checked;
                salvarEstado();
                renderEditor();
                updatePreview();
            });
        });

        // Listeners para a checkbox de cada produto
        document.querySelectorAll('.item-checkbox').forEach(chk => {
            chk.addEventListener('change', (e) => {
                const cIdx = parseInt(e.target.getAttribute('data-cat'), 10);
                const iIdx = parseInt(e.target.getAttribute('data-idx'), 10);
                state.categorias[cIdx].itens[iIdx].ativo = e.target.checked;
                salvarEstado();
                updatePreview();
            });
        });

        // Adicionar Listeners nos inputs recém-criados
        document.querySelectorAll('.items-container input[type="text"]').forEach(input => {
            input.addEventListener('input', (e) => {
                const cIdx = e.target.getAttribute('data-cat');
                const iIdx = e.target.getAttribute('data-idx');
                const field = e.target.getAttribute('data-field');
                
                state.categorias[cIdx].itens[iIdx][field] = e.target.value;
                salvarEstado();
                updatePreview();
            });
        });

        // Listeners para os botões de remover
        document.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cIdx = e.target.getAttribute('data-cat');
                const id = parseInt(e.target.getAttribute('data-id'), 10);
                
                state.categorias[cIdx].itens = state.categorias[cIdx].itens.filter(i => i.id !== id);
                salvarEstado();
                renderEditor();
                updatePreview();
                document.querySelectorAll('.accordion')[cIdx].classList.add('active');
            });
        });
    }

    // Função para atualizar o A4
    function updatePreview() {
        let logoHtml = '';
        if (state.logoUrl) {
            logoHtml = `<div class="cat-header-logo"><img src="${state.logoUrl}" alt="Logo"></div>`;
        }

        let catHtml = `
            <div class="cat-header">
                ${logoHtml}
                <div class="cat-header-title">${state.titulo}</div>
            </div>
        `;

        state.categorias.forEach(cat => {
            // Se a categoria inteira estiver desmarcada, pula
            if (cat.ativo === false) return;

            // Filtra apenas os produtos ativos (marcados na seleção)
            let itensAtivos = cat.itens.filter(item => item.ativo !== false);
            if (itensAtivos.length === 0) return; // Não renderiza categoria se não houver itens ativos

            // Se ordenação alfabética estiver ativa, ordena no A4 (A-Z)
            if (state.ordemAlfabetica) {
                itensAtivos.sort((a, b) => {
                    const pA = (a.produto || '').trim();
                    const pB = (b.produto || '').trim();
                    return pA.localeCompare(pB, 'pt-BR', { sensitivity: 'base', numeric: true });
                });
            }

            catHtml += `
                <div class="cat-section">
                    <h2 class="cat-section-title">${cat.nome}</h2>
                    <table class="cat-table">
                        <thead>
                            <tr>
                                <th class="col-cod">Cód</th>
                                <th class="col-produto">Produto</th>
                                <th class="col-peso">Peso / Pacote</th>
                                <th class="col-qtd">Quantidade</th>
                                <th class="col-preco">Preço</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            itensAtivos.forEach(item => {
                catHtml += `
                    <tr>
                        <td class="col-cod">${item.cod || ''}</td>
                        <td class="col-produto"><strong>${item.produto || ''}</strong></td>
                        <td class="col-peso">${item.peso || ''}</td>
                        <td class="col-qtd">${item.qtd || ''}</td>
                        <td class="col-preco">${item.preco || ''}</td>
                    </tr>
                `;
            });

            catHtml += `
                        </tbody>
                    </table>
                </div>
            `;
        });

        let outerHtml = `
            <table style="width: 100%; border-collapse: collapse; border: none;">
                <thead>
                    <tr><td style="height: 15mm; border: none;"></td></tr>
                </thead>
                <tbody>
                    <tr><td style="border: none; padding: 0 15mm;">
                        ${catHtml}
                    </td></tr>
                </tbody>
                <tfoot>
                    <tr><td style="height: 15mm; border: none;"></td></tr>
                </tfoot>
            </table>
        `;

        previewContainer.innerHTML = outerHtml;
    }

    // Toggle da Ordem Alfabética
    if (chkOrdemAlfabetica) {
        chkOrdemAlfabetica.addEventListener('change', (e) => {
            state.ordemAlfabetica = e.target.checked;
            if (state.ordemAlfabetica) {
                ordenarProdutosEstado();
                renderEditor();
            }
            salvarEstado();
            updatePreview();
        });
    }

    // Título Geral Listener
    inputTitulo.addEventListener('input', (e) => {
        state.titulo = e.target.value;
        salvarEstado();
        updatePreview();
    });

    // Logo Upload handler
    logoUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                state.logoUrl = evt.target.result;
                salvarEstado();
                updatePreview();
            };
            reader.readAsDataURL(file);
        } else {
            state.logoUrl = '';
            salvarEstado();
            updatePreview();
        }
    });

    // Botão Salvar Explícito
    if (btnSalvar) {
        btnSalvar.addEventListener('click', () => {
            salvarEstado(true);
        });
    }

    // Botão Restaurar Padrões
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            if (confirm("Tem certeza de que deseja restaurar a tabela para a versão padrão de fábrica da Copelli?")) {
                localStorage.removeItem('copelli_catalogo_state');
                state = JSON.parse(JSON.stringify(STATE_PADRAO));
                ordenarProdutosEstado();
                if (inputTitulo) inputTitulo.value = state.titulo;
                if (chkOrdemAlfabetica) chkOrdemAlfabetica.checked = state.ordemAlfabetica;
                renderEditor();
                updatePreview();
                mostrarToast("Tabela padrão restaurada!");
            }
        });
    }

    // Exportar Backup JSON
    const btnExportarJson = document.getElementById('btn-exportar-json');
    const btnImportarTrigger = document.getElementById('btn-importar-trigger');
    const inputImportarJson = document.getElementById('input-importar-json');

    if (btnExportarJson) {
        btnExportarJson.addEventListener('click', () => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", `catalogo-copelli-backup-${new Date().toISOString().substring(0, 10)}.json`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
            mostrarToast("📥 Backup JSON exportado com sucesso!");
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
                            if (chkOrdemAlfabetica) chkOrdemAlfabetica.checked = state.ordemAlfabetica !== false;
                            ordenarProdutosEstado();
                            renderEditor();
                            updatePreview();
                            mostrarToast("📤 Backup JSON importado com sucesso!");
                        } else {
                            alert("O arquivo selecionado não contém uma estrutura válida de catálogo.");
                        }
                    } catch (err) {
                        alert("Erro ao ler o arquivo JSON selecionado.");
                    }
                };
                reader.readAsText(file);
            }
        });
    }

    const btnGerarJsonCodigo = document.getElementById('btn-gerar-json-codigo');
    if (btnGerarJsonCodigo) {
        btnGerarJsonCodigo.addEventListener('click', () => {
            const jsonStr = JSON.stringify(state, null, 2);
            navigator.clipboard.writeText(jsonStr).then(() => {
                mostrarToast("📋 Dados copiados para a área de transferência!");
                alert("Os dados atualizados do seu navegador foram COPIADOS!\n\nCole (Ctrl+V) aqui no chat da nossa conversa para atualizar o arquivo ZIP definitivamente para o seu cliente!");
            }).catch(() => {
                prompt("Copie (Ctrl+C) todo o texto abaixo e envie no nosso chat:", jsonStr);
            });
        });
    }

    // Imprimir
    btnImprimir.addEventListener('click', () => {
        window.print();
    });

    // Iniciar
    renderEditor();
    updatePreview();
});
