chooseModel.addEventListener("change", updateModelInfo);

btn.addEventListener("click", async () => {
  if (text.value.trim() === "") {
    alert("Please enter some text.");
    return;
  }

  loader.classList.remove("hidden");
  img.src = ""; // Clear the current image
  downloadBtn.classList.add("hidden");

  try {
    const response = await query(chooseModel.value);
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