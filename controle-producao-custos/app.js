/**
 * Agri Doce - Controle de Produção e Custos
 * Lógica do aplicativo com armazenamento persistente em localStorage
 */

// --- DADOS E INICIALIZAÇÃO DO ESTADO ---

const DADOS_PADRAO_INSUMOS = [
    { id: "i1", nome: "Farinha de Trigo (Panificação)", categoria: "Ingrediente", unidade: "kg", preco: 5.20, quantidade: 1.0, estoqueAtual: 25.0, estoqueMinimo: 10.0 },
    { id: "i2", nome: "Farinha de Trigo (Massa Fresca)", categoria: "Ingrediente", unidade: "kg", preco: 6.50, quantidade: 1.0, estoqueAtual: 15.0, estoqueMinimo: 5.0 },
    { id: "i3", nome: "Sal Refinado", categoria: "Ingrediente", unidade: "g", preco: 3.50, quantidade: 1000.0, estoqueAtual: 5000.0, estoqueMinimo: 1000.0 },
    { id: "i4", nome: "Caldo de Galinha (Tabletes)", categoria: "Ingrediente", unidade: "un", preco: 8.40, quantidade: 10.0, estoqueAtual: 50.0, estoqueMinimo: 10.0 },
    { id: "i5", nome: "Caldo de Carne (Tabletes)", categoria: "Ingrediente", unidade: "un", preco: 8.40, quantidade: 10.0, estoqueAtual: 30.0, estoqueMinimo: 10.0 },
    { id: "i6", nome: "Óleo de Soja", categoria: "Ingrediente", unidade: "ml", preco: 7.20, quantidade: 900.0, estoqueAtual: 4500.0, estoqueMinimo: 1800.0 },
    { id: "i7", nome: "Batata Lavada", categoria: "Ingrediente", unidade: "kg", preco: 5.90, quantidade: 1.0, estoqueAtual: 20.0, estoqueMinimo: 8.0 },
    { id: "i8", nome: "Chimichurri Seco", categoria: "Ingrediente", unidade: "g", preco: 12.00, quantidade: 100.0, estoqueAtual: 500.0, estoqueMinimo: 100.0 },
    { id: "i9", nome: "Cebola Nacional", categoria: "Ingrediente", unidade: "kg", preco: 4.80, quantidade: 1.0, estoqueAtual: 5.0, estoqueMinimo: 2.0 },
    { id: "i10", nome: "Alho Descascado", categoria: "Ingrediente", unidade: "kg", preco: 28.00, quantidade: 1.0, estoqueAtual: 2.0, estoqueMinimo: 0.5 },
    { id: "i11", nome: "Salsinha Fresca", categoria: "Ingrediente", unidade: "un", preco: 3.00, quantidade: 1.0, estoqueAtual: 6.0, estoqueMinimo: 2.0 },
    { id: "i12", nome: "Guisado (Carne Moída)", categoria: "Ingrediente", unidade: "kg", preco: 34.90, quantidade: 1.0, estoqueAtual: 12.0, estoqueMinimo: 5.0 },
    { id: "i13", nome: "Açúcar Refinado", categoria: "Ingrediente", unidade: "kg", preco: 4.50, quantidade: 1.0, estoqueAtual: 10.0, estoqueMinimo: 3.0 },
    { id: "i14", nome: "Fermento Biológico Seco", categoria: "Ingrediente", unidade: "g", preco: 15.00, quantidade: 500.0, estoqueAtual: 1500.0, estoqueMinimo: 500.0 },
    { id: "i15", nome: "Mistura Integral", categoria: "Ingrediente", unidade: "kg", preco: 9.80, quantidade: 1.0, estoqueAtual: 10.0, estoqueMinimo: 3.0 },
    { id: "i16", nome: "Cacau 100%", categoria: "Ingrediente", unidade: "g", preco: 22.00, quantidade: 500.0, estoqueAtual: 1000.0, estoqueMinimo: 200.0 },
    { id: "i17", nome: "Margarina 80% Lipídios", categoria: "Ingrediente", unidade: "g", preco: 7.90, quantidade: 500.0, estoqueAtual: 3000.0, estoqueMinimo: 1000.0 },
    { id: "i18", nome: "Banha de Porco", categoria: "Ingrediente", unidade: "kg", preco: 14.50, quantidade: 1.0, estoqueAtual: 5.0, estoqueMinimo: 2.0 },
    { id: "i19", nome: "Ovos Médios", categoria: "Ingrediente", unidade: "un", preco: 16.00, quantidade: 30.0, estoqueAtual: 90.0, estoqueMinimo: 30.0 },
    { id: "i20", nome: "Leite Integral", categoria: "Ingrediente", unidade: "ml", preco: 5.40, quantidade: 1000.0, estoqueAtual: 4000.0, estoqueMinimo: 2000.0 },
    { id: "i21", nome: "Cachaça de Cana", categoria: "Ingrediente", unidade: "ml", preco: 12.00, quantidade: 1000.0, estoqueAtual: 2000.0, estoqueMinimo: 500.0 },
    { id: "i22", nome: "Água Potável", categoria: "Ingrediente", unidade: "L", preco: 0.00, quantidade: 1.0, estoqueAtual: 999.0, estoqueMinimo: 0.0 },
    { id: "i23", nome: "Gás de Cozinha (Botijão 13kg)", categoria: "Outro", unidade: "kg", preco: 110.00, quantidade: 13.0, estoqueAtual: 13.0, estoqueMinimo: 5.0 },
    { id: "i24", nome: "Peito de Frango (Sem Osso)", categoria: "Ingrediente", unidade: "kg", preco: 18.90, quantidade: 1.0, estoqueAtual: 10.0, estoqueMinimo: 3.0 }
];

const DADOS_PADRAO_RECHEIOS = [
    {
        id: "rec_frango",
        nome: "Recheio de Frango Desfiado",
        rendimentoQuantidade: 2.0,
        rendimentoUnidade: "kg",
        tempoPreparo: 45,
        custoHora: 20.00,
        custosFixos: 10,
        ingredientes: [
            { insumoId: "i24", quantidade: 1.5, unidade: "kg" }, // Peito de Frango
            { insumoId: "i9", quantidade: 100.0, unidade: "g" }, // Cebola
            { insumoId: "i10", quantidade: 10.0, unidade: "g" }, // Alho
            { insumoId: "i6", quantidade: 50.0, unidade: "ml" }, // Óleo
            { insumoId: "i3", quantidade: 30.0, unidade: "g" }, // Sal
            { insumoId: "i8", quantidade: 10.0, unidade: "g" }, // Chimichurri
            { insumoId: "i23", quantidade: 0.15, unidade: "kg" } // Gás (150g)
        ]
    },
    {
        id: "rec_carne",
        nome: "Recheio de Carne Moída",
        rendimentoQuantidade: 2.0,
        rendimentoUnidade: "kg",
        tempoPreparo: 30,
        custoHora: 20.00,
        custosFixos: 10,
        ingredientes: [
            { insumoId: "i12", quantidade: 1.5, unidade: "kg" }, // Guisado
            { insumoId: "i9", quantidade: 100.0, unidade: "g" }, // Cebola
            { insumoId: "i10", quantidade: 10.0, unidade: "g" }, // Alho
            { insumoId: "i6", quantidade: 50.0, unidade: "ml" }, // Óleo
            { insumoId: "i3", quantidade: 35.0, unidade: "g" }, // Sal
            { insumoId: "i8", quantidade: 10.0, unidade: "g" }, // Chimichurri
            { insumoId: "i11", quantidade: 1.0, unidade: "un" }, // Salsinha
            { insumoId: "i23", quantidade: 0.10, unidade: "kg" } // Gás (100g)
        ]
    }
];

