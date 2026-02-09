// ===============================
// CONFIG
// ===============================
const patronForm = document.getElementById("patronForm");
const lista = document.getElementById("lista");
const STORAGE_KEY = "patrones_publicados";

// ===============================
// HELPERS
// ===============================
const getPatrones = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const savePatrones = data =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

const formatCOP = valor =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0
  }).format(valor);

// ===============================
// RENDER
// ===============================
function renderPatrones() {
  const patrones = getPatrones();
  lista.innerHTML = "";

  if (!patrones.length) {
    lista.innerHTML = `
      <p class="text-center text-gray-500 text-sm">
        No hay patrones publicados aún ✨
      </p>
    `;
    return;
  }

  patrones.forEach((p, i) => {
    const isImage = p.fileType.startsWith("image");
    const isPDF = p.fileType === "application/pdf";

    const card = document.createElement("div");
    card.className =
      "bg-white p-5 rounded-2xl shadow flex gap-4 items-start";

    card.innerHTML = `
      <div class="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
        ${
          isImage
            ? `<img src="${p.fileData}" class="object-cover w-full h-full">`
            : `<i class="fas fa-file-pdf text-4xl text-red-500"></i>`
        }
      </div>

      <div class="flex-1">
        <h3 class="font-semibold text-lg">${p.name}</h3>
        <p class="text-sm text-gray-600">${p.tipo}</p>
        <p class="text-sm font-medium text-accent mt-1">
          ${formatCOP(p.precio)}
        </p>

        <div class="flex gap-4 mt-3 text-sm">
          <a href="${p.fileData}" target="_blank"
             class="text-primary hover:underline">
            Ver
          </a>

          <a href="${p.fileData}" download="${p.fileName}"
             class="text-primary hover:underline">
            Descargar
          </a>

          <button onclick="deletePatron(${i})"
            class="text-red-500 hover:underline">
            Eliminar
          </button>
        </div>
      </div>
    `;

    lista.appendChild(card);
  });
}

// ===============================
// SUBMIT
// ===============================
patronForm.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const tipo = document.getElementById("tipo").value;
  const precio = document.getElementById("precio").value;
  const fileInput = document.getElementById("file");

  if (!name || !precio || !fileInput.files.length) {
    alert("Completa todos los campos");
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const nuevoPatron = {
      name,
      tipo,
      precio: Number(precio),
      fileName: file.name,
      fileType: file.type,
      fileData: reader.result, // 👈 BASE64
      fecha: new Date().toLocaleDateString("es-CO")
    };

    const patrones = getPatrones();
    patrones.unshift(nuevoPatron);
    savePatrones(patrones);

    patronForm.reset();
    renderPatrones();
  };

  reader.readAsDataURL(file);
});

// ===============================
// DELETE
// ===============================
window.deletePatron = function (index) {
  if (!confirm("¿Eliminar este patrón?")) return;

  const patrones = getPatrones();
  patrones.splice(index, 1);
  savePatrones(patrones);
  renderPatrones();
};

// ===============================
// INIT
// ===============================
renderPatrones();
