# Automação de Ruptura e Estoque

Case demonstrativo de automação para consolidar indicadores de estoque e gerar alertas periódicos para apoio à operação.

## Problema

Acompanhamentos manuais de ruptura consomem tempo e podem atrasar a identificação de itens críticos.

## Solução proposta

Criar um fluxo automatizado que:

- Lê uma base de produtos e estoque
- Calcula cobertura e status operacional
- Consolida indicadores por unidade
- Gera um relatório em HTML
- Envia alertas automaticamente
- Mantém histórico para acompanhamento

## Tecnologias

- Google Apps Script
- Google Sheets
- HTML/CSS
- JavaScript
- Power Automate / n8n

## Exemplo de regras

- Venda média diária = Venda 30 dias / 30
- Cobertura = Estoque / Venda média diária
- Status crítico definido por faixas de cobertura
- Priorização por impacto operacional

## Fluxo

`Base de dados` → `Validação` → `Cálculos` → `Classificação` → `Relatório HTML` → `E-mail/Alerta`

## Resultado esperado

Transformar uma rotina operacional recorrente em um processo automático, padronizado e auditável.

> Dados e regras apresentados neste repositório são demonstrativos e não representam informações confidenciais de nenhuma empresa.
