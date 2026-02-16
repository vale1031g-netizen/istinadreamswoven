document.addEventListener("DOMContentLoaded", () => {

    const btnGuardar = document.getElementById("guardarPatronBtn");

    if (btnGuardar) {
        btnGuardar.addEventListener("click", guardarPatron);
    }
});

function guardarPatron() {

    const nombre = document.getElementById("patronName").value.trim();
    const descripcion = document.getElementById("patronDescripcion").value.trim();
    const tipo = document.getElementById("patronTipo").value;
    const precio = document.getElementById("patronPrecio").value;
    const archivoInput = document.getElementById("patronFile");

    if (!nombre || !descripcion || !precio || !archivoInput.files.length) {
        alert("Por favor completa todos los campos");
        return;
    }

    const archivo = archivoInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {

        let patrones = JSON.parse(localStorage.getItem("patrones")) || [];

        const nuevoPatron = {
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

        patrones.push(nuevoPatron);

        localStorage.setItem("patrones", JSON.stringify(patrones));

        alert("Patrón guardado correctamente");

        window.location.href = "verpatrones.html";
    };

    reader.readAsDataURL(archivo);
}
