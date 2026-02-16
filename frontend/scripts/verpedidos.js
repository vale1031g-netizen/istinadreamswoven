function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    const overlay = document.getElementById("overlay");
    menu.classList.toggle("translate-x-full");
    overlay.classList.toggle("hidden");
}

function buscarPedidos() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const items = document.querySelectorAll("#pedidosGrid > div");

    items.forEach(item => {
        const texto = item.textContent.toLowerCase();
        item.style.display = texto.includes(input) ? "block" : "none";
    });
}

// Vaciar todos los pedidos
function vaciarPedidos() {
    localStorage.removeItem("pedidos");
    document.getElementById("pedidosGrid").innerHTML = '';
    document.getElementById("emptyMsg").classList.remove("hidden");
}

// Cargar pedidos existentes al iniciar
document.addEventListener("DOMContentLoaded", cargarPedidos);

function cargarPedidos() {
    const grid = document.getElementById("pedidosGrid");
    const emptyMsg = document.getElementById("emptyMsg");
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    if (pedidos.length === 0) {
        emptyMsg.classList.remove("hidden");
        return;
    }

    emptyMsg.classList.add("hidden");

    pedidos.forEach(pedido => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden";

        const productosList = pedido.productos.length
            ? pedido.productos.map(p => `<li>${p.nombre} x${p.cantidad}</li>`).join('')
            : '<li>No hay productos</li>';

        card.innerHTML = `
            <div class="p-4 space-y-2">
                <h3 class="font-semibold text-lg">Pedido #${pedido.codigo}</h3>
                <p class="text-sm text-gray-500">Fecha: ${pedido.fecha}</p>
                <p class="text-sm text-gray-500">Estado: ${pedido.estado || 'Pendiente'}</p>
                <ul class="text-sm text-gray-500">Productos: ${productosList}</ul>
                <div class="flex justify-between items-center mt-3">
                    <span class="text-primary font-bold">
                        Total: ${pedido.total ? `$${Number(pedido.total).toLocaleString('es-CO')} COP` : 'No calculado'}
                    </span>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}