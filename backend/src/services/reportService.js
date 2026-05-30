import { round } from '../utils/number.js';

export function buildImpactReport(diagnosis) {
  const farmer = diagnosis.farmer;
  const impact = diagnosis.impact;

  const markdown = `# REPORTE GOTAIA - DIAGNÓSTICO DE RIEGO\n\n` +
    `**Productor/parcela:** ${farmer.farmerName}\n\n` +
    `**Ubicación:** ${farmer.location}\n\n` +
    `**Cultivo:** ${farmer.crop}\n\n` +
    `**Hectáreas:** ${farmer.hectares}\n\n` +
    `**Índice GOTAIA:** ${diagnosis.index}/100\n\n` +
    `**Nivel:** ${diagnosis.level}\n\n` +
    `## Recomendación\n\n${diagnosis.recommendation.action}\n\n` +
    `## Impacto estimado\n\n` +
    `- Horas potencialmente optimizables: ${round(impact.potentialPumpHoursOptimized, 2)} h\n` +
    `- Ahorro operativo estimado: Bs ${round(impact.estimatedCostSavingBs, 2)}\n` +
    `- Agua estimada no aplicada: ${impact.estimatedWaterSavedLiters === null ? 'No calculada sin caudal declarado' : `${round(impact.estimatedWaterSavedLiters, 2)} litros`}\n\n` +
    `## Limitación técnica\n\nEste reporte es una estimación de software basada en datos declarados, clima digital/mock y reglas auditables. No reemplaza sensor de humedad, caudalímetro, prueba de suelo ni criterio agronómico de campo.\n`;

  return {
    id: `report_${diagnosis.id}`,
    diagnosisId: diagnosis.id,
    generatedAt: new Date().toISOString(),
    summary: {
      farmId: diagnosis.farmId,
      farmerName: farmer.farmerName,
      location: farmer.location,
      crop: farmer.crop,
      index: diagnosis.index,
      level: diagnosis.level,
      recommendation: diagnosis.recommendation.action,
      impact
    },
    markdown
  };
}
