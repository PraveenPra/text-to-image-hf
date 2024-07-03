const token = "";
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

const downloadBtn = document.querySelector("#downloadBtn");

const loader = document.querySelector("#loader");

const historyContainer = document.querySelector("#history");

btn.addEventListener("click", async () => {
  if (text.value.trim() === "") {
    alert("Please enter some text.");
    return;
  }

  loader.classList.remove("hidden");
  img.src = ""; // Clear the current image
  downloadBtn.classList.add("hidden");
  historyContainer.innerHTML = "";

  try {
    const response = await query();
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
  link.download = "image.png";
  link.click();
});

function addToHistory(imageUrl) {
  const historyItem = document.createElement("div");
  historyItem.classList.add("history-item");
  const img = document.createElement("img");
  img.src = imageUrl;
  historyItem.appendChild(img);
  historyContainer.appendChild(historyItem);
}
//example
// query({ inputs: "Astronaut riding a horse" }).then((response) => {
//   // Use image
// });
