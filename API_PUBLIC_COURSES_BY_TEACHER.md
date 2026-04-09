# API: Listar Cursos Públicos de um Professor

## Endpoint

```
GET /myclasses/public/teacher/:teacher_id
```

## Autenticação

Nenhuma. Esta rota é **pública**.

## Parâmetros

| Parâmetro    | Tipo   | Local | Obrigatório | Descrição                    |
|--------------|--------|-------|-------------|------------------------------|
| `teacher_id` | string | URL   | Sim         | UUID do professor (user.id)  |

## Exemplo de Requisição

```bash
curl https://<API_BASE_URL>/myclasses/public/teacher/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

## Resposta de Sucesso — `200 OK`

Retorna um array JSON com os cursos do professor. Cada objeto contém:

| Campo          | Tipo            | Descrição                                       |
|----------------|-----------------|--------------------------------------------------|
| `id`           | string          | UUID do curso                                    |
| `title`        | string          | Título do curso                                  |
| `image`        | string          | URL da imagem de capa do curso                   |
| `teachername`  | string          | Nome do professor exibido no curso               |
| `teacherphoto` | string          | URL da foto do professor                         |
| `description`  | string          | Descrição do curso                               |
| `time`         | string          | Duração/carga horária do curso                   |
| `category`     | string \| null  | Categoria do curso (pode ser `null`)             |
| `paymentlink`  | string          | Link de pagamento/checkout do curso              |
| `_count`       | object          | Contadores agregados                             |
| `_count.classes` | number        | Quantidade total de aulas cadastradas no curso   |

### Exemplo de Resposta

```json
[
  {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "title": "Curso de Cardiologia Avançada",
    "image": "https://storage.example.com/courses/cardio.jpg",
    "teachername": "Dr. João Silva",
    "teacherphoto": "https://storage.example.com/teachers/joao.jpg",
    "description": "Curso completo sobre diagnóstico e tratamento de doenças cardiovasculares.",
    "time": "40h",
    "category": "Cardiologia",
    "paymentlink": "https://pay.example.com/checkout/cardio",
    "_count": {
      "classes": 12
    }
  }
]
```

Se o professor não tiver cursos associados, retorna um **array vazio** `[]`.

## Respostas de Erro

| Status | Body                                           | Causa                                                        |
|--------|-------------------------------------------------|--------------------------------------------------------------|
| `400`  | `{ "error": "ID do professor é obrigatório" }` | Parâmetro `teacher_id` ausente na URL                        |
| `404`  | `{ "error": "Professor não encontrado" }`       | Nenhum usuário do tipo `teacher` encontrado com o ID fornecido |

## Notas

- O formato de resposta é **idêntico** ao do endpoint `GET /myclasses/public`, com a diferença de que filtra apenas os cursos associados ao professor especificado.
- A ordenação é por data de criação decrescente (`created_at DESC`).
- O campo `_count.classes` reflete o total de aulas registradas no curso (incluindo rascunhos).
