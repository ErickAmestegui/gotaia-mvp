**GOTAIA**

**Sistema de software para apoyo a decisiones de riego en pequeños productores de Santa Cruz**

*Documento técnico corregido: delimitación de alcance software, IA verificable y arquitectura auditable*

Hackathon Build With AI 2026 | Santa Cruz de la Sierra - Bolivia

|**Mención oficial seleccionada**<br>AGRO como categoría principal. AGUA y ENERGÍA se integran únicamente como variables de impacto estimado: uso eficiente del recurso hídrico y reducción potencial de horas/costo de bombeo. El MVP no mide físicamente el clima, humedad, caudal ni consumo eléctrico; procesa datos declarados, datos mock y datos obtenidos mediante APIs o fuentes digitales configuradas.|
| :- |
# **1. RESUMEN EJECUTIVO CORREGIDO**
GOTAIA es una plataforma de software con Inteligencia Artificial orientada a apoyar decisiones de riego en pequeños productores, cooperativas y asociaciones agrícolas del departamento de Santa Cruz. El sistema se delimita estrictamente al análisis, procesamiento y presentación de datos. No se presenta como un dispositivo de medición física, no mide humedad del suelo por sí solo, no controla bombas, no activa válvulas y no reemplaza estudios agronómicos de campo.

En el MVP, GOTAIA procesa datos ingresados por el usuario, datos climáticos consultados por API o datasets simulados controlados, y parámetros agrícolas previamente definidos. Con esa información calcula un Índice GOTAIA de Riesgo Hídrico, genera una recomendación operativa inicial y presenta indicadores estimados de impacto. La Inteligencia Artificial se usa como capa explicativa y de generación de reporte, no como fuente autónoma de decisiones técnicas.

|**Elemento**|**Definición corregida para competencia**|
| :-: | :-: |
|Problema|Decisiones de riego tomadas con información limitada, sin apoyo digital simple y sin trazabilidad de criterios.|
|Alcance del software|Recibir, validar, normalizar, ponderar y procesar datos; calcular un índice; generar recomendaciones iniciales; visualizar resultados y reportes.|
|Fuera del alcance del MVP|Medición directa de humedad, caudal, presión, consumo eléctrico, accionamiento de bombas/válvulas o cálculo agronómico definitivo sin sensores y pruebas de suelo.|
|Usuario principal|Pequeños productores agrícolas de Santa Cruz y técnicos de cooperativas o asociaciones.|
|Cliente inicial|Cooperativas, asociaciones productivas, municipios, empresas agro, proveedores de riego/insumos e instituciones de apoyo productivo.|
|Solución|Motor de decisión + dashboard + reporte + explicación IA, con reglas auditables y datos controlados.|
|MVP demostrable|Formulario, dataset, motor de riesgo, dashboard, recomendación, reporte, manejo de errores y modo demo offline.|
# **2. ALINEACIÓN CON BASES Y LINEAMIENTOS DEL EVENTO**

|**Exigencia**|**Adaptación corregida de GOTAIA**|
| :-: | :-: |
|Problemática real de Santa Cruz|Se enfoca en riego agrícola y eficiencia hídrica/energética en productores del departamento. La validación local se plantea mediante entrevistas rápidas con productores, agrónomos o cooperativas.|
|Mención oficial|AGRO. AGUA y ENERGÍA se consideran impactos medibles dentro del caso de uso de riego.|
|Uso de IA|IA generativa limitada a explicación, reporte y asistente textual. No inventa datos físicos ni calcula por sí sola el riego.|
|MVP funcional|Aplicación web con flujo completo: registro, cálculo, visualización, recomendación y reporte.|
|Repositorio GitHub|Código, README, integrantes, arquitectura, instrucciones de ejecución, capturas, tests y datos mock.|
|FODA, PESTEL, Lean Canvas y financiero|Incluidos y ajustados al alcance real de software.|
|Pitch|Problema local, usuario, solución de software, demo, tecnología, impacto estimado y próximos pasos.|
# **3. PROBLEMA IDENTIFICADO**
En Santa Cruz, una parte de la producción agrícola toma decisiones de riego con información limitada, usando calendario fijo, percepción visual o experiencia previa. Esto puede producir riegos innecesarios, gasto adicional de energía o combustible para bombeo y dificultad para anticipar escenarios de sequía, calor o lluvias. El problema específico que aborda GOTAIA no es medir el campo físicamente desde cero, sino transformar información disponible en una recomendación digital inicial y trazable.