const DADOS_PADRAO_RECEITAS = [
    {
        id: "r1",
        nome: "Massa de Salgados (Risoles)",
        rendimento: "Aprox. 8kg de massa",
        tempoPreparo: 60,
        custoHora: 20.00,
        custosFixos: 15,
        margemLucro: 100,
        ingredientes: [
            { insumoId: "i22", quantidade: 3.0, unidade: "L" }, // Água
            { insumoId: "i3", quantidade: 120.0, unidade: "g" }, // Sal
            { insumoId: "i4", quantidade: 3.0, unidade: "un" }, // Caldo Galinha
            { insumoId: "i6", quantidade: 150.0, unidade: "ml" }, // Óleo
            { insumoId: "i7", quantidade: 1.5, unidade: "kg" }, // Batata
            { insumoId: "i1", quantidade: 3.0, unidade: "kg" }, // Farinha
            { insumoId: "i8", quantidade: 20.0, unidade: "g" }, // Chimichurri
            { insumoId: "i23", quantidade: 0.15, unidade: "kg" } // Gás (150g)
        ]
    },
    {
        id: "r2",
        nome: "Risoles de Carne (Salgado Pronto)",
        rendimento: "Aprox. 100 unidades (100g cada)",
        tempoPreparo: 90,
        custoHora: 20.00,
        custosFixos: 15,
        margemLucro: 120,
        ingredientes: [
            { insumoId: "r1", quantidade: 8.0, unidade: "kg" }, // Usa a Massa de Risoles inteira
            { insumoId: "rec_carne", quantidade: 2.0, unidade: "kg" } // Recheio de Carne
        ]
    },
    {
        id: "r3",
        nome: "Massa de Pães (Hot Dog e Sanduíche)",
        rendimento: "91 pães por forma",
        tempoPreparo: 50,
        custoHora: 20.00,
        custosFixos: 10,
        margemLucro: 150,
        ingredientes: [
            { insumoId: "i1", quantidade: 2.0, unidade: "kg" }, // Farinha
            { insumoId: "i3", quantidade: 50.0, unidade: "g" }, // Sal
            { insumoId: "i13", quantidade: 200.0, unidade: "g" }, // Açúcar
            { insumoId: "i22", quantidade: 1.0, unidade: "L" }, // Água
            { insumoId: "i14", quantidade: 25.0, unidade: "g" } // Fermento (seco)
        ]
    },
    {
        id: "r4",
        nome: "Massa de Empadas",
        rendimento: "Aprox. 3kg de massa",
        tempoPreparo: 45,
        custoHora: 20.00,
        custosFixos: 15,
        margemLucro: 100,
        ingredientes: [
            { insumoId: "i1", quantidade: 2.0, unidade: "kg" }, // Farinha
            { insumoId: "i3", quantidade: 70.0, unidade: "g" }, // Sal
            { insumoId: "i18", quantidade: 300.0, unidade: "g" }, // Banha
            { insumoId: "i17", quantidade: 200.0, unidade: "g" }, // Margarina
            { insumoId: "i19", quantidade: 4.0, unidade: "un" }, // Ovos inteiros
            { insumoId: "i20", quantidade: 200.0, unidade: "ml" } // Leite
        ]
    }
];

const DADOS_PADRAO_PRODUCAO = [
    { id: "p1", receitaId: "r1", quantidade: 2, data: "2026-08-15", custoTotal: 62.40, status: "Concluído" },
    { id: "p2", receitaId: "r3", quantidade: 3, data: "2026-08-16", custoTotal: 44.80, status: "Concluído" }
];

// Estado Geral da Aplicação
let state = {
    insumos: [],
    recheios: [],
    receitas: [],
    producoes: []
};

// --- FUNÇÕES DE CONVERSÃO DE UNIDADES E CÁLCULO ---

/**
 * Converte qualquer unidade de massa ou volume para sua base comum
 * de forma a permitir comparações e cálculos precisos.
 */
function converterParaBase(quantidade, unidade) {
    switch (unidade) {
        case 'kg':
            return { qtd: quantidade * 1000, unidadeBase: 'g' };
        case 'L':
            return { qtd: quantidade * 1000, unidadeBase: 'ml' };
        default:
            return { qtd: quantidade, unidadeBase: unidade };
    }
}

/**
 * Calcula o custo unitário do insumo de forma inteligente e escalável.
 */
function calcularCustoUnitarioInsumo(insumo) {
    if (!insumo.preco || insumo.preco === 0 || !insumo.quantidade || insumo.quantidade === 0) return 0;
    
    // Normalizar a unidade da embalagem para a base
    const base = converterParaBase(insumo.quantidade, insumo.unidade);
    return insumo.preco / base.qtd; // Custo por grama, ml ou unidade
}

/**
 * Calcula o custo de um ingrediente com base na unidade de medida usada na receita.
 * Suporta tanto insumos básicos quanto sub-receitas (recheios) ou outras receitas base (massa).
 */
function calcularCustoIngrediente(ingrediente) {
    if (ingrediente.insumoId.startsWith('rec_')) {
        // É um recheio (sub-receita)
        const recheio = state.recheios.find(r => r.id === ingrediente.insumoId);
        if (!recheio) return 0;
        
        const analiseRecheio = calcularFichaTecnicaRecheio(recheio);
        const custoUnitBase = analiseRecheio.custoUnitarioBase; // Custo por unidade base (g ou ml)
        const baseIngrediente = converterParaBase(ingrediente.quantidade, ingrediente.unidade);
        
        return baseIngrediente.qtd * custoUnitBase;
    } else if (ingrediente.insumoId.startsWith('r') && !ingrediente.insumoId.startsWith('rec_') && ingrediente.insumoId.length <= 4) {
        // É outra receita final usada como base (ex: Massa de Risoles r1)
        const recBase = state.receitas.find(r => r.id === ingrediente.insumoId);
        if (!recBase) return 0;

        const analiseRecBase = calcularFichaTecnica(recBase);
        
        // Estimar rendimento em peso
        let rendPesoKg = 1.0;
        if (recBase.rendimento.includes("8kg")) rendPesoKg = 8.0;
        else if (recBase.rendimento.includes("11kg")) rendPesoKg = 11.0;
        else if (recBase.rendimento.includes("3kg")) rendPesoKg = 3.0;
        
        const custoUnitBase = analiseRecBase.custoTotal / (rendPesoKg * 1000); // Custo por grama
        const baseIngrediente = converterParaBase(ingrediente.quantidade, ingrediente.unidade);
        
        return baseIngrediente.qtd * custoUnitBase;
    } else {
        // É um insumo básico
        const insumo = state.insumos.find(i => i.id === ingrediente.insumoId);
        if (!insumo) return 0;

        const custoUnitBase = calcularCustoUnitarioInsumo(insumo);
        const baseIngrediente = converterParaBase(ingrediente.quantidade, ingrediente.unidade);
        
        return baseIngrediente.qtd * custoUnitBase;
    }
}

/**
 * Calcula os custos de um Recheio (Sub-receita)
 */
function calcularFichaTecnicaRecheio(recheio) {
    let custoIngredientes = 0;
    const listagemIngredientes = (recheio.ingredientes || []).map(ing => {
        const insumo = state.insumos.find(i => i.id === ing.insumoId);
        const custo = calcularCustoIngrediente(ing);
        custoIngredientes += custo;
        
        return {
            nome: insumo ? insumo.nome : "Insumo excluído",
            quantidade: ing.quantidade,
            unidade: ing.unidade,
            custoCalculado: custo
        };
    });

    const tempo = Number(recheio.tempoPreparo) || 0;
    const custoHora = Number(recheio.custoHora) || 0;
    const maoObra = (custoHora / 60) * tempo;

    const custosFixosPercentual = Number(recheio.custosFixos) || 0;
    const custoBase = custoIngredientes + maoObra;
    const custoTotal = custoBase * (1 + (custosFixosPercentual / 100));

    // Custo unitário base do recheio
    const rendQtd = Number(recheio.rendimentoQuantidade) || 1;
    const rendUn = recheio.rendimentoUnidade || 'kg';
    const baseRendimento = converterParaBase(rendQtd, rendUn);
    const custoUnitarioBase = custoTotal / baseRendimento.qtd; // Custo por grama, ml ou un

    return {
        custoIngredientes,
        listagemIngredientes,
        tempo,
        custoHora,
        maoObra,
        custosFixosPercentual,
        custoTotal,
        custoUnitarioBase,
        rendimentoExibicao: `${rendQtd} ${rendUn}`
    };
}

/**
 * Calcula o custo total e detalhado de uma Ficha Técnica (Receita Final)
 */
function calcularFichaTecnica(receita) {
    let custoIngredientes = 0;
    const listagemIngredientes = (receita.ingredientes || []).map(ing => {
        let nome = "Excluído";
        if (ing.insumoId.startsWith('rec_')) {
            const recheio = state.recheios.find(r => r.id === ing.insumoId);
            if (recheio) nome = `[Recheio] ${recheio.nome}`;
        } else if (ing.insumoId.startsWith('r') && ingredienteEReceitaBase(ing.insumoId)) {
            const rBase = state.receitas.find(r => r.id === ing.insumoId);
            if (rBase) nome = `[Massa Base] ${rBase.nome}`;
        } else {
            const insumo = state.insumos.find(i => i.id === ing.insumoId);
            if (insumo) nome = insumo.nome;
        }
        
        const custo = calcularCustoIngrediente(ing);
        custoIngredientes += custo;
        
        return {
            nome,
            quantidade: ing.quantidade,
            unidade: ing.unidade,
            custoCalculado: custo
        };
    });

    const tempo = Number(receita.tempoPreparo) || 0;
    const custoHora = Number(receita.custoHora) || 0;
    const maoObra = (custoHora / 60) * tempo;

    const custosFixosPercentual = Number(receita.custosFixos) || 0;
    
    // Custo base: ingredientes + mão de obra
    const custoBase = custoIngredientes + maoObra;
    // Adiciona o custo indireto/fixo proporcional
    const custoTotal = custoBase * (1 + (custosFixosPercentual / 100));
    
    // Margem de Lucro e Preço de Venda
    const margemLucroPercentual = Number(receita.margemLucro) || 100;
    const precoSugerido = custoTotal * (1 + (margemLucroPercentual / 100));
    const lucroEstimado = precoSugerido - custoTotal;

    return {
        custoIngredientes,
        listagemIngredientes,
        tempo,
        custoHora,
        maoObra,
        custosFixosPercentual,
        custoTotal,
        margemLucroPercentual,
        precoSugerido,
        lucroEstimado,
        rendimento: receita.rendimento || "Não especificado"
    };
}

