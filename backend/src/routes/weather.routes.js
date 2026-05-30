import { Router } from 'express';
import { getWeatherByLocation } from '../services/weatherService.js';

const router = Router();

router.get('/:location', async (req, res, next) => {
  try {
    const weather = await getWeatherByLocation(req.params.location);
    res.json({
      ok: true,
      data: weather,
      scope: 'Dato climático digital/mock. No es medición física propia del sistema.'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