Formulación técnica del problema: los pequeños productores y cooperativas agrícolas de Santa Cruz necesitan una herramienta de software accesible que les permita registrar información de parcela, procesar datos climáticos digitales o simulados, aplicar reglas de riesgo y generar recomendaciones iniciales para mejorar decisiones de riego.

|**Delimitación crítica**<br>GOTAIA no afirma conocer la humedad real del suelo sin sensores. Cuando no exista sensor o prueba de suelo, el resultado será una estimación de riesgo basada en variables declaradas, datos climáticos digitales y reglas de decisión.|
| :- |
# **4. USUARIO Y BENEFICIARIO**

|**Perfil**|**Necesidad**|**Valor que recibe**|
| :-: | :-: | :-: |
|Pequeño productor agrícola|Decidir si debe regar, esperar o revisar el suelo antes de bombear.|Recomendación clara, semáforo de riesgo y reporte simple.|
|Técnico de cooperativa/asociación|Revisar varios diagnósticos y priorizar asistencia.|Panel de seguimiento y reportes por productor/parcela.|
|Municipio o institución|Apoyar programas de eficiencia hídrica y productiva.|Datos agregados para identificar zonas o cultivos con mayor riesgo.|
|Proveedor de riego/insumos|Ofrecer valor agregado a clientes.|Herramienta digital asociada a servicio técnico o asesoría.|
# **5. SOLUCIÓN PROPUESTA CON ALCANCE REALISTA**
GOTAIA funciona como un sistema de apoyo a la decisión. El usuario registra datos agrícolas y operativos. El software valida esos datos, los normaliza, consulta o simula variables climáticas y calcula un índice de riesgo hídrico. Después presenta una recomendación inicial y un reporte explicativo. La recomendación es una guía de decisión, no una orden automática ni una medición física directa.

|**Paso**|**Qué hace el software**|**Qué NO hace**|
| :-: | :-: | :-: |
|1\. Registro|Captura datos de municipio, cultivo, hectáreas, suelo, etapa, frecuencia de riego, horas de bombeo y costo energético estimado.|No verifica físicamente si esos datos son reales sin validación externa.|
|2\. Datos climáticos|Consume API climática, dataset controlado o fuente digital configurada; normaliza lluvia, temperatura y condición esperada.|No mide clima local con sensores propios en el MVP.|
|3\. Motor de riesgo|Aplica reglas ponderadas y calcula el Índice GOTAIA 0-100.|No calcula una lámina exacta de riego sin datos de humedad, caudal y pruebas de suelo.|
|4\. IA explicativa|Convierte resultados calculados en explicación clara y reporte.|No inventa variables ni sustituye al motor técnico.|
|5\. Dashboard|Visualiza semáforo, riesgo, recomendación, trazabilidad y estimación de impacto.|No acciona bombas ni equipos de campo.|
# **6. MATRIZ DE ALCANCE: SOFTWARE, HARDWARE Y FUTURO**

|**Componente**|**MVP de software**|**Requiere hardware / piloto**|**Decisión**|
| :-: | :-: | :-: | :-: |
|Clima|API climática, dataset mock, normalización y ponderación por municipio.|Estaciones meteorológicas propias o sensores locales.|Incluido solo como dato digital procesado.|
|Humedad del suelo|Dato manual declarado o valor simulado para demo.|Sensor de humedad, calibración por tipo de suelo y ubicación real.|No se promete medición en MVP. Integración futura.|
|Cantidad exacta de agua|Estimación operativa basada en escenarios y reglas.|Caudal real, presión, eficiencia de riego, pruebas de suelo y cultivo.|No se vende como cálculo definitivo.|
|Bombeo|Registro de horas y costo estimado; cálculo de ahorro por reducción de horas.|Medidor eléctrico, caudalímetro o integración con tablero/bomba.|No controla bombas en MVP.|
|Alertas|Notificaciones visuales en dashboard y reporte.|WhatsApp/SMS o sistema de alertamiento en campo.|Demo interna; canales externos en roadmap.|
|IA|Explicación, reporte y asistente del diagnóstico calculado.|No aplica como hardware.|Incluida con límites de prompt y datos cerrados.|
# **7. ALCANCE DEL MVP**

