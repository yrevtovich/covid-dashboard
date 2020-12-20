/* eslint-disable import/prefer-default-export */
import { classNames } from './constants';

export class Keyboard {
  constructor() {
    this.rows = [14, 15, 13, 12, 8];
    this.layout = {
      eng: [
        [
          ['`', '~'],
          ['1', '!'],
          ['2', '@'],
          ['3', '#'],
          ['4', '$'],
          ['5', '%'],
          ['6', '^'],
          ['7', '&'],
          ['8', '*'],
          ['9', '('],
          ['0', ')'],
          ['-', '_'],
          ['=', '+'],
          ['Backspace', 'Backspace'],
        ],
        [
          ['Tab', 'Tab'],
          ['q', 'Q'],
          ['w', 'W'],
          ['e', 'E'],
          ['r', 'R'],
          ['t', 'T'],
          ['y', 'Y'],
          ['u', 'U'],
          ['i', 'I'],
          ['o', 'O'],
          ['p', 'P'],
          ['[', '{'],
          [']', '}'],
          ['\\', '|'],
          ['Del', 'Del'],
        ],
        [
          ['CapsLock', 'CapsLock'],
          ['a', 'A'],
          ['s', 'S'],
          ['d', 'D'],
          ['f', 'F'],
          ['g', 'G'],
          ['h', 'H'],
          ['j', 'J'],
          ['k', 'K'],
          ['l', 'L'],
          [';', ':'],
          ["'", '"'],
          ['Enter', 'Enter'],
        ],
        [
          ['Shift', 'Shift'],
          ['z', 'Z'],
          ['x', 'X'],
          ['c', 'C'],
          ['v', 'V'],
          ['b', 'B'],
          ['n', 'N'],
          ['m', 'M'],
          [',', '<'],
          ['.', '>'],
          ['/', '?'],
          ['Shift', 'Shift'],
        ],
        [
          ['Ctrl', 'Ctrl'],
          ['EN', 'EN'],
          ['Alt', 'Alt'],
          ['Space', 'Space'],
          ['←', '←'],
          ['→', '→'],
          ['Sound', 'Sound'],
          ['Speech', 'Speech'],
        ],
      ],
      rus: [
        [
          ['ё', 'Ё'],
          ['1', '!'],
          ['2', '"'],
          ['3', '№'],
          ['4', ';'],
          ['5', '%'],
          ['6', ':'],
          ['7', '?'],
          ['8', '*'],
          ['9', '('],
          ['0', ')'],
          ['-', '_'],
          ['=', '+'],
          ['Backspace', 'Backspace'],
        ],
        [
          ['Tab', 'Tab'],
          ['й', 'Й'],
          ['ц', 'Ц'],
          ['у', 'У'],
          ['к', 'К'],
          ['е', 'Е'],
          ['н', 'Н'],
          ['г', 'Г'],
          ['ш', 'Ш'],
          ['щ', 'Щ'],
          ['з', 'З'],
          ['х', 'Х'],
          ['ъ', 'Ъ'],
          ['\\', '/'],
          ['Del', 'Del'],
        ],
        [
          ['CapsLock', 'CapsLock'],
          ['ф', 'Ф'],
          ['ы', 'Ы'],
          ['в', 'В'],
          ['а', 'А'],
          ['п', 'П'],
          ['р', 'Р'],
          ['о', 'О'],
          ['л', 'Л'],
          ['д', 'Д'],
          ['ж', 'Ж'],
          ['э', 'Э'],
          ['Enter', 'Enter'],
        ],
        [
          ['Shift', 'Shift'],
          ['я', 'Я'],
          ['ч', 'Ч'],
          ['с', 'С'],
          ['м', 'М'],
          ['и', 'И'],
          ['т', 'Т'],
          ['ь', 'Ь'],
          ['б', 'Б'],
          ['ю', 'Ю'],
          ['.', ','],
          ['Shift', 'Shift'],
        ],
        [
          ['Ctrl', 'Ctrl'],
          ['RU', 'RU'],
          ['Alt', 'Alt'],
          ['Space', 'Space'],
          ['←', '←'],
          ['→', '→'],
          ['Sound', 'Sound'],
          ['Speech', 'Speech'],
        ],
      ],
    };
    this.keyEventCodes = [
      [
        'Backquote',
        'Digit1',
        'Digit2',
        'Digit3',
        'Digit4',
        'Digit5',
        'Digit6',
        'Digit7',
        'Digit8',
        'Digit9',
        'Digit0',
        'Minus',
        'Equal',
        'Backspace',
      ],
      [
        'Tab',
        'KeyQ',
        'KeyW',
        'KeyE',
        'KeyR',
        'KeyT',
        'KeyY',
        'KeyU',
        'KeyI',
        'KeyO',
        'KeyP',
        'BracketLeft',
        'BracketRight',
        'Backslash',
        'Delete',
      ],
      [
        'CapsLock',
        'KeyA',
        'KeyS',
        'KeyD',
        'KeyF',
        'KeyG',
        'KeyH',
        'KeyJ',
        'KeyK',
        'KeyL',
        'Semicolon',
        'Quote',
        'Enter',
      ],
      [
        'ShiftLeft',
        'KeyZ',
        'KeyX',
        'KeyC',
        'KeyV',
        'KeyB',
        'KeyN',
        'KeyM',
        'Comma',
        'Period',
        'Slash',
        'ShiftRight',
      ],
      [
        'ControlLeft',
        'MetaLeft',
        'AltLeft',
        'Space',
        'ArrowLeft',
        'ArrowRight',
        'Sound',
        'Speech',
      ],
    ];
    this.lang = 'eng';
    this.specialCodes = [
      'Tab',
      'Backspace',
      'CapsLock',
      'ShiftRight',
      'ShiftLeft',
      'MetaLeft',
      'Delete',
      'ControlLeft',
      'ControlRight',
      'AltLeft',
      'AltRight',
      'Enter',
      'Space',
      'ArrowLeft',
      'ArrowRight',
      'Sound',
      'Speech',
    ];
    this.keys = null;
    this.keyboardRows = null;
    this.board = null;
    this.keyboardArea = null;
    this.uppercase = 0;
    this.capsActive = false;
    this.shiftActive = false;
    this.ctrl = false;
    this.alt = false;
    this.sound = false;
  }

