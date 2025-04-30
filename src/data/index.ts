export const dataTypeOptions = [
  {value: "PDF", label: "PDF"},
  {value: "JPG", label: "JPG"},
  {value: "PNG", label: "PNG"},
  {value: "XLSX", label: "XLSX"},
  {value: "JSON", label: "JSON"},
  {value: "CSV", label: "CSV"},
]

export const dataFrequencyOptions = [
  {value: "Una vez", label: "Una vez"},
  {value: "Diaria", label: "Diaria"},
  {value: "Semanal", label: "Semanal"},
  {value: "Mensual", label: "Mensual"},
]

export const dataSLA = [
  {
    title: "Nivel 1",
    time: "Hasta 8 horas hábiles",
    description: "Cambios básicos relacionados con texto o imágenes del portal, además de incidencias críticas que afectan el funcionamiento, por ejemplo, caída del portal, errores en secciones del portal, etc."
  },
  {
    title: "Nivel 2",
    time: "Hasta 24 horas hábiles",
    description: "Requerimientos importantes pero no críticos o cambios de con dificultad baja-media, por ejemplo, revisión de funcionamiento de algún módulo de la plataforma."
  },
  {
    title: "Nivel 3",
    time: "Hasta 10 días hábiles",
    description: "Requerimientos planificados o de desarrollo, como nuevas funcionalidades, rediseño de secciones, etc."
  },
  {
    title: "Nivel 4",
    time: "A definir",
    description: "Requerimientos complejos, estratégicos o no priorizados, cuya solución requiere discusión, levantamiento de información, análisis técnico o decisiones interinstitucionales. Se establecerá cronograma de trabajo específico."
  },
]