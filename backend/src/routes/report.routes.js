import { Router } from 'express';
import { findLatestDiagnosisByFarmId, insert } from '../services/dataStore.js';
import { buildImpactReport } from '../services/reportService.js';
import { httpError } from '../utils/httpError.js';

const router = Router();

router.get('/:farmId', (req, res, next) => {
  try {
    const diagnosis = findLatestDiagnosisByFarmId(req.params.farmId);
    if (!diagnosis) {
      throw httpError(404, 'No existe diagnóstico para generar reporte.');
    }

    const report = buildImpactReport(diagnosis);
    insert('reports', report);
    res.json({ ok: true, data: report });
  } catch (error) {
    next(error);
  }
});

export default router;
