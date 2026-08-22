# Controle de Validade e Risco de Perda

Case demonstrativo para monitoramento de produtos com vencimento próximo e priorização de ações preventivas.

## Problema

Bases extensas dificultam a identificação rápida dos produtos que exigem ação imediata, aumentando o risco de perda financeira e operacional.

## Objetivo

Automatizar a classificação dos itens por criticidade e gerar uma visão consolidada para acompanhamento diário.

## Indicadores

- Total de itens monitorados
- Itens vencidos
- Itens críticos
- Itens em alerta
- Valor unitário
- Valor potencial em risco
- Unidade mais crítica

## Fluxo proposto

`Base de validade` → `Tratamento` → `Cálculo de dias para vencimento` → `Classificação de risco` → `Dashboard/Relatório` → `Alerta automático`

## Tecnologias

- Google Apps Script
- Google Sheets
- Power BI
- SQL
- HTML/CSS

## Exemplo de classificação

- Vencido: prioridade máxima
- Crítico: vencimento muito próximo
- Alerta: requer acompanhamento
- OK: dentro da faixa operacional

## Resultado esperado

Priorizar ações preventivas, reduzir análises manuais e apoiar decisões sobre itens com maior risco de perda.

> Case de portfólio construído com dados fictícios e regras demonstrativas.
