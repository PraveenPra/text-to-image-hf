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
const modelInfo = document.querySelector("#model-info-text"); // Get the model info div

const modelDetails = {
  "Melonie/text_to_image_finetuned":
    "These are LoRA adaption weights for runwayml/stable-diffusion-v1-5. The weights were fine-tuned on the lambdalabs/pokemon-blip-captions dataset.",
  "mann-e/Mann-E_Dreams":
    "This is the newest SDXL based model from Mann-E platform, which is a generative AI startup based in Iran. ",
  "alvdansen/midsommarcartoon":
    "A retro-style cartoon print model that blends a bit of an anime influence with classic northern european cartoons.",
};

function updateModelInfo() {
  const selectedModel = chooseModel.value;
  modelInfo.textContent =
    modelDetails[selectedModel] || "No information available for this model.";
}

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

function addToHistory(imageUrl) {
  const historyItem = document.createElement("div");
  historyItem.classList.add("history-item");

  const image = document.createElement("img");
  image.src = imageUrl;

  historyItem.appendChild(image);
  historyContainer.appendChild(historyItem);
}

// Initialize model info display
updateModelInfo();
