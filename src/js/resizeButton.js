import { classNames } from './constants';

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
    const containers = ['map', 'table', 'list', 'chart'];
    const containersArr = containers.map((name) => document.querySelector(`.${name}`));

    this.button.addEventListener('click', (e) => {
      e.currentTarget.classList.toggle(classNames.reduceButton);
      this.container.classList.toggle(classNames.expand);

      containersArr.forEach((container) => {
        if (container !== this.container) {
          container.classList.toggle('hide');
        }
      });

      const event = new Event('resize');
      window.dispatchEvent(event);
    });
  }
}
