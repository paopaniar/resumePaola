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
  › Desarrollo y mantenimiento de aplicaciones web backend y
    frontend usando Java Spring Boot.
  › Corrección de errores y mejora del rendimiento del sistema.
  › Desarrollo y optimización de procedimientos almacenados SQL
    para reportes.
  › Creación y mantenimiento de reportes usando JasperReports.
  › Gestión y seguimiento de tareas con Jira.
  › Colaboración en trabajo en equipo.

Empleada de Back Office
DHL  |  Mar 2021 – Dic 2022

Empleada de Back Office
Kuehne+Nagel  |  Jun 2018 – Ene 2020

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
  › Develop and maintain backend and frontend web applications
    using Java Spring Boot.
  › Fix bugs and improve system performance.
  › Develop and optimize SQL stored procedures for reports.
  › Create and maintain reports using JasperReports.
  › Manage and track tasks using Jira.
  › Collaborate in teamwork.

Back Office Employee
DHL  |  Mar 2021 – Dec 2022

Back Office Employee
Kuehne+Nagel  |  Jun 2018 – Jan 2020

═══════════════════════════════════════════════════════════
`.trim();
}

// ── Init on load ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Detect browser language as default hint (optional, ES default kept)
  setLang('es');
});
