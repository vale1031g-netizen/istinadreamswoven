const grid = document.getElementById("patronesGrid");
const emptyMsg = document.getElementById("emptyMsg");

const patrones = JSON.parse(localStorage.getItem("patrones")) || [];

if (patrones.length === 0) {
  emptyMsg.classList.remove("hidden");
}

patrones.forEach(patron => {
  const card = document.createElement("div");
  card.className = "bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden";

  card.innerHTML = `
    <div class="h-40 bg-light flex items-center justify-center">
      <i class="fas fa-file-pdf text-5xl text-accent"></i>
    </div>

    <div class="p-4 space-y-2">
      <h3 class="font-semibold text-lg">${patron.nombre}</h3>
      <p class="text-sm text-gray-500">${patron.descripcion}</p>

      <div class="flex justify-between text-xs text-gray-500">
        <span>${patron.tipo}</span>
        <span>$${Number(patron.precio).toLocaleString('es-CO')} COP</span>
      </div>

      <a
        href="${patron.archivo}"
        download="${patron.nombre}"
        class="block mt-3 text-center bg-primary text-white py-2 rounded-full hover:bg-accent transition"
      >
        <i class="fas fa-download mr-2"></i>Descargar
      </a>
    </div>
  `;

  grid.appendChild(card);
});
