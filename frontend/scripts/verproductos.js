// scripts/verproductos.js

document.addEventListener("DOMContentLoaded", () => {
    const productosGrid = document.getElementById("productosGrid");
    const emptyMsg = document.getElementById("emptyMsg");

    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    if (productos.length === 0) {
        emptyMsg.classList.remove("hidden");
        return;
    } else {
        emptyMsg.classList.add("hidden");
    }

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-2xl p-4 shadow hover:shadow-lg transition-shadow flex flex-col";

        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full h-48 object-cover rounded-lg mb-3">
            <h3 class="text-lg font-semibold mb-1">${producto.nombre}</h3>
            <p class="text-sm text-gray-600 mb-2">${producto.descripcion}</p>
            <p class="text-sm font-medium mb-2">Categoría: ${producto.categoria}</p>
            <p class="text-primary font-semibold mb-3">$${producto.precio.toLocaleString('es-CO')}</p>
            <button class="bg-accent hover:bg-primary text-white text-sm py-2 rounded-full add-to-cart" data-id="${producto.id}">
                Agregar al carrito
            </button>
        `;

        productosGrid.appendChild(card);
    });
});
