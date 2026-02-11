function obtenerCarrito() {
  try {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  } catch (error) {
    console.error("Error al leer el carrito:", error);
    return [];
  }
}

function calcularTotalCarrito() {
  const carrito = obtenerCarrito();
  return carrito.reduce((total, item) => {
    const precio = Number(item.precio) || 0;
    const cantidad = Number(item.cantidad) || 0;
    return total + precio * cantidad;
  }, 0);
}

function mostrarCarrito() {
  const carrito = obtenerCarrito();
  const contenedor = document.getElementById("carrito-container");
  const totalSpan = document.getElementById("total");

  if (!contenedor || !totalSpan) return;

  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML =
      "<p class='text-center text-gray-500'>Tu carrito está vacío </p>";
    totalSpan.textContent = "$0";
    return;
  }

  carrito.forEach(item => {
    contenedor.innerHTML += `
      <div class="bg-white p-4 rounded-xl shadow flex justify-between items-center">
        <div>
          <p class="font-medium">${item.nombre}</p>
          <p class="text-sm text-gray-500">Cantidad: ${item.cantidad}</p>
        </div>
        <span class="font-semibold">
          $${(item.precio * item.cantidad).toLocaleString()}
        </span>
      </div>
    `;
  });

  totalSpan.textContent =
    "$" + calcularTotalCarrito().toLocaleString();
}

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  mostrarCarrito();
}