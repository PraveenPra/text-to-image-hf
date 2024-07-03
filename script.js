const token = "YOUR_TOKEN_HERE";
async function query(data) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: text.value }),
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const result = await response.blob();
    return result;
  } catch (err) {
    console.error("Error fetching the image:", error);
    throw error; // Re-throw the error to handle it in the click event listener
  }
}

const img = document.querySelector("#img");

const btn = document.querySelector("#btn");

const text = document.querySelector("#text");

btn.addEventListener("click", async () => {
  loader.classList.remove("hidden");
  img.src = ""; // Clear the current image

  try {
    const response = await query();
    const objectUrl = URL.createObjectURL(response);
    img.src = objectUrl;
  } catch (error) {
    alert(
      "Sorry, the service is currently unavailable. Please try again later."
    );
  } finally {
    loader.classList.add("hidden");
  }
});

//example
// query({ inputs: "Astronaut riding a horse" }).then((response) => {
//   // Use image
// });
