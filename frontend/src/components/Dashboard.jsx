function factorClass(score) {
  if (score >= 75) return 'danger';
  if (score >= 45) return 'warning';
  return 'success';
}

export default function Dashboard({ diagnosis }) {
  const levelClass = diagnosis.recommendation.color;

  return (
    <section className="card dashboard-card">
      <div className="dashboard-top">
        <div>
          <p className="eyebrow">Resultado</p>
          <h2>Índice GOTAIA</h2>
        </div>
        <div className={`risk-pill ${levelClass}`}>{diagnosis.level}</div>
      </div>

      <div className="score-row">
        <div className={`score-circle ${levelClass}`}>{diagnosis.index}</div>
        <div>
          <h3>{diagnosis.recommendation.action}</h3>
          <p>{diagnosis.aiExplanation?.text}</p>
        </div>
      </div>

      <div className="weather-box">
        <strong>Clima usado por el motor</strong>
        <span>{diagnosis.weather.location} · {diagnosis.weather.temperatureC} °C · lluvia 7 días: {diagnosis.weather.rainfallLast7DaysMm} mm · pronóstico 3 días: {diagnosis.weather.rainForecast3DaysMm} mm</span>
        <small>Fuente: {diagnosis.weather.source}. {diagnosis.weather.limitation}</small>
      </div>

      <div className="section-heading compact">
        <p>Trazabilidad</p>
        <h2>Variables ponderadas</h2>
      </div>

      <div className="factor-list">
        {diagnosis.traceability.factors.map((factor) => (
          <div className="factor-item" key={factor.key}>
            <div>
              <strong>{factor.label}</strong>
              <small>Fuente: {factor.source} · Peso: {Math.round(factor.weight * 100)}%</small>
            </div>
            <span className={`factor-score ${factorClass(factor.score)}`}>{factor.score}</span>
          </div>
        ))}
      </div>

      <div className="warning-list">
        {diagnosis.warnings.map((warning) => (
          <p key={warning}>⚠️ {warning}</p>
        ))}
      </div>
    </section>
  );
}
