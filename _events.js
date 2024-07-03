document.addEventListener("DOMContentLoaded", () => {
  // Instantiate Hint for API token
  const apiTokenHint = new Hint("hint-icon", "hint-content");

  // Instantiate Hint for Model Info
  const modelInfoHint = new Hint("model-hint-icon", "model-hint-content");

  chooseModel.addEventListener("change", updateModelInfo);

  togglePassword.addEventListener("click", () => {
    const type =
      token.getAttribute("type") === "password" ? "text" : "password";
    token.setAttribute("type", type);

    togglePassword.querySelector("i").classList.toggle("fa-eye-slash");
    togglePassword.querySelector("i").classList.toggle("fa-eye");
  });

  btn.addEventListener("click", async () => {
    //form validations
    if (text.value.trim() === "") {
      notificationInstance.show("error", "Please enter some text.");
      return;
    }

    if (token.value.trim() === "") {
      notificationInstance.show("error", "Please enter your API token.");

      return;
    }

    loader.classList.remove("hidden");
    img.src = ""; // Clear the current image
    downloadBtn.classList.add("hidden");

    try {
      const response = await query(chooseModel.value, token.value);
      const objectUrl = URL.createObjectURL(response);
      img.src = objectUrl;
      downloadBtn.classList.remove("hidden");
      imageHistoryInstance.addToHistory(objectUrl);
    } catch (error) {
      notificationInstance.show(
        "error",
        "Sorry, the model is currently unavailable. Please try again later."
      );
    } finally {
      loader.classList.add("hidden");
    }
  });

  downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = img.src;
    link.download = "generated_image.png";
    link.click();
  });
}); //END OF EVENT LISTENER
