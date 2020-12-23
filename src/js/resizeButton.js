const classNames = {
  resizeButton: 'resize-button',
  expandButton: 'resize-button_expand',
  reduceButton: 'resize-button_reduce',
  expand: 'expand',
};

export default class ResizeButton {
  init = (container) => {
    this.container = container;
    this.draw();
    this.setEvent();
  }

  draw = () => {
    this.button = document.createElement('button');
    this.button.classList.add(classNames.resizeButton);
    this.button.classList.add(classNames.expandButton);

    this.container.append(this.button);
  }

  setEvent = () => {
    this.button.addEventListener('click', (e) => {
      e.currentTarget.classList.toggle(classNames.reduceButton);
      this.container.classList.toggle(classNames.expand);

      const event = new Event('resize');
      window.dispatchEvent(event);
    });
  }
}
