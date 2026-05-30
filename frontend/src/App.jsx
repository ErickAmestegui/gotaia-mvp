import { useMemo, useState } from 'react';

const cultivoOptions = [
  'Caña de azúcar',
  'Soya',
  'Maíz',
  'Girasol',
  'Algodón'
];

const tipoSueloOptions = ['Arenoso', 'Franco', 'Arcilloso'];

const etapaOptions = [
  'Germinación',
  'Crecimiento',
  'Floración',
  'Llenado de grano',
  'Maduración'
];

const presetsClimaticos = [
  {
    label: 'Ola de Calor (Seco)',
    municipio: 'San Julián',
    temp: 37,
    lluvia7Dias: 0,
    pronostico3Dias: 0,
    tipo: 'Seco'
  },
  {
    label: 'Tormenta Reciente (Lluvioso)',
    municipio: 'Montero',
    temp: 24,
    lluvia7Dias: 45,
    pronostico3Dias: 12,
    tipo: 'Lluvioso'
  },
  {
    label: 'Clima Templado / Transición',
    municipio: 'Mineros',
    temp: 29,
    lluvia7Dias: 8,
    pronostico3Dias: 3,
    tipo: 'Moderado'
  }
];

export default function App() {
  const [productor, setProductor] = useState('Lote Baldío');
  const [municipio, setMunicipio] = useState('San Julián');
  const [cultivo, setCultivo] = useState('Caña de azúcar');
  const [hectareas, setHectareas] = useState(10);
  const [tipoSuelo, setTipoSuelo] = useState('Arenoso');
  const [etapaCultivo, setEtapaCultivo] = useState('Maduración');
  const [diasUltimoRiego, setDiasUltimoRiego] = useState(5);
  const [frecuenciaRiego, setFrecuenciaRiego] = useState(1);
  const [horasRiego, setHorasRiego] = useState(2);
  const [costoEnergia, setCostoEnergia] = useState(50);
  const [caudalEstimado, setCaudalEstimado] = useState(0);
  const [notas, setNotas] = useState('Diagnóstico inicial de revisión de suelos arenosos con alta evaporación estacional.');
  const [climaEfectivo, setClimaEfectivo] = useState({
    nombre: 'San Julián',
    temp: 35,
    lluvia7Dias: 2,
    pronostico3Dias: 0,
    tipo: 'Seco'
  });
  const [notificacion, setNotificacion] = useState(null);
  const [calculando, setCalculando] = useState(false);

  const triggerToast = (mensaje, tipo = 'success') => {
    setNotificacion({ mensaje, tipo });
    setTimeout(() => setNotificacion(null), 3800);
  };

  const aplicarPresetClima = (preset) => {
    setClimaEfectivo({
      nombre: preset.municipio,
      temp: preset.temp,
      lluvia7Dias: preset.lluvia7Dias,
      pronostico3Dias: preset.pronostico3Dias,
      tipo: preset.tipo
    });
    setMunicipio(preset.municipio);
    triggerToast(`Clima simulado: ${preset.label}`);
  };

  const analisisVariables = useMemo(() => {
    let scoreTemp = 50;
    if (climaEfectivo.temp > 34) scoreTemp = 85;
    else if (climaEfectivo.temp > 28) scoreTemp = 65;
    else scoreTemp = 40;

    let scoreLluvia = 95;
    const totalAguaCielo = climaEfectivo.lluvia7Dias + climaEfectivo.pronostico3Dias * 2;
    if (totalAguaCielo > 30) scoreLluvia = 20;
    else if (totalAguaCielo > 10) scoreLluvia = 55;
    else if (totalAguaCielo > 2) scoreLluvia = 75;

    let scoreDias = 30;
    if (diasUltimoRiego > 6) scoreDias = 95;
    else if (diasUltimoRiego >= 4) scoreDias = 75;
    else if (diasUltimoRiego >= 2) scoreDias = 50;

    let scoreCultivo = 60;
    if (cultivo === 'Caña de azúcar') scoreCultivo = 75;
    else if (cultivo === 'Soya') scoreCultivo = 65;
    else if (cultivo === 'Maíz') scoreCultivo = 70;
    else if (cultivo === 'Arroz') scoreCultivo = 90;
    else if (cultivo === 'Girasol') scoreCultivo = 60;
    else if (cultivo === 'Algodón') scoreCultivo = 55;

    let scoreSuelo = 50;
    if (tipoSuelo === 'Arenoso') scoreSuelo = 85;
    else if (tipoSuelo === 'Franco') scoreSuelo = 60;
    else if (tipoSuelo === 'Arcilloso') scoreSuelo = 40;

    let scoreEtapa = 50;
    if (etapaCultivo === 'Floración' || etapaCultivo === 'Llenado de grano') scoreEtapa = 85;
    else if (etapaCultivo === 'Maduración') scoreEtapa = 55;
    else if (etapaCultivo === 'Crecimiento') scoreEtapa = 65;
    else if (etapaCultivo === 'Germinación') scoreEtapa = 45;

    let scorePractica = 50;
    const volumenDeclarado = horasRiego * (frecuenciaRiego > 0 ? 1 / frecuenciaRiego : 0.5);
    if (volumenDeclarado < 1) scorePractica = 95;
    else if (volumenDeclarado < 2) scorePractica = 70;
    else if (volumenDeclarado >= 4) scorePractica = 35;

    const indiceFinal = Math.round(
      scoreTemp * 0.2 +
      scoreLluvia * 0.2 +
      scoreDias * 0.15 +
      scoreCultivo * 0.15 +
      scoreSuelo * 0.1 +
      scoreEtapa * 0.1 +
      scorePractica * 0.1
    );

    return {
      indice: Math.min(100, Math.max(0, indiceFinal)),
      detalles: [
        { nombre: 'Temperatura / calor', valor: scoreTemp, peso: '20%', origen: 'mock_weather.json' },
        { nombre: 'Lluvia esperada o reciente', valor: scoreLluvia, peso: '20%', origen: 'mock_weather.json' },
        { nombre: 'Días desde último riego', valor: scoreDias, peso: '15%', origen: 'declarado productor' },
        { nombre: `Cultivo: ${cultivo}`, valor: scoreCultivo, peso: '15%', origen: 'catálogo técnico interno' },
        { nombre: `Suelo: ${tipoSuelo}`, valor: scoreSuelo, peso: '10%', origen: 'declarado / catálogo' },
        { nombre: `Etapa: ${etapaCultivo}`, valor: scoreEtapa, peso: '10%', origen: 'declarado / catálogo' },
        { nombre: 'Horas/frecuencia de riego', valor: scorePractica, peso: '10%', origen: 'declarado productor' }
      ]
    };
  }, [climaEfectivo, cultivo, tipoSuelo, etapaCultivo, diasUltimoRiego, frecuenciaRiego, horasRiego]);

  const clasificacion = useMemo(() => {
    const idx = analisisVariables.indice;
    if (idx >= 75) return { etiqueta: 'Riesgo Alto', clase: 'danger', texto: 'Alto' };
    if (idx >= 45) return { etiqueta: 'Riesgo Medio', clase: 'warning', texto: 'Medio' };
    return { etiqueta: 'Riesgo Bajo', clase: 'success', texto: 'Bajo' };
  }, [analisisVariables.indice]);

  const tripleImpacto = useMemo(() => {
    let horasOptimizables = 0;
    let ahorroMonetario = 0;
    let aguaAhorradaLiters = 0;

    const totalAguaCielo = climaEfectivo.lluvia7Dias + climaEfectivo.pronostico3Dias;
    const caudalEfectivo = caudalEstimado > 0 ? caudalEstimado : 120;

    if (totalAguaCielo > 15 && horasRiego > 1) {
      horasOptimizables = Math.round(horasRiego * 0.8 * hectareas * 10) / 10;
      ahorroMonetario = Math.round(horasOptimizables * costoEnergia);
      aguaAhorradaLiters = Math.round(horasOptimizables * 60 * caudalEfectivo);
    } else if (analisisVariables.indice < 45 && horasRiego > 2) {
      horasOptimizables = Math.round(horasRiego * 0.3 * hectareas * 10) / 10;
      ahorroMonetario = Math.round(horasOptimizables * costoEnergia);
      aguaAhorradaLiters = Math.round(horasOptimizables * 60 * caudalEfectivo);
    }

    return {
      horas: horasOptimizables,
      dinero: ahorroMonetario,
      agua: aguaAhorradaLiters
    };
  }, [analisisVariables.indice, climaEfectivo, horasRiego, hectareas, costoEnergia, caudalEstimado]);

  const markdownReporte = useMemo(() => {
    return `# REPORTE GOTAIA - DIAGNÓSTICO DE RIEGO

**Productor/parcela:** ${productor}
**Ubicación:** ${municipio}, Santa Cruz, Bolivia
**Cultivo:** ${cultivo} (${hectareas} Hectáreas)
**Tipo de Suelo:** ${tipoSuelo} | **Etapa:** ${etapaCultivo}

---

## 📊 RESULTADO DEL ANÁLISIS
* **Índice GOTAIA:** ${analisisVariables.indice}/100
* **Nivel de Riesgo Hídrico:** ${clasificacion.etiqueta}

### 💡 Recomendación Técnica:
${analisisVariables.indice >= 75
  ? 'Priorizar de forma inmediata la revisión visual de campo. Se detecta un balance hídrico altamente deficitario debido a la baja precipitación y las características del suelo. Planificar un evento de riego temprano controlado para mitigar el marchitamiento.'
  : analisisVariables.indice >= 45
  ? 'Monitorear la humedad del suelo de forma regular. El balance actual es estable pero con propensión a estrés hídrico si continúan las altas temperaturas sin lluvias previstas.'
  : 'El nivel de humedad estimado es adecuado. Evitar riegos innecesarios para optimizar recursos energéticos y evitar anegamientos perjudiciales.'}

---

## 🌿 TRIPLE IMPACTO ESTIMADO (POTENCIAL DE OPTIMIZACIÓN)
* **Horas de bombeo optimizables:** ${tripleImpacto.horas} h
* **Ahorro operativo estimado:** Bs. ${tripleImpacto.dinero.toLocaleString('es-BO')}
* **Agua conservada:** ${tripleImpacto.agua.toLocaleString('es-BO')} Litros

*Advertencia Técnica: Este reporte es un resultado estimativo basado en reglas agroclimáticas auditables y datos declarados por el productor. No sustituye la inspección de campo directa ni sensores de suelo específicos.*`;
  }, [productor, municipio, cultivo, hectareas, tipoSuelo, etapaCultivo, analisisVariables, clasificacion, tripleImpacto]);

  const ejecutarCalculo = () => {
    setCalculando(true);
    setTimeout(() => {
      setCalculando(false);
      triggerToast('Índice recalculado con éxito usando el motor auditable GOTAIA v2.6');
    }, 800);
  };

  const copiarReporte = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(markdownReporte)
        .then(() => triggerToast('Reporte copiado al portapapeles en formato Markdown.'))
        .catch(() => triggerToast('No se pudo copiar automáticamente.', 'error'));
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = markdownReporte;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      triggerToast('Reporte copiado al portapapeles en formato Markdown.');
    } catch {
      triggerToast('No se pudo copiar de forma automática.', 'error');
    }
    document.body.removeChild(textarea);
  };

  const descargarReporte = () => {
    const archivo = new Blob([markdownReporte], { type: 'text/markdown' });
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(archivo);
    enlace.download = `Reporte_GOTAIA_${productor.replace(/\s+/g, '_')}.md`;
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    triggerToast('Iniciando descarga del archivo .md');
  };

  return (
    <main className="app-shell">
      {notificacion && (
        <div className={`toast ${notificacion.tipo}`}>
          <span>{notificacion.mensaje}</span>
        </div>
      )}

      <section className="hero">
        <div>
          <p className="eyebrow">🌱 Build With AI 2026 · Agro Bolivia</p>
          <h1>GOTAIA MVP</h1>
          <p className="hero-copy">
            Plataforma inteligente de decisiones de riego para pequeños productores de Santa Cruz.
            Calcula riesgos hídricos con reglas claras, clima simulado y datos declarados.
          </p>
          <div className="scope-warning">
            MVP: sin sensores físicos, sin control de bombas y sin dependencias externas de datos en tiempo real.
          </div>
        </div>
        <div className="status-card">
          <span>Alcance</span>
          <strong>Prototipo orientado a diagnóstico</strong>
          <small>Auditable, explicativo y diseñado para MVP.</small>
        </div>
      </section>

      <section className="card climate-bar">
        <div className="section-heading">
          <p>Simulación de Clima</p>
          <h2>Escenarios predefinidos</h2>
        </div>
        <div className="preset-buttons">
          {presetsClimaticos.map((preset) => (
            <button
              key={preset.label}
              type="button"
              className={`preset-button ${climaEfectivo.nombre === preset.municipio ? 'active' : ''}`}
              onClick={() => aplicarPresetClima(preset)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </section>

      <section className="layout-grid">
        <section className="card form-card">
          <div className="section-heading">
            <p>Entrada de datos</p>
            <h2>Diagnóstico del productor</h2>
          </div>

          <div className="field-group">
            <label className="field">
              <span>Productor / Parcela</span>
              <input value={productor} onChange={(e) => setProductor(e.target.value)} />
            </label>
            <label className="field">
              <span>Municipio o comunidad</span>
              <input value={municipio} onChange={(e) => setMunicipio(e.target.value)} />
            </label>
          </div>

          <div className="field-group">
            <label className="field">
              <span>Cultivo</span>
              <select value={cultivo} onChange={(e) => setCultivo(e.target.value)}>
                {cultivoOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
            <label className="field">
              <span>Hectáreas</span>
              <input type="number" min="1" value={hectareas} onChange={(e) => setHectareas(Number(e.target.value))} />
            </label>
          </div>

          <div className="field-group">
            <label className="field">
              <span>Tipo de suelo</span>
              <select value={tipoSuelo} onChange={(e) => setTipoSuelo(e.target.value)}>
                {tipoSueloOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
            <label className="field">
              <span>Etapa del cultivo</span>
              <select value={etapaCultivo} onChange={(e) => setEtapaCultivo(e.target.value)}>
                {etapaOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
          </div>

          <div className="field-group">
            <label className="field">
              <span>Días desde último riego</span>
              <input type="number" min="0" value={diasUltimoRiego} onChange={(e) => setDiasUltimoRiego(Number(e.target.value))} />
            </label>
            <label className="field">
              <span>Frecuencia habitual (días)</span>
              <input type="number" min="1" value={frecuenciaRiego} onChange={(e) => setFrecuenciaRiego(Number(e.target.value))} />
            </label>
          </div>

          <div className="field-group">
            <label className="field">
              <span>Horas por riego</span>
              <input type="number" min="1" value={horasRiego} onChange={(e) => setHorasRiego(Number(e.target.value))} />
            </label>
            <label className="field">
              <span>Costo energía (Bs/h)</span>
              <input type="number" min="1" value={costoEnergia} onChange={(e) => setCostoEnergia(Number(e.target.value))} />
            </label>
          </div>

          <label className="field">
            <span>Caudal estimado L/min <small>(Opcional)</small></span>
            <input type="number" min="0" value={caudalEstimado} onChange={(e) => setCaudalEstimado(Number(e.target.value))} placeholder="120 L/min si se deja vacío" />
          </label>

          <label className="field">
            <span>Notas adicionales / bitácora</span>
            <textarea rows="4" value={notas} onChange={(e) => setNotas(e.target.value)} />
          </label>

          <button className="primary-button" type="button" onClick={ejecutarCalculo} disabled={calculando}>
            {calculando ? 'Procesando reglas...' : 'Recalcular índice GOTAIA'}
          </button>
        </section>

        <div className="right-column">
          <section className="card result-card">
            <div className="section-heading">
              <p>Resultado</p>
              <h2>Índice hídrico GOTAIA</h2>
            </div>
            <div className="score-grid">
              <div className="gauge-ring">
                <div className={`score-circle ${clasificacion.clase}`}>{analisisVariables.indice}</div>
              </div>
              <div>
                <div className={`badge ${clasificacion.clase}`}>{clasificacion.etiqueta}</div>
                <p className="result-copy">
                  El motor calcula un índice de <strong>{analisisVariables.indice}/100</strong> y clasifica el riesgo como <strong>{clasificacion.etiqueta.toLowerCase()}</strong>.
                </p>
                <p className="result-copy">
                  Escenario: {climaEfectivo.nombre} · {climaEfectivo.temp}°C · lluvia 7d {climaEfectivo.lluvia7Dias}mm · pronóstico 3d {climaEfectivo.pronostico3Dias}mm.
                </p>
              </div>
            </div>
          </section>

          <section className="card trace-card">
            <div className="section-heading compact">
              <p>Trazabilidad</p>
              <h2>Variables ponderadas</h2>
            </div>
            <div className="factor-list">
              {analisisVariables.detalles.map((item) => (
                <div key={item.nombre} className="factor-item">
                  <div>
                    <strong>{item.nombre}</strong>
                    <small>Fuente: {item.origen} · Peso: {item.peso}</small>
                  </div>
                  <span className={`factor-score ${item.valor >= 75 ? 'danger' : item.valor >= 45 ? 'warning' : 'success'}`}>{item.valor}</span>
                </div>
              ))}
            </div>
            <div className="mini-note success-note">
              Este MVP no reemplaza la inspección de campo ni medición física de humedad.
            </div>
            <div className="mini-note warning-note">
              Usa este reporte para priorizar campo y planificar riegos con mejor criterio.
            </div>
          </section>

          <section className="card impact-card">
            <div className="section-heading compact">
              <p>Triple impacto estimado</p>
              <h2>Ahorro operativo y agua</h2>
            </div>
            <div className="impact-grid">
              <div>
                <span>Horas optimizables</span>
                <strong>{tripleImpacto.horas} h</strong>
              </div>
              <div>
                <span>Ahorro estimado</span>
                <strong>Bs {tripleImpacto.dinero}</strong>
              </div>
              <div>
                <span>Agua conservada</span>
                <strong>{tripleImpacto.agua} L</strong>
              </div>
            </div>
            <p className="muted">Estimaciones basadas en reglas de escenario. No es medición física directa.</p>
          </section>

          <section className="card report-card">
            <div className="section-heading compact">
              <p>Generador de reporte</p>
              <h2>Exporta en Markdown</h2>
            </div>
            <div className="button-row">
              <button className="secondary-button" type="button" onClick={copiarReporte}>Copiar reporte</button>
              <button className="ghost-button" type="button" onClick={descargarReporte}>Descargar .md</button>
            </div>
            <pre className="report-preview">{markdownReporte}</pre>
          </section>
        </div>
      </section>

      <footer className="footer-card">
        <p>© 2026 GOTIA - Soluciones Agrícolas Sostenibles para Santa Cruz de la Sierra, Bolivia.</p>
        <p>Motor de diagnóstico basado en reglas agroclimáticas auditables y datos declarados.</p>
      </footer>
    </main>
  );
}
