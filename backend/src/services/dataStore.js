import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storagePath = path.join(__dirname, '../../storage/db.json');

const defaultDb = {
  farmers: [],
  diagnoses: [],
  reports: []
};

function ensureStorage() {
  const dir = path.dirname(storagePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(storagePath)) {
    fs.writeFileSync(storagePath, JSON.stringify(defaultDb, null, 2));
  }
}

export function readDb() {
  ensureStorage();
  const raw = fs.readFileSync(storagePath, 'utf-8');
  try {
    return JSON.parse(raw);
  } catch {
    fs.writeFileSync(storagePath, JSON.stringify(defaultDb, null, 2));
    return structuredClone(defaultDb);
  }
}

export function writeDb(db) {
  ensureStorage();
  fs.writeFileSync(storagePath, JSON.stringify(db, null, 2));
}

export function insert(collection, item) {
  const db = readDb();
  db[collection].push(item);
  writeDb(db);
  return item;
}

export function findById(collection, id) {
  const db = readDb();
  return db[collection].find((item) => item.id === id) || null;
}

export function findLatestDiagnosisByFarmId(farmId) {
  const db = readDb();
  return [...db.diagnoses]
    .reverse()
    .find((diagnosis) => diagnosis.farmId === farmId || diagnosis.farmer?.id === farmId) || null;
}
