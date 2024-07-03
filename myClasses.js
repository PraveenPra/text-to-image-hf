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
