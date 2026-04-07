export function initForm() {
  const form = document.querySelector(".form");

  if (!form) return;

  const action = form.getAttribute("action");

  if (!action || action === "#") {
    console.warn("Form action não configurado.");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    try {
      const response = await fetch(action, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        form.reset();
        alert("Mensagem enviada com sucesso! 🚀");
      } else {
        alert("Erro ao enviar. Tente novamente.");
      }
    } catch (error) {
      alert("Erro de conexão. Tente novamente.");
    }
  });
}
