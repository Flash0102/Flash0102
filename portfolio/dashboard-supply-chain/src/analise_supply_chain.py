import csv
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
DATA_FILE = BASE_DIR / "data" / "dados_ficticios.csv"


def carregar_dados():
    with DATA_FILE.open(encoding="utf-8") as arquivo:
        return list(csv.DictReader(arquivo))


def enriquecer_registro(item):
    estoque = float(item["estoque"])
    venda_30d = float(item["venda_30d"])
    custo = float(item["custo_unitario"])
    dias_cadastro = int(item["dias_desde_cadastro"])

    venda_dia = venda_30d / 30 if venda_30d > 0 else 0
    cobertura = estoque / venda_dia if venda_dia > 0 else 0
    valor_estoque = estoque * custo

    if cobertura < 2:
        status = "RUPTURA"
    elif cobertura < 7:
        status = "ATENCAO"
    else:
        status = "OK"

    return {
        **item,
        "venda_dia": round(venda_dia, 2),
        "cobertura": round(cobertura, 2),
        "valor_estoque": round(valor_estoque, 2),
        "produto_novo": dias_cadastro <= 60,
        "status": status,
    }


def gerar_resumo(registros):
    total = len(registros)
    criticos = sum(1 for r in registros if r["status"] == "RUPTURA")
    atencao = sum(1 for r in registros if r["status"] == "ATENCAO")
    valor_total = sum(r["valor_estoque"] for r in registros)
    novos = sum(1 for r in registros if r["produto_novo"])

    return {
        "total_skus": total,
        "itens_ruptura": criticos,
        "itens_atencao": atencao,
        "produtos_novos": novos,
        "valor_estoque": round(valor_total, 2),
        "percentual_ruptura": round((criticos / total) * 100, 2) if total else 0,
    }


if __name__ == "__main__":
    dados = [enriquecer_registro(item) for item in carregar_dados()]
    resumo = gerar_resumo(dados)

    print("DEMO - DADOS 100% FICTICIOS")
    print(resumo)
    print("\nItens críticos:")
    for item in dados:
        if item["status"] != "OK":
            print(item["sku"], item["produto"], item["cd"], item["cobertura"], item["status"])
