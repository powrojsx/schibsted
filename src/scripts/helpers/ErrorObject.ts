export class ErrorObject {
  element: HTMLElement;

  constructor(message: string) {
    this.element = document.createElement("div");
    this.element.classList.add("error");

    this.showNotification(message);

    setTimeout(() => {
      this.removeNotification();
    }, 5000);
  }

  showNotification = (message: string) => {
    this.element.textContent = message;
    document.body.appendChild(this.element);
  };

  removeNotification = () => {
    document.body.removeChild(this.element);
  };
}
