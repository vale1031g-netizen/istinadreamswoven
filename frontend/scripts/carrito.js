// Inicializar carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Agregar producto
function agregarAlCarrito(id, nombre, precio, imagen) {
  const producto = carrito.find(p => p.id === id);

  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({
      id,
      nombre,
      precio,
      imagen,
      cantidad: 1
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado al carrito 🧶");
}

// Mostrar carrito
function mostrarCarrito() {
  const contenedor = document.getElementById("carrito-container");
  const totalSpan = document.getElementById("total");
  contenedor.innerHTML = "";

  let total = 0;

  carrito.forEach((p, index) => {
    total += p.precio * p.cantidad;

    contenedor.innerHTML += `
      <div class="flex items-center justify-between bg-light p-4 rounded-xl shadow-sm">
        <div class="flex items-center gap-4">
          <img src="${p.imagen}" class="w-16 h-16 rounded-lg object-cover">
          <div>
            <h4 class="font-medium">${p.nombre}</h4>
            <p class="text-sm text-gray-600">$${p.precio.toLocaleString()}</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <span class="text-sm">x${p.cantidad}</span>
          <button onclick="eliminarProducto(${index})"
            class="text-red-500 hover:text-red-700">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  });

  totalSpan.textContent = "$" + total.toLocaleString();
}

// Eliminar producto
function eliminarProducto(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

// Vaciar carrito
function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem("carrito");
  mostrarCarrito();
}
