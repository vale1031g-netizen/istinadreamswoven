const grid = document.getElementById("tutorialesGrid");
const emptyMsg = document.getElementById("emptyMsg");

const tutoriales = JSON.parse(localStorage.getItem("tutoriales")) || [];

if (tutoriales.length === 0) {
  emptyMsg.classList.remove("hidden");
}

tutoriales.forEach(tutorial => {
  const card = document.createElement("div");
  card.className = "bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden";

  card.innerHTML = `
    <div class="h-40 bg-light flex items-center justify-center">
      <i class="fas fa-play-circle text-5xl text-accent"></i>
    </div>

    <div class="p-4 space-y-2">
      <h3 class="font-semibold text-lg">${tutorial.nombre}</h3>
      <p class="text-sm text-gray-500">${tutorial.descripcion}</p>

      <div class="flex justify-between text-xs text-gray-500">
        <span>Tutorial</span>
        <span>$${Number(tutorial.precio).toLocaleString('es-CO')} COP</span>
      </div>

      <a
        href="${tutorial.archivo}"
        download="${tutorial.nombre}"
        class="block mt-3 text-center bg-primary text-white py-2 rounded-full hover:bg-accent transition"
      >
        <i class="fas fa-download mr-2"></i>Descargar
      </a>
    </div>
  `;

  grid.appendChild(card);
});
