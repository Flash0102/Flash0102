const CONFIG_DEMO = {
  SHEET_BASE: 'BASE_DEMO',
  SHEET_RESULTADO: 'RESULTADO_DEMO',
  LIMITE_RUPTURA_DIAS: 2,
  LIMITE_ATENCAO_DIAS: 7
};

/**
 * Case demonstrativo de portfólio.
 * Usa somente dados fictícios e pode ser executado em uma planilha Google Sheets.
 */
function executarMonitoramentoRupturaDemo() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const base = ss.getSheetByName(CONFIG_DEMO.SHEET_BASE);

  if (!base) {
    throw new Error(`Crie a aba ${CONFIG_DEMO.SHEET_BASE} e cole nela o CSV de exemplo.`);
  }

  const dados = base.getDataRange().getValues();
  if (dados.length < 2) {
    throw new Error('A base demonstrativa não possui linhas para processar.');
  }

  const cabecalho = dados.shift().map(v => String(v).trim().toLowerCase());
  const idx = mapearColunas_(cabecalho);

  const resultado = dados
    .filter(linha => linha[idx.sku])
    .map(linha => calcularIndicadores_(linha, idx));

  gravarResultado_(ss, resultado);
  Logger.log(JSON.stringify(resumir_(resultado), null, 2));
}

function mapearColunas_(cabecalho) {
  const obrigatorias = [
    'sku', 'produto', 'categoria', 'responsavel', 'unidade',
    'venda_30d', 'estoque', 'custo_unitario'
  ];

  const mapa = {};
  obrigatorias.forEach(nome => {
    const pos = cabecalho.indexOf(nome);
    if (pos === -1) throw new Error(`Coluna obrigatória ausente: ${nome}`);
    mapa[nome] = pos;
  });
  return mapa;
}

function calcularIndicadores_(linha, idx) {
  const venda30d = Number(linha[idx.venda_30d]) || 0;
  const estoque = Number(linha[idx.estoque]) || 0;
  const custo = Number(linha[idx.custo_unitario]) || 0;
  const vendaDia = venda30d / 30;
  const cobertura = vendaDia > 0 ? estoque / vendaDia : 999;

  let status = 'OK';
  if (cobertura < CONFIG_DEMO.LIMITE_RUPTURA_DIAS) status = 'RUPTURA';
  else if (cobertura < CONFIG_DEMO.LIMITE_ATENCAO_DIAS) status = 'ATENCAO';

  return {
    sku: linha[idx.sku],
    produto: linha[idx.produto],
    categoria: linha[idx.categoria],
    responsavel: linha[idx.responsavel],
    unidade: linha[idx.unidade],
    venda30d,
    vendaDia,
    estoque,
    cobertura,
    custo,
    valorEstoque: estoque * custo,
    status
  };
}

function gravarResultado_(ss, resultado) {
  let aba = ss.getSheetByName(CONFIG_DEMO.SHEET_RESULTADO);
  if (!aba) aba = ss.insertSheet(CONFIG_DEMO.SHEET_RESULTADO);
  aba.clearContents();

  const headers = [
    'SKU', 'Produto', 'Categoria', 'Responsável', 'Unidade',
    'Venda 30D', 'Venda/Dia', 'Estoque', 'Cobertura (dias)',
    'Custo Unitário', 'Valor Estoque', 'Status'
  ];

  const linhas = resultado.map(item => [
    item.sku,
    item.produto,
    item.categoria,
    item.responsavel,
    item.unidade,
    item.venda30d,
    item.vendaDia,
    item.estoque,
    item.cobertura,
    item.custo,
    item.valorEstoque,
    item.status
  ]);

  aba.getRange(1, 1, 1, headers.length).setValues([headers]);
  if (linhas.length) {
    aba.getRange(2, 1, linhas.length, headers.length).setValues(linhas);
    aba.getRange(2, 7, linhas.length, 1).setNumberFormat('0.00');
    aba.getRange(2, 9, linhas.length, 1).setNumberFormat('0.00');
    aba.getRange(2, 10, linhas.length, 2).setNumberFormat('R$ #,##0.00');
  }

  aba.setFrozenRows(1);
  aba.autoResizeColumns(1, headers.length);
}

function resumir_(resultado) {
  const total = resultado.length;
  const ruptura = resultado.filter(i => i.status === 'RUPTURA').length;
  const atencao = resultado.filter(i => i.status === 'ATENCAO').length;
  const ok = resultado.filter(i => i.status === 'OK').length;
  const valorEstoque = resultado.reduce((soma, i) => soma + i.valorEstoque, 0);

  return {
    totalSkus: total,
    ruptura,
    atencao,
    ok,
    percentualRuptura: total ? ruptura / total : 0,
    valorEstoque
  };
}
