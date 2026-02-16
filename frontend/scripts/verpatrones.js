document.addEventListener("DOMContentLoaded", cargarPatrones);

function cargarPatrones() {

    const grid = document.getElementById("patronesGrid");
    const emptyMsg = document.getElementById("emptyMsg");

    if (!grid) return;

    const patrones = JSON.parse(localStorage.getItem("patrones")) || [];
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    grid.innerHTML = "";

    if (patrones.length === 0) {
        emptyMsg.classList.remove("hidden");
        return;
    }

    emptyMsg.classList.add("hidden");

    patrones.forEach(patron => {

        const esFavorito = favoritos.some(f => f.id === patron.id);

        const card = document.createElement("div");
        card.className =
            "bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col";

        card.innerHTML = `
            <div class="flex justify-between items-start">
                <h3 class="font-semibold text-lg mb-2">${patron.nombre}</h3>

                <button onclick="toggleFavorito(${patron.id})">
                    <i class="fa-heart fa-solid ${
                        esFavorito ? "text-red-500" : "text-gray-300"
                    } text-lg"></i>
                </button>
            </div>

            <p class="text-sm text-gray-600 mb-2">
                ${patron.descripcion}
            </p>

            <p class="text-xs mb-1">
                <strong>Tipo:</strong> ${patron.tipo}
            </p>

            <p class="text-accent font-semibold mb-4">
                $${patron.precio}
            </p>

            <div class="mt-auto flex gap-2">
                <button 
                    onclick="verPatron('${patron.content}')"
                    class="flex-1 bg-primary text-white py-2 rounded-full text-sm hover:bg-accent transition"
                >
                    Ver
                </button>

                <button 
                    onclick="agregarAlCarrito(${patron.id})"
                    class="flex-1 border border-accent text-accent py-2 rounded-full text-sm hover:bg-accent hover:text-white transition"
                >
                    Comprar
                </button>
            </div>
        `;

        grid.appendChild(card);
    });
}


// ===============================
// FAVORITOS
// ===============================

function toggleFavorito(id) {

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const patrones = JSON.parse(localStorage.getItem("patrones")) || [];

    const patron = patrones.find(p => p.id === id);
    if (!patron) return;

    const yaExiste = favoritos.some(f => f.id === id);

    if (yaExiste) {
        favoritos = favoritos.filter(f => f.id !== id);
    } else {
        favoritos.push(patron);
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    cargarPatrones(); // refresca para cambiar color
}


// ===============================
// VER ARCHIVO
// ===============================

function verPatron(content) {

    const nuevaVentana = window.open();

    nuevaVentana.document.write(`
        <html>
            <head>
                <title>Vista del Patrón</title>
                <style>
                    body { margin: 0; }
                    iframe {
                        width: 100%;
                        height: 100vh;
                        border: none;
                    }
                </style>
            </head>
            <body>
                <iframe src="${content}"></iframe>
            </body>
        </html>
    `);

    nuevaVentana.document.close();
}


// ===============================
// CARRITO
// ===============================

function agregarAlCarrito(id) {

    const patrones = JSON.parse(localStorage.getItem("patrones")) || [];
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const patron = patrones.find(p => p.id === id);
    if (!patron) return;

    carrito.push(patron);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Patrón agregado al carrito");
}