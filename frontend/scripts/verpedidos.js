const nuevoPedido = {
  codigo: Math.floor(Math.random() * 100000),
  fecha: new Date().toLocaleDateString(),
  estado: 'En proceso',
  total: 85000,
  productos: [
    { nombre: 'Bolso crochet', cantidad: 1 },
    { nombre: 'Gorro tejido', cantidad: 2 }
  ]
};
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
pedidos.push(nuevoPedido);
localStorage.setItem("pedidos", JSON.stringify(pedidos));

const grid = document.getElementById("pedidosGrid");
const emptyMsg = document.getElementById("emptyMsg");

if (pedidos.length === 0) {
  emptyMsg.classList.remove("hidden");
}

pedidos.forEach(pedido => {
  const card = document.createElement("div");
  card.className = "bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden";

  const productosList = pedido.productos.map(p => `<li>${p.nombre} x${p.cantidad}</li>`).join('');

  card.innerHTML = `
    <div class="p-4 space-y-2">
      <h3 class="font-semibold text-lg">Pedido #${pedido.codigo}</h3>
      <p class="text-sm text-gray-500">Fecha: ${pedido.fecha}</p>
      <p class="text  -sm text-gray-500">Estado: ${pedido.estado}</p>
      <ul class="text-sm text-gray-500">Productos: ${productosList}</ul>
      <div class="flex justify-between items-center mt-3">
        <span class="text-primary font-bold">
          Total: $${Number(pedido.total).toLocaleString('es-CO')} COP
        </span>
      </div>
    </div>
  `;

  grid.appendChild(card);
});
