/* eslint-disable no-param-reassign */
import { classNames } from './constants';

export default class List {
  constructor(covidData) {
    this.covidData = covidData;
    this.covidDataByCases = this.covidData.sort(
      (a, b) => (a.TotalConfirmed < b.TotalConfirmed ? 1 : -1),
    );
  }

    showList = () => {
      const listControl = document.createElement('div');
      listControl.classList.add('list-control');

      const countryInput = document.createElement('input');
      countryInput.classList.add('country-input');
      countryInput.addEventListener('input', (e) => {
        this.renderSearchValues(e.target.value);
      });

      const paramsSelect = document.createElement('select');
      paramsSelect.classList.add('params-select');

      const togglePeriod = document.createElement('input');
      togglePeriod.classList.add('toggle-period');
      togglePeriod.setAttribute('type', 'checkbox');

      const toggleQuantity = document.createElement('input');
      toggleQuantity.classList.add('toggle-quantity');
      toggleQuantity.setAttribute('type', 'checkbox');

      const listWrapper = document.createElement('div');
      listWrapper.classList.add('list-wrapper');

      this.covidDataByCases.forEach((element) => {
        const listCountryWrapper = document.createElement('div');
        listCountryWrapper.classList.add('list-country-wrappew');

        const listCountry = document.createElement('div');
        listCountry.textContent = element.Country;
        listCountry.classList.add('list-country');

        const listFlag = document.createElement('div');
        listFlag.classList.add('list-flag');
        listFlag.style = `background-image: url(${element.flag})`;

        const listCountryValue = document.createElement('div');
        listCountryValue.textContent = element.TotalConfirmed;
        listCountryValue.classList.add('list-country-value');

        listCountryWrapper.append(listFlag, listCountry, listCountryValue);
        listWrapper.append(listCountryWrapper);
      });

      classNames.listContainer.append(listControl, listWrapper);
      listControl.append(
        paramsSelect,
        togglePeriod,
        'day/allTime',
        toggleQuantity,
        'absolut/100k',
        countryInput,
      );
      paramsSelect.innerHTML = '<option>by Cases</option><option>by Deaths</option><option>by Recovery</option>';
    }

    renderSearchValues = (inputValue) => {
      const result = this.covidDataByCases
        .map((el) => {
          el.Country = el.Country.toLowerCase();
          return el;
        }).filter((element) => element.Country.includes(inputValue));
      console.log(result);
    }
}
