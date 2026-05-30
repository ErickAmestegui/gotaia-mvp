import { httpError } from './httpError.js';

const allowedCrops = ['soya', 'maiz', 'arroz', 'cana', 'hortalizas'];
const allowedSoils = ['arenoso', 'franco', 'arcilloso'];
const allowedStages = ['inicial', 'vegetativo', 'floracion', 'fructificacion', 'maduracion'];

function requiredString(payload, field) {
  const value = String(payload[field] || '').trim();
  if (!value) throw httpError(400, `Campo obligatorio faltante: ${field}`);
  return value;
}

function positiveNumber(payload, field, { min = 0, max = Number.MAX_SAFE_INTEGER } = {}) {
  const value = Number(payload[field]);
  if (!Number.isFinite(value) || value < min || value > max) {
    throw httpError(400, `Campo inválido: ${field}. Debe ser número entre ${min} y ${max}.`);
  }
  return value;
}

function optionalNumber(payload, field, { min = 0, max = Number.MAX_SAFE_INTEGER } = {}) {
  if (payload[field] === undefined || payload[field] === null || payload[field] === '') return undefined;
  return positiveNumber(payload, field, { min, max });
}

function allowed(payload, field, values) {
  const value = requiredString(payload, field).toLowerCase();
  if (!values.includes(value)) {
    throw httpError(400, `Campo inválido: ${field}. Valores permitidos: ${values.join(', ')}`);
  }
  return value;
}

export function validateFarmerProfile(payload) {
  return {
    farmerName: requiredString(payload, 'farmerName'),
    location: requiredString(payload, 'location'),
    crop: allowed(payload, 'crop', allowedCrops),
    hectares: positiveNumber(payload, 'hectares', { min: 0.1, max: 100000 }),
    soilType: allowed(payload, 'soilType', allowedSoils),
    cropStage: allowed(payload, 'cropStage', allowedStages),
    daysSinceLastIrrigation: positiveNumber(payload, 'daysSinceLastIrrigation', { min: 0, max: 365 }),
    irrigationHoursPerEvent: positiveNumber(payload, 'irrigationHoursPerEvent', { min: 0, max: 240 }),
    irrigationFrequencyDays: positiveNumber(payload, 'irrigationFrequencyDays', { min: 1, max: 365 }),
    energyCostPerHour: positiveNumber(payload, 'energyCostPerHour', { min: 0, max: 100000 }),
    estimatedFlowLpm: optionalNumber(payload, 'estimatedFlowLpm', { min: 0, max: 100000 }),
    notes: String(payload.notes || '').trim()
  };
}
