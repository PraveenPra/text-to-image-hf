document.addEventListener("DOMContentLoaded", () => {
  // hintIcon.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   console.log("clicked", hintContent.classList);
  //   hintContent.classList.toggle("show");
  // });
  // Instantiate Hint for API token
  const apiTokenHint = new Hint("hint-icon", "hint-content");

  // Instantiate Hint for Model Info
  const modelInfoHint = new Hint("model-hint-icon", "model-hint-content");

  chooseModel.addEventListener("change", updateModelInfo);

  togglePassword.addEventListener("click", () => {
    console.log(token.getAttribute("type"));
    const type =
      token.getAttribute("type") === "password" ? "text" : "password";
    token.setAttribute("type", type);

    togglePassword.querySelector("i").classList.toggle("fa-eye-slash");
    togglePassword.querySelector("i").classList.toggle("fa-eye");
  });

  btn.addEventListener("click", async () => {
    //form validations
    if (text.value.trim() === "") {
      alert("Please enter some text.");
      return;
    }

    if (token.value.trim() === "") {
      alert("Please enter your API token.");
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

      addToHistory(objectUrl);
    } catch (error) {
      alert(
        "Sorry, the service is currently unavailable. Please try again later."
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
