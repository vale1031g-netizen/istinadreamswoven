function getLS(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function setLS(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function isFavorite(id) {
    const favs = getLS("favoritos");
    return favs.some(item => item.id === id);
}

function toggleFavorite(item) {
    let favs = getLS("favoritos");

    if (isFavorite(item.id)) {
        favs = favs.filter(f => f.id !== item.id);
    } else {
        favs.push(item);
    }

    setLS("favoritos", favs);
    renderCards(window.currentData, window.currentContainer);
}

function renderCards(data, container) {
    container.innerHTML = "";

    if (!data.length) {
        container.innerHTML = `<p class="text-gray-500">No hay contenido para mostrar.</p>`;
        return;
    }

    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-xl shadow-md p-4 flex flex-col gap-3";

        // IMAGEN / MINIATURA
        if (item.file && item.file.type.startsWith("image")) {
            const img = document.createElement("img");
            img.src = item.file.url;
            img.className = "w-full h-40 object-cover rounded-lg";
            card.appendChild(img);
        }

        // TITULO
        const title = document.createElement("h3");
        title.textContent = item.title;
        title.className = "font-semibold text-lg";
        card.appendChild(title);

        // DESCRIPCION
        const desc = document.createElement("p");
        desc.textContent = item.description || "";
        desc.className = "text-sm text-gray-600";
        card.appendChild(desc);

        // ACCIONES
        const actions = document.createElement("div");
        actions.className = "flex gap-2 mt-auto";

        // DESCARGAR
        if (item.file) {
            const downloadBtn = document.createElement("a");
            downloadBtn.href = item.file.url;
            downloadBtn.download = item.file.name;
            downloadBtn.textContent = "Descargar";
            downloadBtn.className = "px-3 py-1 bg-blue-600 text-white rounded text-sm";
            actions.appendChild(downloadBtn);
        }

        // FAVORITO
        const favBtn = document.createElement("button");
        favBtn.textContent = isFavorite(item.id) ? "Quitar favorito" : "Agregar favorito";
        favBtn.className = "px-3 py-1 bg-gray-200 rounded text-sm";
        favBtn.onclick = () => toggleFavorite(item);

        actions.appendChild(favBtn);

        card.appendChild(actions);
        container.appendChild(card);
    });
}

function loadSection(storageKey, containerId) {
    const data = getLS(storageKey);
    const container = document.getElementById(containerId);

    window.currentData = data;
    window.currentContainer = container;

    renderCards(data, container);
}

export {
    loadSection,
    renderCards
};