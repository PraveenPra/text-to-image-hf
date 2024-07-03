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
