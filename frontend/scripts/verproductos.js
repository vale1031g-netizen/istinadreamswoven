const grid = document.getElementById("productosGrid");
const emptyMsg = document.getElementById("emptyMsg");

const productos = JSON.parse(localStorage.getItem("productos")) || [];

if (productos.length === 0) {
  emptyMsg.classList.remove("hidden");
}

productos.forEach(producto => {
  const card = document.createElement("div");
  card.className = "bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden";

  card.innerHTML = `
    <img src="${producto.imagen}" class="w-full h-48 object-cover">

    <div class="p-4 space-y-2">
      <h3 class="font-semibold text-lg">${producto.nombre}</h3>
      <p class="text-sm text-gray-500">${producto.descripcion}</p>

      <div class="flex justify-between items-center mt-3">
        <span class="text-primary font-bold">
          $${Number(producto.precio).toLocaleString('es-CO')} COP
        </span>
        <span class="text-xs text-gray-400">
          Stock: ${producto.stock}
        </span>
      </div>

      <button class="w-full mt-3 bg-primary text-white py-2 rounded-full hover:bg-accent transition">
        Ver detalle
      </button>
    </div>
  `;

  grid.appendChild(card);
});

