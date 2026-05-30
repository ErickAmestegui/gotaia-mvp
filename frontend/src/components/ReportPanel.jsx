export default function ReportPanel({ diagnosis, report, loading, onGenerate, onDownload }) {
  const impact = diagnosis.impact;

  return (
    <section className="card report-card">
      <div className="section-heading compact">
        <p>Triple impacto estimado</p>
        <h2>Reporte y ahorro operativo</h2>
      </div>

      <div className="impact-grid">
        <div>
          <span>Horas optimizables</span>
          <strong>{impact.potentialPumpHoursOptimized} h</strong>
        </div>
        <div>
          <span>Ahorro estimado</span>
          <strong>Bs {impact.estimatedCostSavingBs}</strong>
        </div>
        <div>
          <span>Agua estimada</span>
          <strong>{impact.estimatedWaterSavedLiters === null ? 'Sin caudal' : `${impact.estimatedWaterSavedLiters} L`}</strong>
        </div>
      </div>

      <p className="muted">{impact.basis}</p>

      <div className="button-row">
        <button className="secondary-button" disabled={loading} onClick={onGenerate}>
          {loading ? 'Generando...' : 'Generar reporte'}
        </button>
        <button className="ghost-button" disabled={!report} onClick={onDownload}>
          Descargar .md
        </button>
      </div>

      {report && (
        <pre className="report-preview">{report.markdown}</pre>
      )}
    </section>
  );
}
