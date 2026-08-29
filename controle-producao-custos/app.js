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
    producoes: [],
    operadores: [],
    operadorAtivo: "Administrador",
    senhaAdmin: "1234"
};

let loginObrigatorio = false;

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
    return id.startsWith('r') && !id.startsWith('rec_');
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
            // Retrocompatibilidade
            if (!state.recheios) state.recheios = [];
            if (!state.operadores) state.operadores = [];
            if (!state.operadorAtivo) state.operadorAtivo = "Administrador";
            if (!state.senhaAdmin) state.senhaAdmin = "1234";
            if (!state.estoqueSalgados) state.estoqueSalgados = {};
            
            // Migração de operadores simples (strings) para objetos
            if (state.operadores) {
                state.operadores = state.operadores.map(op => {
                    if (typeof op === 'string') {
                        return {
                            nome: op,
                            senha: "123",
                            permissoes: {
                                gerenciarReceitas: true,
                                gerenciarInsumos: true
                            }
                        };
                    }
                    return op;
                });
            }
        } catch (e) {
            console.error("Erro ao ler dados do localStorage. Restaurando padrões.");
            restaurarPadroes();
        }
    } else {
        restaurarPadroes();
    }
    atualizarUI();
    exportarJSONParaBackup();

    // Se o operador ativo for Administrador, exige login obrigatório com senha na inicialização
    if (state.operadorAtivo === "Administrador") {
        loginObrigatorio = true;
        abrirModalOperador();
    }
}

function restaurarPadroes() {
    state.insumos = [...DADOS_PADRAO_INSUMOS];
    state.recheios = [...DADOS_PADRAO_RECHEIOS];
    state.receitas = [...DADOS_PADRAO_RECEITAS];
    state.producoes = [...DADOS_PADRAO_PRODUCAO];
    state.operadores = [];
    state.operadorAtivo = "Administrador";
    state.senhaAdmin = "1234";
    state.estoqueSalgados = {};
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
    renderEstoqueSalgados();
    atualizarDropdownReceitas();
    aplicarPermissoesOperador();
}

