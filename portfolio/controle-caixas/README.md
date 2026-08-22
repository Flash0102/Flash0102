# Controle de Caixas & Movimentações

![Capa do case](./assets/cover.svg)

> **CASE DE PORTFÓLIO — DADOS 100% FICTÍCIOS**

Projeto demonstrativo para acompanhar aquisições, movimentações, saldo, inatividade e valor associado a ativos logísticos por unidade e responsável.

## Problema de negócio

Quando aquisições e movimentações ficam espalhadas em bases diferentes, a operação perde visibilidade sobre saldo atual, itens parados, responsáveis e valores envolvidos.

## Objetivo

Construir uma camada única de monitoramento capaz de responder rapidamente:

- Quantos ativos cada responsável possui?
- Qual foi a última aquisição?
- Qual foi a última movimentação?
- Há quantos dias não ocorre movimentação?
- Qual o valor financeiro associado ao saldo?
- Quais registros exigem ação?

## KPIs demonstrativos

| Indicador | Regra demonstrativa |
|---|---|
| Saldo atual | Aquisições - baixas/movimentações aplicáveis |
| Valor do saldo | Saldo atual × custo unitário fictício |
| Dias sem movimento | Data atual - última movimentação |
| Status | ATIVO / INATIVO por faixa de dias |
| Última aquisição | Maior data de evento do tipo aquisição |
| Última movimentação | Maior data de evento operacional válido |

## Arquitetura da solução

```mermaid
flowchart LR
    A[Base de eventos] --> B[SQL / Tratamento]
    B --> C[Regras de saldo]
    C --> D[KPIs por responsável]
    D --> E[Power BI / Dashboard]
    D --> F[Automação de cobrança]
    F --> G[Power Automate / n8n]
```

## Tecnologias

`SQL` `Power BI` `Power Automate` `n8n` `Excel/Sheets` `Automação`

## Diferencial do case

Este projeto combina **analytics + regra de negócio + automação de ação**. O objetivo não é apenas mostrar um dashboard, mas transformar um indicador de inatividade em uma rotina operacional acionável.

## Segurança

Todos os nomes, valores, responsáveis e registros apresentados publicamente são fictícios ou anonimizados. Nenhuma base corporativa é publicada neste repositório.

---

**Tipo:** Case demonstrativo de Supply Chain Analytics & Automação  
**Autor:** Michel Lucena