  init() {
    this.setLanguage();
    this.draw(0);
    this.setElems();
  }

  draw(value) {
    const fragment = new DocumentFragment();
    const keyboardWrapper = document.createElement('div');
    keyboardWrapper.classList.add(classNames.keyboardWrapper);

    const board = document.createElement('div');
    board.classList.add(classNames.keyboard);
    keyboardWrapper.append(board);

    for (let i = 0; i < this.rows.length; i += 1) {
      const keyRow = document.createElement('div');
      keyRow.classList.add(classNames.keyboardRow);
      board.append(keyRow);

      for (let k = 0; k < this.rows[i]; k += 1) {
        const key = document.createElement('p');
        key.setAttribute('data-key-event-code', this.keyEventCodes[i][k]);
        key.classList.add(classNames.keyboardKey);
        let keyName = this.layout[this.lang][i][k][value];
        if (keyName.length > 1) {
          key.classList.add(`keyboard__${keyName.toLowerCase()}`);
        }

        if (keyName === 'Space') {
          keyName = ' ';
        }

        if (keyName === 'Sound') {
          keyName = '';
          key.classList.add(classNames.keyboardSoundIcon);
        }

        if (keyName === 'Speech') {
          keyName = '';
          key.classList.add(classNames.keyboardSpeechIcon);
        }

        key.innerText = keyName;
        keyRow.append(key);
      }
    }
    fragment.append(keyboardWrapper);

    document.body.appendChild(fragment);
  }

