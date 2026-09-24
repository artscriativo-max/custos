/**
 * Controle de Compras Pessoais & Orçamento Mensal
 * Lógica do aplicativo com armazenamento persistente em localStorage
 */

// --- BLOQUEADOR GLOBAL DE ATALHOS DO LEITOR FÍSICO (EVITA ABRIR DOWNLOADS/HISTÓRICO NO CHROME) ---
window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && (e.key === 'j' || e.key === 'J' || e.key === 'h' || e.key === 'H' || e.keyCode === 74 || e.keyCode === 72)) || e.keyCode === 10) {
        e.preventDefault();
        e.stopPropagation();
    }
}, true);

// --- CATEGORIAS E DADOS PADRÃO DE DEMONSTRAÇÃO ---
const CATEGORIAS_PADRAO = [
    { id: "c1", nome: "Supermercado", cor: "#2563eb" },
    { id: "c2", nome: "Farmácia", cor: "#10b981" },
    { id: "c3", nome: "Casa & Utilidades", cor: "#f59e0b" },
    { id: "c4", nome: "Lazer & Restaurantes", cor: "#ec4899" },
    { id: "c5", nome: "Vestuário", cor: "#8b5cf6" },
    { id: "c6", nome: "Outros", cor: "#64748b" }
];

const COMPRAS_PADRAO = [
    {
        id: "comp_1",
        estabelecimento: "Supermercado Carrefour",
        data: new Date().toISOString().split('T')[0],
        categoriaId: "c1",
        valorTotal: 485.50,
        observacao: "Compras da semana",
        itens: [
            { nome: "Arroz Tipo 1 5kg", quantidade: 1, precoUnitario: 28.90 },
            { nome: "Feijão Preto 1kg", quantidade: 2, precoUnitario: 8.50 },
            { nome: "Azeite de Oliva Extra Virgem", quantidade: 1, precoUnitario: 42.00 },
            { nome: "Carne Bov. Alcatra kg", quantidade: 2.5, precoUnitario: 45.00 },
            { nome: "Outros Itens Diversos", quantidade: 1, precoUnitario: 283.10 }
        ]
    },
    {
        id: "comp_2",
        estabelecimento: "Farmácia São João",
        data: new Date().toISOString().split('T')[0],
        categoriaId: "c2",
        valorTotal: 124.90,
        observacao: "Medicamentos e higiene",
        itens: [
            { nome: "Vitamina C 1000mg", quantidade: 1, precoUnitario: 34.90 },
            { nome: "Protetor Solar FPS 50", quantidade: 1, precoUnitario: 59.00 },
            { nome: "Creme Dental 90g", quantidade: 2, precoUnitario: 15.50 }
        ]
    }
];

const DESPESAS_FIXAS_PADRAO = [
    { id: "df1", nome: "Aluguel / Condomínio", categoriaId: "c3", valorPadrao: 1200.00 },
    { id: "df2", nome: "Energia Elétrica (Luz)", categoriaId: "c3", valorPadrao: 180.00 },
    { id: "df3", nome: "Internet Fibra / Telefone", categoriaId: "c3", valorPadrao: 120.00 },
    { id: "df4", nome: "Mensalidade Academia", categoriaId: "c4", valorPadrao: 100.00 }
];

// Estado Geral do Aplicativo
let state = {
    metaMensal: 2500, // Meta inicial em R$
    categorias: [],
    despesasFixas: [],
    compras: []
};

let chartCategoriasInstance = null;
let chartHistoricoInstance = null;
let nfeItensTemporarios = [];

// --- INICIALIZAÇÃO DA APLICAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    carregarEstado();
    configurarAbas();
    configurarListeners();
    configurarDataAtual();
    atualizarUI();
});

function carregarEstado() {
    const dadosSalvos = localStorage.getItem('compras_pessoais_state');
    if (dadosSalvos) {
        try {
            state = JSON.parse(dadosSalvos);
            if (!state.categorias || state.categorias.length === 0) state.categorias = [...CATEGORIAS_PADRAO];
            if (!state.despesasFixas || state.despesasFixas.length === 0) state.despesasFixas = [...DESPESAS_FIXAS_PADRAO];
            if (!state.compras) state.compras = [];
            if (!state.metaMensal) state.metaMensal = 2500;

            // Sanitização de segurança: corrige qualquer compra que tenha ficado com data vazia ou inválida
            const hoje = new Date().toISOString().split('T')[0];
            state.compras.forEach(comp => {
                if (!comp.data || comp.data === "" || comp.data === "undefined" || comp.data === "null") {
                    comp.data = hoje;
                }
            });
        } catch (e) {
            console.error("Erro ao carregar dados. Restaurando padrões.");
            restaurarPadroes();
        }
    } else {
        restaurarPadroes();
    }
}

function restaurarPadroes() {
    state.metaMensal = 2500;
    state.categorias = [...CATEGORIAS_PADRAO];
    state.despesasFixas = [...DESPESAS_FIXAS_PADRAO];
    state.compras = [...COMPRAS_PADRAO];
    salvarEstado();
}

function salvarEstado() {
    localStorage.setItem('compras_pessoais_state', JSON.stringify(state));
    atualizarUI();
}

// --- ATUALIZAÇÃO DA INTERFACE & DASHBOARD ---
function atualizarUI() {
    atualizarDropdownsCategorias();
    renderOrcamentoEDashboard();
    renderHistorico();
    renderCategorias();
    renderDespesasFixas();
    document.getElementById('input-meta-mensal').value = state.metaMensal;
}

function configurarDataAtual() {
    const hoje = new Date().toISOString().split('T')[0];
    const mesAno = hoje.substring(0, 7);
    
    document.getElementById('manual-data').value = hoje;
    document.getElementById('filtro-mes-ano').value = mesAno;
}

// --- CONTROLE DE ABAS ---
function configurarAbas() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(`tab-${targetTab}`).classList.add('active');

            if (targetTab === 'dashboard') {
                setTimeout(renderGraficos, 100);
            }
        });
    });
}

function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor || 0);
}

