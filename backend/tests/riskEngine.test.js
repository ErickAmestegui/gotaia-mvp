import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateGotaiaRisk } from '../src/engine/riskEngine.js';
import crops from '../data/cultivos.json' with { type: 'json' };
import soils from '../data/suelos.json' with { type: 'json' };

const baseFarmer = {
  farmerName: 'Demo',
  location: 'San Julian',
  crop: 'soya',
  hectares: 8,
  soilType: 'franco',
  cropStage: 'vegetativo',
  daysSinceLastIrrigation: 3,
  irrigationHoursPerEvent: 4,
  irrigationFrequencyDays: 7,
  energyCostPerHour: 15
};

test('clasifica riesgo alto con calor, sin lluvia, suelo arenoso y muchos días sin riego', () => {
  const result = calculateGotaiaRisk({
    farmer: {
      ...baseFarmer,
      soilType: 'arenoso',
      cropStage: 'floracion',
      daysSinceLastIrrigation: 9,
      irrigationHoursPerEvent: 1,
      irrigationFrequencyDays: 5
    },
    weather: {
      temperatureC: 36,
      rainfallLast7DaysMm: 0,
      rainForecast3DaysMm: 0,
      source: 'test'
    },
    crops,
    soils
  });

  assert.equal(result.level, 'Alto');
  assert.ok(result.index >= 71);
  assert.equal(result.traceability.factors.length, 7);
});

test('mantiene riesgo bajo cuando hay lluvia suficiente y riego reciente', () => {
  const result = calculateGotaiaRisk({
    farmer: {
      ...baseFarmer,
      soilType: 'arcilloso',
      cropStage: 'maduracion',
      daysSinceLastIrrigation: 1,
      irrigationHoursPerEvent: 6,
      irrigationFrequencyDays: 7
    },
    weather: {
      temperatureC: 23,
      rainfallLast7DaysMm: 40,
      rainForecast3DaysMm: 20,
      source: 'test'
    },
    crops,
    soils
  });

  assert.equal(result.level, 'Bajo');
  assert.ok(result.index <= 35);
});

test('no calcula litros evitados si no hay caudal declarado', () => {
  const result = calculateGotaiaRisk({
    farmer: baseFarmer,
    weather: {
      temperatureC: 23,
      rainfallLast7DaysMm: 40,
      rainForecast3DaysMm: 20,
      source: 'test'
    },
    crops,
    soils
  });

  assert.equal(result.impact.estimatedWaterSavedLiters, null);
});
