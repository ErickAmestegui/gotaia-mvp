const cropOptions = [
  ['soya', 'Soya'],
  ['maiz', 'Maíz'],
  ['arroz', 'Arroz'],
  ['cana', 'Caña de azúcar'],
  ['hortalizas', 'Hortalizas']
];

const soilOptions = [
  ['arenoso', 'Arenoso'],
  ['franco', 'Franco'],
  ['arcilloso', 'Arcilloso']
];

const stageOptions = [
  ['inicial', 'Inicial'],
  ['vegetativo', 'Vegetativo'],
  ['floracion', 'Floración'],
  ['fructificacion', 'Fructificación / llenado'],
  ['maduracion', 'Maduración']
];

function Field({ label, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

export default function DiagnosisForm({ form, setForm, onSubmit, loading }) {
  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <form className="card form-card" onSubmit={onSubmit}>
      <div className="section-heading">
        <p>Entrada de datos</p>
        <h2>Diagnóstico del productor</h2>
      </div>

      <Field label="Productor / parcela">
        <input value={form.farmerName} onChange={(e) => update('farmerName', e.target.value)} required />
      </Field>

      <Field label="Municipio o comunidad">
        <input value={form.location} onChange={(e) => update('location', e.target.value)} required />
      </Field>

      <div className="two-cols">
        <Field label="Cultivo">
          <select value={form.crop} onChange={(e) => update('crop', e.target.value)}>
            {cropOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </Field>

        <Field label="Hectáreas">
          <input type="number" min="0.1" step="0.1" value={form.hectares} onChange={(e) => update('hectares', e.target.value)} required />
        </Field>
      </div>

      <div className="two-cols">
        <Field label="Tipo de suelo">
          <select value={form.soilType} onChange={(e) => update('soilType', e.target.value)}>
            {soilOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </Field>

        <Field label="Etapa del cultivo">
          <select value={form.cropStage} onChange={(e) => update('cropStage', e.target.value)}>
            {stageOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </Field>
      </div>

      <div className="two-cols">
        <Field label="Días desde último riego">
          <input type="number" min="0" value={form.daysSinceLastIrrigation} onChange={(e) => update('daysSinceLastIrrigation', e.target.value)} required />
        </Field>

        <Field label="Frecuencia usual de riego (días)">
          <input type="number" min="1" value={form.irrigationFrequencyDays} onChange={(e) => update('irrigationFrequencyDays', e.target.value)} required />
        </Field>
      </div>

      <div className="two-cols">
        <Field label="Horas por evento de riego">
          <input type="number" min="0" step="0.1" value={form.irrigationHoursPerEvent} onChange={(e) => update('irrigationHoursPerEvent', e.target.value)} required />
        </Field>

        <Field label="Costo energético Bs/hora">
          <input type="number" min="0" step="0.1" value={form.energyCostPerHour} onChange={(e) => update('energyCostPerHour', e.target.value)} required />
        </Field>
      </div>

      <Field label="Caudal estimado L/min (opcional)">
        <input type="number" min="0" step="0.1" value={form.estimatedFlowLpm} onChange={(e) => update('estimatedFlowLpm', e.target.value)} placeholder="Dejar vacío si no hay caudal declarado" />
      </Field>

      <Field label="Notas">
        <textarea rows="3" value={form.notes} onChange={(e) => update('notes', e.target.value)} />
      </Field>

      <button className="primary-button" disabled={loading}>
        {loading ? 'Procesando...' : 'Calcular Índice GOTAIA'}
      </button>
    </form>
  );
}