// ==========================================================================
// MÓDULO DE ORÇAMENTO E ALERTA DE META ULTRAPASSADA (VERMELHO)
// ==========================================================================
function renderOrcamentoEDashboard() {
    const mesAnoAtual = document.getElementById('filtro-mes-ano').value || new Date().toISOString().substring(0, 7);
    const [ano, mes] = mesAnoAtual.split('-');
    
    // Nome por extenso do mês
    const nomeMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const nomeMesExtenso = nomeMeses[parseInt(mes) - 1] || "Mês Atual";
    document.getElementById('current-month-lbl').textContent = `${nomeMesExtenso} / ${ano}`;

    // Filtrar compras do mês atual selecionado
    const comprasDoMes = state.compras.filter(comp => comp.data && comp.data.startsWith(mesAnoAtual));
    const gastoTotalMes = comprasDoMes.reduce((acc, comp) => acc + (parseFloat(comp.valorTotal) || 0), 0);
    const meta = parseFloat(state.metaMensal) || 0;
    const saldo = meta - gastoTotalMes;
    
    const pctAtingido = meta > 0 ? (gastoTotalMes / meta) * 100 : 0;

    // Atualizar valores na tela
    document.getElementById('header-meta-val').textContent = formatarMoeda(meta);
    document.getElementById('dash-meta-val').textContent = formatarMoeda(meta);
    document.getElementById('dash-gasto-val').textContent = formatarMoeda(gastoTotalMes);

    const saldoLbl = document.getElementById('dash-saldo-lbl');
    const saldoVal = document.getElementById('dash-saldo-val');
    
    if (saldo < 0) {
        saldoLbl.textContent = "Excesso / Estouro";
        saldoVal.textContent = formatarMoeda(Math.abs(saldo));
        saldoVal.className = "stat-value text-danger";
    } else {
        saldoLbl.textContent = "Saldo Restante";
        saldoVal.textContent = formatarMoeda(saldo);
        saldoVal.className = "stat-value text-success";
    }

    // BARRA DE PROGRESSO & ALERTA VERMELHO DINÂMICO
    const progressBar = document.getElementById('dash-progress-bar');
    const progressPctText = document.getElementById('dash-progress-pct');
    const alertBanner = document.getElementById('budget-alert-banner');
    
    const pctExibicao = Math.min(Math.round(pctAtingido), 100);
    progressBar.style.width = `${pctExibicao}%`;
    progressPctText.textContent = `${Math.round(pctAtingido)}%`;

    if (gastoTotalMes > meta && meta > 0) {
        // META ULTRAPASSADA! ATIVA COR VERMELHA PISCANTE E ALERTA!
        progressBar.className = "progress-bar-fill exceeded";
        progressPctText.className = "text-danger";
        
        alertBanner.style.display = 'flex';
        document.getElementById('alert-title').textContent = `⚠️ ATENÇÃO: Meta Ultrapassada em ${formatarMoeda(Math.abs(saldo))}!`;
        document.getElementById('alert-desc').textContent = `Seus gastos acumulados no mês (${formatarMoeda(gastoTotalMes)}) superaram o limite estipulado de ${formatarMoeda(meta)}.`;
    } else if (pctAtingido >= 80) {
        // Alerta Amarelo (Aproximando da meta)
        progressBar.className = "progress-bar-fill";
        progressBar.style.backgroundColor = "var(--color-warning)";
        progressPctText.className = "text-warning";
        alertBanner.style.display = 'none';
    } else {
        // Tudo seguro em Verde/Azul
        progressBar.className = "progress-bar-fill";
        progressBar.style.backgroundColor = "var(--color-success)";
        progressPctText.className = "text-success";
        alertBanner.style.display = 'none';
    }

    // KPI CARDS
    document.getElementById('kpi-compras-count').textContent = comprasDoMes.length;
    
    const maiorCompra = comprasDoMes.length > 0 ? Math.max(...comprasDoMes.map(c => c.valorTotal)) : 0;
    document.getElementById('kpi-maior-compra').textContent = formatarMoeda(maiorCompra);

    // Maior Categoria de Gasto
    const gastosPorCat = {};
    comprasDoMes.forEach(c => {
        gastosPorCat[c.categoriaId] = (gastosPorCat[c.categoriaId] || 0) + c.valorTotal;
    });

    let maiorCatId = null;
    let maiorCatVal = 0;
    Object.keys(gastosPorCat).forEach(catId => {
        if (gastosPorCat[catId] > maiorCatVal) {
            maiorCatVal = gastosPorCat[catId];
            maiorCatId = catId;
        }
    });

    const catObj = state.categorias.find(c => c.id === maiorCatId);
    document.getElementById('kpi-maior-categoria').textContent = catObj ? `${catObj.nome} (${formatarMoeda(maiorCatVal)})` : '-';

    renderGraficos();
}