function ingredienteEReceitaBase(id) {
    return id.startsWith('r') && !id.startsWith('rec_') && id.length <= 4;
}

// --- PERSISTÊNCIA DE DADOS ---

function salvarEstado() {
    localStorage.setItem('agridece_state_v2', JSON.stringify(state));
    atualizarUI();
    exportarJSONParaBackup();
}

function carregarEstado() {
    let dadosSalvos = localStorage.getItem('agridece_state_v2');
    if (!dadosSalvos) {
        dadosSalvos = localStorage.getItem('agridece_state');
    }
    
    if (dadosSalvos) {
        try {
            state = JSON.parse(dadosSalvos);
            // Retrocompatibilidade se recheios estiver indefinido
            if (!state.recheios) state.recheios = [];
        } catch (e) {
            console.error("Erro ao ler dados do localStorage. Restaurando padrões.");
            restaurarPadroes();
        }
    } else {
        restaurarPadroes();
    }
    atualizarUI();
    exportarJSONParaBackup();
}

function restaurarPadroes() {
    state.insumos = [...DADOS_PADRAO_INSUMOS];
    state.recheios = [...DADOS_PADRAO_RECHEIOS];
    state.receitas = [...DADOS_PADRAO_RECEITAS];
    state.producoes = [...DADOS_PADRAO_PRODUCAO];
    salvarEstado();
}


// --- SISTEMA DE COMPONENTES E ATUALIZAÇÃO DA UI ---

function formatarMoeda(valor, precision = 2) {
    return new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL',
        minimumFractionDigits: precision,
        maximumFractionDigits: precision
    }).format(valor || 0);
}

function formatarCustoUnitario(custoUnit) {
    if (custoUnit === 0) return 'R$ 0,00';
    if (custoUnit < 0.01) {
        return formatarMoeda(custoUnit, 4); // Exibe com 4 casas se for muito pequeno
    }
    return formatarMoeda(custoUnit, 2);
}

function mostrarToast(mensagem, tipo = 'success') {
    const toast = document.getElementById('toast');
    const msgSpan = document.getElementById('toast-message');
    msgSpan.textContent = mensagem;
    toast.className = `toast show toast-${tipo}`;
    
    setTimeout(() => {
        toast.className = 'toast';
    }, 3500);
}

function atualizarUI() {
    renderDashboard();
    renderInsumos();
    renderRecheios();
    renderReceitas();
    renderProducoes();
    atualizarDropdownReceitas();
}

