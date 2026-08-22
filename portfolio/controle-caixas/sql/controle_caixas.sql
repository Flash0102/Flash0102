-- CASE DEMONSTRATIVO | dados 100% fictícios
-- Dialeto: Athena / Trino
-- Objetivo: consolidar aquisição, movimentação, saldo, inatividade e valor financeiro.

WITH base AS (
    SELECT
        CAST(datahora AS timestamp) AS datahora,
        cd_id,
        cd,
        id_franqueado,
        razao_social,
        email,
        tipo,
        CAST(qtde_raw AS bigint) AS qtde_raw,
        picklist,
        CASE
            WHEN CAST(qtde_raw AS bigint) > 2147483647
                THEN CAST(qtde_raw AS bigint) - 4294967296
            ELSE CAST(qtde_raw AS bigint)
        END AS qtde_corrigida
    FROM eventos_demo
),

eventos_validos AS (
    SELECT *
    FROM base
    WHERE tipo = 'A'
       OR (tipo = 'M' AND picklist IS NOT NULL)
),

consolidado AS (
    SELECT
        cd_id,
        cd,
        id_franqueado,
        razao_social,
        email,
        SUM(CASE WHEN tipo = 'A' AND qtde_corrigida > 0 THEN qtde_corrigida ELSE 0 END) AS caixas_adquiridas,
        SUM(CASE WHEN tipo = 'M' THEN ABS(qtde_corrigida) ELSE 0 END) AS caixas_movimentadas,
        SUM(qtde_corrigida) AS saldo_atual,
        MAX(CASE WHEN tipo = 'A' THEN datahora END) AS ultima_aquisicao,
        MAX(CASE WHEN tipo = 'M' THEN datahora END) AS ultima_movimentacao
    FROM eventos_validos
    GROUP BY 1,2,3,4,5
)

SELECT
    cd_id,
    cd,
    id_franqueado,
    razao_social,
    email,
    caixas_adquiridas,
    caixas_movimentadas,
    saldo_atual,
    ultima_aquisicao,
    ultima_movimentacao,
    CASE
        WHEN ultima_movimentacao IS NULL THEN NULL
        ELSE date_diff('day', CAST(ultima_movimentacao AS date), current_date)
    END AS dias_sem_movimento,
    saldo_atual * 35.00 AS valor_caixas,
    CASE
        WHEN saldo_atual <= 0 THEN 'SALDO_CRITICO'
        WHEN saldo_atual <= 3 THEN 'SALDO_BAIXO'
        ELSE 'SALDO_OK'
    END AS status_saldo,
    CASE
        WHEN ultima_movimentacao IS NULL THEN 'SEM_MOVIMENTO'
        WHEN date_diff('day', CAST(ultima_movimentacao AS date), current_date) > 30 THEN 'INATIVO'
        ELSE 'ATIVO'
    END AS status_movimentacao
FROM consolidado
ORDER BY
    CASE WHEN status_movimentacao = 'INATIVO' THEN 1 WHEN status_movimentacao = 'SEM_MOVIMENTO' THEN 2 ELSE 3 END,
    dias_sem_movimento DESC,
    saldo_atual ASC;
