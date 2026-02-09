export function getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
}

export function requireAuth() {
    const user = getCurrentUser();
    if (!user) {
    window.location.href = "login.html";
}
}

export function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn?.addEventListener("click", logout);
});
