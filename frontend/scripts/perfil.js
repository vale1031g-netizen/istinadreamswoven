document.addEventListener("DOMContentLoaded", () => {
    cargarPerfil();
    configurarTabs();
    configurarEdicionPerfil();
    configurarAjustes();
    cargarResumenContenido();
});

// Cargar datos de perfil

function cargarPerfil() {
    const user = JSON.parse(localStorage.getItem("usuarioActivo")) || {};

    document.getElementById("displayName").textContent =
        user.nombre || "Usuario";

    document.getElementById("bio").textContent =
        user.bio || "Aún no has agregado una biografía.";

    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const patrones = JSON.parse(localStorage.getItem("patrones")) || [];

    document.getElementById("statProducts").textContent = productos.length;
    document.getElementById("statPatterns").textContent = patrones.length;
    document.getElementById("statFollowers").textContent =
        user.seguidores || 0;
}

// Configuración de tabs

function configurarTabs() {
    const buttons = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const tab = btn.dataset.tab;

            
            buttons.forEach(b => b.classList.remove("bg-primary", "text-primary"));
            btn.classList.add("bg-primary", "text-primary");

            contents.forEach(content => {
                content.classList.add("hidden");
                if (content.dataset.content === tab) {
                    content.classList.remove("hidden");
                }
            });
        });
    });
}

// Edición de perfil

function configurarEdicionPerfil() {
    const modal = document.getElementById("editModal");
    const openBtn = document.getElementById("openEditBtn");
    const form = document.getElementById("editProfileForm");

    const user = JSON.parse(localStorage.getItem("usuarioActivo")) || {};
    document.getElementById("fullName").value = user.nombre || "";
    document.getElementById("bioInput").value = user.bio || "";

    openBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const fullName = document.getElementById("fullName").value;
        const bio = document.getElementById("bioInput").value;

        const user = JSON.parse(localStorage.getItem("usuarioActivo")) || {};
        user.nombre = fullName;
        user.bio = bio;

        localStorage.setItem("usuarioActivo", JSON.stringify(user));

        modal.classList.add("hidden");
        cargarPerfil();
    });
}

// Ajustes de cuenta

function configurarAjustes() {
    const form = document.getElementById("settingsForm");
    const deleteBtn = document.getElementById("openDeleteModal");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("usuarioActivo")) || {};

        user.nombre = document.getElementById("nameInput").value;
        user.username = document.getElementById("usernameInput").value;
        user.email = document.getElementById("emailInput").value;
        user.pais = document.getElementById("countryInput").value;
        user.idioma = document.getElementById("languageSelect").value;
        user.newsletter = document.getElementById("newsletter").checked;

        localStorage.setItem("usuarioActivo", JSON.stringify(user));

        alert("Cambios guardados correctamente.");
        cargarPerfil();
    });

    deleteBtn.addEventListener("click", () => {
        const confirmacion = confirm("¿Estás segura de eliminar tu cuenta?");
        if (!confirmacion) return;

        localStorage.removeItem("usuarioActivo");
        alert("Cuenta eliminada correctamente.");
        window.location.href = "login.html";
    });
}

// Contenido subido

function cargarResumenContenido() {
    const grid = document.getElementById("resumenGrid");
    const emptyMsg = document.getElementById("emptyResumen");

    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const patrones = JSON.parse(localStorage.getItem("patrones")) || [];
    const tutoriales = JSON.parse(localStorage.getItem("tutoriales")) || [];

    grid.innerHTML = "";

    const contenido = [
        ...productos.map((p, i) => ({
            tipo: "Producto",
            nombre: p.nombre,
            index: i,
            storage: "productos"
        })),
        ...patrones.map((p, i) => ({
            tipo: "Patrón",
            nombre: p.nombre,
            index: i,
            storage: "patrones"
        })),
        ...tutoriales.map((t, i) => ({
            tipo: "Tutorial",
            nombre: t.nombre,
            index: i,
            storage: "tutoriales"
        }))
    ];

    if (contenido.length === 0) {
        emptyMsg.classList.remove("hidden");
        return;
    }

    emptyMsg.classList.add("hidden");

    contenido.forEach(item => {
        const card = document.createElement("div");
        card.className =
            "bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center";

        card.innerHTML = `
            <div>
                <div class="text-xs text-gray-500">${item.tipo}</div>
                <div class="font-semibold">${item.nombre}</div>
            </div>
            <button 
                class="text-red-500 hover:text-red-700 transition"
                data-storage="${item.storage}"
                data-index="${item.index}">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;

        grid.appendChild(card);
    });

    configurarBotonesEliminar();
}

// Eliminar contenido

function configurarBotonesEliminar() {
    const botones = document.querySelectorAll("#resumenGrid button");

    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            const storage = btn.dataset.storage;
            const index = parseInt(btn.dataset.index);

            const confirmacion = confirm("¿Deseas eliminar este contenido?");
            if (!confirmacion) return;

            let lista = JSON.parse(localStorage.getItem(storage)) || [];
            lista.splice(index, 1);

            localStorage.setItem(storage, JSON.stringify(lista));

            cargarResumenContenido();
            cargarPerfil();
        });
    });
}