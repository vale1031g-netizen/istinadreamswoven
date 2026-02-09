// ===============================
// UTILIDADES
// ===============================
function $(id) {
  return document.getElementById(id);
}

function getLS(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function setLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ===============================
// TABS PERFIL
// ===============================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;

    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    tabContents.forEach(c => {
      c.classList.toggle('hidden', c.dataset.content !== tab);
    });
  });
});

// ===============================
// PERFIL (EDITAR INFO)
// ===============================
const editModal = $('editModal');
const openEditBtn = $('openEditBtn');

openEditBtn?.addEventListener('click', () => {
  editModal.classList.remove('hidden');
  editModal.classList.add('flex');
});

editModal?.addEventListener('click', e => {
  if (e.target === editModal) editModal.classList.add('hidden');
});

$('editProfileForm')?.addEventListener('submit', e => {
  e.preventDefault();

  const name = $('fullName').value;
  const bio = $('bioInput').value;

  setLS('profile', { name, bio });

  $('displayName').textContent = name;
  $('bio').textContent = bio;

  editModal.classList.add('hidden');
});

// Cargar perfil
(() => {
  const profile = getLS('profile');
  if (!profile) return;

  $('displayName').textContent = profile.name || 'Usuario';
  $('bio').textContent = profile.bio || '';
})();

// ===============================
// FAVORITOS
// ===============================
function loadFavorites() {
  const favorites = getLS('favoritos');
  const list = $('favoritesList');
  list.innerHTML = '';

  if (!favorites.length) {
    list.innerHTML = `<p class="text-gray-500 col-span-full">Aún no tienes favoritos</p>`;
    return;
  }

  favorites.forEach((f, i) => {
    list.innerHTML += `
      <div class="bg-white rounded-lg shadow p-3 flex gap-3">
        <img src="${f.file}" class="w-20 h-20 object-cover rounded">
        <div class="flex-1">
          <h4 class="font-semibold">${f.title}</h4>
          <p class="text-xs text-gray-500">${f.type}</p>
        </div>
        <button onclick="removeFavorite(${i})" class="text-red-500">
          <i class="fas fa-heart-broken"></i>
        </button>
      </div>
    `;
  });
}

function removeFavorite(index) {
  const favorites = getLS('favoritos');
  favorites.splice(index, 1);
  setLS('favoritos', favorites);
  loadFavorites();
}

loadFavorites();

// ===============================
// SUBIR ARCHIVOS (PATRONES / TUTORIALES)
// ===============================
function uploadFile(section) {
  const fileInput =
    section === 'patrones'
      ? $('patronFile')
      : $('tutorialFile');

  if (!fileInput || !fileInput.files.length) {
    alert('Selecciona un archivo primero');
    return;
  }

  const file = fileInput.files[0];
  const items = getLS(section);

  // Videos (tutoriales)
  if (file.type.startsWith('video/')) {
    const videoURL = URL.createObjectURL(file);

    items.push({
      id: Date.now(),
      name: file.name,
      type: file.type,
      content: videoURL,
      isVideo: true,
      createdAt: new Date().toISOString()
    });

    setLS(section, items);
    fileInput.value = '';
    renderFiles(section);
    return;
  }

  // Archivos normales (PDF / imágenes)
  const reader = new FileReader();
  reader.onload = e => {
    items.push({
      id: Date.now(),
      name: file.name,
      type: file.type,
      content: e.target.result,
      createdAt: new Date().toISOString()
    });

    setLS(section, items);
    fileInput.value = '';
    renderFiles(section);
  };

  reader.readAsDataURL(file);
}

// ===============================
// RENDER ARCHIVOS
// ===============================
function renderFiles(section) {
  const files = getLS(section);
  const container =
    section === 'patrones'
      ? $('patronesList')
      : $('tutorialesList');

  container.innerHTML = '';

  if (!files.length) {
    container.innerHTML = `<p class="text-gray-500">No hay archivos subidos.</p>`;
    return;
  }

  files.forEach((f, i) => {
    container.innerHTML += `
      <div class="bg-white p-3 rounded shadow flex justify-between items-center">
        <div>
          <strong>${f.name}</strong>
          <p class="text-xs text-gray-500">${f.type}</p>
        </div>
        <div class="flex gap-2">
          <button onclick="viewFile('${section}', ${i})"
            class="px-2 py-1 bg-blue-500 text-white rounded">Ver</button>
          <button onclick="deleteFile('${section}', ${i})"
            class="px-2 py-1 bg-red-500 text-white rounded">Eliminar</button>
        </div>
      </div>
    `;
  });
}

// ===============================
// VER ARCHIVO
// ===============================
function viewFile(section, index) {
  const f = getLS(section)[index];
  if (!f) return;

  const win = window.open();
  win.document.write(`<h2>${f.name}</h2>`);

  if (f.isVideo) {
    win.document.write(`
      <video controls width="100%">
        <source src="${f.content}" type="${f.type}">
      </video>
    `);
  } else if (f.type.startsWith('image/')) {
    win.document.write(`<img src="${f.content}" style="max-width:100%">`);
  } else if (f.type === 'application/pdf') {
    win.document.write(`<iframe src="${f.content}" width="100%" height="600"></iframe>`);
  }
}

// ===============================
// ELIMINAR ARCHIVO
// ===============================
function deleteFile(section, index) {
  const files = getLS(section);
  if (confirm(`¿Eliminar "${files[index].name}"?`)) {
    files.splice(index, 1);
    setLS(section, files);
    renderFiles(section);
  }
}

// ===============================
// INIT
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  $('uploadPatronBtn')?.addEventListener('click', () => uploadFile('patrones'));
  $('uploadTutorialBtn')?.addEventListener('click', () => uploadFile('tutoriales'));

  renderFiles('patrones');
  renderFiles('tutoriales');
});

// ===============================
// EXPORT GLOBAL
// ===============================
window.uploadFile = uploadFile;
window.viewFile = viewFile;
window.deleteFile = deleteFile;
window.removeFavorite = removeFavorite;