# Instruções: Implementar Receptor de Webhook de Venda (Live7)

## Contexto

O sistema Live7 permite configurar uma **URL de webhook** por produto. Quando uma venda desse produto é confirmada (pagamento aprovado), o Live7 envia uma requisição **HTTP POST** para a URL configurada contendo os dados do comprador e do produto.

---

## Requisição recebida

- **Método:** `POST`
- **Content-Type:** `application/json`
- **Timeout do remetente:** 10 segundos (a resposta deve ser rápida)

### Payload (corpo da requisição)

```json
{
  "evento": "venda_confirmada",
  "timestamp": "2026-03-30T14:25:00.000Z",
  "produto": {
    "id": 42,
    "nome": "Curso de Marketing Digital",
    "preco": 19900
  },
  "comprador": {
    "nome": "João Silva",
    "email": "joao@email.com",
    "telefone": "11999998888",
    "documento": "12345678900"
  },
  "venda": {
    "numero_venda": "D1234567890abc",
    "codigo_rastreamento": "TRm1abc2DEF3",
    "valor_total": 199.00,
    "metodo_pagamento": "PIX",
    "status": "PAGO"
  }
}
```

### Detalhes dos campos

| Campo | Tipo | Descrição |
|---|---|---|
| `evento` | string | Sempre `"venda_confirmada"` |
| `timestamp` | string (ISO 8601) | Data/hora do envio do webhook |
| `produto.id` | number | ID do produto na plataforma Live7 |
| `produto.nome` | string | Nome do produto |
| `produto.preco` | number | Preço em centavos (ex: 19900 = R$ 199,00) |
| `comprador.nome` | string \| null | Nome completo do comprador |
| `comprador.email` | string \| null | Email do comprador |
| `comprador.telefone` | string \| null | Telefone (apenas dígitos) |
| `comprador.documento` | string \| null | CPF ou CNPJ (apenas dígitos) |
| `venda.numero_venda` | string \| null | Número interno da venda |
| `venda.codigo_rastreamento` | string \| null | Código de rastreamento do pedido |
| `venda.valor_total` | number \| null | Valor total pago (em reais, ex: 199.00) |
| `venda.metodo_pagamento` | string \| null | `"PIX"`, `"CARTAO_CREDITO"` ou `"BOLETO"` |
| `venda.status` | string | Sempre `"PAGO"` |

> **Nota:** Campos marcados como `| null` podem vir nulos dependendo do fluxo de compra.

---

## O que implementar

### 1. Criar um endpoint POST público

Criar uma rota `POST /api/webhook/live7` (ou o path que preferir) que:

- Aceita `application/json`
- Lê o body da requisição
- Retorna **HTTP 200** rapidamente (o Live7 tem timeout de 10s)
- Processa os dados (pode ser assíncrono, após retornar 200)

### 2. Resposta esperada

Retornar status **200** com qualquer corpo (o Live7 ignora o corpo da resposta). Se o endpoint retornar erro (4xx/5xx) ou não responder em 10s, o webhook é considerado falho (sem retry automático).

### 3. Processamento dos dados

Com os dados recebidos, você pode:

- Salvar a venda no banco de dados local
- Liberar acesso a conteúdo/produto digital
- Enviar notificação interna (email, Slack, etc.)
- Atualizar dashboards/relatórios
- Qualquer outra ação pós-venda

### 4. Segurança recomendada

- **Validar os campos obrigatórios** (`evento`, `produto`, `comprador`) antes de processar
- **Idempotência**: usar `venda.numero_venda` como chave única para evitar processar a mesma venda duas vezes (o webhook pode ser enviado mais de uma vez em cenários de retry futuro)
- **Não confiar cegamente**: validar tipos e sanitizar dados antes de gravar no banco

---

## Exemplo de implementação (Node.js/Express)

```js
app.post('/api/webhook/live7', express.json(), async (req, res) => {
  // Responder 200 imediatamente
  res.status(200).json({ received: true });

  const { evento, produto, comprador, venda } = req.body;

  if (evento !== 'venda_confirmada') return;

  // Processar a venda (exemplo: salvar no banco)
  try {
    await db.query(
      `INSERT INTO vendas_live7 (numero_venda, produto_nome, comprador_email, comprador_nome, valor_total, metodo_pagamento, recebido_em)
       VALUES (?, ?, ?, ?, ?, ?, NOW())
       ON DUPLICATE KEY UPDATE recebido_em = NOW()`,
      [venda.numero_venda, produto.nome, comprador.email, comprador.nome, venda.valor_total, venda.metodo_pagamento]
    );
  } catch (err) {
    console.error('Erro ao processar webhook Live7:', err);
  }
});
```

---

## Como ativar

Após implementar o endpoint e colocá-lo online, basta ir no painel do vendedor na Live7, editar o produto desejado, e colocar a URL completa do endpoint no campo **"Webhook de venda"**. Exemplo:

```
https://meusite.com/api/webhook/live7
```

A partir desse momento, toda venda confirmada desse produto disparará o POST para essa URL.
