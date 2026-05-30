function buildLocalExplanation(diagnosis) {
  const { index, level, recommendation, traceability, warnings } = diagnosis;
  const topFactors = [...traceability.factors]
    .sort((a, b) => b.weightedScore - a.weightedScore)
    .slice(0, 3)
    .map((factor) => factor.label.toLowerCase())
    .join(', ');

  return [
    `El Índice GOTAIA calculado es ${index}/100, clasificado como riesgo ${level.toLowerCase()}.`,
    `Los factores que más influyeron en el resultado fueron: ${topFactors}.`,
    recommendation.action,
    `Advertencia técnica: ${warnings.join(' ')}`
  ].join(' ');
}

async function buildOpenAiExplanation(diagnosis) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const body = {
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'Eres un asistente técnico agrícola. Explica resultados de software de forma breve. No inventes datos, no prometas mediciones físicas, no cambies el índice calculado y menciona límites del MVP.'
      },
      {
        role: 'user',
        content: JSON.stringify({
          index: diagnosis.index,
          level: diagnosis.level,
          recommendation: diagnosis.recommendation,
          factors: diagnosis.traceability.factors,
          warnings: diagnosis.warnings
        })
      }
    ],
    temperature: 0.2
  };

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(6000)
  });

  if (!response.ok) {
    throw new Error(`OpenAI respondió ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || null;
}

export async function explainDiagnosis(diagnosis) {
  try {
    const aiText = await buildOpenAiExplanation(diagnosis);
    if (aiText) {
      return {
        provider: 'openai',
        text: aiText,
        guardrail: 'La IA explica datos calculados; no modifica el índice ni inventa variables.'
      };
    }
  } catch (error) {
    return {
      provider: 'local-fallback',
      text: buildLocalExplanation(diagnosis),
      warning: `IA externa no disponible: ${error.message}`,
      guardrail: 'Fallback local mantiene el flujo del MVP.'
    };
  }

  return {
    provider: 'local-rule-based',
    text: buildLocalExplanation(diagnosis),
    guardrail: 'Explicación generada con plantilla local sobre el cálculo técnico.'
  };
}