|**Módulo**|**Función en el MVP**|**Evidencia para jurado**|
| :-: | :-: | :-: |
|Diagnóstico del productor|Formulario con datos agrícolas y operativos obligatorios y validaciones.|Datos guardados y usados por el motor.|
|Gestor de datos climáticos|Obtención por API o lectura de mock\_weather.json; normalización de variables.|Respuesta visible y fallback funcional.|
|Motor de riesgo|Cálculo del Índice GOTAIA 0-100 con reglas trazables.|Resultado reproducible y explicable.|
|Dashboard|Semáforo, recomendación, variables usadas y métricas de impacto estimado.|Pantalla funcional y entendible.|
|Reporte|Resumen técnico visualizable o descargable.|Documento generado con datos del diagnóstico.|
|IA explicativa|Genera explicación con variables calculadas, sin datos inventados.|Prompt controlado y salida coherente.|
|Modo demo offline|Dataset mock de clima, cultivos y suelos.|Demo estable aunque falle internet/API.|
# **8. ARQUITECTURA TECNOLÓGICA**

|**Capa**|**Tecnología sugerida**|**Responsabilidad**|
| :-: | :-: | :-: |
|Frontend|React / Next.js / Vite|Interfaz del usuario, formulario, dashboard y reporte.|
|Backend|Node.js / Express o Python / FastAPI|Validación, endpoints, lógica de negocio, motor de riesgo y manejo de errores.|
|Base de datos|Supabase / Firebase / SQLite|Productores, parcelas, diagnósticos, cultivos, reportes y auditoría de cálculos.|
|Motor de reglas|Módulo propio en backend|Normaliza variables, aplica ponderaciones y calcula el Índice GOTAIA.|
|IA|OpenAI API / Gemini / modelo open-source|Explicación, resumen y reporte; no fuente primaria del cálculo.|
|Datos externos|API climática o dataset simulado|Temperatura, lluvia esperada, condición climática por municipio/comunidad.|
|Repositorio|GitHub público|Código, README, documentación, capturas, tests e instrucciones.|
|**Arquitectura lógica**<br>Entrada manual + API/mock -> validación -> normalización/ecualización de variables -> motor de reglas -> Índice GOTAIA -> IA explicativa -> dashboard + reporte.|||
# **9. ENDPOINTS Y FUNCIONALIDAD MÍNIMA**

|**Endpoint**|**Método**|**Función**|**Control mínimo**|
| :-: | :-: | :-: | :-: |
|/farmer-profile|POST|Registra datos del productor y parcela.|Valida campos obligatorios y rangos.|
|/weather/:location|GET|Obtiene clima por API o mock según disponibilidad.|Fallback a mock\_weather.json.|
|/irrigation-diagnosis|POST|Calcula riesgo hídrico con los datos disponibles.|Devuelve variables usadas y puntaje.|
|/recommendation/:farmId|GET|Devuelve recomendación y explicación.|No genera recomendación si faltan datos críticos.|
|/impact-report/:farmId|GET|Genera reporte de impacto estimado.|Marca los resultados como estimaciones.|
# **10. MANEJO DE DATOS CLIMÁTICOS**
Para evitar ambigüedad, GOTAIA no “mide el clima”. El software procesa datos climáticos obtenidos desde una API, un dataset local o un conjunto de datos mock para la demostración. El proceso técnico consiste en recibir variables, validar formato, convertir unidades cuando sea necesario, normalizar rangos y ponderar su efecto dentro del Índice GOTAIA.

