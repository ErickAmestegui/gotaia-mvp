# GOTAIA MVP

Sistema de software para apoyo a decisiones de riego en pequeños productores de Santa Cruz.

Este MVP está delimitado como **software**: procesa datos declarados, datos climáticos mock/API y reglas auditables para calcular un **Índice GOTAIA de Riesgo Hídrico**. No mide físicamente humedad, caudal, clima ni consumo eléctrico; tampoco controla bombas o válvulas.

## Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Persistencia MVP: JSON local auditable (`backend/storage/db.json`)
- IA explicativa: generador local por defecto + integración opcional con OpenAI si se configura `OPENAI_API_KEY`
- Datos climáticos: `mock_weather.json` por defecto + intento opcional de API pública si se activa

## Estructura

```txt
gotaia-mvp/
├── backend/
│   ├── data/
│   │   ├── cultivos.json
│   │   ├── suelos.json
│   │   └── mock_weather.json
│   ├── src/
│   │   ├── engine/riskEngine.js
│   │   ├── routes/*.js
│   │   ├── services/*.js
│   │   ├── utils/*.js
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/riskEngine.test.js
│   └── package.json
├── frontend/
│   ├── src/
│   ├── index.html
│   └── package.json
├── docs/
│   └── documento_tecnico_base.md
└── .vscode/
```

## Ejecutar en VS Code

Abre la carpeta `gotaia-mvp` en VS Code.

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

El backend queda en:

```txt
http://localhost:4000
```

### 2) Frontend

En otra terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

El frontend queda en:

```txt
http://localhost:5173
```

## Endpoints principales

| Método | Endpoint | Función |
|---|---|---|
| GET | `/api/health` | Verifica estado del backend |
| POST | `/api/farmer-profile` | Registra productor/parcela |
| GET | `/api/weather/:location` | Obtiene clima mock/API con fallback |
| POST | `/api/irrigation-diagnosis` | Calcula Índice GOTAIA |
| GET | `/api/recommendation/:farmId` | Devuelve última recomendación |
| GET | `/api/impact-report/:farmId` | Genera reporte de impacto estimado |

## Ejemplo rápido de diagnóstico

```bash
curl -X POST http://localhost:4000/api/irrigation-diagnosis \
  -H "Content-Type: application/json" \
  -d '{
    "farmerName":"Demo Productor",
    "location":"San Julian",
    "crop":"soya",
    "hectares":8,
    "soilType":"arenoso",
    "cropStage":"floracion",
    "daysSinceLastIrrigation":8,
    "irrigationHoursPerEvent":5,
    "irrigationFrequencyDays":7,
    "energyCostPerHour":18
  }'
```

## Reglas del Índice GOTAIA

Pesos aplicados:

- Temperatura/calor: 20%
- Lluvia esperada o reciente: 20%
- Días desde último riego: 15%
- Tipo de cultivo: 15%
- Tipo de suelo: 10%
- Etapa del cultivo: 10%
- Horas/frecuencia de riego: 10%

Clasificación:

- 0 a 35: Riesgo bajo
- 36 a 70: Riesgo medio
- 71 a 100: Riesgo alto

## Ejecutar pruebas

```bash
cd backend
npm test
```

Las pruebas cubren el motor de riesgo y casos extremos del MVP.

## Variables opcionales

Archivo `backend/.env`:

```env
PORT=4000
NODE_ENV=development
USE_EXTERNAL_WEATHER=false
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
```

Por defecto el sistema funciona con datos mock, ideal para demo offline.

## Mensaje de defensa técnica

GOTAIA no pretende adivinar agua ni medir humedad sin sensores. Calcula riesgo hídrico estimado con datos declarados, clima digital/mock y reglas auditables. La IA explica el resultado calculado, pero no modifica el índice ni inventa datos.
