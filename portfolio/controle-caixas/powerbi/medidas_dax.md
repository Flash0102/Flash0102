# Medidas DAX — Controle de Caixas

> Medidas demonstrativas para um modelo Power BI alimentado pela saída consolidada do SQL.

```DAX
Saldo Atual =
SUM ( controle_caixas[saldo_atual] )
```

```DAX
Valor Caixas =
SUM ( controle_caixas[valor_caixas] )
```

```DAX
Caixas Adquiridas =
SUM ( controle_caixas[caixas_adquiridas] )
```

```DAX
Caixas Movimentadas =
SUM ( controle_caixas[caixas_movimentadas] )
```

```DAX
Responsáveis Inativos =
CALCULATE (
    DISTINCTCOUNT ( controle_caixas[id_franqueado] ),
    controle_caixas[status_movimentacao] = "INATIVO"
)
```

```DAX
% Responsáveis Inativos =
DIVIDE (
    [Responsáveis Inativos],
    DISTINCTCOUNT ( controle_caixas[id_franqueado] ),
    0
)
```

```DAX
Dias Sem Movimento Máx =
MAX ( controle_caixas[dias_sem_movimento] )
```

## Visuais sugeridos

- cards: Saldo Atual, Valor Caixas, Responsáveis Inativos e % Responsáveis Inativos;
- ranking por CD e responsável;
- matriz com saldo, última movimentação e dias sem movimento;
- distribuição de status de saldo;
- lista de ação priorizada por inatividade e saldo baixo.