  setElems() {
    this.keys = document.querySelectorAll(`.${classNames.keyboardKey}`);
    this.keyboardArea = document.querySelector(
      `.${classNames.keyboardWrapper}`,
    );
    this.keyboardRows = document.querySelectorAll(`.${classNames.keyboardRow}`);
    this.board = document.querySelector(`.${classNames.keyboard}`);
    this.textField = document.querySelector(`${classNames.keyboardTextarea}`);
    this.button = document.querySelector('button');
  }

  remove() {
    this.keyboardArea.remove();
  }

  playSound = (url) => {
    if (!this.sound) return;

    const audio = new Audio(url);
    audio.play();
  };

  toggleSound = () => {
    this.sound = !this.sound;
  };

  setLanguage() {
    if (!localStorage.lang) {
      localStorage.setItem('lang', 'eng');
    } else {
      this.lang = localStorage.lang;
    }
  }

  changeLang(value) {
    this.lang = value;
    this.remove();
    this.draw(0);
  }

  checkSpecialCode(code) {
    return this.specialCodes.includes(code);
  }

  typeKey(value) {
    this.textField.setRangeText(
      value,
      this.textField.selectionStart,
      this.textField.selectionEnd,
      'end',
    );
  }

  del() {
    this.textField.setRangeText(
      '',
      this.textField.selectionStart,
      this.textField.selectionEnd + 1,
      'end',
    );
  }

  backspace() {
    if (this.textField.selectionStart > 0) {
      this.textField.setRangeText(
        '',
        this.textField.selectionStart - 1,
        this.textField.selectionEnd,
        'end',
      );
    }
  }

  enter() {
    this.typeKey('\n');
  }

  shift() {
    this.keyboardRows.forEach((row, rowIndex) => {
      const currentRow = row.querySelectorAll(`.${classNames.keyboardKey}`);
      currentRow.forEach((key, keyIndex) => {
        const currentKey = key;
        if (
          this.uppercase === 1
          && !currentKey.classList.contains(classNames.keyboardSpace)
          && !currentKey.classList.contains(classNames.keyboardWin)
          && !currentKey.classList.contains(classNames.keyboardSound)
          && !currentKey.classList.contains(classNames.keyboardSpeech)
        ) {
          let currentKeyValue = this.layout[this.lang][rowIndex][keyIndex][1];
          if (
            this.capsActive
            && rowIndex > 0
            && rowIndex < 4
            && currentKeyValue.length === 1
          ) {
            currentKeyValue = currentKeyValue.toLowerCase();
          }
          currentKey.innerText = currentKeyValue;
        } else if (
          !currentKey.classList.contains(classNames.keyboardSpace)
          && !currentKey.classList.contains(classNames.keyboardWin)
          && !currentKey.classList.contains(classNames.keyboardSound)
          && !currentKey.classList.contains(classNames.keyboardSpeech)
        ) {
          let currentKeyValue = this.layout[this.lang][rowIndex][keyIndex][0];
          if (
            this.capsActive
            && rowIndex > 0
            && rowIndex < 4
            && currentKeyValue.length === 1
          ) {
            currentKeyValue = currentKeyValue.toUpperCase();
          }
          currentKey.innerText = currentKeyValue;
        }
      });
    });
  }

  capsLock() {
    this.keys.forEach((key, index) => {
      if (key.innerText.length === 1 && this.capsActive) {
        this.keys[index].innerText = key.innerText.toUpperCase();
      } else if (key.innerText.length === 1 && !this.capsActive) {
        this.keys[index].innerText = key.innerText.toLowerCase();
      }
    });
  }