|**Variable climática**|**Fuente en MVP**|**Tratamiento de software**|**Limitación**|
| :-: | :-: | :-: | :-: |
|Temperatura|API o mock|Normalización por rangos y ponderación de estrés térmico.|No representa microclima exacto de la parcela.|
|Lluvia esperada/reciente|API o mock|Clasificación de déficit o disponibilidad probable.|No confirma humedad real del suelo.|
|Condición climática|API o mock|Etiqueta de apoyo para explicar riesgo: seco, lluvia, calor, etc.|No reemplaza pronóstico oficial ni medición local.|
|Ubicación|Municipio/comunidad ingresada por usuario|Mapeo a datos disponibles por zona.|Precisión depende de cobertura de la fuente.|
# **11. LÓGICA DE RIEGO Y LÍMITES DEL CÁLCULO**
El MVP no calcula de forma definitiva la cantidad exacta de agua que necesita una parcela. Para calcular una necesidad hídrica real se requieren datos físicos y agronómicos: humedad actual, textura y capacidad de retención del suelo, etapa fenológica, profundidad radicular, caudal del sistema, eficiencia de aplicación y pruebas de campo. Por tanto, GOTAIA trabaja como una herramienta de riesgo y recomendación inicial.

|**Nivel**|**Datos disponibles**|**Resultado permitido**|**Precisión**|
| :-: | :-: | :-: | :-: |
|Nivel 1 - MVP|Datos declarados + API/mock + reglas generales.|Índice de riesgo y recomendación inicial.|Estimativa, útil para demo y decisión preliminar.|
|Nivel 2 - Piloto|Sensores de humedad + datos históricos + pruebas de suelo.|Ajuste más preciso de recomendación.|Mayor precisión tras calibración.|
|Nivel 3 - Operación avanzada|Sensores, caudal, historial, validación agronómica y predicción.|Plan de riego y seguimiento por parcela.|Precisión operativa con medición real.|
|**Frase de defensa ante jurado**<br>El MVP no pretende “adivinar” agua. Calcula riesgo y sugiere acciones a partir de datos disponibles. La recomendación exacta de volumen requiere integración con sensores, pruebas de suelo y calibración de campo.||||
# **12. ÍNDICE GOTAIA DE RIESGO HÍDRICO**
El Índice GOTAIA es un algoritmo propio, simple y auditable. Su objetivo es clasificar el nivel de riesgo hídrico, no determinar una dosis exacta de riego. Cada variable se normaliza en una escala interna y luego se pondera. El resultado final se expresa entre 0 y 100.

|**Variable**|**Peso sugerido**|**Origen del dato**|**Descripción corregida**|
| :-: | :-: | :-: | :-: |
|Temperatura / calor|20%|API/mock|Mayor temperatura aumenta el riesgo estimado de estrés hídrico.|
|Lluvia esperada o reciente|20%|API/mock|Menor lluvia disponible incrementa el riesgo estimado.|
|Días desde último riego|15%|Usuario|Más días sin riego incrementan riesgo, sujeto a tipo de suelo y cultivo.|
|Tipo de cultivo|15%|Catálogo interno|Cada cultivo tiene sensibilidad definida en tabla de parámetros.|
|Tipo de suelo|10%|Usuario/catálogo|Se usa como proxy; requiere prueba de suelo para precisión real.|
|Etapa del cultivo|10%|Usuario/catálogo|Etapas sensibles reciben ponderación adicional.|
|Horas/frecuencia actual de riego|10%|Usuario|Permite detectar posible exceso o déficit operativo.|
|**Puntaje**|**Nivel**|**Acción recomendada**||
|0 - 35|Bajo|No programar riego adicional sin revisar suelo; monitorear clima y estado del cultivo.||
|36 - 70|Medio|Revisar suelo y programar riego moderado si el cultivo está en etapa sensible o no se espera lluvia.||
|71 - 100|Alto|Priorizar revisión de campo y riego temprano si la validación del productor confirma necesidad.||
# **13. APLICACIÓN DE INTELIGENCIA ARTIFICIAL**
La IA se usa de forma controlada. El backend entrega a la IA un paquete cerrado con datos calculados: puntaje, nivel, variables usadas, advertencias y límites. La IA no accede a datos inventados, no decide por sí misma y no modifica el resultado del motor de reglas. Su función es traducir la salida técnica a lenguaje comprensible.

