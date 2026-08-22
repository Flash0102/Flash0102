# Data Dictionary — Controle de Caixas

| Campo | Tipo | Regra demonstrativa |
|---|---|---|
| `datahora` | timestamp | Data/hora do evento |
| `cd_id` | integer | Identificador fictício da unidade/CD |
| `cd` | string | Nome fictício da unidade/CD |
| `id_franqueado` | string | Chave fictícia do responsável |
| `razao_social` | string | Nome demonstrativo |
| `email` | string | E-mail fictício com domínio `example.com` |
| `tipo` | string | `A` = aquisição, `M` = movimentação |
| `qtde_raw` | bigint | Quantidade bruta do evento |
| `picklist` | string/null | Referência obrigatória para validar movimentações |
| `qtde_corrigida` | bigint | Ajuste de inteiro 32 bits quando `qtde_raw > 2147483647` |
| `saldo_atual` | bigint | Soma das quantidades corrigidas dos eventos válidos |
| `dias_sem_movimento` | integer | Dias desde a última movimentação válida |
| `valor_caixas` | decimal | `saldo_atual × 35,00` no cenário demonstrativo |

## Regras de qualidade

1. Aquisições devem possuir quantidade positiva.
2. Movimentações só entram no cálculo quando possuem `picklist`.
3. Quantidades acima de `2147483647` são normalizadas para inteiro assinado de 32 bits.
4. Registros sem identificador de responsável devem ser tratados antes da camada analítica.
5. E-mails e nomes usados no dataset público são totalmente fictícios.
