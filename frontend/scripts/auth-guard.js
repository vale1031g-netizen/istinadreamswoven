// Bloquear acceso a perfil si no hay sesión iniciada
const session = JSON.parse(localStorage.getItem("session"));
if (!session || !session.loggedIn) {
    window.location.href = "login.html";
}
// Manejar cierre de sesión
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("session");
        window.location.href = "login.html";
    });
}
