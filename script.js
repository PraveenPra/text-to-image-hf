const token = ""; // Replace with your actual token

async function query(chooseModel) {
  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${chooseModel}`,
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
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.blob();
    return result;
  } catch (error) {
    console.error("Error fetching the image:", error);
    throw error; // Re-throw the error to handle it in the click event listener
  }
}

const img = document.querySelector("#img");
const btn = document.querySelector("#btn");
const downloadBtn = document.querySelector("#downloadBtn");
const text = document.querySelector("#text");
const loader = document.querySelector("#loader");
const historyContainer = document.querySelector("#history");
const chooseModel = document.querySelector("#chooseModel");

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

function addToHistory(imageUrl) {
  const historyItem = document.createElement("div");
  historyItem.classList.add("history-item");

  const image = document.createElement("img");
  image.src = imageUrl;

  historyItem.appendChild(image);
  historyContainer.appendChild(historyItem);
}
