document.addEventListener("DOMContentLoaded", cargarTutoriales);

function cargarTutoriales() {

    const grid = document.getElementById("tutorialesGrid");
    const emptyMsg = document.getElementById("emptyMsg");

    if (!grid) return;

    const tutoriales = JSON.parse(localStorage.getItem("tutoriales")) || [];
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    grid.innerHTML = "";

    if (tutoriales.length === 0) {
        emptyMsg.classList.remove("hidden");
        return;
    }

    emptyMsg.classList.add("hidden");

    tutoriales.forEach(tutorial => {

        const esFavorito = favoritos.some(f => f.id === tutorial.id);

        const card = document.createElement("div");
        card.className =
            "bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col";

        card.innerHTML = `
            <div class="flex justify-between items-start">
                <h3 class="font-semibold text-lg mb-2">${tutorial.nombre}</h3>

                <button onclick="toggleFavorito(${tutorial.id})">
                    <i class="fa-heart fa-solid ${
                        esFavorito ? "text-red-500" : "text-gray-300"
                    } text-lg"></i>
                </button>
            </div>

            <p class="text-sm text-gray-600 mb-2">
                ${tutorial.descripcion}
            </p>

            <p class="text-xs mb-1">
                <strong>Tipo:</strong> ${tutorial.tipo}
            </p>

            <p class="text-accent font-semibold mb-4">
                $${tutorial.precio}
            </p>

            <div class="mt-auto flex gap-2">
                <button 
                    onclick="verTutorial('${tutorial.content}')"
                    class="flex-1 bg-primary text-white py-2 rounded-full text-sm hover:bg-accent transition"
                >
                    Ver
                </button>

                <button 
                    onclick="agregarAlCarrito(${tutorial.id})"
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
    const tutoriales = JSON.parse(localStorage.getItem("tutoriales")) || [];

    const tutorial = tutoriales.find(t => t.id === id);
    if (!tutorial) return;

    const yaExiste = favoritos.some(f => f.id === id);

    if (yaExiste) {
        favoritos = favoritos.filter(f => f.id !== id);
    } else {
        favoritos.push(tutorial);
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    cargarTutoriales(); // refresca para cambiar color
}


// ===============================
// VER ARCHIVO
// ===============================

function verTutorial(content) {

    const nuevaVentana = window.open();

    nuevaVentana.document.write(`
        <html>
            <head>
                <title>Vista del Tutorial</title>
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

    const tutoriales = JSON.parse(localStorage.getItem("tutoriales")) || [];
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const tutorial = tutoriales.find(t => t.id === id);
    if (!tutorial) return;

    carrito.push(tutorial);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Tutorial agregado al carrito");
}