// 1. Renderizar Dashboard
function renderDashboard() {
    // Valor total em estoque
    let totalEstoque = 0;
    state.insumos.forEach(ins => {
        const custoUnit = calcularCustoUnitarioInsumo(ins);
        const baseEstoque = converterParaBase(ins.estoqueAtual, ins.unidade);
        totalEstoque += baseEstoque.qtd * custoUnit;
    });
    document.getElementById('dash-val-estoque').textContent = formatarMoeda(totalEstoque);

    // Totais de produção
    document.getElementById('dash-total-lotes').textContent = state.producoes.length;
    document.getElementById('dash-total-receitas').textContent = state.receitas.length;

    // Alertas de estoque baixo
    let alertas = 0;
    const alertListContainer = document.getElementById('dash-estoque-baixo-list');
    alertListContainer.innerHTML = '';

    state.insumos.forEach(ins => {
        const baseEstoque = converterParaBase(ins.estoqueAtual, ins.unidade);
        const baseMinimo = converterParaBase(ins.estoqueMinimo || 0, ins.unidade);
        
        if (baseEstoque.qtd <= baseMinimo.qtd && baseMinimo.qtd > 0) {
            alertas++;
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${ins.nome}</strong></td>
                <td class="badge-danger">${ins.estoqueAtual} ${ins.unidade}</td>
                <td>${ins.estoqueMinimo} ${ins.unidade}</td>
                <td><span class="badge badge-danger">Repor</span></td>
            `;
            alertListContainer.appendChild(tr);
        }
    });

    document.getElementById('dash-alertas-estoque').textContent = alertas;
    if (alertas === 0) {
        alertListContainer.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; color: var(--color-text-secondary);">Nenhum insumo abaixo do limite.</td>
            </tr>
        `;
    }

    // Últimos lotes produzidos
    const ultimasProdContainer = document.getElementById('dash-ultimas-producoes');
    ultimasProdContainer.innerHTML = '';

    const ultimas = [...state.producoes].reverse().slice(0, 5);
    if (ultimas.length === 0) {
        ultimasProdContainer.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; color: var(--color-text-secondary);">Nenhuma produção registrada ainda.</td>
            </tr>
        `;
    } else {
        ultimas.forEach(prod => {
            const receita = state.receitas.find(r => r.id === prod.receitaId);
            const tr = document.createElement('tr');
            const dataFmt = prod.data ? prod.data.split('-').reverse().join('/') : '';
            tr.innerHTML = `
                <td>${dataFmt}</td>
                <td><strong>${receita ? receita.nome : 'Excluída'}</strong></td>
                <td>${prod.quantidade} lote(s)</td>
                <td>${formatarMoeda(prod.custoTotal)}</td>
            `;
            ultimasProdContainer.appendChild(tr);
        });
    }
}

// 2. Renderizar Insumos
function renderInsumos() {
    const tableBody = document.getElementById('insumos-table-body');
    tableBody.innerHTML = '';

    if (state.insumos.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: var(--color-text-secondary);">Nenhum insumo cadastrado.</td>
            </tr>
        `;
        return;
    }

    state.insumos.forEach(ins => {
        const custoUnit = calcularCustoUnitarioInsumo(ins);
        
        // Formatar exibição do custo unitário amigável
        let custoExibicao = '';
        if (ins.unidade === 'kg') {
            custoExibicao = `${formatarCustoUnitario(custoUnit * 1000)} / kg (ou ${formatarCustoUnitario(custoUnit)}/g)`;
        } else if (ins.unidade === 'L') {
            custoExibicao = `${formatarCustoUnitario(custoUnit * 1000)} / L (ou ${formatarCustoUnitario(custoUnit)}/ml)`;
        } else {
            custoExibicao = `${formatarCustoUnitario(custoUnit)} / ${ins.unidade}`;
        }

        const isBaixo = (ins.estoqueMinimo > 0 && ins.estoqueAtual <= ins.estoqueMinimo);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <strong>${ins.nome}</strong><br>
                <small style="color: var(--color-text-secondary);">${ins.categoria}</small>
            </td>
            <td>${custoExibicao}</td>
            <td class="${isBaixo ? 'badge-danger' : ''}" style="font-weight:600;">
                ${ins.estoqueAtual} ${ins.unidade}
            </td>
            <td>${ins.estoqueMinimo || 0} ${ins.unidade}</td>
            <td>
                <div class="btn-group" style="margin: 0;">
                    <button class="btn btn-secondary btn-sm edit-ins-btn" data-id="${ins.id}">Editar</button>
                    <button class="btn btn-danger btn-sm delete-ins-btn" data-id="${ins.id}">Excluir</button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });

    // Anexar Listeners
    document.querySelectorAll('.edit-ins-btn').forEach(btn => {
        btn.addEventListener('click', (e) => editarInsumo(e.currentTarget.dataset.id));
    });
    document.querySelectorAll('.delete-ins-btn').forEach(btn => {
        btn.addEventListener('click', (e) => deletarInsumo(e.currentTarget.dataset.id));
    });
}

// 2b. Renderizar Recheios
function renderRecheios() {
    const tableBody = document.getElementById('recheios-table-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    if (!state.recheios || state.recheios.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; color: var(--color-text-secondary);">Nenhum recheio cadastrado.</td>
            </tr>
        `;
        return;
    }

    state.recheios.forEach(rec => {
        const analise = calcularFichaTecnicaRecheio(rec);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <strong>${rec.nome}</strong><br>
                <small style="color: var(--color-text-secondary);">${rec.ingredientes.length} ingrediente(s)</small>
            </td>
            <td>${formatarMoeda(analise.custoIngredientes)}</td>
            <td>${rec.tempoPreparo} min / ${formatarMoeda(analise.maoObra)} + ${rec.custosFixos}%</td>
            <td style="font-weight: 700;">${formatarMoeda(analise.custoTotal)}</td>
            <td>${analise.rendimentoExibicao}</td>
            <td style="color: var(--color-accent); font-weight: 700;">
                ${formatarMoeda(analise.custoUnitarioBase * (rec.rendimentoUnidade === 'kg' || rec.rendimentoUnidade === 'L' ? 1000 : 1))} / ${rec.rendimentoUnidade}
            </td>
            <td>
                <div class="btn-group" style="margin: 0;">
                    <button class="btn btn-primary btn-sm view-rech-btn" data-id="${rec.id}">Ver Ficha</button>
                    <button class="btn btn-secondary btn-sm edit-rech-btn" data-id="${rec.id}">Editar</button>
                    <button class="btn btn-danger btn-sm delete-rech-btn" data-id="${rec.id}">Excluir</button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });

    // Listeners
    document.querySelectorAll('.view-rech-btn').forEach(btn => {
        btn.addEventListener('click', (e) => verFichaTecnicaRecheio(e.currentTarget.dataset.id));
    });
    document.querySelectorAll('.edit-rech-btn').forEach(btn => {
        btn.addEventListener('click', (e) => abrirModalRecheio(e.currentTarget.dataset.id));
    });
    document.querySelectorAll('.delete-rech-btn').forEach(btn => {
        btn.addEventListener('click', (e) => deletarRecheio(e.currentTarget.dataset.id));
    });
}

// 3. Renderizar Receitas
function renderReceitas() {
    const tableBody = document.getElementById('receitas-table-body');
    tableBody.innerHTML = '';

    if (state.receitas.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; color: var(--color-text-secondary);">Nenhuma receita cadastrada.</td>
            </tr>
        `;
        return;
    }

    state.receitas.forEach(rec => {
        const analise = calcularFichaTecnica(rec);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <strong>${rec.nome}</strong><br>
                <small style="color: var(--color-text-secondary);">Rendimento: ${rec.rendimento}</small>
            </td>
            <td>${formatarMoeda(analise.custoIngredientes)}</td>
            <td>${rec.tempoPreparo} min / ${formatarMoeda(analise.maoObra)} + ${rec.custosFixos}%</td>
            <td style="font-weight: 700;">${formatarMoeda(analise.custoTotal)}</td>
            <td style="color: var(--color-accent); font-weight: 700;">${formatarMoeda(analise.precoSugerido)}</td>
            <td>${formatarMoeda(analise.lucroEstimado)}</td>
            <td>
                <div class="btn-group" style="margin: 0;">
                    <button class="btn btn-primary btn-sm view-rec-btn" data-id="${rec.id}">Ver Ficha</button>
                    <button class="btn btn-secondary btn-sm edit-rec-btn" data-id="${rec.id}">Editar</button>
                    <button class="btn btn-danger btn-sm delete-rec-btn" data-id="${rec.id}">Excluir</button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });

    // Anexar Listeners
    document.querySelectorAll('.view-rec-btn').forEach(btn => {
        btn.addEventListener('click', (e) => verFichaTecnica(e.currentTarget.dataset.id));
    });
    document.querySelectorAll('.edit-rec-btn').forEach(btn => {
        btn.addEventListener('click', (e) => abrirModalReceita(e.currentTarget.dataset.id));
    });
    document.querySelectorAll('.delete-rec-btn').forEach(btn => {
        btn.addEventListener('click', (e) => deletarReceita(e.currentTarget.dataset.id));
    });
}

// 4. Renderizar Ordens de Produção
function renderProducoes() {
    const tableBody = document.getElementById('producao-table-body');
    tableBody.innerHTML = '';

    if (state.producoes.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: var(--color-text-secondary);">Nenhuma produção registrada.</td>
            </tr>
        `;
        return;
    }

    state.producoes.forEach(prod => {
        const receita = state.receitas.find(r => r.id === prod.receitaId);
        const dataFmt = prod.data ? prod.data.split('-').reverse().join('/') : '';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${dataFmt}</td>
            <td><strong>${receita ? receita.nome : 'Excluída'}</strong></td>
            <td>${prod.quantidade} lote(s)</td>
            <td>${formatarMoeda(prod.custoTotal)}</td>
            <td>
                <span class="badge badge-success">${prod.status || 'Concluído'}</span>
                <button class="btn btn-danger btn-sm delete-prod-btn" data-id="${prod.id}" style="padding: 2px 6px; font-size: 0.7rem; margin-left: 8px;">Desfazer</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });

    document.querySelectorAll('.delete-prod-btn').forEach(btn => {
        btn.addEventListener('click', (e) => desfazerProducao(e.currentTarget.dataset.id));
    });
}

function atualizarDropdownReceitas() {
    const select = document.getElementById('prod-receita-select');
    select.innerHTML = '<option value="">Selecione uma receita...</option>';
    
    state.receitas.forEach(rec => {
        const opt = document.createElement('option');
        opt.value = rec.id;
        opt.textContent = rec.nome;
        select.appendChild(opt);
    });
}

// --- INTERAÇÕES E OPERAÇÕES ---

// Gerenciamento de Abas
document.getElementById('main-nav').addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-btn')) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(cont => cont.classList.remove('active'));
        
        e.target.classList.add('active');
        const tabId = e.target.dataset.tab;
        document.getElementById(tabId).classList.add('active');
    }
});

// Ações de Insumos
const formInsumo = document.getElementById('form-insumo');
formInsumo.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = document.getElementById('insumo-id').value;
    const nome = document.getElementById('insumo-nome').value.trim();
    const categoria = document.getElementById('insumo-categoria').value;
    const unidade = document.getElementById('insumo-unidade').value;
    const preco = parseFloat(document.getElementById('insumo-preco').value);
    const quantidade = parseFloat(document.getElementById('insumo-quantidade').value);
    const estoqueAtual = parseFloat(document.getElementById('insumo-estoque-atual').value) || 0;
    const estoqueMinimo = parseFloat(document.getElementById('insumo-estoque-minimo').value) || 0;

    if (id) {
        // Modo Edição
        const index = state.insumos.findIndex(ins => ins.id === id);
        if (index !== -1) {
            state.insumos[index] = { id, nome, categoria, unidade, preco, quantidade, estoqueAtual, estoqueMinimo };
            mostrarToast("Insumo editado com sucesso!");
        }
    } else {
        // Novo Insumo
        const novoId = 'i' + Date.now();
        state.insumos.push({ id: novoId, nome, categoria, unidade, preco, quantidade, estoqueAtual, estoqueMinimo });
        mostrarToast("Insumo adicionado com sucesso!");
    }

    formInsumo.reset();
    document.getElementById('insumo-id').value = '';
    document.getElementById('btn-cancel-insumo').style.display = 'none';
    document.getElementById('insumo-form-title').textContent = "Cadastrar Novo Insumo";
    atualizarRotulosUnidadeInsumo();
    
    salvarEstado();
});

function editarInsumo(id) {
    const insumo = state.insumos.find(ins => ins.id === id);
    if (!insumo) return;

    document.getElementById('insumo-id').value = insumo.id;
    document.getElementById('insumo-nome').value = insumo.nome;
    document.getElementById('insumo-categoria').value = insumo.categoria;
    document.getElementById('insumo-unidade').value = insumo.unidade;
    document.getElementById('insumo-preco').value = insumo.preco;
    document.getElementById('insumo-quantidade').value = insumo.quantidade;
    document.getElementById('insumo-estoque-atual').value = insumo.estoqueAtual;
    document.getElementById('insumo-estoque-minimo').value = insumo.estoqueMinimo;

    document.getElementById('btn-cancel-insumo').style.display = 'inline-flex';
    document.getElementById('insumo-form-title').textContent = "Editar Insumo";
    
    // Rolagem suave até o formulário e animação visual de destaque
    const formCard = document.getElementById('card-insumo-form');
    if (formCard) {
        formCard.scrollIntoView({ behavior: 'smooth' });
        formCard.classList.remove('flash-focus');
        void formCard.offsetWidth; // Força reflow no navegador
        formCard.classList.add('flash-focus');
    }

    atualizarRotulosUnidadeInsumo();
    document.getElementById('insumo-nome').focus();
}

document.getElementById('btn-cancel-insumo').addEventListener('click', () => {
    formInsumo.reset();
    document.getElementById('insumo-id').value = '';
    document.getElementById('btn-cancel-insumo').style.display = 'none';
    document.getElementById('insumo-form-title').textContent = "Cadastrar Novo Insumo";
    atualizarRotulosUnidadeInsumo();
});

function deletarInsumo(id) {
    // Verificar se o insumo está em uso nas receitas
    const emUso = state.receitas.some(rec => rec.ingredientes.some(ing => ing.insumoId === id));
    if (emUso) {
        alert("Não é possível excluir este insumo porque ele faz parte de uma receita cadastrada. Remova-o da receita antes de excluir.");
        return;
    }

    if (confirm("Deseja realmente excluir este insumo?")) {
        state.insumos = state.insumos.filter(ins => ins.id !== id);
        mostrarToast("Insumo excluído.", "danger");
        salvarEstado();
    }
}

// Ações de Receitas (Fichas Técnicas)
const receitaModal = document.getElementById('receita-modal');
const recipeIngredientsContainer = document.getElementById('recipe-ingredients-container');

document.getElementById('btn-abrir-receita-modal').addEventListener('click', () => abrirModalReceita());
document.getElementById('btn-fechar-receita-modal').addEventListener('click', fecharModalReceita);
document.getElementById('btn-cancel-receita-modal').addEventListener('click', fecharModalReceita);

document.getElementById('btn-add-ingrediente-row').addEventListener('click', () => {
    recipeIngredientsContainer.appendChild(criarLinhaIngrediente());
});

function criarLinhaIngrediente(dados = null) {
    const row = document.createElement('div');
    row.className = 'ingredient-row';

    // Dropdown de insumos
    const select = document.createElement('select');
    select.required = true;
    select.innerHTML = '<option value="">Escolha o ingrediente...</option>';
    state.insumos.forEach(ins => {
        const opt = document.createElement('option');
        opt.value = ins.id;
        opt.textContent = `${ins.nome} (${ins.unidade})`;
        select.appendChild(opt);
    });

    const inputQtd = document.createElement('input');
    inputQtd.type = 'number';
    inputQtd.step = '0.001';
    inputQtd.min = '0.001';
    inputQtd.required = true;
    inputQtd.placeholder = 'Qtd.';

    // Dropdown de unidade usada
    const selectUnidade = document.createElement('select');
    selectUnidade.required = true;
    selectUnidade.innerHTML = `
        <option value="g">g</option>
        <option value="kg">kg</option>
        <option value="ml">ml</option>
        <option value="L">L</option>
        <option value="un">un</option>
    `;

    const btnDelete = document.createElement('button');
    btnDelete.type = 'button';
    btnDelete.className = 'btn btn-danger btn-sm';
    btnDelete.innerHTML = '&times;';
    btnDelete.style.padding = '0.4rem 0.8rem';
    btnDelete.addEventListener('click', () => row.remove());

    if (dados) {
        select.value = dados.insumoId;
        inputQtd.value = dados.quantidade;
        selectUnidade.value = dados.unidade;
    }

    row.appendChild(select);
    row.appendChild(inputQtd);
    row.appendChild(selectUnidade);
    row.appendChild(btnDelete);

    return row;
}

function criarLinhaIngredienteReceita(dados = null) {
    const row = document.createElement('div');
    row.className = 'ingredient-row';

    const select = document.createElement('select');
    select.required = true;
    select.innerHTML = '<option value="">Escolha o ingrediente ou recheio...</option>';
    
    // Insumos
    const optGroupInsumos = document.createElement('optgroup');
    optGroupInsumos.label = "Insumos Básicos";
    state.insumos.forEach(ins => {
        const opt = document.createElement('option');
        opt.value = ins.id;
        opt.textContent = `${ins.nome} (${ins.unidade})`;
        optGroupInsumos.appendChild(opt);
    });
    select.appendChild(optGroupInsumos);

    // Recheios
    if (state.recheios && state.recheios.length > 0) {
        const optGroupRecheios = document.createElement('optgroup');
        optGroupRecheios.label = "Recheios (Sub-receitas)";
        state.recheios.forEach(rech => {
            const opt = document.createElement('option');
            opt.value = rech.id;
            opt.textContent = `[Recheio] ${rech.nome} (${rech.rendimentoUnidade})`;
            optGroupRecheios.appendChild(opt);
        });
        select.appendChild(optGroupRecheios);
    }
    
    // Receitas
    if (state.receitas && state.receitas.length > 0) {
        const optGroupReceitas = document.createElement('optgroup');
        optGroupReceitas.label = "Receitas (Massas Base)";
        state.receitas.forEach(rec => {
            const idReceitaAtual = document.getElementById('receita-id').value;
            if (rec.id !== idReceitaAtual) {
                const opt = document.createElement('option');
                opt.value = rec.id;
                opt.textContent = `[Massa Base] ${rec.nome}`;
                optGroupReceitas.appendChild(opt);
            }
        });
        select.appendChild(optGroupReceitas);
    }

    const inputQtd = document.createElement('input');
    inputQtd.type = 'number';
    inputQtd.step = '0.001';
    inputQtd.min = '0.001';
    inputQtd.required = true;
    inputQtd.placeholder = 'Qtd.';

    const selectUnidade = document.createElement('select');
    selectUnidade.required = true;
    selectUnidade.innerHTML = `
        <option value="g">g</option>
        <option value="kg">kg</option>
        <option value="ml">ml</option>
        <option value="L">L</option>
        <option value="un">un</option>
    `;

    const btnDelete = document.createElement('button');
    btnDelete.type = 'button';
    btnDelete.className = 'btn btn-danger btn-sm';
    btnDelete.innerHTML = '&times;';
    btnDelete.style.padding = '0.4rem 0.8rem';
    btnDelete.addEventListener('click', () => row.remove());

    if (dados) {
        select.value = dados.insumoId;
        inputQtd.value = dados.quantidade;
        selectUnidade.value = dados.unidade;
    }

    row.appendChild(select);
    row.appendChild(inputQtd);
    row.appendChild(selectUnidade);
    row.appendChild(btnDelete);

    return row;
}

function abrirModalReceita(id = null) {
    recipeIngredientsContainer.innerHTML = '';
    const form = document.getElementById('form-receita');
    form.reset();
    document.getElementById('receita-id').value = '';
    
    if (id) {
        const receita = state.receitas.find(r => r.id === id);
        if (receita) {
            document.getElementById('receita-modal-title').textContent = "Editar Ficha Técnica";
            document.getElementById('receita-id').value = receita.id;
            document.getElementById('receita-nome').value = receita.nome;
            document.getElementById('receita-tempo-preparo').value = receita.tempoPreparo || 0;
            document.getElementById('receita-custo-hora').value = receita.custoHora || 20.00;
            document.getElementById('receita-custos-fixos').value = receita.custosFixos;
            document.getElementById('receita-margem').value = receita.margemLucro;
            document.getElementById('receita-rendimento').value = receita.rendimento;

            receita.ingredientes.forEach(ing => {
                recipeIngredientsContainer.appendChild(criarLinhaIngredienteReceita(ing));
            });
        }
    } else {
        document.getElementById('receita-modal-title').textContent = "Nova Ficha Técnica (Receita)";
        recipeIngredientsContainer.appendChild(criarLinhaIngredienteReceita());
    }

    receitaModal.classList.add('active');
}

function fecharModalReceita() {
    receitaModal.classList.remove('active');
}

const formReceita = document.getElementById('form-receita');
formReceita.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('receita-id').value;
    const nome = document.getElementById('receita-nome').value.trim();
    const maoObra = parseFloat(document.getElementById('receita-mao-obra').value) || 0;
    const custosFixos = parseFloat(document.getElementById('receita-custos-fixos').value) || 0;
    const margemLucro = parseFloat(document.getElementById('receita-margem').value) || 0;
    const rendimento = document.getElementById('receita-rendimento').value.trim() || 'Lote Único';

    // Montar os ingredientes da receita
    const ingredientes = [];
    const rows = recipeIngredientsContainer.querySelectorAll('.ingredient-row');
    rows.forEach(row => {
        const selects = row.querySelectorAll('select');
        const input = row.querySelector('input');
        
        const insumoId = selects[0].value;
        const quantidade = parseFloat(input.value);
        const unidade = selects[1].value;

        if (insumoId && quantidade > 0) {
            ingredientes.push({ insumoId, quantidade, unidade });
        }
    });

    if (ingredientes.length === 0) {
        alert("Adicione pelo menos 1 ingrediente.");
        return;
    }

    if (id) {
        // Editar
        const index = state.receitas.findIndex(r => r.id === id);
        if (index !== -1) {
            state.receitas[index] = { id, nome, rendimento, maoObra, custosFixos, margemLucro, ingredientes };
            mostrarToast("Ficha técnica editada!");
        }
    } else {
        // Nova
        const novoId = 'r' + Date.now();
        state.receitas.push({ id: novoId, nome, rendimento, maoObra, custosFixos, margemLucro, ingredientes });
        mostrarToast("Nova ficha técnica adicionada!");
    }

    fecharModalReceita();
    salvarEstado();
});

function deletarReceita(id) {
    // Verificar se a receita está em uso como sub-receita em outra receita
    const emUso = state.receitas.some(r => r.ingredientes.some(ing => ing.insumoId === id));
    if (emUso) {
        alert("Esta receita não pode ser excluída porque é usada como ingrediente base em outra receita.");
        return;
    }

    if (confirm("Deseja realmente excluir esta ficha técnica?")) {
        state.receitas = state.receitas.filter(r => r.id !== id);
        mostrarToast("Receita excluída.", "danger");
        salvarEstado();
    }
}

// Ações de Recheios (Sub-receitas)
const recheioModal = document.getElementById('recheio-modal');
const recheioIngredientsContainer = document.getElementById('recheio-ingredients-container');

document.getElementById('btn-abrir-recheio-modal').addEventListener('click', () => abrirModalRecheio());
document.getElementById('btn-fechar-recheio-modal').addEventListener('click', fecharModalRecheio);
document.getElementById('btn-cancel-recheio-modal').addEventListener('click', fecharModalRecheio);

document.getElementById('btn-add-recheio-ingrediente-row').addEventListener('click', () => {
    recheioIngredientsContainer.appendChild(criarLinhaIngrediente());
});

function abrirModalRecheio(id = null) {
    recheioIngredientsContainer.innerHTML = '';
    const form = document.getElementById('form-recheio');
    form.reset();
    document.getElementById('recheio-id').value = '';

    if (id) {
        const recheio = state.recheios.find(r => r.id === id);
        if (recheio) {
            document.getElementById('recheio-modal-title').textContent = "Editar Custo de Recheio";
            document.getElementById('recheio-id').value = recheio.id;
            document.getElementById('recheio-nome').value = recheio.nome;
            document.getElementById('recheio-tempo-preparo').value = recheio.tempoPreparo || 0;
            document.getElementById('recheio-custo-hora').value = recheio.custoHora || 20.00;
            document.getElementById('recheio-custos-fixos').value = recheio.custosFixos || 0;
            document.getElementById('recheio-rendimento-qtd').value = recheio.rendimentoQuantidade || 1.0;
            document.getElementById('recheio-rendimento-un').value = recheio.rendimentoUnidade || 'kg';

            recheio.ingredientes.forEach(ing => {
                recheioIngredientsContainer.appendChild(criarLinhaIngrediente(ing));
            });
        }
    } else {
        document.getElementById('recheio-modal-title').textContent = "Novo Custo de Recheio";
        recheioIngredientsContainer.appendChild(criarLinhaIngrediente());
    }

    recheioModal.classList.add('active');
}

function fecharModalRecheio() {
    recheioModal.classList.remove('active');
}

const formRecheio = document.getElementById('form-recheio');
formRecheio.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('recheio-id').value;
    const nome = document.getElementById('recheio-nome').value.trim();
    const tempoPreparo = parseInt(document.getElementById('recheio-tempo-preparo').value) || 0;
    const custoHora = parseFloat(document.getElementById('recheio-custo-hora').value) || 0;
    const custosFixos = parseFloat(document.getElementById('recheio-custos-fixos').value) || 0;
    const rendimentoQuantidade = parseFloat(document.getElementById('recheio-rendimento-qtd').value) || 1.0;
    const rendimentoUnidade = document.getElementById('recheio-rendimento-un').value;

    const ingredientes = [];
    const rows = recheioIngredientsContainer.querySelectorAll('.ingredient-row');
    rows.forEach(row => {
        const selects = row.querySelectorAll('select');
        const input = row.querySelector('input');

        const insumoId = selects[0].value;
        const quantidade = parseFloat(input.value);
        const unidade = selects[1].value;

        if (insumoId && quantidade > 0) {
            ingredientes.push({ insumoId, quantidade, unidade });
        }
    });

    if (ingredientes.length === 0) {
        alert("Adicione pelo menos 1 ingrediente.");
        return;
    }

    if (id) {
        const index = state.recheios.findIndex(r => r.id === id);
        if (index !== -1) {
            state.recheios[index] = { id, nome, tempoPreparo, custoHora, custosFixos, rendimentoQuantidade, rendimentoUnidade, ingredientes };
            mostrarToast("Recheio editado com sucesso!");
        }
    } else {
        const novoId = 'rec_' + Date.now(); // Prefixo rec_ para identificar como recheio
        state.recheios.push({ id: novoId, nome, tempoPreparo, custoHora, custosFixos, rendimentoQuantidade, rendimentoUnidade, ingredientes });
        mostrarToast("Novo recheio adicionado com sucesso!");
    }

    fecharModalRecheio();
    salvarEstado();
});

function deletarRecheio(id) {
    // Verificar se o recheio está em uso em alguma receita final
    const emUso = state.receitas.some(rec => rec.ingredientes.some(ing => ing.insumoId === id));
    if (emUso) {
        alert("Não é possível excluir este recheio porque ele está sendo usado na ficha técnica de um produto final.");
        return;
    }

    if (confirm("Deseja realmente excluir este recheio?")) {
        state.recheios = state.recheios.filter(r => r.id !== id);
        mostrarToast("Recheio excluído.", "danger");
        salvarEstado();
    }
}

// 5. Visualização de Ficha Técnica
const detalhesModal = document.getElementById('detalhes-custo-modal');
document.getElementById('btn-fechar-detalhes-modal').addEventListener('click', () => detalhesModal.classList.remove('active'));
document.getElementById('btn-fechar-detalhes-btn').addEventListener('click', () => detalhesModal.classList.remove('active'));

function verFichaTecnicaRecheio(id) {
    const recheio = state.recheios.find(r => r.id === id);
    if (!recheio) return;

    const analise = calcularFichaTecnicaRecheio(recheio);
    const container = document.getElementById('detalhes-conteudo');
    
    document.getElementById('detalhes-titulo').textContent = recheio.nome;

    let ingredientesHtml = '';
    analise.listagemIngredientes.forEach(ing => {
        ingredientesHtml += `
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--color-border); padding: 0.4rem 0;">
                <span>${ing.nome} - ${ing.quantidade}${ing.unidade}</span>
                <span style="font-weight: 500;">${formatarMoeda(ing.custoCalculado)}</span>
            </div>
        `;
    });

    container.innerHTML = `
        <div style="margin-bottom: 1rem;">
            <p><strong>Rendimento do Lote:</strong> ${analise.rendimentoExibicao}</p>
        </div>
        
        <h4 style="font-family: var(--font-title); margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 0.05em;">Ingredientes (Insumos)</h4>
        <div style="margin-bottom: 1.5rem; max-height: 200px; overflow-y: auto;">
            ${ingredientesHtml}
        </div>
        
        <h4 style="font-family: var(--font-title); margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 0.05em;">Custos de Preparação</h4>
        <div class="cost-breakdown">
            <div class="cost-row">
                <span>Ingredientes</span>
                <span>${formatarMoeda(analise.custoIngredientes)}</span>
            </div>
            <div class="cost-row">
                <span>Mão de Obra (${analise.tempo} min a ${formatarMoeda(analise.custoHora)}/h)</span>
                <span>${formatarMoeda(analise.maoObra)}</span>
            </div>
            <div class="cost-row">
                <span>Custos Fixos / Indiretos (${analise.custosFixosPercentual}%)</span>
                <span>${formatarMoeda((analise.custoIngredientes + analise.maoObra) * (analise.custosFixosPercentual/100))}</span>
            </div>
            <div class="cost-row total">
                <span>Custo de Produção do Lote</span>
                <span>${formatarMoeda(analise.custoTotal)}</span>
            </div>
            <div class="cost-row" style="font-weight: 600; border-top: 1px dotted var(--color-accent); margin-top: 0.5rem; padding-top: 0.5rem;">
                <span>Custo Unitário (${recheio.rendimentoUnidade})</span>
                <span>${formatarMoeda(analise.custoUnitarioBase * (recheio.rendimentoUnidade === 'kg' || recheio.rendimentoUnidade === 'L' ? 1000 : 1))}</span>
            </div>
        </div>
    `;

    detalhesModal.classList.add('active');

    // Imprimir
    document.getElementById('btn-imprimir-ficha').onclick = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>Ficha Técnica (Recheio) - ${recheio.nome}</title>
                <style>
                    body { font-family: sans-serif; padding: 2rem; color: #111; }
                    h2 { border-bottom: 2px solid #111; padding-bottom: 0.5rem; margin-bottom: 1rem; }
                    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
                    th, td { border-bottom: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f5f5f5; }
                    .resumo { margin-top: 1.5rem; background-color: #f9f9f9; padding: 15px; border: 1px solid #ddd; }
                    .row { display: flex; justify-content: space-between; margin-bottom: 8px; }
                    .row.total { font-weight: bold; border-top: 1px solid #111; padding-top: 8px; }
                </style>
            </head>
            <body>
                <h2>Ficha Técnica Recheio: ${recheio.nome}</h2>
                <p><strong>Rendimento:</strong> ${analise.rendimentoExibicao}</p>
                
                <h3>Ingredientes</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Ingrediente</th>
                            <th>Quantidade</th>
                            <th>Custo</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${analise.listagemIngredientes.map(i => `
                            <tr>
                                <td>${i.nome}</td>
                                <td>${i.quantidade} ${i.unidade}</td>
                                <td>${formatarMoeda(i.custoCalculado)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <div class="resumo">
                    <div class="row">
                        <span>Ingredientes:</span>
                        <span>${formatarMoeda(analise.custoIngredientes)}</span>
                    </div>
                    <div class="row">
                        <span>Mão de Obra (${analise.tempo} min):</span>
                        <span>${formatarMoeda(analise.maoObra)}</span>
                    </div>
                    <div class="row">
                        <span>Custos Indiretos (${analise.custosFixosPercentual}%):</span>
                        <span>${formatarMoeda((analise.custoIngredientes + analise.maoObra) * (analise.custosFixosPercentual/100))}</span>
                    </div>
                    <div class="row total">
                        <span>CUSTO DE PRODUÇÃO TOTAL LOTE:</span>
                        <span>${formatarMoeda(analise.custoTotal)}</span>
                    </div>
                    <div class="row" style="font-weight: bold;">
                        <span>Custo Unitário por ${recheio.rendimentoUnidade}:</span>
                        <span>${formatarMoeda(analise.custoUnitarioBase * (recheio.rendimentoUnidade === 'kg' || recheio.rendimentoUnidade === 'L' ? 1000 : 1))}</span>
                    </div>
                </div>
                <script>window.print();</script>
            </body>
            </html>
        `);
        printWindow.document.close();
    };
}

function verFichaTecnica(id) {
    const receita = state.receitas.find(r => r.id === id);
    if (!receita) return;

    const analise = calcularFichaTecnica(receita);
    const container = document.getElementById('detalhes-conteudo');
    
    document.getElementById('detalhes-titulo').textContent = receita.nome;

    let ingredientesHtml = '';
    analise.listagemIngredientes.forEach(ing => {
        ingredientesHtml += `
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--color-border); padding: 0.4rem 0;">
                <span>${ing.nome} - ${ing.quantidade}${ing.unidade}</span>
                <span style="font-weight: 500;">${formatarMoeda(ing.custoCalculado)}</span>
            </div>
        `;
    });

    container.innerHTML = `
        <div style="margin-bottom: 1rem;">
            <p><strong>Rendimento Estimado:</strong> ${analise.rendimento}</p>
        </div>
        
        <h4 style="font-family: var(--font-title); margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 0.05em;">Ingredientes (Insumos)</h4>
        <div style="margin-bottom: 1.5rem; max-height: 200px; overflow-y: auto;">
            ${ingredientesHtml}
        </div>
        
        <h4 style="font-family: var(--font-title); margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 0.05em;">Rateio de Custos da Ficha</h4>
        <div class="cost-breakdown">
            <div class="cost-row">
                <span>Ingredientes</span>
                <span>${formatarMoeda(analise.custoIngredientes)}</span>
            </div>
            <div class="cost-row">
                <span>Mão de Obra (${analise.tempo} min a ${formatarMoeda(analise.custoHora)}/h)</span>
                <span>${formatarMoeda(analise.maoObra)}</span>
            </div>
            <div class="cost-row">
                <span>Custos Fixos / Indiretos (${analise.custosFixosPercentual}%)</span>
                <span>${formatarMoeda((analise.custoIngredientes + analise.maoObra) * (analise.custosFixosPercentual/100))}</span>
            </div>
            <div class="cost-row total">
                <span>Custo de Produção Total</span>
                <span>${formatarMoeda(analise.custoTotal)}</span>
            </div>
            <div class="cost-row">
                <span>Margem de Lucro (${analise.margemLucroPercentual}%)</span>
                <span>${formatarMoeda(analise.precoSugerido - analise.custoTotal)}</span>
            </div>
            <div class="cost-row" style="font-size: 1.1rem; font-weight: bold; border-top: 1px dotted var(--color-accent); padding-top: 0.5rem; margin-top: 0.5rem;">
                <span>Preço Sugerido de Venda</span>
                <span>${formatarMoeda(analise.precoSugerido)}</span>
            </div>
        </div>
    `;

    detalhesModal.classList.add('active');

    // Imprimir Ficha
    document.getElementById('btn-imprimir-ficha').onclick = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>Ficha Técnica - ${receita.nome}</title>
                <style>
                    body { font-family: sans-serif; padding: 2rem; color: #111; }
                    h2 { border-bottom: 2px solid #111; padding-bottom: 0.5rem; margin-bottom: 1rem; }
                    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
                    th, td { border-bottom: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f5f5f5; }
                    .resumo { margin-top: 1.5rem; background-color: #f9f9f9; padding: 15px; border: 1px solid #ddd; }
                    .row { display: flex; justify-content: space-between; margin-bottom: 8px; }
                    .row.total { font-weight: bold; border-top: 1px solid #111; padding-top: 8px; }
                </style>
            </head>
            <body>
                <h2>Ficha Técnica: ${receita.nome}</h2>
                <p><strong>Rendimento:</strong> ${analise.rendimento}</p>
                
                <h3>Ingredientes</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Ingrediente</th>
                            <th>Quantidade Usada</th>
                            <th>Custo Proporcional</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${analise.listagemIngredientes.map(i => `
                            <tr>
                                <td>${i.nome}</td>
                                <td>${i.quantidade} ${i.unidade}</td>
                                <td>${formatarMoeda(i.custoCalculado)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <div class="resumo">
                    <div class="row">
                        <span>Custo dos Ingredientes:</span>
                        <span>${formatarMoeda(analise.custoIngredientes)}</span>
                    </div>
                    <div class="row">
                        <span>Custo da Mão de Obra (${analise.tempo} min):</span>
                        <span>${formatarMoeda(analise.maoObra)}</span>
                    </div>
                    <div class="row">
                        <span>Custos Indiretos / Fixos (${analise.custosFixosPercentual}%):</span>
                        <span>${formatarMoeda((analise.custoIngredientes + analise.maoObra) * (analise.custosFixosPercentual/100))}</span>
                    </div>
                    <div class="row total">
                        <span>CUSTO DE PRODUÇÃO TOTAL:</span>
                        <span>${formatarMoeda(analise.custoTotal)}</span>
                    </div>
                    <div class="row">
                        <span>Preço de Venda Sugerido (Lucro ${analise.margemLucroPercentual}%):</span>
                        <span>${formatarMoeda(analise.precoSugerido)}</span>
                    </div>
                </div>
                <script>window.print();</script>
            </body>
            </html>
        `);
        printWindow.document.close();
    };
}

// 6. Registro de Ordens de Produção (com abate de estoque)
const formProducao = document.getElementById('form-producao');
// Definir data padrão no input para o dia atual
document.getElementById('prod-data').valueAsDate = new Date();

/**
 * Verifica recursivamente se há estoque suficiente para um ingrediente (insumo ou sub-receita/recheio)
 */
function verificarEstoqueIngredienteRecursivo(insumoId, quantidadeDesejada, unidadeUsada, multiplicador, insumosFaltando) {
    if (insumoId.startsWith('rec_')) {
        const recheio = state.recheios.find(r => r.id === insumoId);
        if (!recheio) return;
        
        const rendQtd = Number(recheio.rendimentoQuantidade) || 1;
        const baseRendimento = converterParaBase(rendQtd, recheio.rendimentoUnidade);
        const baseIngrediente = converterParaBase(quantidadeDesejada * multiplicador, unidadeUsada);
        
        const fatorProporcao = baseIngrediente.qtd / baseRendimento.qtd;
        
        recheio.ingredientes.forEach(subIng => {
            verificarEstoqueIngredienteRecursivo(subIng.insumoId, subIng.quantidade, subIng.unidade, fatorProporcao, insumosFaltando);
        });
    } else if (ingredienteEReceitaBase(insumoId)) {
        const receitaBase = state.receitas.find(r => r.id === insumoId);
        if (!receitaBase) return;
        
        let rendPesoKg = 1.0;
        if (receitaBase.rendimento.includes("8kg")) rendPesoKg = 8.0;
        else if (receitaBase.rendimento.includes("11kg")) rendPesoKg = 11.0;
        else if (receitaBase.rendimento.includes("3kg")) rendPesoKg = 3.0;
        
        const baseRendimento = converterParaBase(rendPesoKg, 'kg');
        const baseIngrediente = converterParaBase(quantidadeDesejada * multiplicador, unidadeUsada);
        
        const fatorProporcao = baseIngrediente.qtd / baseRendimento.qtd;
        
        receitaBase.ingredientes.forEach(subIng => {
            verificarEstoqueIngredienteRecursivo(subIng.insumoId, subIng.quantidade, subIng.unidade, fatorProporcao, insumosFaltando);
        });
    } else {
        const insumo = state.insumos.find(i => i.id === insumoId);
        if (!insumo) return;
        
        const baseEstoque = converterParaBase(insumo.estoqueAtual, insumo.unidade);
        const baseNecessaria = converterParaBase(quantidadeDesejada * multiplicador, unidadeUsada);
        
        if (baseEstoque.qtd < baseNecessaria.qtd) {
            const falta = baseNecessaria.qtd - baseEstoque.qtd;
            const faltaFmt = insumo.unidade === 'kg' || insumo.unidade === 'L' ? (falta / 1000) : falta;
            insumosFaltando.push(`${insumo.nome} (Faltam ${faltaFmt.toFixed(2)} ${insumo.unidade})`);
        }
    }
}

/**
 * Abate recursivamente do estoque os insumos utilizados no preparo
 */
function abaterEstoqueIngredienteRecursivo(insumoId, quantidadeDesejada, unidadeUsada, multiplicador) {
    if (insumoId.startsWith('rec_')) {
        const recheio = state.recheios.find(r => r.id === insumoId);
        if (!recheio) return;
        
        const rendQtd = Number(recheio.rendimentoQuantidade) || 1;
        const baseRendimento = converterParaBase(rendQtd, recheio.rendimentoUnidade);
        const baseIngrediente = converterParaBase(quantidadeDesejada * multiplicador, unidadeUsada);
        const fatorProporcao = baseIngrediente.qtd / baseRendimento.qtd;
        
        recheio.ingredientes.forEach(subIng => {
            abaterEstoqueIngredienteRecursivo(subIng.insumoId, subIng.quantidade, subIng.unidade, fatorProporcao);
        });
    } else if (ingredienteEReceitaBase(insumoId)) {
        const receitaBase = state.receitas.find(r => r.id === insumoId);
        if (!receitaBase) return;
        
        let rendPesoKg = 1.0;
        if (receitaBase.rendimento.includes("8kg")) rendPesoKg = 8.0;
        else if (receitaBase.rendimento.includes("11kg")) rendPesoKg = 11.0;
        else if (receitaBase.rendimento.includes("3kg")) rendPesoKg = 3.0;
        
        const baseRendimento = converterParaBase(rendPesoKg, 'kg');
        const baseIngrediente = converterParaBase(quantidadeDesejada * multiplicador, unidadeUsada);
        const fatorProporcao = baseIngrediente.qtd / baseRendimento.qtd;
        
        receitaBase.ingredientes.forEach(subIng => {
            abaterEstoqueIngredienteRecursivo(subIng.insumoId, subIng.quantidade, subIng.unidade, fatorProporcao);
        });
    } else {
        const insumo = state.insumos.find(i => i.id === insumoId);
        if (!insumo) return;
        
        const baseEstoque = converterParaBase(insumo.estoqueAtual, insumo.unidade);
        const baseNecessaria = converterParaBase(quantidadeDesejada * multiplicador, unidadeUsada);
        
        const novaQtdBase = baseEstoque.qtd - baseNecessaria.qtd;
        
        if (insumo.unidade === 'kg' || insumo.unidade === 'L') {
            insumo.estoqueAtual = parseFloat((novaQtdBase / 1000).toFixed(3));
        } else {
            insumo.estoqueAtual = parseFloat(novaQtdBase.toFixed(3));
        }
    }
}

/**
 * Devolve recursivamente ao estoque os insumos utilizados
 */
function devolverEstoqueIngredienteRecursivo(insumoId, quantidadeDesejada, unidadeUsada, multiplicador) {
    if (insumoId.startsWith('rec_')) {
        const recheio = state.recheios.find(r => r.id === insumoId);
        if (!recheio) return;
        
        const rendQtd = Number(recheio.rendimentoQuantidade) || 1;
        const baseRendimento = converterParaBase(rendQtd, recheio.rendimentoUnidade);
        const baseIngrediente = converterParaBase(quantidadeDesejada * multiplicador, unidadeUsada);
        const fatorProporcao = baseIngrediente.qtd / baseRendimento.qtd;
        
        recheio.ingredientes.forEach(subIng => {
            devolverEstoqueIngredienteRecursivo(subIng.insumoId, subIng.quantidade, subIng.unidade, fatorProporcao);
        });
    } else if (ingredienteEReceitaBase(insumoId)) {
        const receitaBase = state.receitas.find(r => r.id === insumoId);
        if (!receitaBase) return;
        
        let rendPesoKg = 1.0;
        if (receitaBase.rendimento.includes("8kg")) rendPesoKg = 8.0;
        else if (receitaBase.rendimento.includes("11kg")) rendPesoKg = 11.0;
        else if (receitaBase.rendimento.includes("3kg")) rendPesoKg = 3.0;
        
        const baseRendimento = converterParaBase(rendPesoKg, 'kg');
        const baseIngrediente = converterParaBase(quantidadeDesejada * multiplicador, unidadeUsada);
        const fatorProporcao = baseIngrediente.qtd / baseRendimento.qtd;
        
        receitaBase.ingredientes.forEach(subIng => {
            devolverEstoqueIngredienteRecursivo(subIng.insumoId, subIng.quantidade, subIng.unidade, fatorProporcao);
        });
    } else {
        const insumo = state.insumos.find(i => i.id === insumoId);
        if (!insumo) return;
        
        const baseEstoque = converterParaBase(insumo.estoqueAtual, insumo.unidade);
        const baseNecessaria = converterParaBase(quantidadeDesejada * multiplicador, unidadeUsada);
        
        const novaQtdBase = baseEstoque.qtd + baseNecessaria.qtd;
        
        if (insumo.unidade === 'kg' || insumo.unidade === 'L') {
            insumo.estoqueAtual = parseFloat((novaQtdBase / 1000).toFixed(3));
        } else {
            insumo.estoqueAtual = parseFloat(novaQtdBase.toFixed(3));
        }
    }
}

formProducao.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const receitaId = document.getElementById('prod-receita-select').value;
    const quantidade = parseInt(document.getElementById('prod-quantidade').value) || 1;
    const data = document.getElementById('prod-data').value;

    const receita = state.receitas.find(r => r.id === receitaId);
    if (!receita) return;

    // Verificar e simular abatimento de estoque recursivamente
    let estoqueSuficiente = true;
    let insumosFaltando = [];

    receita.ingredientes.forEach(ing => {
        verificarEstoqueIngredienteRecursivo(ing.insumoId, ing.quantidade, ing.unidade, quantidade, insumosFaltando);
    });

    if (insumosFaltando.length > 0) {
        alert(`Não há estoque suficiente de insumos para registrar esta produção:\n\n- ${insumosFaltando.join('\n- ')}`);
        return;
    }

    // Abater do estoque recursivamente
    receita.ingredientes.forEach(ing => {
        abaterEstoqueIngredienteRecursivo(ing.insumoId, ing.quantidade, ing.unidade, quantidade);
    });

    const analise = calcularFichaTecnica(receita);
    const custoTotal = analise.custoTotal * quantidade;

    const novaProd = {
        id: 'p' + Date.now(),
        receitaId,
        quantidade,
        data,
        custoTotal,
        status: "Concluído"
    };

    state.producoes.push(novaProd);
    mostrarToast(`Produção de ${quantidade} lote(s) registrada com sucesso! Estoque atualizado.`);
    formProducao.reset();
    document.getElementById('prod-data').valueAsDate = new Date();
    salvarEstado();
});

function desfazerProducao(id) {
    const prod = state.producoes.find(p => p.id === id);
    if (!prod) return;

    if (confirm("Ao desfazer esta ordem de produção, os insumos utilizados serão DEVOLVIDOS ao estoque. Deseja continuar?")) {
        const receita = state.receitas.find(r => r.id === prod.receitaId);
        
        if (receita) {
            // Devolver ao estoque recursivamente
            receita.ingredientes.forEach(ing => {
                devolverEstoqueIngredienteRecursivo(ing.insumoId, ing.quantidade, ing.unidade, prod.quantidade);
            });
        }

        state.producoes = state.producoes.filter(p => p.id !== id);
        mostrarToast("Produção cancelada e insumos devolvidos ao estoque.", "warning");
        salvarEstado();
    }
}

// 7. Backup e Importação
function exportarJSONParaBackup() {
    const jsonStr = JSON.stringify(state, null, 4);
    document.getElementById('backup-json-output').value = jsonStr;
}

document.getElementById('btn-copiar-backup').addEventListener('click', () => {
    const textarea = document.getElementById('backup-json-output');
    textarea.select();
    document.execCommand('copy');
    mostrarToast("Backup copiado para a área de transferência!");
});

document.getElementById('btn-download-backup').addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 4));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `backup_agridece_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
});

document.getElementById('btn-importar-backup').addEventListener('click', () => {
    const inputVal = document.getElementById('backup-json-input').value.trim();
    if (!inputVal) {
        alert("Por favor, cole um backup JSON válido no campo correspondente.");
        return;
    }

    try {
        const importado = JSON.parse(inputVal);
        
        // Validação rápida de integridade dos dados importados
        if (Array.isArray(importado.insumos) && Array.isArray(importado.receitas) && Array.isArray(importado.producoes)) {
            if (confirm("Isso irá sobrescrever TODOS os dados atuais no navegador. Deseja prosseguir?")) {
                state = importado;
                if (!state.recheios) state.recheios = []; // Garante a inicialização
                salvarEstado();
                document.getElementById('backup-json-input').value = '';
                mostrarToast("Backup importado e restaurado com sucesso!");
            }
        } else {
            alert("O arquivo fornecido não parece conter a estrutura válida de backup do Agri Doce.");
        }
    } catch (e) {
        alert("Erro ao ler JSON. Certifique-se de colar o código completo e correto.");
    }
});

function atualizarRotulosUnidadeInsumo() {
    const selectUnidade = document.getElementById('insumo-unidade');
    if (!selectUnidade) return;
    const unidade = selectUnidade.value || 'un';

    const lblQtd = document.getElementById('label-insumo-quantidade');
    const lblEstoque = document.getElementById('label-insumo-estoque-atual');
    const lblMinimo = document.getElementById('label-insumo-estoque-minimo');

    if (lblQtd) lblQtd.textContent = `Qtd. na Embalagem (em ${unidade})`;
    if (lblEstoque) lblEstoque.textContent = `Estoque Inicial (em ${unidade})`;
    if (lblMinimo) lblMinimo.textContent = `Estoque Mínimo Ideal (em ${unidade})`;
}

// --- INICIALIZAR APLICAÇÃO ---
window.addEventListener('DOMContentLoaded', () => {
    carregarEstado();
    atualizarRotulosUnidadeInsumo();
    document.getElementById('insumo-unidade').addEventListener('change', atualizarRotulosUnidadeInsumo);
});
