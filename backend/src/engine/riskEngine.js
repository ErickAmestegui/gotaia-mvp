import { clamp, round, toNumber } from '../utils/number.js';

const WEIGHTS = Object.freeze({
  temperature: 0.20,
  rainfall: 0.20,
  daysSinceLastIrrigation: 0.15,
  crop: 0.15,
  soil: 0.10,
  cropStage: 0.10,
  irrigationPattern: 0.10
});

export function scoreTemperature(temperatureC) {
  const temp = toNumber(temperatureC, 30);
  if (temp <= 23) return 15;
  if (temp <= 27) return 35;
  if (temp <= 31) return 60;
  if (temp <= 35) return 82;
  return 100;
}

export function scoreRainfall({ rainfallLast7DaysMm = 0, rainForecast3DaysMm = 0 }) {
  const totalRain = toNumber(rainfallLast7DaysMm, 0) + toNumber(rainForecast3DaysMm, 0);
  if (totalRain >= 50) return 5;
  if (totalRain >= 30) return 20;
  if (totalRain >= 15) return 45;
  if (totalRain >= 5) return 70;
  return 95;
}

export function scoreDaysSinceLastIrrigation(days) {
  const value = toNumber(days, 0);
  if (value <= 1) return 10;
  if (value <= 3) return 30;
  if (value <= 5) return 55;
  if (value <= 8) return 80;
  return 100;
}

export function scoreIrrigationPattern({ daysSinceLastIrrigation, irrigationFrequencyDays, irrigationHoursPerEvent }) {
  const days = toNumber(daysSinceLastIrrigation, 0);
  const frequency = Math.max(1, toNumber(irrigationFrequencyDays, 7));
  const hours = Math.max(0, toNumber(irrigationHoursPerEvent, 0));
  const delayRatio = days / frequency;

  if (delayRatio >= 1.5 && hours <= 2) return 95;
  if (delayRatio >= 1.2) return 80;
  if (delayRatio >= 0.8) return 55;
  if (delayRatio < 0.4 && hours >= 6) return 35;
  return 25;
}

export function classifyIndex(index) {
  if (index <= 35) {
    return {
      level: 'Bajo',
      color: 'green',
      action: 'No programar riego adicional sin revisar suelo; monitorear clima y estado del cultivo.'
    };
  }

  if (index <= 70) {
    return {
      level: 'Medio',
      color: 'yellow',
      action: 'Revisar suelo y programar riego moderado si el cultivo está en etapa sensible o no se espera lluvia.'
    };
  }

  return {
    level: 'Alto',
    color: 'red',
    action: 'Priorizar revisión de campo y riego temprano si la validación del productor confirma necesidad.'
  };
}

function buildImpact({ farmer, index }) {
  const hours = Math.max(0, toNumber(farmer.irrigationHoursPerEvent, 0));
  const costPerHour = Math.max(0, toNumber(farmer.energyCostPerHour, 0));
  const flowLpm = farmer.estimatedFlowLpm === undefined || farmer.estimatedFlowLpm === null || farmer.estimatedFlowLpm === ''
    ? null
    : Math.max(0, toNumber(farmer.estimatedFlowLpm, 0));

  let potentialPumpHoursOptimized = 0;
  if (index <= 35) potentialPumpHoursOptimized = Math.min(hours, Math.max(1, hours * 0.35));
  else if (index <= 70) potentialPumpHoursOptimized = Math.min(hours, Math.max(0.5, hours * 0.15));

  const estimatedCostSavingBs = potentialPumpHoursOptimized * costPerHour;
  const estimatedWaterSavedLiters = flowLpm === null
    ? null
    : potentialPumpHoursOptimized * flowLpm * 60;

  return {
    potentialPumpHoursOptimized: round(potentialPumpHoursOptimized, 2),
    estimatedCostSavingBs: round(estimatedCostSavingBs, 2),
    estimatedWaterSavedLiters: estimatedWaterSavedLiters === null ? null : round(estimatedWaterSavedLiters, 2),
    basis: 'Estimación por escenario. No es medición real de campo ni caudal certificado.'
  };
}

function findParam(catalog, key, value, fallback) {
  const normalized = String(value || '').trim().toLowerCase();
  return catalog.find((item) => String(item[key]).trim().toLowerCase() === normalized) || fallback;
}

export function calculateGotaiaRisk({ farmer, weather, crops, soils }) {
  const cropParam = findParam(crops, 'id', farmer.crop, crops[0]);
  const soilParam = findParam(soils, 'id', farmer.soilType, soils[0]);
  const stageParam = cropParam.stages?.find((stage) => stage.id === farmer.cropStage) || cropParam.stages?.[0] || { riskScore: 50, label: 'Etapa no definida' };

  const rawFactors = [
    {
      key: 'temperature',
      label: 'Temperatura / calor',
      score: scoreTemperature(weather.temperatureC),
      weight: WEIGHTS.temperature,
      source: weather.source || 'mock/api'
    },
    {
      key: 'rainfall',
      label: 'Lluvia esperada o reciente',
      score: scoreRainfall(weather),
      weight: WEIGHTS.rainfall,
      source: weather.source || 'mock/api'
    },
    {
      key: 'daysSinceLastIrrigation',
      label: 'Días desde último riego',
      score: scoreDaysSinceLastIrrigation(farmer.daysSinceLastIrrigation),
      weight: WEIGHTS.daysSinceLastIrrigation,
      source: 'usuario'
    },
    {
      key: 'crop',
      label: `Cultivo: ${cropParam.label}`,
      score: cropParam.sensitivityScore,
      weight: WEIGHTS.crop,
      source: 'catálogo interno'
    },
    {
      key: 'soil',
      label: `Suelo: ${soilParam.label}`,
      score: soilParam.riskScore,
      weight: WEIGHTS.soil,
      source: 'usuario/catálogo interno'
    },
    {
      key: 'cropStage',
      label: `Etapa: ${stageParam.label}`,
      score: stageParam.riskScore,
      weight: WEIGHTS.cropStage,
      source: 'usuario/catálogo interno'
    },
    {
      key: 'irrigationPattern',
      label: 'Horas/frecuencia actual de riego',
      score: scoreIrrigationPattern(farmer),
      weight: WEIGHTS.irrigationPattern,
      source: 'usuario'
    }
  ];

  const factors = rawFactors.map((factor) => ({
    ...factor,
    score: round(clamp(factor.score), 2),
    weightedScore: round(clamp(factor.score) * factor.weight, 2)
  }));

  const index = round(clamp(factors.reduce((sum, factor) => sum + factor.weightedScore, 0)), 0);
  const recommendation = classifyIndex(index);

  return {
    index,
    level: recommendation.level,
    recommendation,
    impact: buildImpact({ farmer, index }),
    traceability: {
      weights: WEIGHTS,
      factors,
      formula: 'Índice = suma(score_normalizado_variable * peso_variable)',
      limitation: 'Índice estimativo basado en software; no mide humedad real, caudal, presión ni consumo eléctrico.'
    },
    warnings: [
      'Resultado estimativo: requiere validación visual/de campo antes de ejecutar riego.',
      'El MVP no mide humedad del suelo ni acciona bombas o válvulas.',
      'La recomendación exacta de volumen requiere sensores, caudal real y prueba de suelo.'
    ]
  };
}