  switchLang() {
    this.keyboardRows.forEach((row, rowIndex) => {
      const currentRow = row.querySelectorAll(`.${classNames.keyboardKey}`);
      currentRow.forEach((key, keyIndex) => {
        const currentKey = key;
        if (this.uppercase === 1) {
          if (
            !currentKey.classList.contains(classNames.keyboardSpace)
            && !currentKey.classList.contains(classNames.keyboardWin)
            && !currentKey.classList.contains(classNames.keyboardSound)
            && !currentKey.classList.contains(classNames.keyboardSpeech)
          ) {
            const currentKeyValue = this.layout[this.lang][rowIndex][
              keyIndex
            ][1];
            currentKey.innerText = currentKeyValue;
          }
        } else if (
          !currentKey.classList.contains(classNames.keyboardSpace)
          && !currentKey.classList.contains(classNames.keyboardWin)
          && !currentKey.classList.contains(classNames.keyboardSound)
          && !currentKey.classList.contains(classNames.keyboardSpeech)
        ) {
          const currentKeyValue = this.layout[this.lang][rowIndex][keyIndex][0];
          currentKey.innerText = currentKeyValue;
        }
      });
    });
  }

  pressleftCtrl(value) {
    this.ctrl = value;
  }

  pressAlt(value) {
    this.alt = value;
  }

  space() {
    this.typeKey(' ');
  }

  tab() {
    this.typeKey('\t');
  }

  arrowLeft() {
    if (
      this.textField.selectionStart > 0
      && this.textField.selectionStart === this.textField.selectionEnd
    ) {
      this.textField.selectionStart -= 1;
    }
    this.textField.selectionEnd = this.textField.selectionStart;
  }

  arrowRight() {
    if (this.textField.selectionStart === this.textField.selectionEnd) {
      this.textField.selectionEnd += 1;
    }
    this.textField.selectionStart = this.textField.selectionEnd;
  }
}

const keyboard = new Keyboard();
keyboard.init();

window.addEventListener('keydown', (event) => {
  keyboard.keyEventCodes.forEach((elem) => {
    if (elem.find((item) => item === event.code)) {
      event.preventDefault();
    }
  });

  const specialCode = keyboard.checkSpecialCode(event.code);
  const key = document.querySelector(`[data-key-event-code = ${event.code}]`);

  if (!key) return;

  const keyCode = key.getAttribute('data-key-event-code');

  switch (keyCode) {
    case 'Delete':
      keyboard.del();
      break;

    case 'Backspace':
      keyboard.backspace();
      break;

    case 'CapsLock':
      key.classList.toggle(classNames.keyboardKeyActive);
      if (!keyboard.capsActive) {
        keyboard.capsActive = true;
        keyboard.capsLock();
      } else {
        keyboard.capsActive = false;
        keyboard.capsLock();
      }
      break;

    case 'ShiftRight':
      if (!keyboard.uppercase) {
        keyboard.uppercase = 1;
        keyboard.shift();
      } else {
        keyboard.uppercase = 0;
        keyboard.shift();
      }
      break;

    case 'ShiftLeft':
      if (!keyboard.uppercase) {
        keyboard.uppercase = 1;
        keyboard.shift();
      } else {
        keyboard.uppercase = 0;
        keyboard.shift();
      }
      break;

    case 'Enter':
      keyboard.enter();
      break;

    case 'Tab':
      keyboard.tab();
      break;

    case 'Space':
      keyboard.space();
      break;

    case 'ArrowLeft':
      keyboard.arrowLeft();
      break;

    case 'ArrowRight':
      keyboard.arrowRight();
      break;

    case 'ControlLeft':
      keyboard.pressleftCtrl(true);
      break;

    case 'AltLeft':
      keyboard.pressAlt(true);
      break;

    default:
      if (!specialCode) {
        keyboard.typeKey(key.innerText);
      }
      break;
  }

  if (event.code !== 'CapsLock') {
    key.classList.add(classNames.keyboardKeyActive);
  }

  if (keyboard.ctrl && keyboard.alt) {
    if (keyboard.lang === 'eng') {
      keyboard.lang = 'rus';
      localStorage.setItem('lang', 'rus');
    } else {
      keyboard.lang = 'eng';
      localStorage.setItem('lang', 'eng');
    }
    keyboard.switchLang();
  }

  const url = key.dataset.audio;
  keyboard.playSound(url);
  keyboard.textField.focus();
});

