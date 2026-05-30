import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import farmerRoutes from './routes/farmer.routes.js';
import weatherRoutes from './routes/weather.routes.js';
import diagnosisRoutes from './routes/diagnosis.routes.js';
import recommendationRoutes from './routes/recommendation.routes.js';
import reportRoutes from './routes/report.routes.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      app: 'GOTAIA MVP',
      scope: 'software-only',
      message: 'Motor de riesgo y API listos. No mide sensores ni controla hardware.'
    });
  });

  app.use('/api/farmer-profile', farmerRoutes);
  app.use('/api/weather', weatherRoutes);
  app.use('/api/irrigation-diagnosis', diagnosisRoutes);
  app.use('/api/recommendation', recommendationRoutes);
  app.use('/api/impact-report', reportRoutes);

  app.use((req, res) => {
    res.status(404).json({
      ok: false,
      error: 'Ruta no encontrada',
      path: req.originalUrl
    });
  });

  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(err.status || 500).json({
      ok: false,
      error: err.message || 'Error interno del servidor'
    });
  });

  return app;
}