|**Uso de IA**|**Control aplicado**|**Valor para la competencia**|
| :-: | :-: | :-: |
|Explicación de recomendación|Prompt con variables calculadas, límites y prohibición de inventar datos.|Hace entendible la salida técnica.|
|Generación de reporte|Usa solo diagnóstico, índice y variables registradas.|Mejora presentación y entregable.|
|Asistente de consulta|Responde únicamente sobre el diagnóstico generado.|Agrega utilidad sin falsificar capacidades.|
|Clasificación textual|Interpreta el índice ya calculado.|Evita caja negra y refuerza auditabilidad.|
|**Defensa técnica**<br>La IA no inventa el riego. El motor de reglas calcula el índice; la IA explica el resultado, muestra límites y genera un reporte entendible.|||
# **14. TRIPLE IMPACTO E INDICADORES MEDIBLES**

|**Dimensión**|**Impacto esperado**|**Indicador en MVP**|**Advertencia de alcance**|
| :-: | :-: | :-: | :-: |
|Económico|Reducir gasto operativo estimado por bombeo.|Horas de bombeo potencialmente reducidas y ahorro estimado en Bs.|Estimación por escenarios, no resultado de campo.|
|Ambiental|Promover uso responsable de agua y energía.|Volumen/tiempo de riego optimizado y menor consumo estimado.|No mide litros reales sin caudalímetro.|
|Social|Facilitar acceso a apoyo digital para pequeños productores.|Número de diagnósticos, parcelas registradas y recomendaciones entregadas.|La adopción requiere validación con usuarios reales.|

Durante el pitch debe declararse explícitamente que los porcentajes o ahorros del MVP son estimaciones iniciales calculadas por escenarios, no resultados definitivos de una prueba de campo.
# **15. MODELO DE NEGOCIO**
El modelo recomendado es B2B2C: una institución, cooperativa, municipio o empresa agro paga por la plataforma y el productor recibe el beneficio. Esto es más realista que depender de pagos individuales de pequeños productores desde el inicio.

|**Plan**|**Cliente objetivo**|**Qué incluye**|**Ingreso posible**|
| :-: | :-: | :-: | :-: |
|Básico|Asociación pequeña o comunidad|Diagnóstico, recomendación y reporte básico.|Suscripción mensual o pago por campaña.|
|Pro|Cooperativa agrícola|Dashboard, historial, reportes y alertas.|Licencia mensual/anual por cantidad de productores.|
|Institucional|Municipio, ONG, gobernación o empresa agro|Panel multiusuario, indicadores, soporte y capacitación.|Licencia anual + implementación.|
# **16. ANÁLISIS FINANCIERO INICIAL**

|**Concepto**|**Costo/ingreso estimado**|**Comentario**|
| :-: | :-: | :-: |
|Desarrollo MVP|Trabajo del equipo durante hackathon|Costo hundido para validación.|
|Hosting/API|Bs 0 - 350/mes inicial|Uso de planes gratuitos o bajo costo.|
|Soporte/capacitación|Variable|Servicio de implementación para cooperativas o instituciones.|
|Plan cooperativa pequeña|Bs 300 - 800/mes|Monitoreo de grupo reducido de productores.|
|Plan institucional|Bs 3.000 - 12.000/año|Licencia y acompañamiento según alcance.|

Los valores son referenciales. Deben validarse con entrevistas, costos reales de API/hosting y disposición de pago de cooperativas o instituciones.
# **17. ANÁLISIS FODA AJUSTADO AL ALCANCE SOFTWARE**

|**Fortalezas**|**Oportunidades**|
| :-: | :-: |
|Motor propio de riesgo; bajo costo de entrada; IA explicativa controlada; dashboard demostrable; no depende de hardware para el MVP.|Interés en eficiencia hídrica; adopción por cooperativas o municipios; escalabilidad futura con sensores y WhatsApp; aplicabilidad local en Santa Cruz.|
|**Debilidades**|**Amenazas**|
|Sin sensores, la precisión es estimativa; depende de datos ingresados; requiere validación con productores reales; puede parecer app climática si no se muestra el algoritmo.|Competencia con plataformas agrícolas; baja conectividad rural; baja adopción si el canal no es simple; críticas si se prometen ahorros no comprobados.|
# **18. ANÁLISIS PESTEL**

