/* ─────────────────────────────────────────────────────
   Paola Paniagua Arroyo — CV Script
   Features: bilingual toggle (ES / EN), PDF download,
   TXT download.
───────────────────────────────────────────────────── */

// ── Current language state ──────────────────────────
let currentLang = 'es';

// ── Set language ─────────────────────────────────────
function setLang(lang) {
  currentLang = lang;

  // Update <html> lang attribute
  document.documentElement.lang = lang;

  // Swap all elements that have data-es / data-en
  document.querySelectorAll('[data-es]').forEach(el => {
    el.textContent = el.dataset[lang] || el.textContent;
  });

  // Handle list items that only carry data attrs (no text swap needed for non-[data] li)
  // Already covered above.

  // Swap aria/title of buttons
  document.querySelectorAll('[data-es]').forEach(el => {
    if (el.title) el.title = el.dataset[lang];
  });

  // Toggle active class on lang buttons
  document.getElementById('btn-es').classList.toggle('active', lang === 'es');
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');

  // Update page <title>
  document.title = lang === 'es'
    ? 'Paola Paniagua Arroyo — Desarrolladora de Software'
    : 'Paola Paniagua Arroyo — Software Developer';
}

// ── PDF Download ─────────────────────────────────────
function downloadPDF() {
  const element = document.getElementById('resume');

  const opt = {
    margin:       [0, 0, 0, 0],
    filename:     'Paola_Paniagua_Arroyo_CV.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  // Temporarily hide no-print elements before capture
  const noPrint = document.querySelectorAll('.no-print');
  noPrint.forEach(el => el.style.display = 'none');

  html2pdf().set(opt).from(element).save().then(() => {
    // Restore no-print elements
    noPrint.forEach(el => el.style.display = '');
  });
}

// ── TXT Download ──────────────────────────────────────
function downloadTXT() {
  const lang = currentLang;

  const content = lang === 'es'
    ? buildTXT_ES()
    : buildTXT_EN();

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'Paola_Paniagua_Arroyo_CV.txt';
  a.click();
  URL.revokeObjectURL(url);
}

// ── TXT content — Spanish ─────────────────────────────
function buildTXT_ES() {
  return `
═══════════════════════════════════════════════════════════
PAOLA PANIAGUA ARROYO
Full Stack Software Developer
═══════════════════════════════════════════════════════════

CONTACTO
────────────────────────────────────────────────────────
Teléfono : +(506) 62666090
Correo   : panipao0@gmail.com
País     : Costa Rica

RESUMEN
────────────────────────────────────────────────────────
Graduada en Ingeniería en Software con experiencia profesional
en logística y desarrollo de software. Actualmente trabajando
como Desarrolladora Full Stack con experiencia en Java Spring Boot,
SQL y desarrollo de reportes con JasperReports. Detallista,
analítica y con experiencia en ambientes corporativos internacionales.

EDUCACIÓN
────────────────────────────────────────────────────────
2019 – 2025  |  Universidad Técnica Nacional (UTN)
             Bachillerato en Ingeniería en Software

2014 – 2017  |  CTP Invu las Cañas
             Bach. en Educación General Básica,
             Gestión en Servicio al Cliente

HABILIDADES TÉCNICAS
────────────────────────────────────────────────────────
• Java                     • Git
• Spring Boot              • Desarrollo Frontend
• SQL                      • Bases de Datos Relacionales
• Desarrollo Backend       • Resolución de Problemas
• REST APIs                • Pensamiento Analítico
• Jira                     • Trabajo en Equipo
• JasperReports            • Gestión del Tiempo

IDIOMAS
────────────────────────────────────────────────────────
Español  — Nativo
Inglés   — B2 (Upper-Intermediate)

EXPERIENCIA PROFESIONAL
────────────────────────────────────────────────────────

Full Stack Software Developer
ACAMSYS  |  Dic 2022 – Presente
  › Entregué y evolucioné módulos full stack con Java Spring Boot,
    habilitando flujos operativos críticos para el negocio.
  › Reduje fallas recurrentes y mejoré la estabilidad del sistema
    mediante corrección proactiva de errores y optimización de rendimiento.
  › Optimicé procedimientos almacenados SQL para reportes, acelerando
    la disponibilidad de datos para decisiones operativas.
  › Estandaricé reportes con JasperReports usados por equipos de
    operaciones y gestión, mejorando consistencia y trazabilidad.
  › Mejoré visibilidad y cumplimiento de entregas al gestionar el
    ciclo de trabajo en Jira con equipos multidisciplinarios.

Empleada de Back Office
DHL  |  Mar 2021 – Dic 2022
  › Gestioné procesos de back office en logística internacional con
    alta precisión en entornos de alto volumen.
  › Resolví incidencias operativas y de documentación a tiempo,
    apoyando continuidad del servicio al cliente.

Empleada de Back Office
Kuehne+Nagel  |  Jun 2018 – Ene 2020
  › Coordiné trámites y seguimiento de embarques en cadena de suministro
    global, manteniendo calidad y cumplimiento normativo.
  › Fortalecí la comunicación entre áreas operativas y clientes,
    reduciendo retrabajos en gestión documental.

═══════════════════════════════════════════════════════════
`.trim();
}

// ── TXT content — English ─────────────────────────────
function buildTXT_EN() {
  return `
═══════════════════════════════════════════════════════════
PAOLA PANIAGUA ARROYO
Full Stack Software Developer
═══════════════════════════════════════════════════════════

CONTACT
────────────────────────────────────────────────────────
Phone  : +(506) 62666090
Email  : panipao0@gmail.com
Country: Costa Rica

SUMMARY
────────────────────────────────────────────────────────
Bachelor's graduate in Software Engineering with professional
experience in logistics and software development. Currently
working as a Full Stack Software Developer with expertise in
Java Spring Boot, SQL, and report development using JasperReports.
Detail-oriented, analytical, and experienced in international
corporate environments.

EDUCATION
────────────────────────────────────────────────────────
2019 – 2025  |  Universidad Técnica Nacional (UTN)
             Bachelor's Degree in Software Engineering

2014 – 2017  |  CTP Invu las Cañas
             Bach. in General Basic Education,
             Customer Service Management

TECHNICAL SKILLS
────────────────────────────────────────────────────────
• Java                     • Git
• Spring Boot              • Frontend Development
• SQL                      • Relational Databases
• Backend Development      • Problem Solving
• REST APIs                • Analytical Thinking
• Jira                     • Team Collaboration
• JasperReports            • Task & Time Management

LANGUAGES
────────────────────────────────────────────────────────
Spanish  — Native
English  — B2 (Upper-Intermediate)

PROFESSIONAL EXPERIENCE
────────────────────────────────────────────────────────

Full Stack Software Developer
ACAMSYS  |  Dec 2022 – Present
  › Delivered and evolved full-stack modules with Java Spring Boot,
    enabling critical operational workflows for the business.
  › Reduced recurring defects and improved system stability through
    proactive bug fixes and performance tuning.
  › Optimized SQL stored procedures for reporting, accelerating data
    availability for operational decision-making.
  › Standardized JasperReports used by operations and management teams,
    improving information consistency and traceability.
  › Improved delivery visibility and on-time completion by managing
    work lifecycles in Jira with cross-functional teams.

Back Office Employee
DHL  |  Mar 2021 – Dec 2022
  › Managed international logistics back-office processes with high
    accuracy in high-volume environments.
  › Resolved operational and documentation issues on time, supporting
    customer service continuity.

Back Office Employee
Kuehne+Nagel  |  Jun 2018 – Jan 2020
  › Coordinated shipment processing and tracking in a global supply
    chain while maintaining quality and compliance standards.
  › Strengthened communication between operations and clients, reducing
    rework in document management.

═══════════════════════════════════════════════════════════
`.trim();
}

// ── Init on load ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Detect browser language as default hint (optional, ES default kept)
  setLang('es');
});