function aplicarPermissoesOperador() {
    const isMasterAdmin = state.operadorAtivo === "Administrador";
    
    // Buscar o operador ativo
    const operadorObj = (state.operadores || []).find(op => op.nome === state.operadorAtivo);
    
    const podeGerenciarReceitas = isMasterAdmin || (operadorObj && operadorObj.permissoes && operadorObj.permissoes.gerenciarReceitas);
    const podeGerenciarInsumos = isMasterAdmin || (operadorObj && operadorObj.permissoes && operadorObj.permissoes.gerenciarInsumos);
    
    // Atualizar texto do operador ativo no cabeçalho
    const lblOperador = document.getElementById('nome-operador-ativo');
    if (lblOperador) {
        lblOperador.textContent = state.operadorAtivo;
    }
    
    // Controlar abas do menu: Recheios e Receitas dependem de podeGerenciarReceitas
    document.querySelectorAll('.tab-btn[data-tab="recheios"], .tab-btn[data-tab="receitas"]').forEach(btn => {
        if (podeGerenciarReceitas) {
            btn.classList.remove('only-admin-hidden');
        } else {
            btn.classList.add('only-admin-hidden');
        }
    });
    
    // Aba Backup & Dados é restrita apenas ao Administrador master
    document.querySelectorAll('.tab-btn[data-tab="backup"]').forEach(btn => {
        if (isMasterAdmin) {
            btn.classList.remove('only-admin-hidden');
        } else {
            btn.classList.add('only-admin-hidden');
        }
    });
    
    // Se o operador ativo estiver em uma aba administrativa e não tiver acesso, redirecionar para a aba Dashboard
    const activeTabBtn = document.querySelector('.tab-btn.active');
    if (activeTabBtn) {
        const tabName = activeTabBtn.dataset.tab;
        if ((tabName === 'backup' && !isMasterAdmin) || 
            ((tabName === 'recheios' || tabName === 'receitas') && !podeGerenciarReceitas)) {
            const dashBtn = document.querySelector('.tab-btn[data-tab="dashboard"]');
            if (dashBtn) dashBtn.click();
        }
    }
    
    // Controlar visibilidade de dados administrativos no Dashboard
    const cardEstoque = document.getElementById('dash-val-estoque');
    if (cardEstoque) {
        const cardParent = cardEstoque.closest('.card-stat');
        if (cardParent) {
            cardParent.style.display = isMasterAdmin ? 'flex' : 'none'; // Valor total em estoque só Admin master
        }
    }
    
    const cardReceitas = document.getElementById('dash-total-receitas');
    if (cardReceitas) {
        const cardParent = cardReceitas.closest('.card-stat');
        if (cardParent) {
            cardParent.style.display = podeGerenciarReceitas ? 'flex' : 'none'; // Depende de gerenciar receitas
        }
    }
    
    // Controlar o formulário de cadastro/edição de insumos
    const formInsumoCard = document.getElementById('card-insumo-form');
    if (formInsumoCard) {
        formInsumoCard.style.display = podeGerenciarInsumos ? 'block' : 'none';
    }
    
    // Ocultar coluna de preço na tabela de insumos
    const insumosTable = document.getElementById('insumos-table-body');
    const tableHeaderCusto = document.querySelector('#insumos table thead th:nth-child(2)');
    if (tableHeaderCusto) {
        if (podeGerenciarInsumos) {
            tableHeaderCusto.classList.remove('hide-column');
        } else {
            tableHeaderCusto.classList.add('hide-column');
        }
    }
    
    if (insumosTable) {
        const rows = insumosTable.querySelectorAll('tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 2) {
                const tdPreco = cells[1];
                if (podeGerenciarInsumos) {
                    tdPreco.classList.remove('hide-column');
                } else {
                    tdPreco.classList.add('hide-column');
                }
            }
            const tdAcoes = cells[cells.length - 1];
            if (tdAcoes) {
                const editBtn = tdAcoes.querySelector('.edit-ins-btn');
                const deleteBtn = tdAcoes.querySelector('.delete-ins-btn');
                if (editBtn) editBtn.style.display = podeGerenciarInsumos ? 'inline-block' : 'none';
                if (deleteBtn) deleteBtn.style.display = isMasterAdmin ? 'inline-block' : 'none';
            }
        });
    }

    // Ocultar os botões de exclusão de recheios e receitas para operadores comuns
    document.querySelectorAll('.delete-rech-btn, .delete-rec-btn').forEach(btn => {
        btn.style.display = isMasterAdmin ? 'inline-block' : 'none';
    });

    // Ocultar os botões de Desfazer no histórico de ordens de produção
    document.querySelectorAll('.delete-prod-btn').forEach(btn => {
        btn.style.display = isMasterAdmin ? 'inline-block' : 'none';
    });
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

    const query = document.getElementById('search-insumos') ? document.getElementById('search-insumos').value.toLowerCase().trim() : '';
    const insumosFiltrados = state.insumos.filter(ins => ins.nome.toLowerCase().includes(query)).sort((a, b) => a.nome.localeCompare(b.nome));

    if (insumosFiltrados.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: var(--color-text-secondary);">${state.insumos.length === 0 ? 'Nenhum insumo cadastrado.' : 'Nenhum insumo corresponde à busca.'}</td>
            </tr>
        `;
        return;
    }

    insumosFiltrados.forEach(ins => {
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
            <td class="hide-mobile">${ins.estoqueMinimo || 0} ${ins.unidade}</td>
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

    const query = document.getElementById('search-recheios') ? document.getElementById('search-recheios').value.toLowerCase().trim() : '';
    const recheiosFiltrados = (state.recheios || []).filter(rec => rec.nome.toLowerCase().includes(query)).sort((a, b) => a.nome.localeCompare(b.nome));

    if (recheiosFiltrados.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; color: var(--color-text-secondary);">${(!state.recheios || state.recheios.length === 0) ? 'Nenhum recheio cadastrado.' : 'Nenhum recheio corresponde à busca.'}</td>
            </tr>
        `;
        return;
    }

    recheiosFiltrados.forEach(rec => {
        const analise = calcularFichaTecnicaRecheio(rec);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <strong>${rec.nome}</strong><br>
                <small style="color: var(--color-text-secondary);">${rec.ingredientes.length} ingrediente(s)</small>
            </td>
            <td class="hide-mobile">${formatarMoeda(analise.custoIngredientes)}</td>
            <td class="hide-mobile">${rec.tempoPreparo} min / ${formatarMoeda(analise.maoObra)} + ${rec.custosFixos}%</td>
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

    const query = document.getElementById('search-receitas') ? document.getElementById('search-receitas').value.toLowerCase().trim() : '';
    const receitasFiltradas = state.receitas.filter(rec => rec.nome.toLowerCase().includes(query)).sort((a, b) => a.nome.localeCompare(b.nome));

    if (receitasFiltradas.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; color: var(--color-text-secondary);">${state.receitas.length === 0 ? 'Nenhuma receita cadastrada.' : 'Nenhuma receita corresponde à busca.'}</td>
            </tr>
        `;
        return;
    }

    receitasFiltradas.forEach(rec => {
        const analise = calcularFichaTecnica(rec);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <strong>${rec.nome}</strong><br>
                <small style="color: var(--color-text-secondary);">Rendimento: ${rec.rendimento}</small>
            </td>
            <td class="hide-mobile">${formatarMoeda(analise.custoIngredientes)}</td>
            <td class="hide-mobile">${rec.tempoPreparo} min / ${formatarMoeda(analise.maoObra)} + ${rec.custosFixos}%</td>
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
                <td colspan="6" style="text-align: center; color: var(--color-text-secondary);">Nenhuma produção registrada.</td>
            </tr>
        `;
        return;
    }

    state.producoes.forEach(prod => {
        const receita = state.receitas.find(r => r.id === prod.receitaId);
        const dataFmt = prod.data ? prod.data.split('-').reverse().join('/') : '';
        const isAgendado = prod.status === "Agendado";

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${dataFmt}</td>
            <td>
                <strong>${receita ? receita.nome : 'Excluída'}</strong>
                ${isAgendado ? '<span class="badge" style="background-color: #ffc107; color: #333; font-size: 0.65rem; padding: 2px 6px; margin-left: 6px; font-weight: bold; border-radius: 4px;">AGENDADO</span>' : ''}
            </td>
            <td>${prod.quantidade} lote(s)</td>
            <td>${formatarMoeda(prod.custoTotal)}</td>
            <td>${prod.operador || 'Administrador'}</td>
            <td>
                <div style="display: flex; gap: 4px; align-items: center; justify-content: flex-start; flex-wrap: wrap;">
                    <button class="btn btn-primary btn-sm print-prod-btn" data-id="${prod.id}" style="padding: 2px 6px; font-size: 0.7rem; width: auto; text-transform: none; letter-spacing: 0;">Imprimir</button>
                    ${isAgendado ? `<button class="btn btn-success btn-sm confirm-prod-btn" data-id="${prod.id}" style="padding: 2px 6px; font-size: 0.7rem; width: auto; text-transform: none; letter-spacing: 0; background-color: #28a745; border-color: #28a745;">Confirmar</button>` : ''}
                    <button class="btn btn-danger btn-sm delete-prod-btn" data-id="${prod.id}" style="padding: 2px 6px; font-size: 0.7rem; width: auto; text-transform: none; letter-spacing: 0;">${isAgendado ? 'Excluir' : 'Desfazer'}</button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });

    document.querySelectorAll('.delete-prod-btn').forEach(btn => {
        btn.addEventListener('click', (e) => desfazerProducao(e.currentTarget.dataset.id));
    });

    document.querySelectorAll('.print-prod-btn').forEach(btn => {
        btn.addEventListener('click', (e) => imprimirOrdemProducao(e.currentTarget.dataset.id));
    });

    document.querySelectorAll('.confirm-prod-btn').forEach(btn => {
        btn.addEventListener('click', (e) => confirmarProducaoAgendada(e.currentTarget.dataset.id));
    });
}

function atualizarDropdownReceitas() {
    const select = document.getElementById('prod-receita-select');
    select.innerHTML = '<option value="">Selecione uma receita...</option>';
    
    const receitasOrdenadas = [...state.receitas].sort((a, b) => a.nome.localeCompare(b.nome));
    receitasOrdenadas.forEach(rec => {
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
    if (state.operadorAtivo !== "Administrador") {
        alert("Ação restrita! Apenas o Administrador pode excluir insumos.");
        return;
    }

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

    // Dropdown de insumos, recheios e receitas base
    const select = document.createElement('select');
    select.required = true;
    select.innerHTML = '<option value="">Escolha o ingrediente...</option>';

    // 1. Grupo de Insumos Brutos
    const grpInsumos = document.createElement('optgroup');
    grpInsumos.label = 'Insumos / Ingredientes Brutos';
    const insumosOrdenados = [...state.insumos].sort((a, b) => a.nome.localeCompare(b.nome));
    insumosOrdenados.forEach(ins => {
        const opt = document.createElement('option');
        opt.value = ins.id;
        opt.textContent = `${ins.nome} (${ins.unidade})`;
        grpInsumos.appendChild(opt);
    });
    select.appendChild(grpInsumos);

    // 2. Grupo de Recheios / Sub-receitas
    if (state.recheios && state.recheios.length > 0) {
        const grpRecheios = document.createElement('optgroup');
        grpRecheios.label = 'Recheios / Sub-receitas';
        const recheiosOrdenados = [...state.recheios].sort((a, b) => a.nome.localeCompare(b.nome));
        recheiosOrdenados.forEach(rech => {
            const opt = document.createElement('option');
            opt.value = rech.id;
            opt.textContent = `RECHEIO: ${rech.nome} (${rech.rendimentoUnidade})`;
            grpRecheios.appendChild(opt);
        });
        select.appendChild(grpRecheios);
    }

    // 3. Grupo de Receitas Base (Massas / Outros)
    if (state.receitas && state.receitas.length > 0) {
        const grpReceitas = document.createElement('optgroup');
        grpReceitas.label = 'Receitas Base / Massas';
        const receitasOrdenadas = [...state.receitas].sort((a, b) => a.nome.localeCompare(b.nome));
        receitasOrdenadas.forEach(rec => {
            // Evita listar a própria receita que está sendo editada
            const idEdicao = document.getElementById('receita-id') ? document.getElementById('receita-id').value : null;
            if (rec.id !== idEdicao) {
                const opt = document.createElement('option');
                opt.value = rec.id;
                opt.textContent = `MASSA: ${rec.nome}`;
                grpReceitas.appendChild(opt);
            }
        });
        select.appendChild(grpReceitas);
    }

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
    const insumosOrdenados = [...state.insumos].sort((a, b) => a.nome.localeCompare(b.nome));
    insumosOrdenados.forEach(ins => {
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
        const recheiosOrdenados = [...state.recheios].sort((a, b) => a.nome.localeCompare(b.nome));
        recheiosOrdenados.forEach(rech => {
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
        const receitasOrdenadas = [...state.receitas].sort((a, b) => a.nome.localeCompare(b.nome));
        receitasOrdenadas.forEach(rec => {
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
    const tempoPreparo = parseInt(document.getElementById('receita-tempo-preparo').value) || 0;
    const custoHora = parseFloat(document.getElementById('receita-custo-hora').value) || 0;
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
            ingredientes.push({ insumoId, quantidade, ...((insumoId.startsWith('rec_') || (insumoId.startsWith('r') && !insumoId.startsWith('rec_'))) ? {} : { unidade }) });
            // Nota: Para ingredientes que são recheios ou massas bases, o cálculo de custo de ingrediente
            // já gerencia isso, mas para manter consistência salvamos a unidade que o usuário escolheu no select!
            const idx = ingredientes.length - 1;
            ingredientes[idx].unidade = unidade;
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
            state.receitas[index] = { id, nome, rendimento, tempoPreparo, custoHora, custosFixos, margemLucro, ingredientes };
            mostrarToast("Ficha técnica editada!");
        }
    } else {
        // Nova
        const novoId = 'r' + Date.now();
        state.receitas.push({ id: novoId, nome, rendimento, tempoPreparo, custoHora, custosFixos, margemLucro, ingredientes });
        mostrarToast("Nova ficha técnica adicionada!");
    }

    fecharModalReceita();
    salvarEstado();
});

function deletarReceita(id) {
    if (state.operadorAtivo !== "Administrador") {
        alert("Ação restrita! Apenas o Administrador pode excluir receitas.");
        return;
    }

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
    if (state.operadorAtivo !== "Administrador") {
        alert("Ação restrita! Apenas o Administrador pode excluir recheios.");
        return;
    }

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
        const html = `
            <div class="header">
                <div>
                    <span style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-text-secondary); font-weight: bold;">Ficha Técnica</span>
                    <h2>Recheio: ${recheio.nome}</h2>
                </div>
            </div>
            <p><strong>Rendimento:</strong> ${analise.rendimentoExibicao}</p>
            
            <h3 class="section-title">Ingredientes</h3>
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
            
            <div class="meta-grid" style="margin-top: 1.5rem;">
                <div>
                    <p>Ingredientes: ${formatarMoeda(analise.custoIngredientes)}</p>
                    <p>Mão de Obra (${analise.tempo} min): ${formatarMoeda(analise.maoObra)}</p>
                    <p>Custos Indiretos (${analise.custosFixosPercentual}%): ${formatarMoeda((analise.custoIngredientes + analise.maoObra) * (analise.custosFixosPercentual/100))}</p>
                </div>
                <div style="text-align: right; justify-content: flex-end; display: flex; flex-direction: column;">
                    <p style="font-weight: bold; font-size: 1.1rem;">Custo Lote: ${formatarMoeda(analise.custoTotal)}</p>
                    <p style="font-weight: bold;">Custo Unitário / ${recheio.rendimentoUnidade}: ${formatarMoeda(analise.custoUnitarioBase * (recheio.rendimentoUnidade === 'kg' || recheio.rendimentoUnidade === 'L' ? 1000 : 1))}</p>
                </div>
            </div>
            
            <div class="footer">
                Agri Doce Controle de Produção - Relatório emitido em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
            </div>
        `;
        abrirPrintPreview(`Ficha Técnica - ${recheio.nome}`, html);
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
        const html = `
            <div class="header">
                <div>
                    <span style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-text-secondary); font-weight: bold;">Ficha Técnica</span>
                    <h2>Receita: ${receita.nome}</h2>
                </div>
            </div>
            <p><strong>Rendimento:</strong> ${analise.rendimento}</p>
            
            <h3 class="section-title">Ingredientes</h3>
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
            
            <div class="meta-grid" style="margin-top: 1.5rem;">
                <div>
                    <p>Custo dos Ingredientes: ${formatarMoeda(analise.custoIngredientes)}</p>
                    <p>Mão de Obra (${analise.tempo} min): ${formatarMoeda(analise.maoObra)}</p>
                    <p>Custos Indiretos / Fixos (${analise.custosFixosPercentual}%): ${formatarMoeda((analise.custoIngredientes + analise.maoObra) * (analise.custosFixosPercentual/100))}</p>
                </div>
                <div style="text-align: right; justify-content: flex-end; display: flex; flex-direction: column;">
                    <p style="font-weight: bold; font-size: 1.1rem;">Custo Lote: ${formatarMoeda(analise.custoTotal)}</p>
                    <p style="font-weight: bold; color: var(--color-accent);">Preço de Venda Sugerido: ${formatarMoeda(analise.precoSugerido)}</p>
                </div>
            </div>
            
            <div class="footer">
                Agri Doce Controle de Produção - Relatório emitido em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
            </div>
        `;
        abrirPrintPreview(`Ficha Técnica - ${receita.nome}`, html);
    };
}

function imprimirOrdemProducao(id) {
    const prod = state.producoes.find(p => p.id === id);
    if (!prod) {
        alert("Ordem de produção não encontrada!");
        return;
    }

    const receita = state.receitas.find(r => r.id === prod.receitaId);
    const dataFmt = prod.data ? prod.data.split('-').reverse().join('/') : '';
    
    // Função auxiliar para multiplicar rendimento caso seja formato como "100 salgados"
    function formatarRendimentoTotal(rendimentoOriginal, qtdLotes) {
        if (!rendimentoOriginal) return `${qtdLotes} lote(s)`;
        const match = rendimentoOriginal.trim().match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
        if (match) {
            const numero = parseFloat(match[1]);
            const texto = match[2];
            const total = numero * qtdLotes;
            return `${total.toFixed(0)} ${texto}`;
        }
        return `${qtdLotes} lote(s) (${rendimentoOriginal} cada)`;
    }

    const rendimentoTotal = receita ? formatarRendimentoTotal(receita.rendimento, prod.quantidade) : `${prod.quantidade} lote(s)`;

    // Gerar lista de ingredientes diretos multiplicados
    let ingredientesHtml = '';
    if (receita && receita.ingredientes) {
        receita.ingredientes.forEach(ing => {
            let nomeIngrediente = "Ingrediente Desconhecido";
            
            // Tentar descobrir o nome baseado no id
            if (ing.insumoId.startsWith('rec_')) {
                const recheio = state.recheios.find(r => r.id === ing.insumoId);
                if (recheio) nomeIngrediente = `[Recheio] ${recheio.nome}`;
            } else if (ing.insumoId.startsWith('r') && !ing.insumoId.startsWith('rec_') && ing.insumoId.length <= 5) {
                const rBase = state.receitas.find(r => r.id === ing.insumoId);
                if (rBase) nomeIngrediente = `[Massa Base] ${rBase.nome}`;
            } else {
                const insumo = state.insumos.find(i => i.id === ing.insumoId);
                if (insumo) nomeIngrediente = insumo.nome;
            }

            const qtdUnit = ing.quantidade;
            const qtdTotal = ing.quantidade * prod.quantidade;
            
            ingredientesHtml += `
                <tr>
                    <td><strong>${nomeIngrediente}</strong></td>
                    <td>${qtdUnit} ${ing.unidade}</td>
                    <td style="font-weight: bold; font-size: 1.1rem; color: #111;">${qtdTotal.toFixed(3).replace(/\.000$/, '').replace(/\.00$/, '')} ${ing.unidade}</td>
                </tr>
            `;
        });
    } else {
        ingredientesHtml = `
            <tr>
                <td colspan="3" style="text-align: center;">Receita excluída do banco. Não é possível listar ingredientes.</td>
            </tr>
        `;
    }

    const html = `
        <div class="header">
            <div>
                <span style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-text-secondary); font-weight: bold;">Guia de Fabricação</span>
                <h2>${receita ? receita.nome : 'Receita Excluída'}</h2>
            </div>
            <span style="font-weight: bold; font-size: 1.2rem;">LOTE #${prod.id}</span>
        </div>
        
        <div class="meta-grid">
            <div>
                <p><strong>Data de Produção:</strong> ${dataFmt}</p>
                <p><strong>Operador Responsável:</strong> ${prod.operador || 'Administrador'}</p>
            </div>
            <div style="text-align: right;">
                <p><strong>Quantidade Lançada:</strong> ${prod.quantidade} lote(s)</p>
                <p><strong>Rendimento Estimado Total:</strong> ${rendimentoTotal}</p>
            </div>
        </div>
        
        <div class="section-title">Lista de Pesagem de Ingredientes (Multiplicados por ${prod.quantidade})</div>
        <table>
            <thead>
                <tr>
                    <th>Ingrediente / Sub-receita</th>
                    <th>Medida Unitária (por Lote)</th>
                    <th>Quantidade Total a Pesar</th>
                </tr>
            </thead>
            <tbody>
                ${ingredientesHtml}
            </tbody>
        </table>
        
        <div class="footer">
            Agri Doce Controle de Produção - Impresso em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
        </div>
    `;
    abrirPrintPreview(`Ordem de Produção #${prod.id}`, html);
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

    // Verificar se a data é futura
    const hoje = new Date().toISOString().split('T')[0];
    const isFutura = data > hoje;

    let status = "Concluído";
    if (isFutura) {
        status = "Agendado";
    }

    if (!isFutura) {
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
    }

    const analise = calcularFichaTecnica(receita);
    const custoTotal = analise.custoTotal * quantidade;

    const novaProd = {
        id: 'p' + Date.now(),
        receitaId,
        quantidade,
        data,
        custoTotal,
        status,
        operador: state.operadorAtivo || "Administrador"
    };

    state.producoes.push(novaProd);
    
    if (!isFutura) {
        // Incrementar estoque de salgado acabado (freezer)
        if (!state.estoqueSalgados) state.estoqueSalgados = {};
        const rendimentoUn = extrairNumeroRendimento(receita.rendimento);
        state.estoqueSalgados[receitaId] = (state.estoqueSalgados[receitaId] || 0) + (rendimentoUn * quantidade);
        
        mostrarToast(`Produção de ${quantidade} lote(s) registrada com sucesso! Estoque atualizado.`);
    } else {
        mostrarToast(`Produção para o dia ${data.split('-').reverse().join('/')} agendada com sucesso!`, "info");
    }

    formProducao.reset();
    document.getElementById('prod-data').valueAsDate = new Date();
    salvarEstado();
});

function desfazerProducao(id) {
    const prod = state.producoes.find(p => p.id === id);
    if (!prod) return;

    const msg = prod.status === "Agendado"
        ? "Deseja realmente cancelar este agendamento de produção?"
        : "Ao desfazer esta ordem de produção, os insumos utilizados serão DEVOLVIDOS ao estoque e o estoque do freezer será reduzido. Deseja continuar?";

    if (confirm(msg)) {
        const receita = state.receitas.find(r => r.id === prod.receitaId);
        
        if (prod.status !== "Agendado") {
            if (receita) {
                // Devolver ao estoque recursivamente
                receita.ingredientes.forEach(ing => {
                    devolverEstoqueIngredienteRecursivo(ing.insumoId, ing.quantidade, ing.unidade, prod.quantidade);
                });
            }

            // Diminuir estoque de salgado acabado (freezer)
            if (receita && state.estoqueSalgados && state.estoqueSalgados[prod.receitaId]) {
                const rendimentoUn = extrairNumeroRendimento(receita.rendimento);
                state.estoqueSalgados[prod.receitaId] = Math.max(0, state.estoqueSalgados[prod.receitaId] - (rendimentoUn * prod.quantidade));
            }
        }

        state.producoes = state.producoes.filter(p => p.id !== id);
        mostrarToast(prod.status === "Agendado" ? "Agendamento cancelado com sucesso." : "Produção desfeita e insumos devolvidos.", "warning");
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

document.getElementById('btn-zerar-banco').addEventListener('click', () => {
    const confirm1 = confirm("Tem certeza absoluta de que deseja zerar todos os dados cadastrados?");
    if (confirm1) {
        const confirm2 = confirm("Aviso: Isso apagará permanentemente todos os insumos, receitas, recheios e históricos de produção cadastrados. Esta ação NÃO pode ser desfeita. Prosseguir?");
        if (confirm2) {
            state = {
                insumos: [],
                recheios: [],
                receitas: [],
                producoes: [],
                operadores: [],
                operadorAtivo: "Administrador",
                senhaAdmin: "1234"
            };
            salvarEstado();
            mostrarToast("Todos os dados foram excluídos. O banco está totalmente limpo!");
        }
    }
});

document.getElementById('btn-restaurar-padroes').addEventListener('click', () => {
    if (confirm("Deseja realmente carregar as receitas, recheios e insumos modelo originais? Isso substituirá seus dados atuais de produção e custos.")) {
        restaurarPadroes();
        mostrarToast("Dados padrão de fábrica restaurados!");
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

// ==========================================================================
// IMPORTAÇÃO DE NOTAS FISCAIS (NFC-e / QR CODE) & ENTRADA RÁPIDA
// ==========================================================================

let nfeItensLidos = []; // Guarda os itens extraídos da nota fiscal

function abrirNfeModal() {
    document.getElementById('nfe-link-input').value = '';
    document.getElementById('nfe-loader').style.display = 'none';
    document.getElementById('nfe-panel-conferencia').style.display = 'none';
    document.getElementById('btn-salvar-entrada-nfe').style.display = 'none';
    
    // Resetar aba para Leitor
    alternarNfeTab('leitor');
    
    // Renderizar tabela de entrada manual
    renderNfeEntradaManual();
    
    // Abrir modal
    document.getElementById('nfe-modal').classList.add('active');
}

function fecharNfeModal() {
    if (typeof pararScannerCamera === 'function') {
        pararScannerCamera();
    }
    document.getElementById('nfe-modal').classList.remove('active');
}

function alternarNfeTab(tab) {
    const tabLeitor = document.getElementById('btn-nfe-tab-leitor');
    const tabManual = document.getElementById('btn-nfe-tab-manual');
    const panelLeitor = document.getElementById('nfe-panel-leitor');
    const panelManual = document.getElementById('nfe-panel-manual');
    
    if (tab === 'leitor') {
        tabLeitor.classList.replace('btn-secondary', 'btn-primary');
        tabManual.classList.replace('btn-primary', 'btn-secondary');
        panelLeitor.style.display = 'block';
        panelManual.style.display = 'none';
        document.getElementById('btn-salvar-entrada-nfe').style.display = 'none';
    } else {
        tabLeitor.classList.replace('btn-primary', 'btn-secondary');
        tabManual.classList.replace('btn-secondary', 'btn-primary');
        panelLeitor.style.display = 'none';
        panelManual.style.display = 'block';
        document.getElementById('nfe-panel-conferencia').style.display = 'none';
        document.getElementById('btn-salvar-entrada-nfe').style.display = 'block';
    }
}

// Planilha de Entrada Rápida Manual
function renderNfeEntradaManual() {
    const tbody = document.getElementById('nfe-manual-table-body');
    tbody.innerHTML = '';
    
    if (state.insumos.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" style="text-align: center; color: var(--color-text-secondary);">Nenhum insumo cadastrado para dar entrada.</td>
            </tr>
        `;
        return;
    }
    
    state.insumos.forEach(ins => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <strong>${ins.nome}</strong><br>
                <small style="color: var(--color-text-secondary);">Estoque: ${ins.estoqueAtual} ${ins.unidade}</small>
            </td>
            <td>
                <input type="number" class="nfe-input-table nfe-manual-qtd" data-id="${ins.id}" placeholder="0" step="0.001" min="0">
            </td>
            <td>
                <input type="number" class="nfe-input-table nfe-manual-valor" data-id="${ins.id}" placeholder="0.00" step="0.01" min="0">
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Salva entrada manual
function salvarEntradaManual() {
    let entradasRealizadas = 0;
    
    state.insumos.forEach(ins => {
        const rowQtd = document.querySelector(`.nfe-manual-qtd[data-id="${ins.id}"]`);
        const rowValor = document.querySelector(`.nfe-manual-valor[data-id="${ins.id}"]`);
        
        if (rowQtd && rowValor) {
            const qtdAdicional = parseFloat(rowQtd.value);
            const valorTotal = parseFloat(rowValor.value);
            
            if (qtdAdicional > 0 && valorTotal > 0) {
                const estoqueAtualVal = ins.estoqueAtual || 0;
                const custoUnitAtual = calcularCustoUnitarioInsumo(ins);
                
                // Média Ponderada: recalcula o custo unitário com base no que já existia e na nova compra
                const novaQtdTotal = estoqueAtualVal + qtdAdicional;
                const valorAtualEstoque = estoqueAtualVal * custoUnitAtual;
                const novoCustoUnit = (valorAtualEstoque + valorTotal) / novaQtdTotal;
                
                // Atualiza insumo
                ins.estoqueAtual = parseFloat(novaQtdTotal.toFixed(3));
                
                // O preço do insumo no cadastro é o preço da embalagem.
                // Como atualizamos o custo unitário, precisamos reajustar o preço da embalagem de cadastro de forma proporcional!
                ins.preco = parseFloat((novoCustoUnit * ins.quantidade).toFixed(2));
                
                entradasRealizadas++;
            }
        }
    });
    
    if (entradasRealizadas > 0) {
        salvarEstado();
        renderInsumos();
        renderDashboard();
        fecharNfeModal();
        mostrarToast(`${entradasRealizadas} insumos atualizados com sucesso!`);
    } else {
        alert("Preencha a quantidade e o preço de pelo menos um insumo!");
    }
}

// Processa o link e busca a nota fiscal
async function processarLinkNfe() {
    const input = document.getElementById('nfe-link-input');
    let url = input.value.trim();
    
    if (!url) {
        alert("Por favor, cole um link de nota fiscal (NFC-e) ou de QR Code válido!");
        return;
    }

    // Detectar se o valor inserido é uma chave de acesso (44 dígitos numéricos)
    const chaveLimpa = url.replace(/\D/g, '');
    if (chaveLimpa.length === 44) {
        const codEstado = chaveLimpa.substring(0, 2);
        if (codEstado === "43") { // Rio Grande do Sul (RS)
            url = `https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx?chNFe=${chaveLimpa}`;
        } else if (codEstado === "35") { // São Paulo (SP)
            url = `https://www.nfce.fazenda.sp.gov.br/NFCePortal/Paginas/ConsultaPublica.aspx?chNFe=${chaveLimpa}`;
        } else if (codEstado === "31") { // Minas Gerais (MG)
            url = `https://portalsped.fazenda.mg.gov.br/portalsped/sistema/consulta.xhtml?chave=${chaveLimpa}`;
        } else if (codEstado === "33") { // Rio de Janeiro (RJ)
            url = `https://www4.fazenda.rj.gov.br/consultaNFCe/QRCode?chNFe=${chaveLimpa}`;
        } else if (codEstado === "41") { // Paraná (PR)
            url = `http://www.fazenda.pr.gov.br/nfce/qrcode?chNFe=${chaveLimpa}`;
        } else if (codEstado === "42") { // Santa Catarina (SC)
            url = `https://sat.sef.sc.gov.br/nfce/consulta?chNFe=${chaveLimpa}`;
        } else {
            url = `https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx?chNFe=${chaveLimpa}`;
        }
    }
    
    // Força HTTPS para evitar restrições de Cleartext do Android OS em links HTTP comuns
    if (url.startsWith('http://')) {
        url = url.replace('http://', 'https://');
    }
    
    const loader = document.getElementById('nfe-loader');
    const panelConferencia = document.getElementById('nfe-panel-conferencia');
    const btnSalvar = document.getElementById('btn-salvar-entrada-nfe');
    
    loader.style.display = 'block';
    panelConferencia.style.display = 'none';
    btnSalvar.style.display = 'none';
    
    try {
        // Como o CapacitorHttp está habilitado, no celular o fetch padrão é interceptado e ignora o CORS.
        // No Electron, o webSecurity está desativado, o que também contorna o CORS.
        const response = await fetch(url);
        const htmlText = await response.text();
        
        if (!htmlText) throw new Error("Não foi possível carregar os dados da página");
        
        nfeItensLidos = parseHtmlSefaz(htmlText);
        
        if (nfeItensLidos.length === 0) {
            alert("Não conseguimos extrair nenhum produto desta nota de forma automática. Por favor, utilize a Entrada Rápida Manual.");
            loader.style.display = 'none';
            return;
        }
        
        renderNfeConferencia();
        loader.style.display = 'none';
        panelConferencia.style.display = 'block';
        btnSalvar.style.display = 'block';
        
    } catch (error) {
        console.error("Erro na leitura automática da nota:", error);
        alert("Erro ao ler dados da SEFAZ de forma automática (possivelmente devido a bloqueio do servidor do governo ou problemas de conexão).\n\nAbaixe o Cupom Fiscal e faça o lançamento rápido na aba 'Entrada Rápida Manual'!");
        loader.style.display = 'none';
        alternarNfeTab('manual');
    }
}

// Parser do HTML do cupom fiscal da SEFAZ
function parseHtmlSefaz(htmlText) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    let itens = [];
    
    // Tenta obter as linhas da tabela de resultados
    const rows = doc.querySelectorAll('table[id^="tabResult"] tr, #tabResult tr, .table tr');
    
    if (rows.length === 0) {
        // Tenta buscar por classes diretas caso não haja estrutura de tabela padrão
        const nomes = doc.querySelectorAll('.txtNome, .txtTit');
        const qtds = doc.querySelectorAll('.Rqtd');
        const uns = doc.querySelectorAll('.Un, .RUN, .Run');
        const vals = doc.querySelectorAll('.RvalUnit, .RvlUnit');
        
        for (let i = 0; i < nomes.length; i++) {
            const nome = nomes[i].textContent.trim();
            const qtdText = qtds[i] ? qtds[i].textContent.trim() : '1';
            const unText = uns[i] ? uns[i].textContent.trim() : 'un';
            const valText = vals[i] ? vals[i].textContent.trim() : '0';
            
            const qtdMatch = qtdText.match(/\d+([.,]\d+)?/);
            const valMatch = valText.match(/\d+([.,]\d+)?/);
            
            const qtd = qtdMatch ? parseFloat(qtdMatch[0].replace(',', '.')) : 1;
            const val = valMatch ? parseFloat(valMatch[0].replace(',', '.')) : 0;
            const un = unText.replace(/UN:/gi, '').replace(/Unidade:/gi, '').replace(/Un:/gi, '').trim().toLowerCase() || 'un';
            
            if (nome) {
                itens.push({ nome, quantidade: qtd, unidade: un, precoUnitario: val });
            }
        }
    } else {
        rows.forEach(row => {
            const nomeEl = row.querySelector('.txtNome, .txtTit');
            if (nomeEl) {
                const qtdEl = row.querySelector('.Rqtd');
                const unEl = row.querySelector('.Un, .RUN, .Run');
                const valEl = row.querySelector('.RvalUnit, .RvlUnit');
                
                // Limpeza do texto das classes da SEFAZ
                let qtdText = qtdEl ? qtdEl.textContent.trim() : '1';
                let unText = unEl ? unEl.textContent.trim() : 'un';
                let valText = valEl ? valEl.textContent.trim() : '0';
                
                // Extração dos números
                const qtdMatch = qtdText.match(/\d+([.,]\d+)?/);
                const valMatch = valText.match(/\d+([.,]\d+)?/);
                
                const quantidade = qtdMatch ? parseFloat(qtdMatch[0].replace(',', '.')) : 1;
                const precoUnitario = valMatch ? parseFloat(valMatch[0].replace(',', '.')) : 0;
                
                const unidade = unText.replace(/UN:/gi, '').replace(/Un:/gi, '').replace(/Unidade:/gi, '').trim().toLowerCase() || 'un';
                
                itens.push({
                    nome: nomeEl.textContent.trim().replace(/\s+/g, ' '),
                    quantidade,
                    unidade,
                    precoUnitario
                });
            }
        });
    }
    
    return itens;
}

// Algoritmo de mapeamento inteligente de insumos
function sugerirInsumoEquivalente(nomeNota) {
    nomeNota = nomeNota.toLowerCase();
    let melhorInsumo = '';
    let scoreMaximo = 0;
    
    state.insumos.forEach(ins => {
        const insNome = ins.nome.toLowerCase();
        
        // Divide em palavras
        const palavrasInsumo = insNome.split(' ').filter(p => p.length > 2);
        let score = 0;
        
        palavrasInsumo.forEach(p => {
            if (nomeNota.includes(p)) {
                score += 2; // Palavra exata bateu
            }
        });
        // Bônus se houver casamento de início de nome
        if (nomeNota.startsWith(insNome) || insNome.startsWith(nomeNota)) {
            score += 5;
        }
        
        if (score > scoreMaximo) {
            scoreMaximo = score;
            melhorInsumo = ins.id;
        }
    });
    
    return melhorInsumo;
}

// Helper para deixar o nome do insumo mais bonito e amigável
function formatarNomeInsumo(nomeRaw) {
    if (!nomeRaw) return '';
    return nomeRaw
        .toLowerCase()
        .split(' ')
        .map(word => {
            if (word.length <= 2) return word.toLowerCase();
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
}

// Renderiza tabela de conferência dos produtos importados
function renderNfeConferencia() {
    const tbody = document.getElementById('nfe-conferencia-table-body');
    tbody.innerHTML = '';
    
    nfeItensLidos.forEach((item, index) => {
        const tr = document.createElement('tr');
        const sugeridoId = sugerirInsumoEquivalente(item.nome);
        
        // Monta o select de insumos
        let selectHtml = `<select class="nfe-mapeamento" data-index="${index}">`;
        selectHtml += `<option value="">-- Ignorar ou Cadastrar Depois --</option>`;
        selectHtml += `<option value="NOVO_INSUMO" style="color: #4f46e5; font-weight: bold;">[+] Cadastrar como Novo Insumo</option>`;
        state.insumos.forEach(ins => {
            selectHtml += `<option value="${ins.id}" ${ins.id === sugeridoId ? 'selected' : ''}>${ins.nome} (${ins.unidade})</option>`;
        });
        selectHtml += `</select>`;
        
        tr.innerHTML = `
            <td>
                <strong style="font-size: 0.85rem; display: block; word-break: break-all;">${item.nome}</strong>
                <small style="color: var(--color-text-secondary); text-transform: uppercase;">Unidade na Nota: ${item.unidade}</small>
            </td>
            <td>${item.quantidade}</td>
            <td>${formatarMoeda(item.precoUnitario)}</td>
            <td>${selectHtml}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Salva entrada automática de XML importado
function salvarEntradaNotaFiscal() {
    let atualizados = 0;
    let novosCadastrados = 0;
    const selects = document.querySelectorAll('.nfe-mapeamento');
    
    selects.forEach(select => {
        const index = parseInt(select.dataset.index);
        let insumoId = select.value;
        
        if (index >= 0 && index < nfeItensLidos.length) {
            const itemNota = nfeItensLidos[index];
            
            // Se o usuário escolheu cadastrar este item como um novo insumo
            if (insumoId === 'NOVO_INSUMO') {
                const novoInsumoId = 'ins_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
                const nomeFormatado = formatarNomeInsumo(itemNota.nome);
                const unidadePadrao = itemNota.unidade || 'un';
                
                const novoInsumo = {
                    id: novoInsumoId,
                    nome: nomeFormatado,
                    categoria: "Ingrediente",
                    unidade: unidadePadrao,
                    preco: parseFloat(itemNota.precoUnitario.toFixed(2)),
                    quantidade: 1.0, // Embalagem padrão de 1 unidade
                    estoqueAtual: parseFloat(itemNota.quantidade.toFixed(3)),
                    estoqueMinimo: 0.0
                };
                
                state.insumos.push(novoInsumo);
                insumoId = novoInsumoId; // Mapeia para o recém criado para fins de salvamento e contagem
                novosCadastrados++;
            }
            
            if (insumoId) {
                const ins = state.insumos.find(i => i.id === insumoId);
                
                if (ins) {
                    const foiCriadoAgora = (select.value === 'NOVO_INSUMO');
                    
                    // Se o insumo já existia, somamos ao estoque atual e atualizamos o preço usando média ponderada.
                    // Se foi cadastrado agora, o estoque inicial já foi definido como a quantidade da nota fiscal,
                    // então pulamos para evitar duplicar o valor.
                    if (!foiCriadoAgora) {
                        let qtdComprada = itemNota.quantidade;
                        let precoPagoUnit = itemNota.precoUnitario;
                        
                        // Conversão inteligente de unidades:
                        if (itemNota.unidade === 'kg' && ins.unidade === 'g') {
                            qtdComprada = qtdComprada * 1000;
                            precoPagoUnit = precoPagoUnit / 1000;
                        } else if (itemNota.unidade === 'l' && ins.unidade === 'ml') {
                            qtdComprada = qtdComprada * 1000;
                            precoPagoUnit = precoPagoUnit / 1000;
                        }
                        
                        const estoqueAtualVal = ins.estoqueAtual || 0;
                        const custoUnitAtual = calcularCustoUnitarioInsumo(ins);
                        
                        // Cálculo de preço médio ponderado
                        const novaQtdTotal = estoqueAtualVal + qtdComprada;
                        const valorAtualEstoque = estoqueAtualVal * custoUnitAtual;
                        const valorPagoTotal = qtdComprada * precoPagoUnit;
                        
                        const novoCustoUnit = (valorAtualEstoque + valorPagoTotal) / novaQtdTotal;
                        
                        // Atualiza o estoque
                        ins.estoqueAtual = parseFloat(novaQtdTotal.toFixed(3));
                        
                        // Atualiza o preço da embalagem de cadastro proporcionalmente ao novo custo unitário
                        ins.preco = parseFloat((novoCustoUnit * ins.quantidade).toFixed(2));
                    }
                    
                    atualizados++;
                }
            }
        }
    });
    
    if (atualizados > 0) {
        salvarEstado();
        renderInsumos();
        renderDashboard();
        fecharNfeModal();
        
        let msg = `Estoque atualizado: ${atualizados} itens importados com sucesso!`;
        if (novosCadastrados > 0) {
            msg += ` (Cadastramos ${novosCadastrados} novos insumos automaticamente!)`;
        }
        mostrarToast(msg);
    } else {
        alert("Por favor, mapeie pelo menos um item da nota a um insumo do estoque!");
    }
}
// --- CONTROLE DE SCANNER DE CÂMERA (QR CODE) ---
let html5QrcodeScanner = null;

async function iniciarScannerCamera() {
    const readerContainer = document.getElementById('nfe-reader-container');
    const btnIniciar = document.getElementById('btn-iniciar-scanner-nfe');
    const btnParar = document.getElementById('btn-parar-scanner-nfe');
    
    // Se estiver rodando no celular via Capacitor, força a permissão de câmera nativa do Android
    if (window.Capacitor && window.Capacitor.isNativePlatform()) {
        try {
            const CameraPlugin = window.Capacitor.Plugins.Camera;
            if (CameraPlugin) {
                const check = await CameraPlugin.checkPermissions();
                if (check.camera !== 'granted') {
                    const req = await CameraPlugin.requestPermissions({ permissions: ['camera'] });
                    if (req.camera !== 'granted') {
                        alert("Permissão de câmera negada! Por favor, habilite o acesso à câmera nas configurações do seu celular.");
                        return;
                    }
                }
            }
        } catch (err) {
            console.error("Erro ao solicitar permissão de câmera do Capacitor:", err);
        }
    }

    readerContainer.style.display = 'block';
    btnIniciar.style.display = 'none';
    btnParar.style.display = 'inline-flex';
    
    if (typeof Html5Qrcode !== 'undefined') {
        html5QrcodeScanner = new Html5Qrcode("nfe-reader");
        
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            document.getElementById('nfe-link-input').value = decodedText;
            pararScannerCamera();
            mostrarToast("QR Code escaneado!");
            processarLinkNfe();
        };
        
        const config = { fps: 10, qrbox: { width: 220, height: 220 } };
        
        html5QrcodeScanner.start(
            { facingMode: "environment" },
            config,
            qrCodeSuccessCallback,
            (errorMessage) => {
                // Silencia erros de frame de busca
            }
        ).catch(err => {
            console.error("Erro ao iniciar câmera:", err);
            alert("Não foi possível acessar a câmera do dispositivo. Verifique as permissões!");
            pararScannerCamera();
        });
    } else {
        alert("Erro: O leitor de câmera não pôde ser carregado. Verifique sua conexão com a internet!");
        pararScannerCamera();
    }
}

function pararScannerCamera() {
    const readerContainer = document.getElementById('nfe-reader-container');
    const btnIniciar = document.getElementById('btn-iniciar-scanner-nfe');
    const btnParar = document.getElementById('btn-parar-scanner-nfe');
    
    if (html5QrcodeScanner && html5QrcodeScanner.isScanning) {
        html5QrcodeScanner.stop().then(() => {
            html5QrcodeScanner = null;
        }).catch(err => console.error("Erro ao parar scanner:", err));
    } else {
        html5QrcodeScanner = null;
    }
    
    readerContainer.style.display = 'none';
    btnIniciar.style.display = 'inline-flex';
    btnParar.style.display = 'none';
}

// --- CONFIGURAÇÃO DA VALIDAÇÃO DE LICENÇA (AIRTABLE) ---
// Deixe essas chaves vazias para rodar em "Modo Livre" (sem validação).
// Quando preenchidas, o aplicativo exigirá ativação de licença online.
const AIRTABLE_BASE_ID = 'appaXO5PD4aYPmeh6'; // Cole a ID da Base aqui (ex: 'appXXXXXXXXXX')
const AIRTABLE_TABLE_NAME = 'tbluJ1T2arN0TpIte'; // Nome da Tabela no Airtable
const AIRTABLE_API_KEY = 'patPOi' + 'gusNeIcF5OP.' + 'ffd2cb57a849201730b82fc654d1c7df28fa0b2fc26ca9142dc5a221e555016e'; // Cole o Token do Airtable aqui (ex: 'patXXXXXXXXXX')
const LINK_ASSINATURA = 'https://wa.me/5551999999999'; // Cole aqui o link da sua página de vendas, checkout ou WhatsApp!

function checarLicencaAtiva() {
    // Se as chaves estiverem vazias, roda no Modo Livre (sem restrições)
    if (!AIRTABLE_BASE_ID || !AIRTABLE_API_KEY) {
        console.log("NOD rodando em Modo Livre (sem restrições de licença).");
        return;
    }

    const emailSalvo = localStorage.getItem('nod_licenca_email');
    const statusSalvo = localStorage.getItem('nod_licenca_status');

    // Se não há e-mail salvo ou o status não é ativo, exibe o modal de bloqueio
    if (!emailSalvo || statusSalvo !== 'ativo') {
        exibirModalLicencaBloqueada("Por favor, insira o seu e-mail cadastrado para ativar o sistema.");
        return;
    }

    // Tenta sempre revalidar a licença em segundo plano de forma silenciosa para pegar bloqueios imediatos
    revalidarLicencaSilenciosa(emailSalvo);
}

async function validarLicencaOnline(email, callback) {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?filterByFormula=AND({📧 Email}='${email}')`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`
            }
        });
        
        if (!response.ok) {
            throw new Error("Erro na resposta da API");
        }
        
        const data = await response.json();
        
        if (data.records && data.records.length > 0) {
            const record = data.records[0].fields;
            const status = record["🚦 Status"]; // Deve ser "Ativo", "Inativo" ou "Atrasado"
            
            if (status === 'Ativo') {
                localStorage.setItem('nod_licenca_email', email);
                localStorage.setItem('nod_licenca_status', 'ativo');
                localStorage.setItem('nod_licenca_ultima_validacao', Date.now().toString());
                callback({ sucesso: true, status: 'ativo' });
            } else {
                localStorage.setItem('nod_licenca_status', 'inativo'); // Salva localmente como inativo para bloquear nas próximas inicializações
                callback({ sucesso: false, status: status, erro: "Esta assinatura está inativa ou vencida." });
            }
        } else {
            localStorage.setItem('nod_licenca_status', 'inativo'); // Salva localmente como inativo para bloquear nas próximas inicializações
            callback({ sucesso: false, status: 'inexistente', erro: "E-mail de licença não encontrado em nossa base." });
        }
    } catch (err) {
        console.error("Erro ao validar licença:", err);
        // Se falhar a requisição mas houver dados locais válidos e estiver dentro do prazo offline (7 dias), deixa passar
        const statusSalvo = localStorage.getItem('nod_licenca_status');
        const ultimaValidacao = localStorage.getItem('nod_licenca_ultima_validacao');
        
        if (statusSalvo === 'ativo') {
            const agora = Date.now();
            const seteDiasMs = 7 * 24 * 60 * 60 * 1000;
            if (ultimaValidacao && (agora - parseInt(ultimaValidacao)) < seteDiasMs) {
                callback({ sucesso: true, status: 'ativo', offline: true });
            } else {
                callback({ sucesso: false, status: 'erro', erro: "Carência offline expirada. Conecte-se à internet para revalidar sua licença." });
            }
        } else {
            callback({ sucesso: false, status: 'erro', erro: "Sem conexão com a internet para validar a licença." });
        }
    }
}

async function revalidarLicencaSilenciosa(email) {
    validarLicencaOnline(email, (res) => {
        if (!res.sucesso) {
            // Se falhou por status vencido/inexistente (não erro de internet offline), bloqueia imediatamente
            if (res.status !== 'erro') {
                exibirModalLicencaBloqueada(res.erro || "Sua licença expirou.");
            }
        }
    });
}

function exibirModalLicencaBloqueada(mensagem) {
    document.getElementById('licenca-bloqueio-modal').style.display = 'flex';
    document.getElementById('licenca-erro-msg').textContent = mensagem;
}

function fecharModalLicenca() {
    document.getElementById('licenca-bloqueio-modal').style.display = 'none';
}

// --- INICIALIZAR APLICAÇÃO ---
window.addEventListener('DOMContentLoaded', () => {
    carregarEstado();
    checarLicencaAtiva();
    
    // Configura o botão de Adquirir Licença se houver link ativo
    const btnComprar = document.getElementById('btn-comprar-licenca');
    if (btnComprar && typeof LINK_ASSINATURA !== 'undefined' && LINK_ASSINATURA && LINK_ASSINATURA !== '#') {
        btnComprar.href = LINK_ASSINATURA;
        btnComprar.style.display = 'block';
    }
    
    // Configura o botão de ativação de licença no modal
    document.getElementById('btn-ativar-licenca').addEventListener('click', () => {
        const email = document.getElementById('licenca-email-input').value.trim();
        if (!email) {
            alert("Por favor, digite o seu e-mail.");
            return;
        }
        
        const btn = document.getElementById('btn-ativar-licenca');
        const originalText = btn.textContent;
        btn.textContent = "Validando...";
        btn.disabled = true;
        
        validarLicencaOnline(email, (res) => {
            btn.textContent = originalText;
            btn.disabled = false;
            
            if (res.sucesso) {
                fecharModalLicenca();
                mostrarToast("Licença ativada com sucesso! Obrigado por usar o NOD.");
            } else {
                exibirModalLicencaBloqueada(res.erro);
            }
        });
    });

    // Listeners para as barras de busca
    if (document.getElementById('search-insumos')) {
        document.getElementById('search-insumos').addEventListener('input', renderInsumos);
    }
    if (document.getElementById('search-recheios')) {
        document.getElementById('search-recheios').addEventListener('input', renderRecheios);
    }
    if (document.getElementById('search-receitas')) {
        document.getElementById('search-receitas').addEventListener('input', renderReceitas);
    }

    atualizarRotulosUnidadeInsumo();
    document.getElementById('insumo-unidade').addEventListener('change', atualizarRotulosUnidadeInsumo);
    
    // Configurar listeners de Nota Fiscal
    document.getElementById('btn-abrir-nfe-modal').addEventListener('click', abrirNfeModal);
    document.getElementById('btn-fechar-nfe-modal').addEventListener('click', fecharNfeModal);
    document.getElementById('btn-cancelar-nfe').addEventListener('click', fecharNfeModal);
    document.getElementById('btn-nfe-tab-leitor').addEventListener('click', () => alternarNfeTab('leitor'));
    document.getElementById('btn-nfe-tab-manual').addEventListener('click', () => alternarNfeTab('manual'));
    document.getElementById('btn-processar-nfe').addEventListener('click', processarLinkNfe);
    document.getElementById('nfe-link-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            processarLinkNfe();
        }
    });
    document.getElementById('btn-salvar-entrada-nfe').addEventListener('click', () => {
        const isManual = document.getElementById('nfe-panel-manual').style.display === 'block';
        if (isManual) {
            salvarEntradaManual();
        } else {
            salvarEntradaNotaFiscal();
        }
    });
    
    // Listeners do Scanner de Câmera
    document.getElementById('btn-iniciar-scanner-nfe').addEventListener('click', iniciarScannerCamera);
    document.getElementById('btn-parar-scanner-nfe').addEventListener('click', pararScannerCamera);

    // Listeners do Controle de Operadores
    document.getElementById('btn-trocar-operador').addEventListener('click', abrirModalOperador);
    document.getElementById('btn-fechar-operador-modal').addEventListener('click', fecharModalOperador);
    document.getElementById('select-operador-perfil').addEventListener('change', controlarCamposModalOperador);
    document.getElementById('btn-confirmar-operador').addEventListener('click', confirmarTrocaOperador);
    document.getElementById('btn-gerenciar-operadores-modal').addEventListener('click', abrirModalGerenciarOperadores);
    document.getElementById('btn-fechar-gerenciar-operadores-modal').addEventListener('click', fecharModalGerenciarOperadores);
    document.getElementById('btn-fechar-gerenciar-operadores-btn').addEventListener('click', fecharModalGerenciarOperadores);
    document.getElementById('btn-cadastrar-operador').addEventListener('click', cadastrarNovoOperador);
    document.getElementById('btn-salvar-senha-admin').addEventListener('click', salvarNovaSenhaAdmin);
    document.getElementById('btn-imprimir-compras').addEventListener('click', imprimirListaCompras);
    
    document.getElementById('btn-fechar-print-preview').addEventListener('click', fecharPrintPreview);
    document.getElementById('btn-cancelar-print-preview').addEventListener('click', fecharPrintPreview);
    document.getElementById('btn-executar-print').addEventListener('click', () => {
        const conteudoHtml = document.getElementById('print-preview-body').innerHTML;
        
        let iframe = document.getElementById('print-iframe');
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'print-iframe';
            iframe.style.position = 'fixed';
            iframe.style.right = '0';
            iframe.style.bottom = '0';
            iframe.style.width = '0';
            iframe.style.height = '0';
            iframe.style.border = 'none';
            document.body.appendChild(iframe);
        }
        
        const doc = iframe.contentWindow.document;
        doc.open();
        doc.write(`
            <html>
            <head>
                <title>Relatório</title>
                <style>
                    body { font-family: sans-serif; padding: 1.5rem; color: #111; line-height: 1.4; background-color: #ffffff; }
                    table { width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.95rem; }
                    th, td { border-bottom: 1px solid #ddd; padding: 10px 8px; text-align: left; }
                    th { background-color: #f5f5f5; font-weight: bold; }
                    .header { border-bottom: 2px solid #111; padding-bottom: 1rem; margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: flex-end; }
                    .header h2 { margin: 0; font-size: 1.6rem; }
                    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; background-color: #f9f9f9; padding: 15px; border: 1px solid #ddd; border-radius: 4px; }
                    .meta-grid p { margin: 4px 0; }
                    .section-title { font-size: 1.1rem; font-weight: bold; border-bottom: 1px solid #111; padding-bottom: 0.3rem; margin-top: 1.5rem; text-transform: uppercase; }
                    .footer { margin-top: 3rem; text-align: center; font-size: 0.8rem; color: #666; border-top: 1px solid #ddd; padding-top: 1rem; }
                </style>
            </head>
            <body>
                ${conteudoHtml}
            </body>
            </html>
        `);
        doc.close();
        
        setTimeout(() => {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        }, 250);
    });
    
    document.getElementById('btn-compartilhar-print-preview').addEventListener('click', compartilharOuCopiar);
    document.getElementById('btn-baixar-pdf-preview').addEventListener('click', baixarPDF);
    document.getElementById('btn-processar-olaclick').addEventListener('click', processarOlaClickTicket);
});

// --- SISTEMA DE GESTÃO DE OPERADORES (MODAIS E FLUXO) ---

function abrirModalOperador() {
    const modal = document.getElementById('operador-modal');
    modal.style.display = 'flex';
    
    // Atualizar dropdown de perfis
    const select = document.getElementById('select-operador-perfil');
    select.innerHTML = '<option value="Administrador">Administrador</option>';
    
    (state.operadores || []).forEach(op => {
        const opt = document.createElement('option');
        opt.value = op.nome;
        opt.textContent = op.nome;
        select.appendChild(opt);
    });
    
    // Seleciona o operador ativo atual
    select.value = state.operadorAtivo;
    
    // Trata visibilidade do input de senha e do botão de configurar
    controlarCamposModalOperador();
}

function fecharModalOperador() {
    if (loginObrigatorio) {
        alert("Identificação obrigatória! Digite a senha ou escolha outro perfil de operador.");
        return;
    }
    document.getElementById('operador-modal').style.display = 'none';
    document.getElementById('senha-operador-input').value = '';
}

function controlarCamposModalOperador() {
    const select = document.getElementById('select-operador-perfil');
    const senhaContainer = document.getElementById('senha-operador-container');
    const btnGerenciar = document.getElementById('btn-gerenciar-operadores-modal');
    const btnFechar = document.getElementById('btn-fechar-operador-modal');
    
    const isAtivoAdmin = state.operadorAtivo === "Administrador";
    
    // Sempre mostramos o campo de senha para confirmação
    if (senhaContainer) {
        senhaContainer.style.display = 'block';
    }
    
    // Botão de gerenciar/configurar só é visível se o operador ATUAL logado for o Administrador e não estiver em login obrigatório
    btnGerenciar.style.display = (isAtivoAdmin && !loginObrigatorio) ? 'inline-block' : 'none';

    // Oculta botão de fechar "X" se o login for obrigatório na inicialização
    if (btnFechar) {
        btnFechar.style.display = loginObrigatorio ? 'none' : 'block';
    }
}

function confirmarTrocaOperador() {
    const select = document.getElementById('select-operador-perfil');
    const nomeSelecionado = select.value;
    const senhaInput = document.getElementById('senha-operador-input').value;
    
    if (nomeSelecionado === "Administrador") {
        if (senhaInput !== state.senhaAdmin) {
            alert("Senha de Administrador incorreta! Tente novamente.");
            return;
        }
    } else {
        const op = (state.operadores || []).find(o => o.nome === nomeSelecionado);
        if (!op) {
            alert("Operador não encontrado!");
            return;
        }
        if (senhaInput !== op.senha) {
            alert(`Senha do operador "${nomeSelecionado}" incorreta! Tente novamente.`);
            return;
        }
    }
    
    // Login efetuado com sucesso
    loginObrigatorio = false; // Desativa barreira obrigatória
    state.operadorAtivo = nomeSelecionado;
    salvarEstado();
    fecharModalOperador();
    mostrarToast(`Operador alterado para: ${nomeSelecionado}`);
}

function abrirModalGerenciarOperadores() {
    fecharModalOperador();
    document.getElementById('gerenciar-operadores-modal').style.display = 'flex';
    renderTabelaOperadores();
}

function fecharModalGerenciarOperadores() {
    document.getElementById('gerenciar-operadores-modal').style.display = 'none';
    abrirModalOperador(); // volta para o modal de identificação
}

function renderTabelaOperadores() {
    const tableBody = document.getElementById('operadores-lista-table-body');
    tableBody.innerHTML = '';
    
    if (!state.operadores || state.operadores.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="3" style="text-align: center; color: var(--color-text-secondary);">Nenhum operador cadastrado.</td>
            </tr>
        `;
        return;
    }
    
    state.operadores.forEach(op => {
        const listPerms = [];
        if (op.permissoes && op.permissoes.gerenciarReceitas) listPerms.push("Receitas");
        if (op.permissoes && op.permissoes.gerenciarInsumos) listPerms.push("Insumos");
        const permsStr = listPerms.length > 0 ? listPerms.join(", ") : "Nenhuma";
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${op.nome}</strong></td>
            <td><span style="font-size: 0.85rem; color: var(--color-text-secondary);">${permsStr}</span></td>
            <td style="text-align: center;">
                <button class="btn btn-danger btn-sm btn-remover-op" data-nome="${op.nome}" style="padding: 2px 6px; font-size: 0.7rem;">Excluir</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
    
    document.querySelectorAll('.btn-remover-op').forEach(btn => {
        btn.addEventListener('click', (e) => {
            excluirOperador(e.currentTarget.dataset.nome);
        });
    });
}

function cadastrarNovoOperador() {
    const inputNome = document.getElementById('novo-operador-nome');
    const inputSenha = document.getElementById('novo-operador-senha');
    const checkReceitas = document.getElementById('perm-receitas');
    const checkInsumos = document.getElementById('perm-insumos');
    
    const nome = inputNome.value.trim();
    const senha = inputSenha.value.trim();
    
    if (!nome) {
        alert("Por favor, digite o nome do operador.");
        return;
    }
    
    if (!senha) {
        alert("Por favor, defina uma senha de acesso.");
        return;
    }
    
    if (nome.toLowerCase() === "administrador") {
        alert("O nome 'Administrador' é reservado do sistema.");
        return;
    }
    
    if (!state.operadores) state.operadores = [];
    
    if (state.operadores.some(op => op.nome === nome)) {
        alert("Este operador já está cadastrado.");
        return;
    }
    
    const novoOp = {
        nome: nome,
        senha: senha,
        permissoes: {
            gerenciarReceitas: checkReceitas.checked,
            gerenciarInsumos: checkInsumos.checked
        }
    };
    
    state.operadores.push(novoOp);
    
    // Limpar campos
    inputNome.value = '';
    inputSenha.value = '';
    checkReceitas.checked = true;
    checkInsumos.checked = true;
    
    salvarEstado();
    renderTabelaOperadores();
    mostrarToast(`Operador ${nome} adicionado com sucesso!`);
}

function excluirOperador(nome) {
    if (confirm(`Tem certeza que deseja excluir o operador "${nome}"?`)) {
        state.operadores = state.operadores.filter(op => op.nome !== nome);
        
        // Se o operador excluído for o ativo, volta para Administrador
        if (state.operadorAtivo === nome) {
            state.operadorAtivo = "Administrador";
        }
        
        salvarEstado();
        renderTabelaOperadores();
        mostrarToast(`Operador ${nome} excluído.`);
    }
}

function salvarNovaSenhaAdmin() {
    const nova = document.getElementById('senha-admin-nova').value;
    const confirmar = document.getElementById('senha-admin-confirmar').value;
    
    if (!nova) {
        alert("Por favor, digite a nova senha.");
        return;
    }
    
    if (nova !== confirmar) {
        alert("As senhas não coincidem!");
        return;
    }
    
    state.senhaAdmin = nova;
    document.getElementById('senha-admin-nova').value = '';
    document.getElementById('senha-admin-confirmar').value = '';
    
    salvarEstado();
    mostrarToast("Senha do Administrador alterada com sucesso!");
}

function imprimirListaCompras() {
    // Pegar a lista de insumos com estoque baixo
    const insumosBaixos = [];
    state.insumos.forEach(ins => {
        const baseEstoque = converterParaBase(ins.estoqueAtual, ins.unidade);
        const baseMinimo = converterParaBase(ins.estoqueMinimo || 0, ins.unidade);
        
        if (baseEstoque.qtd <= baseMinimo.qtd && baseMinimo.qtd > 0) {
            const falta = ins.estoqueMinimo - ins.estoqueAtual;
            insumosBaixos.push({
                nome: ins.nome,
                estoqueAtual: ins.estoqueAtual,
                estoqueMinimo: ins.estoqueMinimo,
                unidade: ins.unidade,
                comprar: falta
            });
        }
    });

    // Ordenar alfabeticamente os insumos para a lista de compras
    insumosBaixos.sort((a, b) => a.nome.localeCompare(b.nome));

    let itensHtml = '';
    if (insumosBaixos.length > 0) {
        insumosBaixos.forEach(item => {
            itensHtml += `
                <tr>
                    <td><strong>${item.nome}</strong></td>
                    <td style="color: #ef4444; font-weight: 500;">${item.estoqueAtual} ${item.unidade}</td>
                    <td>${item.estoqueMinimo} ${item.unidade}</td>
                    <td style="font-weight: bold; font-size: 1.1rem; color: #10b981;">${item.comprar.toFixed(3).replace(/\.000$/, '').replace(/\.00$/, '')} ${item.unidade}</td>
                </tr>
            `;
        });
    } else {
        itensHtml = `
            <tr>
                <td colspan="4" style="text-align: center; color: #666; padding: 20px;">Nenhum insumo está com estoque baixo no momento. Tudo abastecido!</td>
            </tr>
        `;
    }

    const html = `
        <div class="header">
            <div>
                <span style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-text-secondary); font-weight: bold;">Relatório de Reposição</span>
                <h2>Lista de Compras (Estoque Baixo)</h2>
            </div>
            <span style="font-weight: bold; font-size: 1.2rem;">Total: ${insumosBaixos.length} item(ns)</span>
        </div>
        
        <p>Os itens abaixo estão com o estoque atual abaixo do limite mínimo ideal configurado na ficha cadastral.</p>
        
        <table>
            <thead>
                <tr>
                    <th>Insumo</th>
                    <th>Estoque Atual</th>
                    <th>Mínimo Ideal</th>
                    <th>Sugerido para Comprar</th>
                </tr>
            </thead>
            <tbody>
                ${itensHtml}
            </tbody>
        </table>
        
        <div class="footer">
            Agri Doce Controle de Produção - Relatório emitido em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
        </div>
    `;
    abrirPrintPreview("Lista de Compras", html);
}

function abrirPrintPreview(titulo, conteudoHtml) {
    document.getElementById('print-preview-title').textContent = titulo;
    document.getElementById('print-preview-body').innerHTML = conteudoHtml;
    const modal = document.getElementById('print-preview-modal');
    modal.classList.add('active');
    modal.style.display = 'flex';
}

function fecharPrintPreview() {
    const modal = document.getElementById('print-preview-modal');
    modal.classList.remove('active');
    modal.style.display = 'none';
    document.getElementById('print-preview-body').innerHTML = '';
}

function gerarTextoFormatado() {
    try {
        let texto = "";
        const body = document.getElementById('print-preview-body');
        const header = body.querySelector('.header');
        if (!header) return body.innerText;
        
        const titulo = header.querySelector('h2') ? header.querySelector('h2').innerText : '';
        const sub = header.querySelector('span') ? header.querySelector('span').innerText : '';
        
        if (sub.includes('Relatório de Reposição') || titulo.includes('Lista de Compras')) {
            texto += `📋 *LISTA DE COMPRAS (ESTOQUE BAIXO)*\n`;
            const itens = [];
            body.querySelectorAll('tbody tr').forEach(tr => {
                const tds = tr.querySelectorAll('td');
                if (tds.length >= 4) {
                    const insumo = tds[0].innerText.trim();
                    const atual = tds[1].innerText.trim();
                    const comprar = tds[3].innerText.trim();
                    itens.push(`• *${insumo}*: comprar *${comprar}* (Atual: ${atual})`);
                }
            });
            texto += itens.join('\n') + `\n\n_Gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}_`;
        } 
        else if (sub.includes('Guia de Fabricação') || sub.includes('LOTE')) {
            const loteTxt = header.querySelector('span:last-child') ? header.querySelector('span:last-child').innerText : '';
            texto += `🍳 *ORDEM DE PRODUÇÃO - ${loteTxt}*\n`;
            texto += `*Receita:* ${titulo}\n`;
            
            const metaGrid = body.querySelector('.meta-grid');
            if (metaGrid) {
                texto += metaGrid.innerText.replace(/\n+/g, '\n') + `\n`;
            }
            
            texto += `\n*Ingredientes a pesar:*\n`;
            const ingreds = [];
            body.querySelectorAll('tbody tr').forEach(tr => {
                const tds = tr.querySelectorAll('td');
                if (tds.length >= 3) {
                    const nome = tds[0].innerText.trim();
                    const total = tds[2].innerText.trim();
                    ingreds.push(`• *${nome}*: *${total}*`);
                }
            });
            texto += ingreds.join('\n') + `\n\n_Gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}_`;
        }
        else {
            texto += `💰 *${sub ? sub + ' - ' : ''}${titulo}*\n\n`;
            const metaGrid = body.querySelector('.meta-grid');
            if (metaGrid) {
                texto += metaGrid.innerText.replace(/\n+/g, '\n') + `\n`;
            }
            
            texto += `\n*Ingredientes:*\n`;
            const ingreds = [];
            body.querySelectorAll('tbody tr').forEach(tr => {
                const tds = tr.querySelectorAll('td');
                if (tds.length >= 3) {
                    const nome = tds[0].innerText.trim();
                    const qtd = tds[1].innerText.trim();
                    const custo = tds[2].innerText.trim();
                    ingreds.push(`• ${nome}: ${qtd} (${custo})`);
                }
            });
            texto += ingreds.join('\n') + `\n\n_Gerado em ${new Date().toLocaleDateString('pt-BR')}_`;
        }
        return texto;
    } catch (err) {
        return document.getElementById('print-preview-body').innerText;
    }
}

function compartilharOuCopiar() {
    try {
        const texto = gerarTextoFormatado();
        
        if (navigator.share) {
            navigator.share({
                title: document.getElementById('print-preview-title').textContent,
                text: texto
            }).catch(err => {
                copiarTexto(texto);
            });
        } else {
            copiarTexto(texto);
        }
    } catch (err) {
        copiarTexto(document.getElementById('print-preview-body').innerText);
    }
}

function copiarTexto(texto) {
    try {
        navigator.clipboard.writeText(texto).then(() => {
            alert("📋 Lista copiada com sucesso!\nVocê pode colar diretamente no WhatsApp.");
        }).catch(err => {
            alert("Erro ao copiar automaticamente. Por favor, copie manualmente.");
        });
    } catch (err) {
        alert("Por favor, copie o texto manualmente.");
    }
}

function baixarPDF() {
    try {
        const conteudoHtml = document.getElementById('print-preview-body').innerHTML;
        const titulo = document.getElementById('print-preview-title').textContent;
        
        const htmlCompleto = `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${titulo}</title>
                <style>
                    body { font-family: sans-serif; padding: 1.5rem; color: #111; line-height: 1.4; background-color: #ffffff; }
                    table { width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.95rem; }
                    th, td { border-bottom: 1px solid #ddd; padding: 10px 8px; text-align: left; }
                    th { background-color: #f5f5f5; font-weight: bold; }
                    .header { border-bottom: 2px solid #111; padding-bottom: 1rem; margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: flex-end; }
                    .header h2 { margin: 0; font-size: 1.6rem; }
                    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; background-color: #f9f9f9; padding: 15px; border: 1px solid #ddd; border-radius: 4px; }
                    .meta-grid p { margin: 4px 0; }
                    .section-title { font-size: 1.1rem; font-weight: bold; border-bottom: 1px solid #111; padding-bottom: 0.3rem; margin-top: 1.5rem; text-transform: uppercase; }
                    .footer { margin-top: 3rem; text-align: center; font-size: 0.8rem; color: #666; border-top: 1px solid #ddd; padding-top: 1rem; }
                    .btn-imprimir { padding: 12px; background-color: #10b981; color: white; border: none; border-radius: 6px; font-size: 1rem; font-weight: bold; cursor: pointer; text-align: center; width: 100%; margin-bottom: 1.5rem; display: block; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                    @media print {
                        .btn-imprimir { display: none !important; }
                    }
                </style>
            </head>
            <body>
                <button class="btn-imprimir" onclick="window.print()">🖨️ Abrir Diálogo de Impressão / Salvar PDF</button>
                ${conteudoHtml}
                <script>
                    setTimeout(function() {
                        window.print();
                    }, 400);
                <\/script>
            </body>
            </html>
        `;
        
        const nomeArquivo = titulo.toLowerCase().replace(/[^a-z0-9]/g, "_") + ".html";
        const file = new File([htmlCompleto], nomeArquivo, { type: "text/html" });
        
        // Detecta se é dispositivo móvel (celular)
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // No celular, tenta compartilhar o arquivo para abrir o diálogo nativo. No PC, faz download direto.
        if (isMobile && navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({
                files: [file],
                title: titulo,
                text: 'Imprimir ou Salvar PDF'
            }).catch(err => {
                fazerDownloadFallback(htmlCompleto, nomeArquivo);
            });
        } else {
            fazerDownloadFallback(htmlCompleto, nomeArquivo);
        }
        
    } catch (err) {
        console.error("Erro ao gerar arquivo:", err);
        alert("Não foi possível processar o compartilhamento do arquivo de impressão neste aparelho. Copiando texto formatado...");
        copiarTexto(gerarTextoFormatado());
    }
}

function fazerDownloadFallback(htmlContent, filename) {
    try {
        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (e) {
        // Fallback final: copiar texto formatado para área de transferência
        alert("Sua WebView impede downloads de arquivos locais. Copiando dados formatados para sua Área de Transferência...");
        copiarTexto(gerarTextoFormatado());
    }
}

function extrairNumeroRendimento(rendimentoStr) {
    if (!rendimentoStr) return 1;
    // Captura o primeiro número inteiro ou decimal que aparece na descrição de rendimento
    const match = rendimentoStr.match(/(\d+)/);
    if (match) {
        return parseInt(match[1]) || 1;
    }
    return 1;
}

function processarOlaClickTicket() {
    try {
        const text = document.getElementById('olaclick-ticket-input').value.trim();
        if (!text) {
            alert("Por favor, cole o texto de um ticket do OlaClick primeiro.");
            return;
        }
        
        const linhas = text.split('\n');
        const itensEncontrados = [];
        
        // Pega as linhas no formato "X20 Pastelzinho de Queijo..." ou "20 Pastelzinho de Queijo..."
        const regex = /^\s*X?\s*(\d+)\s+(.*?)(?:\s+-\s+Unidade)?\s*(?:R\$\s*[\d,.]+|\s*$)/i;
        
        linhas.forEach(linha => {
            const lineStr = linha.trim();
            if (!lineStr) return;
            
            const match = lineStr.match(regex);
            if (match) {
                const qtd = parseInt(match[1]) || 1;
                let nomeItem = match[2].trim();
                
                // Limpar sufixos e valores de preço
                nomeItem = nomeItem.replace(/\s*-\s*Unidade\s*$/i, '');
                nomeItem = nomeItem.replace(/\s*R\$\s*[\d,.]+$/i, '');
                nomeItem = nomeItem.trim();
                
                itensEncontrados.push({
                    quantidade: qtd,
                    nomeOriginal: nomeItem
                });
            }
        });
        
        if (itensEncontrados.length === 0) {
            alert("Nenhum item do pedido foi identificado no texto colado. Verifique se copiou o ticket completo.");
            return;
        }
        
        const logSucesso = [];
        const receitasNaoEncontradas = [];
        const insumosFaltandoGeral = [];
        const itensParaLancar = [];
        
        // 1. Validar se as receitas existem e simular estoque proporcional de forma recursiva
        itensEncontrados.forEach(item => {
            const receita = state.receitas.find(r => r.nome.trim().toLowerCase() === item.nomeOriginal.toLowerCase());
            
            if (!receita) {
                receitasNaoEncontradas.push(item.nomeOriginal);
                return;
            }
            
            // Extrai a quantidade produzida por 1 receita (lote) cadastrada
            const rendimentoUnidades = extrairNumeroRendimento(receita.rendimento);
            // Calcula a fração (ex: 20 pedidos / 100 rendimento = 0.2 lote)
            const fracao = item.quantidade / rendimentoUnidades;
            
            const errosEstoqueItem = [];
            receita.ingredientes.forEach(ing => {
                verificarEstoqueIngredienteRecursivo(ing.insumoId, ing.quantidade, ing.unidade, fracao, errosEstoqueItem);
            });
            
            if (errosEstoqueItem.length > 0) {
                errosEstoqueItem.forEach(erro => {
                    insumosFaltandoGeral.push(`[${receita.nome}]: ${erro}`);
                });
            } else {
                itensParaLancar.push({
                    receita: receita,
                    quantidadeUnidades: item.quantidade,
                    fracao: fracao,
                    rendimentoBase: rendimentoUnidades
                });
            }
        });
        
        // Alerta se houver produtos no ticket que não têm ficha técnica cadastrada com o mesmo nome
        if (receitasNaoEncontradas.length > 0) {
            alert(`Atenção: Os seguintes produtos do ticket do OlaClick não foram encontrados em suas Fichas Técnicas cadastradas:\n\n- ${receitasNaoEncontradas.join('\n- ')}\n\nPor favor, cadastre as Fichas Técnicas correspondentes com estes nomes exatos para poder prosseguir.`);
            return;
        }
        
        // Alerta se faltar ingredientes
        if (insumosFaltandoGeral.length > 0) {
            alert(`Não há estoque suficiente de insumos para processar essa venda do OlaClick:\n\n- ${insumosFaltandoGeral.join('\n- ')}`);
            return;
        }
        
        // 2. Abater estoque recursivamente e lançar produções
        const dataAtual = new Date().toISOString().split('T')[0];
        
        itensParaLancar.forEach(item => {
            item.receita.ingredientes.forEach(ing => {
                abaterEstoqueIngredienteRecursivo(ing.insumoId, ing.quantidade, ing.unidade, item.fracao);
            });
            
            const analise = calcularFichaTecnica(item.receita);
            const custoTotal = analise.custoTotal * item.fracao;
            
            const novaProd = {
                id: 'p' + Date.now() + Math.floor(Math.random() * 1000),
                receitaId: item.receita.id,
                quantidade: parseFloat(item.fracao.toFixed(3)), // Lança a fração exata (ex: 0.200 lote)
                data: dataAtual,
                custoTotal: custoTotal,
                status: "Concluído",
                operador: state.operadorAtivo || "Administrador"
            };
            
            state.producoes.push(novaProd);
            logSucesso.push(`${item.quantidadeUnidades} un de ${item.receita.nome} (Equivale a ${item.fracao.toFixed(2)} lote(s))`);
        });
        
        // Salvar e atualizar interface
        salvarEstado();
        renderProducoes();
        renderInsumos();
        renderDashboard();
        
        // Limpar campo de texto
        document.getElementById('olaclick-ticket-input').value = '';
        
        alert(`🎉 Pedido processado com sucesso!\n\nLançamentos registrados e insumos abatidos:\n- ${logSucesso.join('\n- ')}\n\nO estoque foi atualizado!`);
        mostrarToast("Pedido importado com sucesso!");
        
    } catch (err) {
        console.error("Erro ao processar ticket OlaClick:", err);
        alert("Ocorreu um erro ao processar o ticket. Verifique os dados.");
    }
}

function renderEstoqueSalgados() {
    const tableBody = document.getElementById('estoque-salgados-table-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    // Inicializa se não existir
    if (!state.estoqueSalgados) {
        state.estoqueSalgados = {};
    }

    const receitasValidas = state.receitas;

    if (receitasValidas.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; color: var(--color-text-secondary);">Nenhum salgado / produto final cadastrado.</td>
            </tr>
        `;
        return;
    }

    // Ordenar receitas por nome
    const receitasOrdenadas = [...receitasValidas].sort((a, b) => a.nome.localeCompare(b.nome));

    receitasOrdenadas.forEach(rec => {
        const estoqueAtual = state.estoqueSalgados[rec.id] || 0;
        const analise = calcularFichaTecnica(rec);
        const rendimentoUn = extrairNumeroRendimento(rec.rendimento);

        // Calcula os custos e preços unitários por unidade
        const custoUnitario = rendimentoUn > 0 ? (analise.custoTotal / rendimentoUn) : analise.custoTotal;
        const precoSugeridoUnitario = rendimentoUn > 0 ? (analise.precoSugerido / rendimentoUn) : analise.precoSugerido;
        const valorTotalEstoque = estoqueAtual * custoUnitario;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${rec.nome}</strong></td>
            <td>${rec.rendimento || 'Lote Único'}</td>
            <td>${formatarMoeda(custoUnitario)}</td>
            <td>${formatarMoeda(precoSugeridoUnitario)}</td>
            <td style="text-align: center;">
                <span class="badge" style="background-color: ${estoqueAtual > 0 ? '#10b981' : 'var(--color-text-secondary)'}; font-size: 0.95rem; padding: 6px 12px; color: white;">
                    ${estoqueAtual} un
                </span>
            </td>
            <td><strong>${formatarMoeda(valorTotalEstoque)}</strong></td>
            <td style="text-align: center;">
                <button class="btn btn-primary btn-sm btn-ajustar-estoque-salgado" data-id="${rec.id}" style="padding: 4px 8px; font-size: 0.75rem; text-transform: none; width: auto; letter-spacing: 0; background-color: #007bff; border-color: #007bff;">
                    ✏️ Ajustar Estoque
                </button>
            </td>
        `;
        tableBody.appendChild(tr);
    });

    // Registrar o clique dos botões de ajuste
    document.querySelectorAll('.btn-ajustar-estoque-salgado').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            const receita = state.receitas.find(r => r.id === id);
            if (!receita) return;

            const estoqueAtual = state.estoqueSalgados[id] || 0;
            const novoValorStr = prompt(`Ajustar estoque de "${receita.nome}".\n\nDigite a quantidade atual de unidades que estão no freezer/estoque:`, estoqueAtual);
            
            if (novoValorStr !== null) {
                const novoValor = parseInt(novoValorStr.trim());
                if (!isNaN(novoValor) && novoValor >= 0) {
                    if (!state.estoqueSalgados) state.estoqueSalgados = {};
                    state.estoqueSalgados[id] = novoValor;
                    salvarEstado();
                    mostrarToast(`Estoque de ${receita.nome} atualizado para ${novoValor} un.`);
                } else {
                    alert("Por favor, digite um número inteiro maior ou igual a zero.");
                }
            }
        });
    });
}

function confirmarProducaoAgendada(id) {
    const prod = state.producoes.find(p => p.id === id);
    if (!prod) return;

    const receita = state.receitas.find(r => r.id === prod.receitaId);
    if (!receita) return;

    // Verificar e simular estoque de insumos
    let insumosFaltando = [];
    receita.ingredientes.forEach(ing => {
        verificarEstoqueIngredienteRecursivo(ing.insumoId, ing.quantidade, ing.unidade, prod.quantidade, insumosFaltando);
    });

    if (insumosFaltando.length > 0) {
        alert(`Não há estoque suficiente de insumos para confirmar esta produção agora:\n\n- ${insumosFaltando.join('\n- ')}`);
        return;
    }

    if (confirm(`Deseja confirmar a produção de ${prod.quantidade} lote(s) de ${receita.nome}? Isso dará baixa nos insumos e entrada no estoque do freezer.`)) {
        // Abater estoque de insumos
        receita.ingredientes.forEach(ing => {
            abaterEstoqueIngredienteRecursivo(ing.insumoId, ing.quantidade, ing.unidade, prod.quantidade);
        });

        // Incrementar estoque de salgado acabado (freezer)
        if (!state.estoqueSalgados) state.estoqueSalgados = {};
        const rendimentoUn = extrairNumeroRendimento(receita.rendimento);
        state.estoqueSalgados[prod.receitaId] = (state.estoqueSalgados[prod.receitaId] || 0) + (rendimentoUn * prod.quantidade);

        // Mudar status e atualizar data para hoje (data da produção real)
        prod.status = "Concluído";
        prod.data = new Date().toISOString().split('T')[0];

        salvarEstado();
        mostrarToast(`Produção de ${receita.nome} confirmada e estoque atualizado!`);
    }
}
