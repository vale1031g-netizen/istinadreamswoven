document.addEventListener("DOMContentLoaded", () => {

    const btnGuardar = document.getElementById("guardarTutorialBtn");

    if (btnGuardar) {
        btnGuardar.addEventListener("click", guardarTutorial);
    }
});

function guardarTutorial() {

    const nombre = document.getElementById("tutorialName").value.trim();
    const descripcion = document.getElementById("tutorialDescripcion").value.trim();
    const tipo = document.getElementById("tutorialTipo").value;
    const precio = document.getElementById("tutorialPrecio").value;
    const archivoInput = document.getElementById("tutorialFile");

    if (!nombre || !descripcion || !precio || !archivoInput.files.length) {
        alert("Por favor completa todos los campos");
        return;
    }

    const archivo = archivoInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {

        let tutoriales = JSON.parse(localStorage.getItem("tutoriales")) || [];

        const nuevoTutorial = {
            id: Date.now(),
            nombre,
            descripcion,
            tipo,
            precio: Number(precio),
            name: archivo.name,
            type: archivo.type,
            content: e.target.result,
            createdAt: new Date().toISOString()
        };

        tutoriales.push(nuevoTutorial);

        localStorage.setItem("tutoriales", JSON.stringify(tutoriales));

        alert("Tutorial guardado correctamente");

        window.location.href = "vertutoriales.html";
    };

    reader.readAsDataURL(archivo);
}
