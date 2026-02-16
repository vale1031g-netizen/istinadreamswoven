document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("tutorialForm");
    const btn = document.getElementById("guardarTutorialBtn");

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            guardarTutorial();
        });
    }

    if (btn) {
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            guardarTutorial();
        });
    }
});

function guardarTutorial() {

    const nombre = document.getElementById("tutorialName").value.trim();
    const descripcion = document.getElementById("tutorialDescripcion").value.trim();
    const precio = document.getElementById("tutorialPrecio").value;
    const archivoInput = document.getElementById("tutorialFile");

    if (!nombre || !descripcion || !precio || !archivoInput.files.length) {
        alert("Por favor completa todos los campos.");
        return;
    }

    const archivo = archivoInput.files[0];

    const maxSize = 2 * 1024 * 1024; // 2MB

    if (archivo.size > maxSize) {
        alert("El archivo es demasiado grande. Máximo permitido: 2MB.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {

        let tutoriales = JSON.parse(localStorage.getItem("tutoriales")) || [];

        const nuevoTutorial = {
            id: Date.now(),
            nombre: nombre,
            descripcion: descripcion,
            tipo: archivo.type,
            precio: Number(precio),
            contenido: e.target.result,
            createdAt: new Date().toISOString()
        };

        tutoriales.push(nuevoTutorial);

        try {
            localStorage.setItem("tutoriales", JSON.stringify(tutoriales));
            alert("Tutorial guardado correctamente");
            window.location.href = "vertutoriales.html";
        } catch (error) {
            alert("No se pudo guardar. El almacenamiento está lleno.");
            console.error(error);
        }
    };

    reader.onerror = function() {
        alert("Error al leer el archivo.");
    };

    reader.readAsDataURL(archivo);
}

