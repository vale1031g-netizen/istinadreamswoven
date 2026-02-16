document.addEventListener("DOMContentLoaded", cargarFavoritos);

function cargarFavoritos() {

    const grid = document.getElementById("favoritosGrid");
    const emptyMsg = document.getElementById("favoritosVacio");

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    grid.innerHTML = "";

    if (favoritos.length === 0) {
        emptyMsg.classList.remove("hidden");
        return;
    }

    emptyMsg.classList.add("hidden");

    favoritos.forEach(patron => {

        const card = document.createElement("div");
        card.className =
            "bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col";

        card.innerHTML = `
            <div class="flex justify-between items-start">
                <h3 class="font-semibold text-lg mb-2">${patron.nombre}</h3>

                <button onclick="eliminarFavorito(${patron.id})">
                    <i class="fa-solid fa-heart text-red-500 text-lg"></i>
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
// VER ARCHIVO
// ===============================

function verPatron(content) {

    if (!content) {
        alert("Este patrón no tiene archivo disponible.");
        return;
    }

    const nuevaVentana = window.open();

    nuevaVentana.document.write(`
        <html>
            <head>
                <title>Vista del Patrón</title>
                <style>
                    body {
                        margin: 0;
                        background: #F3E5F5;
                    }
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
// ELIMINAR FAVORITO
// ===============================

function eliminarFavorito(id) {

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    favoritos = favoritos.filter(f => f.id !== id);

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    cargarFavoritos();
}
