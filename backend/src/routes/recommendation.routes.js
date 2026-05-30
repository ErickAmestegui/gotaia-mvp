import { Router } from 'express';
import { findLatestDiagnosisByFarmId } from '../services/dataStore.js';
import { httpError } from '../utils/httpError.js';

const router = Router();

router.get('/:farmId', (req, res, next) => {
  try {
    const diagnosis = findLatestDiagnosisByFarmId(req.params.farmId);
    if (!diagnosis) {
      throw httpError(404, 'No existe diagnóstico para este productor/parcela. Primero ejecuta /irrigation-diagnosis.');
    }

    res.json({
      ok: true,
      data: {
        farmId: diagnosis.farmId,
        diagnosisId: diagnosis.id,
        index: diagnosis.index,
        level: diagnosis.level,
        recommendation: diagnosis.recommendation,
        aiExplanation: diagnosis.aiExplanation,
        warnings: diagnosis.warnings,
        traceability: diagnosis.traceability
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
