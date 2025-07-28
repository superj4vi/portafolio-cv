((d) => {
  const $form = d.querySelector(".contact__form"),
    $loader = d.querySelector(".contact__form--loader"),
    $response = d.querySelector(".contact__form--response");

  // Validación de formulario
  const validateField = (input) => {
    const $errorMessage = d.querySelector(`#${input.id}-error`);
    let isValid = true;
    let message = "";

    if (!input.value.trim()) {
      isValid = false;
      message = "Este campo es obligatorio";
    } else if (input.pattern && !new RegExp(input.pattern).test(input.value)) {
      isValid = false;
      message = input.title || "Formato inválido";
    }

    if (!isValid) {
      input.classList.add("invalid");
      if ($errorMessage) $errorMessage.textContent = message;
    } else {
      input.classList.remove("invalid");
      if ($errorMessage) $errorMessage.textContent = "";
    }

    return isValid;
  };

  // Validar campos en tiempo real
  $form.querySelectorAll("input, textarea").forEach(input => {
    input.addEventListener("input", () => validateField(input));
    input.addEventListener("blur", () => validateField(input));
  });

  // Anti-spam: limitar envíos
  const SUBMIT_TIMEOUT = 3000; // 3 segundos
  let lastSubmitTime = 0;

  $form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validar todos los campos
    const fields = Array.from($form.querySelectorAll("input, textarea"));
    const isValid = fields.every(field => validateField(field));

    if (!isValid) {
      return;
    }

    // Anti-spam check
    const now = Date.now();
    if (now - lastSubmitTime < SUBMIT_TIMEOUT) {
      return;
    }
    lastSubmitTime = now;

    try {
      $loader.classList.remove("none");
      
      const formData = new FormData(e.target);
      const response = await fetch("https://formsubmit.co/ajax/aragonjavier017@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(response.statusText || "Error al enviar el formulario");
      }

      const data = await response.json();
      
      if (data.success) {
        location.hash = "#gracias";
        $form.reset();
      } else {
        throw new Error(data.message || "Error al procesar el formulario");
      }

    } catch (err) {
      console.error(err);
      $response.querySelector("h3").innerHTML = `
        Error: ${err.message || "Ha ocurrido un error. Por favor, intenta de nuevo más tarde."}
      `;
      location.hash = "#error";
    } finally {
      $loader.classList.add("none");
      
      // Cerrar modal después de 5 segundos
      setTimeout(() => {
        if (location.hash === "#gracias" || location.hash === "#error") {
          location.hash = "#close";
        }
      }, 5000);
    }
  });
})(document);
