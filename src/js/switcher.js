const classNames = {
  options: 'options',
  valueOptions: 'options__value',
  optionsInput: 'options__input',
  optionsLabel: 'options__label',
  optionsType: 'options__type',
  optionsVariants: 'options__variants',
  optionsVariant: 'options__variant',
  periodOptions: 'options__period',
  optionsInputChecked: 'options__input_checked',
};

export default class Switcher {
  optionsConfig = [
    {
      name: 'values',
      className: classNames.valueOptions,
      variants: [
        {
          type: 'absolute',
          text: 'Absolute',
          defaultClass: [classNames.optionsInput, classNames.optionsInputChecked],
        },
        {
          type: 'population',
          text: 'Per 100,000 population',
          defaultClass: [classNames.optionsInput],
        },
      ],
    },
    {
      name: 'period',
      className: classNames.periodOptions,
      variants: [
        {
          type: 'total',
          text: 'Total',
          defaultClass: [classNames.optionsInput, classNames.optionsInputChecked],
        },
        {
          type: 'last day',
          text: 'Last day',
          defaultClass: [classNames.optionsInput],
        },
      ],
    },
  ]

  init = (container, setOptions, options) => {
    this.options = options;
    this.draw(container);
    this.setEvents(container, setOptions);
  }

  draw = (container) => {
    const options = document.createElement('div');
    options.classList.add(classNames.options);

    const optionBlocks = this.optionsConfig.map(this.createOptionsTypeBlock);

    options.append(...optionBlocks);
    container.append(options);
  }

  createOptionsTypeBlock = (options) => {
    const { name, className, variants } = options;

    const optionsBlock = document.createElement('div');
    optionsBlock.classList.add(className);

    const type = document.createElement('p');
    type.classList.add(classNames.optionsType);
    type.innerText = name;

    const varriantsBlock = document.createElement('div');
    varriantsBlock.classList.add(classNames.optionsVariants);

    const variantsArr = variants.map((variant) => this.createOptionsTypeVariant(variant, name));

    varriantsBlock.append(...variantsArr);
    optionsBlock.append(type, varriantsBlock);

    return optionsBlock;
  }

  createOptionsTypeVariant = (variant, name) => {
    const { type, text, defaultClass } = variant;

    const variantWrapper = document.createElement('div');
    variantWrapper.classList.add(classNames.optionsVariant);

    const input = document.createElement('input');
    input.classList.add(...defaultClass);
    input.defaultChecked = defaultClass.length > 1;
    input.type = 'radio';
    input.id = type;
    input.name = name;

    const label = document.createElement('label');
    label.classList.add(classNames.optionsLabel);
    label.htmlFor = type;
    label.innerText = text;

    variantWrapper.append(input, label);
    return variantWrapper;
  }

  setEvents = (container, setOptions) => {
    container.addEventListener('click', () => {
      const inputArray = [...document.getElementsByClassName(classNames.optionsInput)];
      inputArray.forEach((input) => input.classList.remove(classNames.optionsInputChecked));

      const checked = inputArray.filter((input) => input.checked);
      const options = checked.reduce((acc, input) => {
        input.classList.add(classNames.optionsInputChecked);

        switch (input.id) {
          case 'absolute':
            acc.isAbsoluteValues = true;
            break;
          case 'total':
            acc.isAllPeriod = true;
            break;
          case 'population':
            acc.isAbsoluteValues = false;
            break;
          default:
            acc.isAllPeriod = false;
            break;
        }
        return acc;
      }, { isAbsoluteValues: true, isAllPeriod: true });

      setOptions(options);
    });
  }

  updateOptions = ({ isAbsoluteValues, isAllPeriod }) => {
    const inputArray = [...document.getElementsByClassName(classNames.optionsInput)];
    inputArray.forEach((input) => input.classList.remove(classNames.optionsInputChecked));

    const checked = inputArray.filter((input) => {
      let result = false;
      switch (input.id) {
        case 'absolute':
          result = isAbsoluteValues;
          break;
        case 'total':
          result = isAllPeriod;
          break;
        case 'population':
          result = !isAbsoluteValues;
          break;
        default:
          result = !isAllPeriod;
          break;
      }
      return result;
    });

    checked.forEach((input) => input.classList.add(classNames.optionsInputChecked));
  }
}