|**Factor**|**Análisis aplicado**|
| :-: | :-: |
|Político|Puede alinearse con programas departamentales o municipales de apoyo productivo, adaptación climática y eficiencia hídrica.|
|Económico|El productor enfrenta costos por bombeo, combustible/energía y decisiones de riego ineficientes.|
|Social|La adopción requiere lenguaje simple, semáforo visual, reportes breves y futuro canal WhatsApp.|
|Tecnológico|APIs, bases de datos, dashboards, IA explicativa y futura integración con sensores hacen viable la escalabilidad.|
|Ambiental|El sistema puede apoyar decisiones preventivas para reducir presión sobre agua y energía, siempre como estimación de software.|
|Legal|Debe manejar datos con consentimiento y evitar presentarse como sustituto de asesoramiento agronómico profesional o medición certificada.|
# **19. LEAN CANVAS**

|**Bloque**|**Contenido corregido**|
| :-: | :-: |
|Problema|Riego por intuición, falta de trazabilidad de decisión, gasto operativo por bombeo y dificultad para anticipar riesgo hídrico.|
|Segmentos de cliente|Cooperativas, asociaciones, municipios, empresas agro; usuario final: pequeño productor.|
|Propuesta de valor|Software de apoyo a decisión de riego con índice auditable, dashboard simple y explicación IA controlada.|
|Solución|Formulario, API/mock climático, motor de riesgo, dashboard, recomendación y reporte.|
|Canales|Web, cooperativas, municipios, ferias agro, proveedores de riego y WhatsApp futuro.|
|Ingresos|Suscripción, licencia anual, implementación, capacitación y reportes institucionales.|
|Costos|Desarrollo, hosting, APIs, soporte, validación con usuarios y futura integración de hardware.|
|Métricas clave|Diagnósticos generados, parcelas registradas, reportes emitidos, estimaciones de horas de bombeo optimizadas.|
|Ventaja diferencial|Alcance claro de software, enfoque local Santa Cruz, motor propio, IA explicativa y escalabilidad gradual.|
# **20. ESTRATEGIA PARA MAXIMIZAR PUNTAJE**

|**Criterio**|**Cómo se defiende sin sobreprometer**|
| :-: | :-: |
|Impacto y relevancia|Problema local, usuario claro y métricas estimadas de agua/energía/costo.|
|Calidad técnica de IA|IA controlada por datos calculados, prompt limitado y motor de reglas separado.|
|Innovación|Índice GOTAIA y traducción de datos dispersos en decisión operativa simple.|
|Integración de APIs/agentes/librerías|API climática/mock, IA generativa, backend, dashboard y reporte.|
|FODA/PESTEL/Lean Canvas|Análisis alineados al alcance real y al modelo B2B2C.|
|Escalabilidad|Roadmap realista: sensores, WhatsApp, panel cooperativo y calibración de campo.|
|Pitch|Problema humano + demo funcional + arquitectura + límites técnicos claros.|
|Bonus|Modo offline, tests mínimos, README profesional y reporte descargable.|
# **21. REPOSITORIO GITHUB Y README**
Estructura recomendada:

gotaia/\
├── frontend/\
├── backend/\
├── data/\
│   ├── cultivos.json\
│   ├── suelos.json\
│   └── mock\_weather.json\
├── docs/\
│   ├── documento\_tecnico.pdf\
│   └── lean\_canvas.pdf\
├── tests/\
├── README.md\
└── demo.md

- Todos los integrantes deben figurar como colaboradores.
- README con problema, alcance, solución, arquitectura, tecnologías, instalación, capturas, demo, impacto y equipo.
- Commits constantes durante el evento para demostrar trabajo real.
- Instrucciones para ejecutar el MVP sin configuración oculta.
- Modo demo con datos mock para evitar fallas si cae la API climática.
# **22. PRUEBAS MÍNIMAS PARA ROBUSTEZ**

