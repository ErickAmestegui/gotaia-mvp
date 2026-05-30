import { Router } from 'express';
import { createId } from '../utils/id.js';
import { validateFarmerProfile } from '../utils/validators.js';
import { insert } from '../services/dataStore.js';

const router = Router();

router.post('/', (req, res, next) => {
  try {
    const farmer = {
      id: createId('farm'),
      ...validateFarmerProfile(req.body),
      createdAt: new Date().toISOString()
    };

    insert('farmers', farmer);
    res.status(201).json({ ok: true, data: farmer });
  } catch (error) {
    next(error);
  }
});

export default router;