window.addEventListener('keyup', (event) => {
  const key = document.querySelector(`[data-key-event-code = ${event.code}]`);

  if (!key) return;

  if (event.code !== 'CapsLock') {
    key.classList.remove(classNames.keyboardKeyActive);
  }

  if (event.code === 'ShiftRight' || event.code === 'ShiftLeft') {
    keyboard.uppercase = 0;
    keyboard.shift();
  }

  if (event.code === 'ControlLeft') {
    keyboard.pressleftCtrl(false);
  }

  if (event.code === 'AltLeft') {
    keyboard.pressAlt(false);
  }
});

// ///////////////////// Mose Events

function mouseDownEvents(event) {
  if (!event.target.classList.contains(classNames.keyboardKey)) return;

  const targetKey = event.target.getAttribute('data-key-event-code');
  const specialCode = keyboard.checkSpecialCode(targetKey);

  if (!specialCode) {
    keyboard.typeKey(event.target.innerText);
    event.target.classList.add(classNames.keyboardKeyActive);
  }

  switch (targetKey) {
    case 'Delete':
      keyboard.del();
      break;

    case 'Backspace':
      keyboard.backspace();
      break;

    case 'CapsLock':
      event.target.classList.toggle(classNames.keyboardKeyActive);
      if (!keyboard.capsActive) {
        keyboard.capsActive = true;
        keyboard.capsLock();
      } else {
        keyboard.capsActive = false;
        keyboard.capsLock();
      }
      break;
    case 'Sound':
      event.target.classList.toggle(classNames.keyboardKeyActive);
      keyboard.toggleSound();
      break;

    case 'ShiftRight':
      event.target.classList.toggle(classNames.keyboardKeyActive);
      if (!keyboard.uppercase) {
        keyboard.uppercase = 1;
        keyboard.shift();
      } else {
        keyboard.uppercase = 0;
        keyboard.shift();
      }
      break;

    case 'ShiftLeft':
      event.target.classList.toggle(classNames.keyboardKeyActive);
      if (!keyboard.uppercase) {
        keyboard.uppercase = 1;
        keyboard.shift();
      } else {
        keyboard.uppercase = 0;
        keyboard.shift();
      }
      break;

    case 'Enter':
      keyboard.enter();
      break;

    case 'Tab':
      keyboard.tab();
      break;

    case 'Space':
      keyboard.space();
      break;

    case 'ArrowLeft':
      keyboard.arrowLeft();
      break;

    case 'ArrowRight':
      keyboard.arrowRight();
      break;

    case 'MetaLeft':
      if (keyboard.lang === 'eng') {
        keyboard.lang = 'rus';
        localStorage.setItem('lang', 'rus');
      } else {
        keyboard.lang = 'eng';
        localStorage.setItem('lang', 'eng');
      }
      keyboard.switchLang();
      break;

    default:
      break;
  }

  const url = event.target.dataset.audio;
  keyboard.playSound(url);
  keyboard.textField.focus();
}

function mouseupEvents() {
  keyboard.keys.forEach((key) => {
    if (
      !key.classList.contains(classNames.keyboardCapsLock)
      && !key.classList.contains(classNames.keyboardShift)
      && !key.classList.contains(classNames.keyboardSound)
      && !key.classList.contains(classNames.keyboardSpeech)
    ) {
      key.classList.remove(classNames.keyboardKeyActive);
    }
  });

  keyboard.textField.focus();
}

function setKeyboardListeners() {
  keyboard.board.addEventListener('mouseup', mouseupEvents);
  keyboard.board.addEventListener('mousedown', mouseDownEvents);
}

setKeyboardListeners();

keyboard.button.addEventListener('click', (e) => {
  keyboard.board.classList.toggle('keyboard__visible');
  e.target.classList.toggle('button__active');
});
