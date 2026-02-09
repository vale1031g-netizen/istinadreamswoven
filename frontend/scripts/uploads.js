const STORAGE_KEY = "tinaUploads";

function getUploads() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveUploads(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/* SUBIR ARCHIVO */
function uploadFile(event, type) {
    const file = event.target.files[0];
    if (!file) return;

    const uploads = getUploads();
    const id = Date.now();

    const reader = new FileReader();
    reader.onload = () => {
        uploads.push({
            id,
            type, // pattern | tutorial
            name: file.name,
            fileType: file.type,
            url: reader.result
        });

        saveUploads(uploads);
        renderUploads(type);
    };
    reader.readAsDataURL(file);
}

/* BORRAR ARCHIVO */
function deleteFile(id, type) {
    let uploads = getUploads();
    uploads = uploads.filter(item => item.id !== id);
    saveUploads(uploads);
    renderUploads(type);
}

/* RENDER EN PERFIL */
function renderUploads(type) {
    const container = document.getElementById(type + "s");
    if (!container) return;

    container.innerHTML = "";
    const uploads = getUploads().filter(u => u.type === type);

    uploads.forEach(item => {
        const card = document.createElement("div");
        card.className = "bg-white p-4 rounded-xl shadow";

        let content = "";
        if (item.fileType.includes("image")) {
            content = `<img src="${item.url}" class="rounded-lg">`;
        } else if (item.fileType.includes("video")) {
            content = `<video controls class="rounded-lg"><source src="${item.url}"></video>`;
        } else {
            content = `<iframe src="${item.url}" class="w-full h-48"></iframe>`;
        }

        card.innerHTML = `
            ${content}
            <p class="text-sm mt-2 truncate">${item.name}</p>
            <button onclick="deleteFile(${item.id}, '${type}')" 
                class="mt-2 text-xs text-red-500 hover:underline">
                Eliminar
            </button>
        `;
        container.appendChild(card);
    });
}

