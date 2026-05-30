import { getWeatherMock } from './catalogService.js';

const municipalityCoordinates = {
  'santa cruz': { latitude: -17.7833, longitude: -63.1821 },
  'santa cruz de la sierra': { latitude: -17.7833, longitude: -63.1821 },
  'montero': { latitude: -17.3387, longitude: -63.2505 },
  'warnes': { latitude: -17.5167, longitude: -63.1667 },
  'san julian': { latitude: -16.9167, longitude: -62.6167 },
  'san javier': { latitude: -16.2896, longitude: -62.5006 },
  'okinawa': { latitude: -17.2333, longitude: -62.8833 },
  'cotoca': { latitude: -17.8167, longitude: -63.0500 },
  'la guardia': { latitude: -17.8833, longitude: -63.3333 },
  'el torno': { latitude: -18.0000, longitude: -63.3833 },
  'portachuelo': { latitude: -17.3500, longitude: -63.4000 },
  'mineros': { latitude: -17.1167, longitude: -63.2333 },
  'cuatro canadas': { latitude: -17.5333, longitude: -62.4000 }
};

function normalizeLocation(location) {
  return String(location || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function pickMock(mockWeather, location) {
  const normalized = normalizeLocation(location);
  const exact = mockWeather.find((item) => normalizeLocation(item.location) === normalized);
  if (exact) return { ...exact, source: 'mock_weather.json' };

  const partial = mockWeather.find((item) => normalized.includes(normalizeLocation(item.location)) || normalizeLocation(item.location).includes(normalized));
  if (partial) return { ...partial, source: 'mock_weather.json' };

  return { ...mockWeather[0], location: location || mockWeather[0].location, source: 'mock_weather.json' };
}

async function fetchOpenMeteo(location) {
  const normalized = normalizeLocation(location);
  const coords = municipalityCoordinates[normalized];
  if (!coords) throw new Error('Ubicación sin coordenadas configuradas para API externa');

  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', coords.latitude);
  url.searchParams.set('longitude', coords.longitude);
  url.searchParams.set('current', 'temperature_2m');
  url.searchParams.set('daily', 'rain_sum,precipitation_sum');
  url.searchParams.set('forecast_days', '3');
  url.searchParams.set('timezone', 'America/La_Paz');

  const response = await fetch(url, { signal: AbortSignal.timeout(3500) });
  if (!response.ok) throw new Error(`API climática respondió ${response.status}`);
  const data = await response.json();

  const rainForecastMm = Array.isArray(data.daily?.rain_sum)
    ? data.daily.rain_sum.reduce((sum, value) => sum + Number(value || 0), 0)
    : 0;

  return {
    location,
    temperatureC: Number(data.current?.temperature_2m ?? 30),
    rainfallLast7DaysMm: 0,
    rainForecast3DaysMm: Number(rainForecastMm.toFixed(2)),
    condition: rainForecastMm >= 20 ? 'lluvia probable' : 'seco/caluroso',
    source: 'open-meteo-api',
    limitation: 'Dato climático digital aproximado por municipio; no representa microclima exacto de parcela.'
  };
}

export async function getWeatherByLocation(location) {
  const mockWeather = await getWeatherMock();
  const allowExternal = String(process.env.USE_EXTERNAL_WEATHER || 'false').toLowerCase() === 'true';

  if (allowExternal) {
    try {
      return await fetchOpenMeteo(location);
    } catch (error) {
      const fallback = pickMock(mockWeather, location);
      return {
        ...fallback,
        warning: `Fallback activo: ${error.message}`
      };
    }
  }

  return pickMock(mockWeather, location);
}
