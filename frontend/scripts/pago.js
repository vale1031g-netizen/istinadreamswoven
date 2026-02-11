document.addEventListener("DOMContentLoaded", () => {
  const paymentForm = document.getElementById("paymentForm");
  const paymentMessage = document.getElementById("paymentMessage");
  const montoInput = document.getElementById("paymentAmount");

  // Cargar total desde el carrito
  const total = localStorage.getItem("totalPago");
  if (total) {
    montoInput.value = total;
    montoInput.readOnly = true;
  }

  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const cardName = document.getElementById("cardName").value.trim();
    const cardNumber = document.getElementById("cardNumber").value.trim();
    const cardExpiry = document.getElementById("cardExpiry").value.trim();
    const cardCVV = document.getElementById("cardCVV").value.trim();
    const paymentAmount = parseFloat(montoInput.value);

    // Validaciones básicas
    if (!cardName || !cardNumber || !cardExpiry || !cardCVV || paymentAmount <= 0) {
      paymentMessage.textContent =
        "Por favor, complete todos los campos correctamente.";
      paymentMessage.className = "text-sm text-red-600 text-center";
      return;
    }

    // Simulación de pago exitoso
    localStorage.removeItem("carrito");
    localStorage.removeItem("totalPago");

    paymentMessage.textContent =
      "✅ Pago realizado con éxito. ¡Gracias por tu compra!";
    paymentMessage.className = "text-sm text-green-600 text-center";

    // Redirección
    setTimeout(() => {
      window.location.href = "inicio.html";
    }, 2000);
  });
});
