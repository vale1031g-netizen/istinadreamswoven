document.addEventListener("DOMContentLoaded", cargarTutoriales);

function cargarTutoriales() {

    const grid = document.getElementById("tutorialesGrid");
    const emptyMsg = document.getElementById("emptyMsg");

    if (!grid) return;

    const tutoriales = JSON.parse(localStorage.getItem("tutoriales")) || [];
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    grid.innerHTML = "";

    grid.className =
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";

    if (!tutoriales.length) {
        emptyMsg?.classList.remove("hidden");
        return;
    }

    emptyMsg?.classList.add("hidden");

    tutoriales.forEach(tutorial => {

        const esFavorito = favoritos.some(f => f.id === tutorial.id);

        const card = document.createElement("div");
        card.className =
            "bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col";

        card.innerHTML = `
            <div class="p-4 flex flex-col h-full">

                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-semibold text-base">
                        ${tutorial.nombre}
                    </h3>

                    <button onclick="toggleFavorito(${tutorial.id})">
                        <i class="fa-solid fa-heart ${
                            esFavorito ? "text-red-500" : "text-gray-300"
                        }"></i>
                    </button>
                </div>

                <p class="text-xs text-gray-500 mb-2 line-clamp-2">
                    ${tutorial.descripcion || "Sin descripción"}
                </p>

                <p class="text-xs mb-1">
                    <strong>Tipo:</strong> ${tutorial.tipo || "Video / PDF"}
                </p>

                <p class="text-accent font-semibold mb-3">
                    $${tutorial.precio || 0}
                </p>

                <div class="mt-auto flex gap-2">
                    <button 
                        onclick="abrirTutorial(${tutorial.id})"
                        class="flex-1 bg-primary text-white py-2 rounded-full text-xs hover:bg-accent transition"
                    >
                        Ver
                    </button>

                    <button 
                        onclick="agregarAlCarrito(${tutorial.id})"
                        class="flex-1 border border-accent text-accent py-2 rounded-full text-xs hover:bg-accent hover:text-white transition"
                    >
                        Comprar
                    </button>
                </div>

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

    favoritos = yaExiste
        ? favoritos.filter(f => f.id !== id)
        : [...favoritos, tutorial];

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    cargarTutoriales();
}


// ===============================
// ABRIR TUTORIAL
// ===============================

function abrirTutorial(id) {

    const tutoriales = JSON.parse(localStorage.getItem("tutoriales")) || [];

    const tutorial = tutoriales.find(t => t.id === id);

    if (!tutorial) {
        alert("Tutorial no encontrado.");
        return;
    }

    if (!tutorial.contenido) {
        alert("Este tutorial no tiene contenido disponible.");
        return;
    }

    verTutorial(tutorial.contenido);
}


function verTutorial(content) {

    if (!content) {
        alert("No hay contenido disponible.");
        return;
    }

    const nuevaVentana = window.open();

    if (!nuevaVentana) {
        alert("El navegador bloqueó la ventana emergente.");
        return;
    }

    const esVideo = content.startsWith("data:video");
    const esPDF = content.startsWith("data:application/pdf");

    nuevaVentana.document.write(`
        <html>
            <head>
                <title>Vista del Tutorial</title>
                <style>
                    body {
                        margin: 0;
                        background: #000;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                    }
                    iframe, video {
                        width: 90%;
                        height: 90vh;
                        border-radius: 12px;
                        box-shadow: 0 0 40px rgba(0,0,0,0.6);
                    }
                    video {
                        object-fit: contain;
                    }
                </style>
            </head>
            <body>
                ${
                    esVideo
                    ? `<video controls autoplay>
                        <source src="${content}">
                    </video>`
                    : `<iframe src="${content}"></iframe>`
                }
            </body>
        </html>
    `);

    nuevaVentana.document.close();
}

function agregarAlCarrito(id) {

    const tutoriales = JSON.parse(localStorage.getItem("tutoriales")) || [];
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const tutorial = tutoriales.find(t => t.id === id);
    if (!tutorial) return;

    const existente = carrito.find(c => c.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ ...tutorial, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Tutorial agregado al carrito");
}
