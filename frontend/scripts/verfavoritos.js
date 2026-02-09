const favoritosGrid = document.getElementById('favoritosGrid');
const favoritosVacio = document.getElementById('favoritosVacio');

let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

function renderFavoritos() {
  favoritosGrid.innerHTML = '';

  if (favoritos.length === 0) {
    favoritosVacio.classList.remove('hidden');
    return;
  }

  favoritosVacio.classList.add('hidden');

  favoritos.forEach((item, index) => {
    const card = document.createElement('article');
    card.className = `
      bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden
    `;

    card.innerHTML = `
      <img src="${item.imagen}"
           class="w-full h-40 object-cover">

      <div class="p-4 space-y-2">
        <span class="text-xs uppercase text-gray-500">${item.tipo}</span>

        <h3 class="font-medium">${item.titulo}</h3>

        <p class="text-sm text-gray-600 line-clamp-2">
          ${item.descripcion}
        </p>

        <div class="flex justify-between items-center pt-3">
          <a href="${item.link}"
             class="text-sm text-primary hover:underline">
            Ver
          </a>

          <button onclick="eliminarFavorito(${index})"
                  class="text-sm text-gray-500 hover:text-red-600">
            Quitar
          </button>
        </div>
      </div>
    `;

    favoritosGrid.appendChild(card);
  });
}

function eliminarFavorito(index) {
  favoritos.splice(index, 1);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  renderFavoritos();
}

renderFavoritos();
