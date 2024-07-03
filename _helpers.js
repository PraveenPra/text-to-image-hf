function updateModelInfo() {
  const selectedModel = chooseModel.value;
  modelInfo.textContent =
    modelDetails[selectedModel] || "No information available for this model.";
}

function addToHistory(imageUrl) {
  // const historyItem = document.createElement("div");
  // historyItem.classList.add("history-item");

  // const image = document.createElement("img");
  // image.src = imageUrl;

  // historyItem.appendChild(image);
  // historyContainer.appendChild(historyItem);
  // console.log(imageUrl, "url");
  imageHistoryInstance.addToHistory(imageUrl);
}

// function showHistory() {
//   console.log(imageHistoryInstance.history, "history");
//   historyContainer.classList.remove("hidden");
// }
