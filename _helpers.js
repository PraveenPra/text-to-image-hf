function updateModelInfo() {
  const selectedModel = chooseModel.value;
  modelInfo.textContent =
    modelDetails[selectedModel] || "No information available for this model.";
}

//for test only
// function showHistory() {
//   console.log(imageHistoryInstance.history, "history");
//   historyContainer.classList.remove("hidden");
// }
