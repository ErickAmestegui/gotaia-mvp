const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || 'Error de comunicación con el backend');
  }

  return payload.data ?? payload;
}

export const api = {
  health: () => request('/health'),
  createDiagnosis: (form) => request('/irrigation-diagnosis', {
    method: 'POST',
    body: JSON.stringify(form)
  }),
  getReport: (farmId) => request(`/impact-report/${farmId}`),
  getWeather: (location) => request(`/weather/${encodeURIComponent(location)}`)
};
