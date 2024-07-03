// Hint class definition
class Hint {
  constructor(hintIconId, hintContentId) {
    this.hintIcon = document.querySelector(`#${hintIconId}`);
    this.hintContent = document.querySelector(`#${hintContentId}`);

    // Bind event listener
    this.hintIcon.addEventListener("click", this.toggle.bind(this));
  }

  toggle(event) {
    event.preventDefault();
    this.hintContent.classList.toggle("show");
  }
}

// Notification class with Singleton pattern (no need to create new instances for each notification)
class Notification {
  constructor() {
    if (!Notification.instance) {
      Notification.instance = this;
      this.notifications = []; // Array to store active notifications
    }
    return Notification.instance;
  }

  show(type, message) {
    const notificationElement = document.createElement("div");
    notificationElement.className = `notification ${type}`;
    notificationElement.textContent = message;

    // Add close button
    const closeButton = document.createElement("span");
    closeButton.className = "close-btn";
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", () =>
      this.close(notificationElement)
    );
    notificationElement.appendChild(closeButton);

    document.body.appendChild(notificationElement);

    // Auto-close after 5 seconds (5000 milliseconds)
    setTimeout(() => {
      this.close(notificationElement);
    }, 5000);
  }

  close(notificationElement) {
    notificationElement.remove();
  }
}

// Singleton instance
const notificationInstance = new Notification();

// Example usage:
// notificationInstance.show("success", "Operation successful!");
// notificationInstance.show("error", "An error occurred. Please try again.");
// notificationInstance.show("info", "Informational message.");

// ImageHistory class
class ImageHistory {
  constructor(historyContainerId) {
    this.history = []; // Array to store image URLs
    this.historyContainer = document.querySelector(`#${historyContainerId}`);
  }

  addToHistory(imageUrl) {
    this.history.push(imageUrl);
    this.renderHistory(); // Update the DOM to reflect changes
  }

  renderHistory() {
    // Clear existing history items in the DOM
    this.historyContainer.innerHTML = "";

    if (this.history.length === 0) {
      const historyItem = document.createElement("p");
      historyItem.textContent = "No images generated yet.";
      this.historyContainer.appendChild(historyItem);
      return;
    }

    // Render each image in history
    this.history.forEach((imageUrl, index) => {
      const historyItem = document.createElement("div");
      historyItem.classList.add("history-item");

      const image = document.createElement("img");
      image.src = imageUrl;

      historyItem.appendChild(image);

      // Add download button
      const downloadButton = document.createElement("span");
      const iconDownload = document.createElement("i");
      iconDownload.classList.add("fas", "fa-arrow-down");
      downloadButton.appendChild(iconDownload);
      //   downloadButton.textContent = "Download";
      downloadButton.classList.add("downloadButton");
      downloadButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.downloadThisImage(index);
      });
      historyItem.appendChild(downloadButton);

      // Add remove button
      const removeBtn = document.createElement("span");
      const iconRemove = document.createElement("i");
      iconRemove.classList.add("fas", "fa-xmark");
      removeBtn.appendChild(iconRemove);
      //   removeBtn.textContent = "Remove";
      removeBtn.classList.add("removeButton");

      removeBtn.addEventListener("click", (e) => this.removeFromHistory(index));
      historyItem.appendChild(removeBtn);

      this.historyContainer.appendChild(historyItem);
    });
  }

  downloadThisImage(index) {
    const imageUrl = this.history[index];
    if (imageUrl) {
      //   // Create a temporary <a> element to trigger download
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `image_${index + 1}.png`; // Adjust filename as needed
      link.click();
      link.remove();
    } else {
      //   // Handle error or show notification if image URL not found
      notificationInstance.show("error", "Image URL not found.");
    }
  }

  removeFromHistory(index) {
    if (index >= 0 && index < this.history.length) {
      this.history.splice(index, 1);
      this.renderHistory(); // Update the DOM after removal
      notificationInstance.show("success", "Image removed from history.");
    } else {
      // Handle error or show notification if index is out of range
      notificationInstance.show("error", "Invalid index.");
    }
  }

  clearHistory() {
    this.history = [];
    this.saveToLocalStorage();
    this.renderHistory();
    notificationInstance.show("success", "History cleared.");
  }

  saveToLocalStorage() {
    localStorage.setItem("TextToImgHistory", JSON.stringify(this.history));
    notificationInstance.show("success", "History saved.");
  }

  loadImageHistory() {
    const savedHistory = localStorage.getItem("TextToImgHistory");
    if (savedHistory) {
      this.history = JSON.parse(savedHistory);
      this.renderHistory();
    }
  }

  // clearLocalStorage() {
  //   localStorage.removeItem("TextToImgHistory");
  // }
}

// Singleton instance of ImageHistory
const imageHistoryInstance = new ImageHistory("history-container"); // Provide ID of history container element

// Example usage:
// imageHistoryInstance.addToHistory("https://example.com/image1.png");
