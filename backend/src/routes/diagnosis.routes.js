import { Router } from 'express';
import { createId } from '../utils/id.js';
import { validateFarmerProfile } from '../utils/validators.js';
import { getCatalogs } from '../services/catalogService.js';
import { getWeatherByLocation } from '../services/weatherService.js';
import { calculateGotaiaRisk } from '../engine/riskEngine.js';
import { explainDiagnosis } from '../services/aiExplanationService.js';
import { insert } from '../services/dataStore.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const farmer = {
      id: req.body.farmId || createId('farm'),
      ...validateFarmerProfile(req.body)
    };

    const [catalogs, weather] = await Promise.all([
      getCatalogs(),
      getWeatherByLocation(farmer.location)
    ]);

    const calculated = calculateGotaiaRisk({
      farmer,
      weather,
      crops: catalogs.crops,
      soils: catalogs.soils
    });

    const diagnosis = {
      id: createId('diagnosis'),
      farmId: farmer.id,
      farmer,
      weather,
      ...calculated,
      createdAt: new Date().toISOString()
    };

    diagnosis.aiExplanation = await explainDiagnosis(diagnosis);

    insert('farmers', { ...farmer, createdAt: diagnosis.createdAt });
    insert('diagnoses', diagnosis);

    res.status(201).json({ ok: true, data: diagnosis });
  } catch (error) {
    next(error);
  }
});

export default router;
