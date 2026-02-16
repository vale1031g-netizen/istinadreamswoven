// Toggle de contraseñas para login y registro
function togglePassword(id) {
    const input = document.getElementById(id);
    const icon = input.nextElementSibling.querySelector("i");

    if (input.type === "password") {
        input.type = "text";             // Mostrar contraseña
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";         // Ocultar contraseña
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

// Validación de contraseña (mínimo 6 caracteres, 1 número y 1 símbolo)
function isValidPassword(pwd) {
    return pwd.length >= 6 && /[0-9]/.test(pwd) && /[!@#$%^&*]/.test(pwd);
}

// Registro
const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", e => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const terms = document.getElementById("terms").checked;

        if (!name || !email || !password || !confirmPassword) {
            alert("Completa todos los campos");
            return;
        }
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        if (!isValidPassword(password)) {
            alert("La contraseña debe tener al menos 6 caracteres, un número y un carácter especial");
            return;
        }
        if (!terms) {
            alert("Debes aceptar los términos y condiciones");
            return;
        }

        const user = { name, email, password, createdAt: new Date().toISOString() };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("session", "active");

        alert("¡Registro exitoso!");
        window.location.href = "perfil.html";
    });
}

// Inicio de sesión
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (!savedUser) {
            alert("No existe una cuenta registrada");
            return;
        }
        if (email === savedUser.email && password === savedUser.password) {
            localStorage.setItem("session", "active");
            window.location.href = "inicio.html";
        } else {
            alert("Correo o contraseña incorrectos");
        }
    });
}
