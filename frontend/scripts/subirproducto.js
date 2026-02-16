// scripts/subirpatron.js

document.addEventListener("DOMContentLoaded", () => {
    const productoForm = document.getElementById("productoForm");
    const productoImagen = document.getElementById("productoImagen");

    // Contenedor para preview de imagen
    const previewContainer = document.createElement("div");
    previewContainer.className = "mt-3";
    productoImagen.parentNode.appendChild(previewContainer);

    // Función para mostrar preview de imagen
    productoImagen.addEventListener("change", () => {
        previewContainer.innerHTML = ""; // Limpiar preview anterior
        const file = productoImagen.files[0];
        if (file) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.alt = "Preview del producto";
            img.className = "w-32 h-32 object-cover rounded-lg border";
            previewContainer.appendChild(img);
        }
    });

    // Evento submit del formulario
    productoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Capturar valores del formulario
        const productoData = {
            nombre: document.getElementById("productoName").value.trim(),
            descripcion: document.getElementById("productoDescripcion").value.trim(),
            categoria: document.getElementById("productoCategoria").value,
            precio: parseFloat(document.getElementById("productoPrecio").value),
            stock: parseInt(document.getElementById("productoStock").value),
            imagen: productoImagen.files[0] ? productoImagen.files[0].name : null,
        };

        // Validación básica
        if (!productoData.nombre || !productoData.descripcion || !productoData.precio || !productoData.stock || !productoData.imagen) {
            alert("Por favor, completa todos los campos y selecciona una imagen.");
            return;
        }

        // Simular envío de datos
        console.log("Producto guardado:", productoData);
        alert("Producto guardado correctamente 🎉");

        // Resetear formulario
        productoForm.reset();
        previewContainer.innerHTML = "";
    });
});