// ==========================================================================
// GRÁFICOS INTERATIVOS (CHART.JS)
// ==========================================================================
function renderGraficos() {
    if (typeof Chart === 'undefined') return;

    const mesAnoAtual = document.getElementById('filtro-mes-ano').value || new Date().toISOString().substring(0, 7);
    const comprasDoMes = state.compras.filter(comp => comp.data && comp.data.startsWith(mesAnoAtual));

    // 1. Gráfico por Categoria (Rosca)
    const ctxCat = document.getElementById('chart-categorias').getContext('2d');
    
    const catLabels = [];
    const catValores = [];
    const catCores = [];

    state.categorias.forEach(cat => {
        const totalCat = comprasDoMes.filter(c => c.categoriaId === cat.id).reduce((acc, c) => acc + c.valorTotal, 0);
        if (totalCat > 0) {
            catLabels.push(cat.nome);
            catValores.push(totalCat);
            catCores.push(cat.cor || "#2563eb");
        }
    });

    if (chartCategoriasInstance) chartCategoriasInstance.destroy();

    chartCategoriasInstance = new Chart(ctxCat, {
        type: 'doughnut',
        data: {
            labels: catLabels.length > 0 ? catLabels : ['Sem compras'],
            datasets: [{
                data: catValores.length > 0 ? catValores : [1],
                backgroundColor: catCores.length > 0 ? catCores : ['#e2e8f0']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });

    // 2. Gráfico de Evolução de Gastos vs Meta
    const ctxHist = document.getElementById('chart-historico-meses').getContext('2d');
    
    // Obter os últimos 6 meses
    const labelsMeses = [];
    const valoresMeses = [];
    const metaMeses = [];

    for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        const key = d.toISOString().substring(0, 7);
        const nomeMes = d.toLocaleDateString('pt-BR', { month: 'short' });
        
        const gasto = state.compras.filter(c => c.data && c.data.startsWith(key)).reduce((acc, c) => acc + c.valorTotal, 0);
        
        labelsMeses.push(nomeMes);
        valoresMeses.push(gasto);
        metaMeses.push(state.metaMensal);
    }

    if (chartHistoricoInstance) chartHistoricoInstance.destroy();

    chartHistoricoInstance = new Chart(ctxHist, {
        type: 'bar',
        data: {
            labels: labelsMeses,
            datasets: [
                {
                    label: 'Gastos Reais (R$)',
                    data: valoresMeses,
                    backgroundColor: valoresMeses.map(v => v > state.metaMensal ? '#ef4444' : '#2563eb')
                },
                {
                    label: 'Meta (R$)',
                    data: metaMeses,
                    type: 'line',
                    borderColor: '#10b981',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// ==========================================================================
// IMPORTAÇÃO DE NOTAS FISCAIS & ENTRADA MANUAL
// ==========================================================================
function configurarListeners() {
    // Alternância de modo
    document.getElementById('btn-mode-nfe').addEventListener('click', () => alternarModoCompra('nfe'));
    document.getElementById('btn-mode-manual').addEventListener('click', () => alternarModoCompra('manual'));
    document.getElementById('btn-mode-fixas').addEventListener('click', () => alternarModoCompra('fixas'));
    if (document.getElementById('btn-mode-texto')) {
        document.getElementById('btn-mode-texto').addEventListener('click', () => alternarModoCompra('texto'));
    }

    // Processar NF-e
    document.getElementById('btn-importar-nfe').addEventListener('click', processarNfeEntrada);
    document.getElementById('nfe-url-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            processarNfeEntrada();
        }
    });

    // Processar Texto do Cupom
    if (document.getElementById('btn-processar-texto-cupom')) {
        document.getElementById('btn-processar-texto-cupom').addEventListener('click', processarTextoCupomFiscal);
    }
    if (document.getElementById('btn-add-item-conf')) {
        document.getElementById('btn-add-item-conf').addEventListener('click', adicionarItemEmBrancoConferencia);
    }

    // Scanner de Câmera
    document.getElementById('btn-abrir-camera').addEventListener('click', iniciarScannerCamera);
    document.getElementById('btn-fechar-camera').addEventListener('click', pararScannerCamera);

    // Submissão Manual
    document.getElementById('form-compra-manual').addEventListener('submit', salvarCompraManual);

    // Despesas Fixas Padrão
    document.getElementById('form-despesa-fixa-nova').addEventListener('submit', cadastrarNovaDespesaFixa);
    document.getElementById('btn-lancar-todas-fixas').addEventListener('click', lancarTodasDespesasFixasNoMes);

    // Confirmação de Nota Fiscal
    document.getElementById('btn-confirmar-salvar-nfe').addEventListener('click', salvarCompraNfeConferida);
    document.getElementById('btn-cancelar-conf').addEventListener('click', () => {
        document.getElementById('card-conferencia-nfe').style.display = 'none';
    });

    // Filtros do histórico
    document.getElementById('filtro-mes-ano').addEventListener('change', atualizarUI);
    document.getElementById('filtro-categoria').addEventListener('change', renderHistorico);
    document.getElementById('filtro-busca-texto').addEventListener('input', renderHistorico);

    // Meta e Categorias
    document.getElementById('form-meta-mensal').addEventListener('submit', salvarNovaMeta);
    document.getElementById('form-categoria-nova').addEventListener('submit', cadastrarNovaCategoria);

    // Modais
    document.getElementById('btn-fechar-modal-detalhes').addEventListener('click', fecharModalDetalhes);
    document.getElementById('btn-fechar-modal-detalhes-btn').addEventListener('click', fecharModalDetalhes);
    document.getElementById('btn-exportar-relatorio').addEventListener('click', exportarRelatorio);
}

function alternarModoCompra(modo) {
    const btnNfe = document.getElementById('btn-mode-nfe');
    const btnManual = document.getElementById('btn-mode-manual');
    const btnFixas = document.getElementById('btn-mode-fixas');
    const btnTexto = document.getElementById('btn-mode-texto');
    
    const panelNfe = document.getElementById('panel-nfe-input');
    const panelManual = document.getElementById('panel-manual-input');
    const panelFixas = document.getElementById('panel-fixas-input');
    const panelTexto = document.getElementById('panel-texto-input');

    btnNfe.className = "btn btn-secondary mode-btn";
    btnManual.className = "btn btn-secondary mode-btn";
    btnFixas.className = "btn btn-secondary mode-btn";
    if (btnTexto) btnTexto.className = "btn btn-secondary mode-btn";

    panelNfe.style.display = "none";
    panelManual.style.display = "none";
    panelFixas.style.display = "none";
    if (panelTexto) panelTexto.style.display = "none";

    if (modo === 'nfe') {
        btnNfe.className = "btn btn-primary mode-btn active";
        panelNfe.style.display = "block";
    } else if (modo === 'manual') {
        btnManual.className = "btn btn-primary mode-btn active";
        panelManual.style.display = "block";
    } else if (modo === 'fixas') {
        btnFixas.className = "btn btn-primary mode-btn active";
        panelFixas.style.display = "block";
    } else if (modo === 'texto') {
        if (btnTexto) btnTexto.className = "btn btn-primary mode-btn active";
        if (panelTexto) panelTexto.style.display = "block";
    }
}

async function processarNfeEntrada() {
    const input = document.getElementById('nfe-url-input');
    let url = input.value.trim();
    if (!url) {
        alert("Por favor, informe o link ou chave de acesso da nota fiscal!");
        return;
    }

    // Identica lógica do NOD: Detecta chave de acesso de 44 dígitos na URL ou texto
    const chaveLimpa = url.replace(/\D/g, '');
    let targetUrls = [];

    if (chaveLimpa.length >= 44) {
        const chave44 = chaveLimpa.substring(0, 44);
        const codEstado = chave44.substring(0, 2);
        
        // URL direta da SEFAZ oficial (idêntica ao NOD)
        let urlOficial = `https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx?chNFe=${chave44}`;
        if (codEstado === "35") {
            urlOficial = `https://www.nfce.fazenda.sp.gov.br/NFCePortal/Paginas/ConsultaPublica.aspx?chNFe=${chave44}`;
        } else if (codEstado === "31") {
            urlOficial = `https://portalsped.fazenda.mg.gov.br/portalsped/sistema/consulta.xhtml?chave=${chave44}`;
        } else if (codEstado === "33") {
            urlOficial = `https://www4.fazenda.rj.gov.br/consultaNFCe/QRCode?chNFe=${chave44}`;
        } else if (codEstado === "41") {
            urlOficial = `https://www.fazenda.pr.gov.br/nfce/qrcode?chNFe=${chave44}`;
        } else if (codEstado === "42") {
            urlOficial = `https://sat.sef.sc.gov.br/nfce/consulta?chNFe=${chave44}`;
        }

        targetUrls.push(urlOficial);
        
        // Mantém a URL original de contingência caso seja um link com parâmetro p=
        if (url.includes('http')) {
            let urlFmt = url;
            if (urlFmt.startsWith('http://')) urlFmt = urlFmt.replace('http://', 'https://');
            targetUrls.push(urlFmt);
        }
    } else {
        if (url.startsWith('http://')) url = url.replace('http://', 'https://');
        targetUrls.push(url);
    }

    const loader = document.getElementById('nfe-loading');
    const cardConf = document.getElementById('card-conferencia-nfe');
    
    loader.style.display = 'block';
    cardConf.style.display = 'none';

    let htmlText = "";

    // 1ª Tentativa: Fetch direto (Como o CapacitorHttp está habilitado, no Android ele contorna o CORS exatamente como no NOD)
    for (let targetUrl of targetUrls) {
        try {
            const response = await fetch(targetUrl);
            if (response.ok) {
                const text = await response.text();
                if (text && text.length > 200 && (text.includes('txtNome') || text.includes('tabResult') || text.includes('table-striped') || text.includes('totalNFe'))) {
                    htmlText = text;
                    break;
                }
            }
        } catch (errDirect) {
            console.warn("Fetch direto bloqueado ou falhou:", errDirect);
        }
    }

    // 2ª Tentativa: Proxies CORS de contingência (para execução no navegador Web do PC ou celular)
    if (!htmlText || htmlText.length < 200 || (!htmlText.includes('txtNome') && !htmlText.includes('tabResult'))) {
        for (let targetUrl of targetUrls) {
            const urlClean = targetUrl.replace(/\|/g, '%7C');
            const proxies = [
                `https://api.allorigins.win/raw?url=${encodeURIComponent(urlClean)}`,
                `https://corsproxy.io/?${encodeURIComponent(urlClean)}`,
                `https://thingproxy.freeboard.io/fetch/${urlClean}`
            ];

            for (const proxy of proxies) {
                try {
                    const res = await fetch(proxy);
                    if (res.ok) {
                        const text = await res.text();
                        if (text && text.length > 200 && (text.includes('txtNome') || text.includes('tabResult') || text.includes('table-striped') || text.includes('totalNFe'))) {
                            htmlText = text;
                            break;
                        }
                    }
                } catch (errProxy) {
                    // Tenta o próximo proxy
                }
            }
            if (htmlText) break;
        }
    }

    // Extrair os dados completos da Nota do HTML baixado
    const nfeDados = parseHtmlSefazCompleto(htmlText);
    nfeItensTemporarios = nfeDados.itens;

    loader.style.display = 'none';

    const hoje = new Date().toISOString().split('T')[0];

    if (nfeItensTemporarios.length > 0) {
        // Sucesso total na extração do HTML!
        renderConferenciaNfe();
        
        // Preenche o estabelecimento real, valor total real e data extraídos do HTML
        if (nfeDados.estabelecimento) {
            document.getElementById('conf-estabelecimento').value = nfeDados.estabelecimento;
        }

        // Soma matemática automática de todos os itens extraídos
        const somaItens = nfeItensTemporarios.reduce((acc, it) => acc + (it.subtotal || (it.quantidade * it.precoUnitario)), 0);
        let totalFinal = somaItens;
        if (nfeDados.valorTotalNota > 0 && Math.abs(nfeDados.valorTotalNota - somaItens) < (somaItens * 0.25)) {
            totalFinal = nfeDados.valorTotalNota;
        }
        
        const totalInput = document.getElementById('conf-valor-total-input');
        if (totalInput) {
            totalInput.value = totalFinal > 0 ? totalFinal.toFixed(2) : somaItens.toFixed(2);
        }

        document.getElementById('conf-data').value = nfeDados.dataNota || hoje;

        cardConf.style.display = 'block';
        cardConf.scrollIntoView({ behavior: 'smooth' });
        mostrarToast("Nota fiscal lida com sucesso! Confira os dados e clique em Salvar.", "success");
    } else if (chave44) {
        // Fallback por Chave de 44 dígitos
        const cnpjRaw = chave44.substring(6, 20);
        const numNota = parseInt(chave44.substring(25, 34), 10);
        const nomeEstab = obterNomePorCNPJ(cnpjRaw);

        nfeItensTemporarios = [
            {
                nome: `Cupom Fiscal NFC-e nº ${numNota}`,
                quantidade: 1,
                precoUnitario: 0,
                subtotal: 0
            }
        ];

        renderConferenciaNfe();
        document.getElementById('conf-estabelecimento').value = nomeEstab;
        document.getElementById('conf-data').value = hoje;
        
        cardConf.style.display = 'block';
        cardConf.scrollIntoView({ behavior: 'smooth' });
        mostrarToast("Chave da nota identificada! Informe o valor total e salve.");
    } else {
        alert("Não foi possível ler os dados automáticos desta nota. Por favor, utilize o Lançamento Manual Direto!");
        alternarModoCompra('manual');
    }
}

let html5QrcodeScanner = null;

async function iniciarScannerCamera() {
    const readerContainer = document.getElementById('camera-preview-container');
    const btnIniciar = document.getElementById('btn-abrir-camera');
    const btnParar = document.getElementById('btn-fechar-camera');
    
    readerContainer.style.display = 'block';
    btnIniciar.style.display = 'none';
    btnParar.style.display = 'inline-flex';
    
    if (typeof Html5Qrcode !== 'undefined') {
        html5QrcodeScanner = new Html5Qrcode("camera-reader");
        
        const qrCodeSuccessCallback = (decodedText) => {
            document.getElementById('nfe-url-input').value = decodedText;
            pararScannerCamera();
            mostrarToast("QR Code escaneado com sucesso!");
            processarNfeEntrada();
        };
        
        const config = { fps: 10, qrbox: { width: 220, height: 220 } };
        
        html5QrcodeScanner.start(
            { facingMode: "environment" },
            config,
            qrCodeSuccessCallback,
            () => {}
        ).catch(err => {
            console.error("Erro ao iniciar câmera:", err);
            alert("Não foi possível acessar a câmera do dispositivo. Verifique as permissões de acesso à câmera do seu navegador ou aplicativo!");
            pararScannerCamera();
        });
    } else {
        alert("Erro: O leitor de câmera ainda está carregando ou você está offline sem internet. Verifique sua conexão com a internet!");
        pararScannerCamera();
    }
}

function pararScannerCamera() {
    const readerContainer = document.getElementById('camera-preview-container');
    const btnIniciar = document.getElementById('btn-abrir-camera');
    const btnParar = document.getElementById('btn-fechar-camera');
    
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

// Mapeador auxiliar de CNPJs de Grandes Redes de Supermercados e Lojas
function obterNomePorCNPJ(cnpj) {
    if (!cnpj) return "Mercado / Loja";
    const c = cnpj.replace(/\D/g, '');
    if (c.startsWith('01874166')) return "ECONÔMICO ATACADÃO";
    if (c.startsWith('93015006')) return "SUPERMERCADOS ZAFFARI";
    if (c.startsWith('75315333') || c.startsWith('45543915')) return "CARREFOUR";
    if (c.startsWith('06057223') || c.startsWith('00776574')) return "PANVEL FARMÁCIAS";
    if (c.startsWith('92664028')) return "FARMÁCIAS SÃO JOÃO";
    if (c.startsWith('10860590')) return "ATACADÃO S.A.";
    if (c.startsWith('00360305')) return "WALMART / BIG";
    
    if (c.length === 14) {
        const cnpjFmt = `${c.substring(0,2)}.${c.substring(2,5)}.${c.substring(5,8)}/${c.substring(8,12)}-${c.substring(12,14)}`;
        return `Mercado (CNPJ ${cnpjFmt})`;
    }
    return "Mercado / Loja";
}

// Conversor inteligente de números e moedas brasileiras da SEFAZ (ex: 16,59 ou 1.283,64 de "Vl. Unit.: 16,59")
function extrairNumeroSEFAZ(str) {
    if (!str) return 0;
    // Busca sequências numéricas no formato brasileiro (ex: 16,59 ou 1.283,64 ou 16.59) ignorando os pontos de "Vl." ou "Unit."
    const match = str.match(/\d+(?:\.\d+)*(?:,\d+)?/) || str.match(/\d+(?:,\d+)?/);
    if (!match) return 0;
    let s = match[0];
    if (s.includes(',')) {
        s = s.replace(/\./g, '').replace(',', '.');
    }
    return parseFloat(s) || 0;
}

function parseMoedaBR(str) {
    return extrairNumeroSEFAZ(str);
}

// Parser completo do HTML do cupom fiscal da SEFAZ / SVRS
function parseHtmlSefazCompleto(htmlText) {
    if (!htmlText) return { estabelecimento: "", dataNota: "", valorTotalNota: 0, descontoNota: 0, itens: [] };

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    let itens = [];
    let estabelecimento = "";
    let valorTotalNota = 0;
    let descontoNota = 0;
    let dataNota = "";

    // 1. Extração do Nome do Estabelecimento/Mercado (Ignorando títulos genéricos de Documento Auxiliar)
    const titulos = doc.querySelectorAll('.txtCenter .txtTit, #Header .txtTit, .tit, .txtBox .txtTit, #conteudo .txtTit, .txtTop, div[class*="txtTit"], #nfeHeader .txtTit');
    for (let el of titulos) {
        const txt = el.textContent.trim().replace(/\s+/g, ' ');
        if (txt && !txt.toUpperCase().includes("DOCUMENTO AUXILIAR") && !txt.toUpperCase().includes("NOTA FISCAL") && !txt.toUpperCase().includes("NFC-E") && !txt.toUpperCase().includes("DANFE")) {
            estabelecimento = txt;
            break;
        }
    }
    if (!estabelecimento && titulos.length > 0) {
        estabelecimento = titulos[0].textContent.trim().replace(/\s+/g, ' ');
    }

    // 2. Extração de Descontos e Valor a Pagar Real da Nota
    const descEl = doc.querySelector('.vDesc, #totalNota .vDesc, .txtValDesc');
    if (descEl) {
        descontoNota = extrairNumeroSEFAZ(descEl.textContent);
    } else {
        const textoDoc = doc.body ? doc.body.textContent : "";
        const matchDesc = textoDoc.match(/Desconto(?:s)?\s*R?\$?\s*:?\s*([\d\.,]+)/i);
        if (matchDesc) descontoNota = extrairNumeroSEFAZ(matchDesc[1]);
    }

    const totalEl = doc.querySelector('.totalNFe .txtMax, .txtValTotal, #totalNota .txtMax, .vPag, .vTot');
    if (totalEl && !totalEl.textContent.toLowerCase().includes('qtd') && !totalEl.textContent.toLowerCase().includes('item')) {
        valorTotalNota = extrairNumeroSEFAZ(totalEl.textContent);
    }
    
    if (valorTotalNota === 0 || (itens.length > 0 && valorTotalNota === itens.length)) {
        const textoCompleto = doc.body ? doc.body.textContent : "";
        const matchTotalText = textoCompleto.match(/(?:Valor\s+a\s+Pagar|VALOR\s+PAGO|VALOR\s+TOTAL\s*R?\$?|TOTAL\s*R?\$?)\s*:?\s*R?\$?\s*([\d\.,]+)/i);
        if (matchTotalText) {
            const valExt = extrairNumeroSEFAZ(matchTotalText[1]);
            if (valExt > 0 && valExt !== itens.length) {
                valorTotalNota = valExt;
            }
        }
    }

    // 3. Extração da Data da Nota
    const textoDoc = doc.body ? doc.body.textContent : "";
    const dataMatch = textoDoc.match(/Emissão:\s*(\d{2}\/\d{2}\/\d{4})/i) || textoDoc.match(/(\d{2}\/\d{2}\/\d{4})/);
    if (dataMatch) {
        const parts = dataMatch[1].split('/');
        dataNota = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    // 4. Extração dos Itens da Tabela da SEFAZ
    const rows = doc.querySelectorAll('table[id^="tabResult"] tr, #tabResult tr, .table tr, .table-striped tr, table.trItem, tr[id^="Item"]');
    
    if (rows.length === 0) {
        const nomes = doc.querySelectorAll('.txtNome, .txtTit');
        const qtds = doc.querySelectorAll('.Rqtd, .qtd');
        const vals = doc.querySelectorAll('.RvalUnit, .RvlUnit, .vItem, .txtValUnit');
        
        for (let i = 0; i < nomes.length; i++) {
            const nome = nomes[i].textContent.trim();
            const qtdText = qtds[i] ? qtds[i].textContent.trim() : '1';
            const valText = vals[i] ? vals[i].textContent.trim() : '0';
            
            const qtd = extrairNumeroSEFAZ(qtdText) || 1;
            const val = extrairNumeroSEFAZ(valText);
            
            if (nome && !nome.toLowerCase().includes('total') && !nome.toLowerCase().includes('cnpj')) {
                itens.push({ nome: nome.replace(/\s+/g, ' '), quantidade: qtd, precoUnitario: val, subtotal: qtd * val });
            }
        }
    } else {
        rows.forEach(row => {
            const nomeEl = row.querySelector('.txtNome, .txtTit, .fixo-txt-tit');
            if (nomeEl) {
                const nomeItem = nomeEl.textContent.trim().replace(/\s+/g, ' ');
                if (!nomeItem || nomeItem.toUpperCase().includes("DOCUMENTO AUXILIAR") || nomeItem.toLowerCase() === "item") {
                    return;
                }

                const qtdEl = row.querySelector('.Rqtd, .qtd');
                const valEl = row.querySelector('.RvalUnit, .RvlUnit, .txtValUnit');
                const subEl = row.querySelector('.vItem, .RvlTot, .vTot, .RvalTotal');
                
                let qtdText = qtdEl ? qtdEl.textContent : (row.textContent.match(/Qtde\.?:?\s*([\d\.,]+)/i)?.[1] || '1');
                let valText = valEl ? valEl.textContent : (row.textContent.match(/Vl\.?\s*Unit\.?:?\s*([\d\.,]+)/i)?.[1] || '0');
                let subText = subEl ? subEl.textContent : (row.textContent.match(/Vl\.?\s*Total:?\s*([\d\.,]+)/i)?.[1] || '0');
                
                let quantidade = extrairNumeroSEFAZ(qtdText) || 1;
                let precoUnitario = extrairNumeroSEFAZ(valText);
                let subtotal = extrairNumeroSEFAZ(subText);

                if (subtotal === 0 && precoUnitario > 0) subtotal = quantidade * precoUnitario;
                if (precoUnitario === 0 && subtotal > 0 && quantidade > 0) precoUnitario = subtotal / quantidade;
                
                itens.push({
                    nome: nomeItem,
                    quantidade,
                    precoUnitario,
                    subtotal: subtotal || (quantidade * precoUnitario)
                });
            }
        });
    }

    // Calcula a soma bruta dos itens
    const somaMonetaria = itens.reduce((acc, it) => acc + (it.subtotal || 0), 0);
    
    // Se houve desconto global na nota (ex: Total Bruto 300, Desconto 16.36, Valor a Pagar 283.64)
    if (descontoNota > 0 && valorTotalNota === 0) {
        valorTotalNota = Math.max(0, somaMonetaria - descontoNota);
    } else if (valorTotalNota === 0 || valorTotalNota === itens.length) {
        valorTotalNota = somaMonetaria;
    }
    
    return { estabelecimento, dataNota, valorTotalNota: valorTotalNota || somaMonetaria, descontoNota, itens };
}

function renderConferenciaNfe() {
    const tbody = document.getElementById('conf-nfe-table-body');
    tbody.innerHTML = '';

    let valorTotalNota = 0;

    nfeItensTemporarios.forEach((item, index) => {
        const subtotal = item.subtotal || (item.quantidade * item.precoUnitario);
        valorTotalNota += subtotal;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <input type="text" class="conf-item-nome" data-index="${index}" value="${item.nome}" style="min-width: 160px; width: 100%; border: 1px solid var(--color-border); padding: 0.35rem 0.5rem; border-radius: 4px;">
            </td>
            <td>
                <input type="number" class="conf-item-qtd" data-index="${index}" value="${item.quantidade}" step="0.001" min="0.001" style="width: 70px; border: 1px solid var(--color-border); padding: 0.35rem 0.5rem; border-radius: 4px;">
            </td>
            <td>
                <input type="number" class="conf-item-preco" data-index="${index}" value="${item.precoUnitario}" step="0.01" min="0" style="width: 85px; border: 1px solid var(--color-border); padding: 0.35rem 0.5rem; border-radius: 4px;">
            </td>
            <td>
                <strong class="conf-item-subtotal" data-index="${index}">${formatarMoeda(subtotal)}</strong>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('conf-total-itens').textContent = nfeItensTemporarios.length;
    
    const totalInput = document.getElementById('conf-valor-total-input');
    if (totalInput) {
        totalInput.value = valorTotalNota > 0 ? valorTotalNota.toFixed(2) : '';
        totalInput.oninput = (e) => {
            const val = parseFloat(e.target.value) || 0;
            if (nfeItensTemporarios.length === 1) {
                nfeItensTemporarios[0].precoUnitario = val;
                nfeItensTemporarios[0].subtotal = val;
                const subEl = document.querySelector('.conf-item-subtotal[data-index="0"]');
                const precoInp = document.querySelector('.conf-item-preco[data-index="0"]');
                if (subEl) subEl.textContent = formatarMoeda(val);
                if (precoInp) precoInp.value = val;
            }
        };
    }

    // Event Listeners para atualização dinâmica dos cálculos ao digitar
    document.querySelectorAll('.conf-item-qtd, .conf-item-preco').forEach(input => {
        input.addEventListener('input', recalcularTotaisConferencia);
    });

    document.querySelectorAll('.conf-item-nome').forEach(input => {
        input.addEventListener('change', (e) => {
            const idx = parseInt(e.target.dataset.index, 10);
            if (nfeItensTemporarios[idx]) nfeItensTemporarios[idx].nome = e.target.value;
        });
    });
}

function adicionarItemEmBrancoConferencia() {
    nfeItensTemporarios.push({
        nome: "Novo Produto",
        quantidade: 1,
        precoUnitario: 0,
        subtotal: 0
    });
    renderConferenciaNfe();
}

function processarTextoCupomFiscal() {
    const texto = document.getElementById('texto-cupom-input').value.trim();
    if (!texto) {
        alert("Por favor, cole o texto do cupom fiscal.");
        return;
    }

    const linhas = texto.split('\n');
    let itensLidos = [];
    let valorTotalCupom = 0;
    let nomeLojaDetectada = "ECONÔMICO ATACADÃO";

    if (texto.toLowerCase().includes('zaffari')) {
        nomeLojaDetectada = "SUPERMERCADOS ZAFFARI";
    } else if (texto.toLowerCase().includes('carrefour')) {
        nomeLojaDetectada = "CARREFOUR";
    }

    const totalMatch = texto.match(/(?:Valor a Pagar|TOTAL|VALOR PAGO)\s*R?\$?\s*([\d\.,]+)/i);
    if (totalMatch) {
        valorTotalCupom = parseMoedaBR(totalMatch[1]);
    }

    linhas.forEach(linha => {
        linha = linha.trim();
        if (!linha || linha.toLowerCase().includes('subtotal') || linha.toLowerCase().includes('desconto')) return;

        const matchLinha = linha.match(/(?:\d{8,14}\s+)?([A-Z0-9\.\s\/\-%\+]{3,40})\s+(\d+(?:[.,]\d+)?)\s*(?:UN|KG|G|ML|L)?\s+([\d\.,]+)\s+([\d\.,]+)/i);
        if (matchLinha) {
            const nome = matchLinha[1].trim();
            const qtd = parseMoedaBR(matchLinha[2]) || 1;
            const sub = parseMoedaBR(matchLinha[4]);
            const preco = sub > 0 ? sub / qtd : parseMoedaBR(matchLinha[3]);
            itensLidos.push({ nome, quantidade: qtd, precoUnitario: preco, subtotal: sub || (qtd * preco) });
        }
    });

    const hoje = new Date().toISOString().split('T')[0];

    if (itensLidos.length > 0) {
        nfeItensTemporarios = itensLidos;
        renderConferenciaNfe();
        document.getElementById('conf-estabelecimento').value = nomeLojaDetectada;
        document.getElementById('conf-data').value = hoje;
        if (valorTotalCupom > 0) {
            const inp = document.getElementById('conf-valor-total-input');
            if (inp) inp.value = valorTotalCupom.toFixed(2);
        }
        document.getElementById('card-conferencia-nfe').style.display = 'block';
        document.getElementById('card-conferencia-nfe').scrollIntoView({ behavior: 'smooth' });
        mostrarToast(`${itensLidos.length} itens extraídos do texto do cupom!`);
    } else {
        alert("Não conseguimos extrair itens automaticamente do texto colado. Use o botão '+ Adicionar Produto' para inserir os produtos na tabela!");
    }
}

function recalcularTotaisConferencia() {
    let novoTotal = 0;
    nfeItensTemporarios.forEach((item, index) => {
        const qtdInput = document.querySelector(`.conf-item-qtd[data-index="${index}"]`);
        const precoInput = document.querySelector(`.conf-item-preco[data-index="${index}"]`);
        const subtotalEl = document.querySelector(`.conf-item-subtotal[data-index="${index}"]`);

        if (qtdInput && precoInput) {
            const q = parseFloat(qtdInput.value) || 0;
            const p = parseFloat(precoInput.value) || 0;
            const sub = q * p;
            
            item.quantidade = q;
            item.precoUnitario = p;
            item.subtotal = sub;
            
            novoTotal += sub;
            if (subtotalEl) subtotalEl.textContent = formatarMoeda(sub);
        }
    });

    const totalInput = document.getElementById('conf-valor-total-input');
    if (totalInput && novoTotal > 0) {
        totalInput.value = novoTotal.toFixed(2);
    }
}

function salvarCompraNfeConferida() {
    const estabelecimento = document.getElementById('conf-estabelecimento').value.trim() || "Mercado";
    const dataInput = document.getElementById('conf-data').value;
    const data = (dataInput && dataInput.trim()) ? dataInput.trim() : new Date().toISOString().split('T')[0];
    const categoriaId = document.getElementById('conf-categoria-padrao').value || (state.categorias[0] ? state.categorias[0].id : "c1");
    
    // Atualiza itens com o formulário de conferência
    nfeItensTemporarios.forEach((item, index) => {
        const nomeInp = document.querySelector(`.conf-item-nome[data-index="${index}"]`);
        const qtdInp = document.querySelector(`.conf-item-qtd[data-index="${index}"]`);
        const precoInp = document.querySelector(`.conf-item-preco[data-index="${index}"]`);
        
        if (nomeInp && nomeInp.value.trim()) item.nome = nomeInp.value.trim();
        if (qtdInp) item.quantidade = parseFloat(qtdInp.value) || 1;
        if (precoInp) item.precoUnitario = parseFloat(precoInp.value) || 0;
        item.subtotal = item.quantidade * item.precoUnitario;
    });

    const totalInputVal = parseFloat(document.getElementById('conf-valor-total-input').value);
    const valorCalculado = nfeItensTemporarios.reduce((acc, item) => acc + (item.subtotal || 0), 0);
    let valorTotal = !isNaN(totalInputVal) && totalInputVal > 0 ? totalInputVal : valorCalculado;

    // Proteção: Se por qualquer motivo o total for igual à quantidade de itens e houver soma monetária real, usa a soma dos produtos
    if (valorCalculado > 0 && (valorTotal === nfeItensTemporarios.length || isNaN(valorTotal) || valorTotal <= 0)) {
        valorTotal = valorCalculado;
    }

    if (isNaN(valorTotal) || valorTotal <= 0) {
        alert("Por favor, preencha o Valor Total da Nota antes de confirmar.");
        return;
    }

    if (nfeItensTemporarios.length === 1 && (nfeItensTemporarios[0].subtotal === 0 || nfeItensTemporarios[0].precoUnitario === 0)) {
        nfeItensTemporarios[0].precoUnitario = valorTotal;
        nfeItensTemporarios[0].subtotal = valorTotal;
    }

    const novaCompra = {
        id: "comp_" + Date.now(),
        estabelecimento,
        data,
        categoriaId,
        valorTotal,
        observacao: `Nota Fiscal importada (${nfeItensTemporarios.length} itens)`,
        itens: [...nfeItensTemporarios]
    };

    state.compras.push(novaCompra);
    
    // Ajusta o filtro de mês do Dashboard/Histórico para o mês da nota salva
    if (data && data.length >= 7) {
        const filtroMes = document.getElementById('filtro-mes-ano');
        if (filtroMes) filtroMes.value = data.substring(0, 7);
    }

    salvarEstado();

    document.getElementById('card-conferencia-nfe').style.display = 'none';
    document.getElementById('nfe-url-input').value = '';
    mostrarToast("Compra importada e salva com sucesso!", "success");

    // Volta para o Dashboard
    document.querySelector('.tab-btn[data-tab="dashboard"]').click();
}

function salvarCompraManual(e) {
    e.preventDefault();

    const estabelecimento = document.getElementById('manual-estabelecimento').value.trim();
    const dataInput = document.getElementById('manual-data').value;
    const data = (dataInput && dataInput.trim()) ? dataInput.trim() : new Date().toISOString().split('T')[0];
    const categoriaId = document.getElementById('manual-categoria').value;
    const valorTotal = parseFloat(document.getElementById('manual-valor-total').value) || 0;
    const observacao = document.getElementById('manual-observacao').value.trim();

    const novaCompra = {
        id: "comp_" + Date.now(),
        estabelecimento,
        data,
        categoriaId,
        valorTotal,
        observacao,
        itens: [{ nome: observacao || "Lançamento Manual", quantidade: 1, precoUnitario: valorTotal, subtotal: valorTotal }]
    };

    state.compras.push(novaCompra);

    if (data && data.length >= 7) {
        const filtroMes = document.getElementById('filtro-mes-ano');
        if (filtroMes) filtroMes.value = data.substring(0, 7);
    }

    salvarEstado();

    document.getElementById('form-compra-manual').reset();
    configurarDataAtual();
    mostrarToast("Compra salva com sucesso!");

    // Volta para o Dashboard
    document.querySelector('.tab-btn[data-tab="dashboard"]').click();
}

// ==========================================================================
// HISTÓRICO & EXCLUSÃO
// ==========================================================================
function renderHistorico() {
    const tbody = document.getElementById('historico-table-body');
    tbody.innerHTML = '';

    const mesAnoFiltro = document.getElementById('filtro-mes-ano').value;
    const catFiltro = document.getElementById('filtro-categoria').value;
    const buscaTexto = document.getElementById('filtro-busca-texto').value.toLowerCase().trim();

    let comprasFiltradas = state.compras.filter(comp => {
        if (mesAnoFiltro && (!comp.data || !comp.data.startsWith(mesAnoFiltro))) return false;
        if (catFiltro && comp.categoriaId !== catFiltro) return false;
        if (buscaTexto) {
            const noEstab = comp.estabelecimento.toLowerCase().includes(buscaTexto);
            const naObs = (comp.observacao || '').toLowerCase().includes(buscaTexto);
            if (!noEstab && !naObs) return false;
        }
        return true;
    });

    // Ordenar por data decrescente
    comprasFiltradas.sort((a, b) => new Date(b.data) - new Date(a.data));

    if (comprasFiltradas.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; color: var(--color-text-secondary); padding: 1.5rem;">Nenhuma compra registrada para os filtros selecionados.</td>
            </tr>
        `;
        return;
    }

    comprasFiltradas.forEach(comp => {
        const catObj = state.categorias.find(c => c.id === comp.categoriaId);
        const dataFmt = comp.data ? comp.data.split('-').reverse().join('/') : '-';
        const numItens = comp.itens ? comp.itens.length : 1;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${dataFmt}</td>
            <td><strong>${comp.estabelecimento}</strong><br><small style="color: var(--color-text-secondary);">${comp.observacao || ''}</small></td>
            <td>
                <span class="month-pill" style="background-color: ${catObj ? catObj.cor + '22' : '#eee'}; color: ${catObj ? catObj.cor : '#333'}; border: 1px solid ${catObj ? catObj.cor : '#ccc'};">
                    ${catObj ? catObj.nome : 'Sem Categoria'}
                </span>
            </td>
            <td style="text-align: center;">${numItens}</td>
            <td><strong class="text-primary">${formatarMoeda(comp.valorTotal)}</strong></td>
            <td style="text-align: center;">
                <div style="display: flex; gap: 4px; justify-content: center;">
                    <button class="btn btn-secondary btn-sm ver-detalhes-btn" data-id="${comp.id}">👁️ Ver</button>
                    <button class="btn btn-danger btn-sm deletar-compra-btn" data-id="${comp.id}">🗑️ Excluir</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.querySelectorAll('.ver-detalhes-btn').forEach(b => {
        b.addEventListener('click', (e) => abrirModalDetalhes(e.currentTarget.dataset.id));
    });

    document.querySelectorAll('.deletar-compra-btn').forEach(b => {
        b.addEventListener('click', (e) => deletarCompra(e.currentTarget.dataset.id));
    });
}

function abrirModalDetalhes(id) {
    const comp = state.compras.find(c => c.id === id);
    if (!comp) return;

    const catObj = state.categorias.find(c => c.id === comp.categoriaId);
    const dataFmt = comp.data ? comp.data.split('-').reverse().join('/') : '-';

    document.getElementById('modal-detalhes-titulo').textContent = comp.estabelecimento;
    document.getElementById('modal-detalhes-meta').innerHTML = `
        <p><strong>Data:</strong> ${dataFmt} | <strong>Categoria:</strong> ${catObj ? catObj.nome : 'Sem Categoria'}</p>
        <p><strong>Valor Total:</strong> <span class="text-primary" style="font-weight: bold; font-size: 1.1rem;">${formatarMoeda(comp.valorTotal)}</span></p>
    `;

    const tbody = document.getElementById('modal-detalhes-table-body');
    tbody.innerHTML = '';

    (comp.itens || []).forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.quantidade}</td>
            <td>${formatarMoeda(item.precoUnitario)}</td>
            <td><strong>${formatarMoeda(item.subtotal || (item.quantidade * item.precoUnitario))}</strong></td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('compra-detalhes-modal').style.display = 'flex';
}

function fecharModalDetalhes() {
    document.getElementById('compra-detalhes-modal').style.display = 'none';
}

function deletarCompra(id) {
    if (confirm("Deseja realmente excluir este registro de compra?")) {
        state.compras = state.compras.filter(c => c.id !== id);
        salvarEstado();
        mostrarToast("Compra excluída com sucesso.", "warning");
    }
}

// ==========================================================================
// METAS & CATEGORIAS
// ==========================================================================
function salvarNovaMeta(e) {
    e.preventDefault();
    const novaMeta = parseFloat(document.getElementById('input-meta-mensal').value);
    if (isNaN(novaMeta) || novaMeta <= 0) {
        alert("Por favor, digite um valor de meta válido maior que zero.");
        return;
    }

    state.metaMensal = novaMeta;
    salvarEstado();
    mostrarToast(`Nova meta mensal de ${formatarMoeda(novaMeta)} salva!`);
}

function cadastrarNovaCategoria(e) {
    e.preventDefault();
    const nome = document.getElementById('cat-nome-input').value.trim();
    const cor = document.getElementById('cat-cor-input').value;

    if (!nome) return;

    const novaCat = {
        id: "c_" + Date.now(),
        nome,
        cor
    };

    state.categorias.push(novaCat);
    salvarEstado();

    document.getElementById('form-categoria-nova').reset();
    document.getElementById('cat-cor-input').value = "#2563eb";
    mostrarToast(`Categoria "${nome}" adicionada com sucesso!`);
}

function renderCategorias() {
    const tbody = document.getElementById('categorias-table-body');
    tbody.innerHTML = '';

    state.categorias.forEach(cat => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${cat.nome}</strong></td>
            <td><span style="display: inline-block; width: 20px; height: 20px; background-color: ${cat.cor}; border-radius: 50%; vertical-align: middle;"></span></td>
            <td style="text-align: center;">
                <button class="btn btn-danger btn-sm deletar-cat-btn" data-id="${cat.id}">🗑️ Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.querySelectorAll('.deletar-cat-btn').forEach(b => {
        b.addEventListener('click', (e) => deletarCategoria(e.currentTarget.dataset.id));
    });
}

function deletarCategoria(id) {
    if (state.categorias.length <= 1) {
        alert("O sistema precisa manter pelo menos uma categoria cadastrada.");
        return;
    }
    if (confirm("Deseja excluir esta categoria?")) {
        state.categorias = state.categorias.filter(c => c.id !== id);
        salvarEstado();
        mostrarToast("Categoria excluída com sucesso.");
    }
}

function atualizarDropdownsCategorias() {
    const selectManual = document.getElementById('manual-categoria');
    const selectConf = document.getElementById('conf-categoria-padrao');
    const selectFiltro = document.getElementById('filtro-categoria');

    selectManual.innerHTML = '';
    selectConf.innerHTML = '';
    selectFiltro.innerHTML = '<option value="">Todas as Categorias</option>';

    state.categorias.forEach(cat => {
        const opt1 = document.createElement('option');
        opt1.value = cat.id;
        opt1.textContent = cat.nome;
        selectManual.appendChild(opt1);

        const opt2 = document.createElement('option');
        opt2.value = cat.id;
        opt2.textContent = cat.nome;
        selectConf.appendChild(opt2);

        const opt3 = document.createElement('option');
        opt3.value = cat.id;
        opt3.textContent = cat.nome;
        selectFiltro.appendChild(opt3);
    });

    const selectFixa = document.getElementById('fixa-categoria-input');
    if (selectFixa) {
        selectFixa.innerHTML = '';
        state.categorias.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat.id;
            opt.textContent = cat.nome;
            selectFixa.appendChild(opt);
        });
    }
}

// ==========================================================================
// MÓDULO DE DESPESAS FIXAS PADRÃO (RECORRENTES)
// ==========================================================================
function renderDespesasFixas() {
    // 1. Renderiza os Cards no Painel de Lançamento da aba Nova Compra
    const containerCards = document.getElementById('lista-despesas-fixas-cards');
    if (containerCards) {
        containerCards.innerHTML = '';
        
        if (state.despesasFixas.length === 0) {
            containerCards.innerHTML = '<p style="color: var(--color-text-secondary); padding: 1rem;">Nenhuma despesa fixa cadastrada. Cadastre suas contas na aba Metas & Categorias.</p>';
        } else {
            state.despesasFixas.forEach(df => {
                const catObj = state.categorias.find(c => c.id === df.categoriaId);
                const card = document.createElement('div');
                card.className = "card kpi-card";
                card.style.flexDirection = "column";
                card.style.alignItems = "flex-start";
                card.style.marginBottom = "0";
                
                card.innerHTML = `
                    <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
                        <span class="month-pill" style="background-color: ${catObj ? catObj.cor + '22' : '#eee'}; color: ${catObj ? catObj.cor : '#333'}; font-size: 0.75rem;">
                            ${catObj ? catObj.nome : 'Sem Categoria'}
                        </span>
                        <strong class="text-primary" style="font-size: 1.1rem;">${formatarMoeda(df.valorPadrao)}</strong>
                    </div>
                    <h3 style="font-size: 1.05rem; font-weight: 700; margin: 0.5rem 0;">${df.nome}</h3>
                    <button type="button" class="btn btn-success btn-sm lancar-fixa-btn" data-id="${df.id}" style="width: 100%; margin-top: 0.5rem;">⚡ Lançar no Mês Atual</button>
                `;
                containerCards.appendChild(card);
            });
            
            document.querySelectorAll('.lancar-fixa-btn').forEach(b => {
                b.addEventListener('click', (e) => lancarDespesaFixaNoMes(e.currentTarget.dataset.id));
            });
        }
    }

    // 2. Renderiza a Tabela de Gerenciamento na aba Configurações
    const tbodyConfig = document.getElementById('despesas-fixas-table-body');
    if (tbodyConfig) {
        tbodyConfig.innerHTML = '';
        state.despesasFixas.forEach(df => {
            const catObj = state.categorias.find(c => c.id === df.categoriaId);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${df.nome}</strong></td>
                <td><span class="month-pill" style="background-color: ${catObj ? catObj.cor + '22' : '#eee'}; color: ${catObj ? catObj.cor : '#333'};">${catObj ? catObj.nome : 'Sem Categoria'}</span></td>
                <td><strong class="text-primary">${formatarMoeda(df.valorPadrao)}</strong></td>
                <td style="text-align: center;">
                    <button type="button" class="btn btn-danger btn-sm deletar-fixa-btn" data-id="${df.id}">🗑️ Excluir</button>
                </td>
            `;
            tbodyConfig.appendChild(tr);
        });

        document.querySelectorAll('.deletar-fixa-btn').forEach(b => {
            b.addEventListener('click', (e) => deletarDespesaFixa(e.currentTarget.dataset.id));
        });
    }
}

function lancarDespesaFixaNoMes(id) {
    const df = state.despesasFixas.find(d => d.id === id);
    if (!df) return;

    const hoje = new Date().toISOString().split('T')[0];

    const novaCompra = {
        id: "comp_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
        estabelecimento: df.nome,
        data: hoje,
        categoriaId: df.categoriaId,
        valorTotal: df.valorPadrao,
        observacao: "Despesa Fixa Recorrente Padrão",
        itens: [{ nome: df.nome, quantidade: 1, precoUnitario: df.valorPadrao, subtotal: df.valorPadrao }]
    };

    state.compras.push(novaCompra);
    salvarEstado();
    mostrarToast(`Despesa fixa "${df.nome}" lançada com sucesso no mês atual!`);

    // Redireciona para o Dashboard
    document.querySelector('.tab-btn[data-tab="dashboard"]').click();
}

function lancarTodasDespesasFixasNoMes() {
    if (state.despesasFixas.length === 0) {
        alert("Nenhuma despesa fixa cadastrada para lançar!");
        return;
    }

    if (confirm(`Deseja lançar todas as ${state.despesasFixas.length} despesas fixas padrão no mês atual de uma só vez?`)) {
        const hoje = new Date().toISOString().split('T')[0];
        let totalLancado = 0;

        state.despesasFixas.forEach(df => {
            const novaCompra = {
                id: "comp_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
                estabelecimento: df.nome,
                data: hoje,
                categoriaId: df.categoriaId,
                valorTotal: df.valorPadrao,
                observacao: "Despesa Fixa Recorrente Padrão",
                itens: [{ nome: df.nome, quantidade: 1, precoUnitario: df.valorPadrao, subtotal: df.valorPadrao }]
            };
            state.compras.push(novaCompra);
            totalLancado++;
        });

        salvarEstado();
        mostrarToast(`${totalLancado} despesas fixas lançadas com sucesso no mês!`);
        document.querySelector('.tab-btn[data-tab="dashboard"]').click();
    }
}

function cadastrarNovaDespesaFixa(e) {
    e.preventDefault();
    const nome = document.getElementById('fixa-nome-input').value.trim();
    const categoriaId = document.getElementById('fixa-categoria-input').value;
    const valorPadrao = parseFloat(document.getElementById('fixa-valor-input').value);

    if (!nome || isNaN(valorPadrao) || valorPadrao <= 0) {
        alert("Preencha um nome e valor padrão válidos.");
        return;
    }

    const novaFixa = {
        id: "df_" + Date.now(),
        nome,
        categoriaId,
        valorPadrao
    };

    state.despesasFixas.push(novaFixa);
    salvarEstado();

    document.getElementById('form-despesa-fixa-nova').reset();
    mostrarToast(`Despesa fixa "${nome}" cadastrada como padrão com sucesso!`);
}

function deletarDespesaFixa(id) {
    if (confirm("Deseja realmente excluir esta despesa fixa padrão?")) {
        state.despesasFixas = state.despesasFixas.filter(d => d.id !== id);
        salvarEstado();
        mostrarToast("Despesa fixa excluída com sucesso.");
    }
}

// ==========================================================================
// IMPRESSÃO / EXPORTAÇÃO
// ==========================================================================
function exportarRelatorio() {
    window.print();
}

function mostrarToast(mensagem, tipo = 'success') {
    const toast = document.getElementById('toast');
    const msgSpan = document.getElementById('toast-message');
    msgSpan.textContent = mensagem;
    toast.className = 'toast show';
    
    setTimeout(() => {
        toast.className = 'toast';
    }, 3500);
}
