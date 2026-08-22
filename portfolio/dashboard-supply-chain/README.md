# Dashboard Executivo de Supply Chain

Projeto demonstrativo criado para mostrar como indicadores operacionais podem ser consolidados em uma visão executiva para tomada de decisão.

## Problema de negócio

Times de operação e planejamento normalmente trabalham com dados dispersos sobre estoque, vendas, cobertura e sortimento. Isso dificulta a identificação rápida de riscos e oportunidades.

## Objetivo

Criar uma visão única que permita acompanhar:

- Total de SKUs
- Estoque disponível
- Cobertura de estoque
- Itens sem venda
- Produtos novos
- Indicadores por centro de distribuição
- Valor de estoque
- Itens críticos

## Arquitetura proposta

`ERP / Planilhas / Banco de Dados` → `Tratamento SQL/Python` → `Modelo analítico` → `Power BI` → `Alertas e automações`

## Tecnologias

- Power BI
- SQL
- Excel / Google Sheets
- Python
- Power Query

## Indicadores demonstrativos

- Cobertura = Estoque / Venda média diária
- Venda média diária = Venda 30 dias / 30
- % de ruptura = Itens em ruptura / Total de itens analisados
- Valor de estoque = Estoque × Custo unitário

## Resultado esperado

Reduzir o tempo gasto em análises manuais e permitir priorização mais rápida de itens, categorias e centros de distribuição com maior risco operacional.

## Observação

Este case utiliza apenas conceitos e dados fictícios para demonstração de portfólio.
