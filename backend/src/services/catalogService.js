import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '../../data');

async function readJson(fileName) {
  const raw = await fs.readFile(path.join(dataDir, fileName), 'utf-8');
  return JSON.parse(raw);
}

export async function getCropCatalog() {
  return readJson('cultivos.json');
}

export async function getSoilCatalog() {
  return readJson('suelos.json');
}

export async function getWeatherMock() {
  return readJson('mock_weather.json');
}

export async function getCatalogs() {
  const [crops, soils] = await Promise.all([getCropCatalog(), getSoilCatalog()]);
  return { crops, soils };
}