|**Prueba**|**Resultado esperado**|
| :-: | :-: |
|Hectáreas negativas, cero o texto inválido.|El sistema rechaza el dato y muestra error.|
|Alta temperatura + sin lluvia + varios días sin riego.|El índice debe clasificar riesgo alto.|
|Datos completos de productor.|Se genera recomendación, dashboard y reporte.|
|API climática no disponible.|El sistema usa mock\_weather.json y no se cae.|
|IA sin respuesta o error de API.|El dashboard muestra la recomendación técnica calculada sin bloquear el flujo.|
|Falta de humedad real del suelo.|El sistema advierte que el resultado es estimativo y recomienda validación de campo.|
# **23. PITCH FINAL CORREGIDO**
Versión de 1 minuto:

En Santa Cruz, muchos pequeños productores toman decisiones de riego con información limitada: calendario fijo, intuición o percepción visual del terreno. Eso puede generar gasto adicional en bombeo, uso ineficiente de agua y menor capacidad para anticipar riesgos de sequía o calor.

Por eso desarrollamos GOTAIA, una plataforma de software que apoya la decisión de riego. El sistema registra datos de la parcela, procesa información climática obtenida por API o dataset controlado y calcula un Índice GOTAIA de Riesgo Hídrico mediante reglas auditables.

Nuestro MVP no promete medir humedad del suelo sin sensores ni calcular litros exactos sin pruebas de campo. Lo que sí hace es entregar un riesgo claro, una recomendación inicial, un reporte y una explicación generada por IA sobre la base del cálculo técnico.

GOTAIA está pensado para productores, cooperativas y municipios que necesitan una herramienta accesible para tomar mejores decisiones, optimizar horas de bombeo y usar con mayor responsabilidad el agua y la energía.
# **24. PREGUNTAS DIFÍCILES DEL JURADO Y RESPUESTAS**

|**Pregunta del jurado**|**Respuesta recomendada**|
| :-: | :-: |
|¿Cómo calculan la recomendación sin sensores?|No calculamos medición exacta sin sensores. En el MVP estimamos riesgo con datos declarados, API/mock climático y reglas. La medición precisa requiere sensores y calibración de campo.|
|¿El software mide el clima?|No. El software consume datos climáticos desde API o dataset controlado, los normaliza y los pondera. No mide el entorno físico directamente.|
|¿Qué hace realmente la IA?|La IA explica el resultado calculado por el motor técnico y genera reportes. No inventa datos ni decide por sí sola.|
|¿Por qué no usar una app de clima?|Una app de clima informa condiciones. GOTAIA cruza clima digital, cultivo, suelo declarado y hábitos de riego para generar un índice de decisión.|
|¿Cómo prueban el impacto?|En el MVP mostramos estimaciones por escenarios: horas de bombeo, costo y uso estimado de agua. En piloto se calibra con mediciones reales.|
|¿Qué pasa si falla la API?|El sistema tiene fallback a mock\_weather.json y manejo de errores para mantener la demo funcional.|
# **25. PRÓXIMOS PASOS**

|**Fase**|**Descripción**|
| :-: | :-: |
|Fase 1 - MVP hackathon|Formulario, API/mock, motor de riesgo, dashboard, IA explicativa, reporte y pruebas mínimas.|
|Fase 2 - Validación local|Entrevistas y pruebas con productores, agrónomos o cooperativas de Santa Cruz.|
|Fase 3 - Calibración de suelo|Incorporar muestras de tierra, textura, capacidad de retención y parámetros por cultivo.|
|Fase 4 - Sensores|Integrar humedad de suelo, caudal, consumo energético y datos reales de campo.|
|Fase 5 - WhatsApp/panel institucional|Enviar recomendaciones por canal accesible y monitorear múltiples productores.|
# **26. FUENTES Y VALIDACIÓN**
- Bases, lineamientos y manual operativo de la Hackathon Build With AI 2026 proporcionados por la organización.
- Documentos internos del equipo: GOTAIA BASE 1 y GOTAIA PUNTOS DÉBILES Y ANÁLISIS COMPLETO.
- Documento técnico adaptado anterior de GOTAIA usado como base de corrección.
- Validación pendiente y recomendada: al menos 3 entrevistas rápidas con productor, agrónomo, mentor agro o representante de cooperativa durante la hackathon.
- Validación técnica futura: sensor de humedad, prueba de suelo, medición de caudal y registro de horas reales de bombeo para calibrar el algoritmo.
GOTAIA | Build With AI 2026 | Documento técnico corregido con alcance software
