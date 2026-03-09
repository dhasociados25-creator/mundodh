const WHATSAPP_NUMERO = "56995708887";

/* =========================================================
   BASE
========================================================= */
function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function val(id) {
  return (document.getElementById(id)?.value || "").trim();
}

function getCurrentPageName() {
  const path = window.location.pathname.toLowerCase();

  if (path.includes("empresas.html")) return "empresas";
  if (path.includes("catalogo.html")) return "catalogo";
  return "inicio";
}

function getHashCategory() {
  const hash = (window.location.hash || "").replace("#", "").toLowerCase();
  return hash;
}

/* =========================================================
   MENSAJES INTELIGENTES
========================================================= */
function buildGeneralMessage() {
  return `Hola, necesito información comercial de Mundo D&H.
Quisiera cotizar productos o coordinar una atención para empresa o pyme en Gran Talcahuano.`;
}

function buildCompanyMessage() {
  return `Hola, quiero solicitar una cotización para empresa o pyme con Mundo D&H.
Necesito información sobre productos, despacho, modalidad de pago y atención comercial.`;
}

function buildCategoryMessage(category) {
  const map = {
    escolar: {
      title: "artículos escolares y librería",
      detail: "útiles, cuadernos, carpetas, lápices y papelería"
    },
    papeleria: {
      title: "artículos de librería y papelería",
      detail: "papeles, sobres, cartulinas, tintas y formatos"
    },
    oficina: {
      title: "artículos de oficina",
      detail: "escritorio, archivadores, organización y suministros diarios"
    },
    aseo: {
      title: "artículos de aseo y limpieza",
      detail: "productos de limpieza para empresa, negocio u oficina"
    },
    ferreteria: {
      title: "artículos de ferretería",
      detail: "materiales de apoyo, mantención y soporte general"
    },
    computacion: {
      title: "artículos de computación",
      detail: "accesorios, periféricos, conectividad e insumos"
    },
    hogar: {
      title: "artículos para hogar",
      detail: "abastecimiento general y productos de uso cotidiano"
    },
    didacticos: {
      title: "material didáctico",
      detail: "productos educativos, apoyo escolar y aprendizaje"
    }
  };

  const item = map[category];

  if (!item) {
    return buildGeneralMessage();
  }

  return `Hola, necesito cotizar ${item.title} con Mundo D&H.
Estoy buscando ${item.detail}.
¿Me pueden orientar con disponibilidad, precios y despacho en Gran Talcahuano?`;
}

function quickWhatsApp() {
  const page = getCurrentPageName();
  const category = getHashCategory();

  if (page === "empresas") {
    openWhatsApp(buildCompanyMessage());
    return;
  }

  if (page === "catalogo" && category) {
    openWhatsApp(buildCategoryMessage(category));
    return;
  }

  openWhatsApp(buildGeneralMessage());
}

/* =========================================================
   BOTONES INTELIGENTES POR CATEGORÍA
   Usa esto en HTML:
   onclick="quickWhatsAppCategory('aseo')"
========================================================= */
function quickWhatsAppCategory(category) {
  openWhatsApp(buildCategoryMessage((category || "").toLowerCase()));
}

/* =========================================================
   FORMULARIO EMPRESAS
========================================================= */
function sendCompanyRequest() {
  const rs = val("rs");
  const rut = val("rut");
  const contacto = val("contacto");
  const fono = val("fono");
  const email = val("email");
  const comuna = val("comuna");
  const direccion = val("direccion");
  const tipo = document.getElementById("tipo")?.value || "Cotización empresa";
  const plazo = document.getElementById("plazo")?.value || "Pago contra entrega";
  const detalle = val("detalle");

  if (!rs || !rut || !contacto || !fono || !comuna || !direccion || !detalle) {
    alert("Completa los campos obligatorios: razón social, RUT, contacto, teléfono, comuna, dirección y detalle.");
    return;
  }

  const msg = `Solicitud comercial — Mundo D&H

🏢 Razón social: ${rs}
🧾 RUT empresa: ${rut}

👤 Contacto: ${contacto}
📞 Teléfono: ${fono}
✉️ Correo: ${email || "(no informado)"}

📍 Comuna: ${comuna}
📌 Dirección: ${direccion}

📂 Tipo de atención: ${tipo}
💳 Modalidad / plazo: ${plazo}

🛒 Detalle del requerimiento:
${detalle}

Condiciones generales:
• Atención comercial para empresas, pymes, oficinas, colegios e instituciones
• Foco de cobertura: Gran Talcahuano
• Entrega estimada de 2 a 4 días hábiles según disponibilidad
• Crédito comercial sujeto a evaluación
• Pago contra entrega disponible

Agradeceré confirmación de factibilidad, disponibilidad y pasos siguientes.`;

  openWhatsApp(msg);
}

function clearForm() {
  ["rs", "rut", "contacto", "fono", "email", "comuna", "direccion", "detalle"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });

  const tipo = document.getElementById("tipo");
  const plazo = document.getElementById("plazo");

  if (tipo) tipo.value = "Cotización empresa";
  if (plazo) plazo.value = "Pago contra entrega";
}

/* =========================================================
   SLIDER SIMPLE PARA PÁGINAS QUE USEN:
   id="heroSlider" e id="heroDots"
========================================================= */
(function setupSlider() {
  const slider = document.getElementById("heroSlider");
  const dotsContainer = document.getElementById("heroDots");

  if (!slider || !dotsContainer) return;

  const slides = Array.from(slider.querySelectorAll(".slide"));
  if (!slides.length) return;

  let current = 0;
  let timer = null;

  function renderDots() {
    dotsContainer.innerHTML = "";

    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = index === current ? "active" : "";
      dot.setAttribute("aria-label", `Ir al slide ${index + 1}`);
      dot.addEventListener("click", () => {
        goTo(index);
        restart();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function show(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    current = index;
    renderDots();
  }

  function goTo(index) {
    show(index);
  }

  function next() {
    const nextIndex = (current + 1) % slides.length;
    show(nextIndex);
  }

  function restart() {
    clearInterval(timer);
    timer = setInterval(next, 3500);
  }

  show(0);
  restart();
})();
