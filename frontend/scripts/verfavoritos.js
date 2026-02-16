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

    favoritos.forEach(item => {

        const card = document.createElement("div");
        card.className =
            "bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col";

        card.innerHTML = `
            <div class="flex justify-between items-start">
                <h3 class="font-semibold text-lg mb-2">${item.nombre}</h3>

                <button onclick="eliminarFavorito(${item.id})">
                    <i class="fa-solid fa-heart text-red-500 text-lg"></i>
                </button>
            </div>

            <p class="text-sm text-gray-600 mb-2">
                ${item.descripcion || "Sin descripción"}
            </p>

            <p class="text-xs mb-1">
                <strong>Tipo:</strong> ${item.tipo || "No especificado"}
            </p>

            ${item.precio ? `<p class="text-accent font-semibold mb-4">$${item.precio}</p>` : ""}

            <div class="mt-auto flex gap-2">

                <button
                    class="btn-ver flex-1 bg-primary text-white py-2 rounded-full text-sm hover:bg-accent transition"
                    data-content="${item.content || item.link || ""}"
                >
                    Ver
                </button>

                <button
                    onclick="agregarAlCarrito(${item.id})"
                    class="flex-1 border border-accent text-accent py-2 rounded-full text-sm hover:bg-accent hover:text-white transition"
                >
                    Comprar
                </button>

            </div>
        `;

        grid.appendChild(card);
    });

    // Eventos del botón Ver
    document.querySelectorAll(".btn-ver").forEach(btn => {
        btn.addEventListener("click", function () {
            const content = this.getAttribute("data-content");
            verContenido(content);
        });
    });
}

function eliminarFavorito(id) {

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos = favoritos.filter(f => f.id !== id);

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    cargarFavoritos();
}

function agregarAlCarrito(id) {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    const producto = favoritos.find(f => f.id === id);

    if (!producto) {
        alert("Producto no encontrado.");
        return;
    }

    const existente = carrito.find(c => c.id === id);

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Producto agregado al carrito");
}

function verContenido(content) {

    if (!content) {
        alert("No hay contenido disponible.");
        return;
    }

    // PDF con prefijo completo
    if (content.startsWith("data:application/pdf;base64,")) {
        const base64 = content.split(",")[1];
        abrirPDF(base64);
        return;
    }

    // PDF base64 puro
    if (content.startsWith("JVBER")) {
        abrirPDF(content);
        return;
    }

    // Enlace normal
    window.open(content, "_blank");
}

function abrirPDF(base64) {

    try {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });

        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
    } catch (error) {
        console.error("Error abriendo PDF:", error);
        alert("El archivo PDF está dañado o incompleto.");
    }
}
