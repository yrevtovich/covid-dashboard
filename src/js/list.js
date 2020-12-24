/* eslint-disable no-multi-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { classNames } from './constants';
import Switcher from './switcher';
import ResizeButton from './resizeButton';

export default class List {
  containers = {
    options: document.querySelector(`.${classNames.listOptions}`),
    list: document.querySelector(`.${classNames.list}`),
  };

  init(setCountry, covidData, options, setOptions, selectedOption, setSelect) {
    const { containers } = this;
    this.setCountry = setCountry;
    this.setSelect = setSelect;

    this.switcher = new Switcher();
    this.switcher.init(containers.options, setOptions, options);

    this.resizeButton = new ResizeButton();
    this.resizeButton.init(containers.list);

    this.covidData = covidData;
    this.options = options;
    this.selectedOption = selectedOption;

    this.listSelect = document.querySelector(`.${classNames.listSelect}`);
    const copyCovidDataForSortTotalConfirmed = [...covidData];
    this.drawList(
      setCountry,
      copyCovidDataForSortTotalConfirmed.sort((a, b) => (a.TotalConfirmed < b.TotalConfirmed ? 1 : -1)),
      'TotalConfirmed',
      setSelect,
    );
  }

  drawList = (setCountry, sortedCovidData, insertedValue, setSelect) => {
    document.querySelector(`.${classNames.listResults}`).innerHTML = '';
    sortedCovidData.forEach((element) => {
      const listCountryWrapper = document.createElement('div');
      listCountryWrapper.classList.add('list-country-wrapper');

      const listCountry = document.createElement('div');
      listCountry.textContent = element.Country;
      listCountry.classList.add('list-country-name');

      const listFlag = document.createElement('div');
      listFlag.classList.add('list-country-flag');
      listFlag.style = `background-image: url(https://www.countryflags.io/${element.CountryCode}/flat/64.png)`;

      const listCountryValue = document.createElement('div');
      listCountryValue.textContent = element[`${insertedValue}`];
      listCountryValue.classList.add('list-country-value');

      listCountryWrapper.append(listFlag, listCountry, listCountryValue);
      document
        .querySelector(`.${classNames.listResults}`)
        .append(listCountryWrapper);
    });
    document
      .querySelector(`.${classNames.listResults}`)
      .addEventListener('click', (e) => {
        this.setCountry(e.target.parentElement.childNodes[1].innerText);
      });
    ['input', 'select'].forEach((evt) => document
      .querySelector(`.${classNames.listSearchInput}`)
      .addEventListener(
        evt,
        (e) => this.renderFounded(e, sortedCovidData, insertedValue, setCountry),
        false,
      ));

    document
      .querySelector(`.${classNames.listSelect}`)
      .addEventListener('change', (e) => {
        switch (e.target.value) {
          case 'Confirmed':
            this.setSelect(e.target.value);
            break;
          case 'Deaths':
            this.setSelect(e.target.value);
            break;
          case 'Recovered':
            this.setSelect(e.target.value);
            break;
          default:
            break;
        }
      });
  };

  renderFounded = (e, sortedCovidData, insertedValue, setCountry) => {
    document.querySelector(`.${classNames.listResults}`).innerHTML = '';
    if (e.target.value.length === 0) {
      sortedCovidData.forEach((element) => {
        const listCountryWrapper = document.createElement('div');
        listCountryWrapper.classList.add('list-country-wrapper');

        const listCountry = document.createElement('div');
        listCountry.textContent = element.Country;
        listCountry.classList.add('list-country-name');

        const listFlag = document.createElement('div');
        listFlag.classList.add('list-country-flag');
        listFlag.style = `background-image: url(https://www.countryflags.io/${element.CountryCode}/flat/64.png)`;

        const listCountryValue = document.createElement('div');
        listCountryValue.textContent = element[`${insertedValue}`];
        listCountryValue.classList.add('list-country-value');

        listCountryWrapper.append(listFlag, listCountry, listCountryValue);
        document
          .querySelector(`.${classNames.listResults}`)
          .append(listCountryWrapper);
      });
      document
        .querySelector(`.${classNames.listResults}`)
        .addEventListener('click', (el) => {
          setCountry(el.target.parentElement.childNodes[1].innerText);
        });
    } else if (e.target.value.length >= 1) {
      document.querySelector(`.${classNames.listResults}`).innerHTML = '';
      this.renderSearchValues(
        sortedCovidData,
        insertedValue,
        e.target.value,
        setCountry,
      );
    }
  }

  renderSearchValues = (
    sortedCovidData,
    insertedValue,
    inputValue,
    setCountry,
  ) => {
    const result = sortedCovidData
      .map((el) => {
        el.Country = el.Country.toLowerCase();
        return el;
      })
      .filter((element) => element.Country.includes(inputValue));
    result.forEach((element) => {
      const foundCountryWrapper = document.createElement('div');
      foundCountryWrapper.classList.add('found-country-wrapper');

      const foundCountryName = document.createElement('div');
      foundCountryName.textContent = element.Country;
      foundCountryName.classList.add('found-country-name');

      const foundCountryFlag = document.createElement('div');
      foundCountryFlag.classList.add('found-country-flag');
      foundCountryFlag.style = `background-image: url(https://www.countryflags.io/${element.CountryCode}/flat/64.png)`;

      const foundCountryValue = document.createElement('div');
      foundCountryValue.textContent = element[`${insertedValue}`];
      foundCountryValue.classList.add('found-country-value');

      foundCountryWrapper.append(
        foundCountryFlag,
        foundCountryName,
        foundCountryValue,
      );
      document
        .querySelector(`.${classNames.listResults}`)
        .append(foundCountryWrapper);
      foundCountryWrapper.addEventListener('click', (e) => {
        setCountry(e.target.parentElement.childNodes[1].innerText);
      });
    });
  };

  drawOneCountry = (oneCountryData, insertedValue) => {
    document.querySelector(`.${classNames.listResults}`).innerHTML = '';

    const listCountryWrapper = document.createElement('div');
    listCountryWrapper.classList.add('list-country-wrapper');

    const listCountry = document.createElement('div');
    listCountry.textContent = oneCountryData.Country;
    listCountry.classList.add('list-country-name');

    const listFlag = document.createElement('div');
    listFlag.classList.add('list-country-flag');
    listFlag.style = `background-image: url(https://www.countryflags.io/${oneCountryData.CountryCode}/flat/64.png)`;

    const listCountryValue = document.createElement('div');
    listCountryValue.textContent = oneCountryData[`${insertedValue}`];
    listCountryValue.classList.add('list-country-value');

    listCountryWrapper.append(listFlag, listCountry, listCountryValue);
    document
      .querySelector(`.${classNames.listResults}`)
      .append(listCountryWrapper);
  };

  update = (country = this.country, options, selectedOption) => {
    const copyCovidDataForSort = [...this.covidData];
    if (country !== undefined) {
      let oneCountryData = this.covidData.find(
        (el) => el.Country.toLowerCase() === country.toLowerCase()
          && el.population !== undefined,
      );
      if (oneCountryData === undefined) {
        oneCountryData = {};
        oneCountryData.Country = country;
        oneCountryData.TotalDeaths = 'Data not found';
        oneCountryData.TotalConfirmed = 'Data not found';
        oneCountryData.TotalRecovered = 'Data not found';
        oneCountryData.confirmedTotalPer100k = 'Data not found';
        oneCountryData.confirmedOneDayPer100k = 'Data not found';
        oneCountryData.deathsTotalPer100k = 'Data not found';
        oneCountryData.deathsOneDayPer100k = 'Data not found';
        oneCountryData.recoveredTotalPer100k = 'Data not found';
        oneCountryData.recoveredOneDayPer100k = 'Data not found';
      }
      oneCountryData.confirmedTotalPer100k = Math.round(
        (oneCountryData.TotalConfirmed / oneCountryData.population) * 10000000,
      ) / 100;
      oneCountryData.confirmedOneDayPer100k = Math.round(
        (oneCountryData.NewConfirmed / oneCountryData.population) * 10000000,
      ) / 100;
      oneCountryData.deathsTotalPer100k = Math.round(
        (oneCountryData.TotalDeaths / oneCountryData.population) * 10000000,
      ) / 100;
      oneCountryData.deathsOneDayPer100k = Math.round(
        (oneCountryData.NewDeaths / oneCountryData.population) * 10000000,
      ) / 100;
      oneCountryData.recoveredTotalPer100k = Math.round(
        (oneCountryData.TotalRecovered / oneCountryData.population) * 10000000,
      ) / 100;
      oneCountryData.recoveredOneDayPer100k = Math.round(
        (oneCountryData.NewRecovered / oneCountryData.population) * 10000000,
      ) / 100;
      switch (selectedOption) {
        case 'Confirmed':
          if (options.isAllPeriod) {
            if (options.isAbsoluteValues) {
              // allperiod absolute
              this.drawOneCountry(oneCountryData, 'TotalConfirmed');
            } else {
              // allperiod 100k
              this.drawOneCountry(oneCountryData, 'confirmedTotalPer100k');
            }
          } else if (options.isAbsoluteValues) {
            // oneday absolut
            this.drawOneCountry(oneCountryData, 'NewConfirmed');
          } else {
            // oneday 100k
            this.drawOneCountry(oneCountryData, 'confirmedOneDayPer100k');
          }
          break;
        case 'Deaths':
          if (options.isAllPeriod) {
            if (options.isAbsoluteValues) {
              // allperiod absolute
              this.drawOneCountry(oneCountryData, 'TotalDeaths');
            } else {
              // allperiod 100k
              this.drawOneCountry(
                oneCountryData,
                'deathsTotalPer100k',
              );
            }
          } else if (options.isAbsoluteValues) {
            // oneday absolut
            this.drawOneCountry(oneCountryData, 'NewDeaths');
          } else {
            // oneday 100k
            this.drawOneCountry(oneCountryData, 'deathsOneDayPer100k');
          }
          break;
        case 'Recovered':
          if (options.isAllPeriod) {
            if (options.isAbsoluteValues) {
              // allperiod absolute
              this.drawOneCountry(country, 'TotalRecovered');
            } else {
              // allperiod 100
              this.drawOneCountry(
                oneCountryData,
                'recoveredTotalPer100k',
              );
            }
          } else if (options.isAbsoluteValues) {
            // oneday absolut
            this.drawOneCountry(oneCountryData, 'NewRecovered');
          } else {
            // oneday 100k
            this.drawOneCountry(oneCountryData, 'recoveredOneDayPer100k');
          }
          break;
        default:
          break;
      }
    } else {
      switch (selectedOption) {
        case 'Confirmed':
          if (options.isAllPeriod) {
            if (options.isAbsoluteValues) {
            // allperiod absolute
              this.drawList(
                this.setCountry,
                copyCovidDataForSort.sort((a, b) => (a.TotalConfirmed < b.TotalConfirmed ? 1 : -1)),
                'TotalConfirmed',
                this.setSelect,
              );
            } else {
            // allperiod 100k
              const filtred = copyCovidDataForSort.filter((el) => el.population !== undefined);
              filtred.map(
                (element) => (element.confirmedTotalPer100k = Math.round(
                  (element.TotalConfirmed / element.population) * 10000000,
                ) / 100),
              );
              this.drawList(
                this.setCountry,
                (filtred.sort((a, b) => (a.confirmedTotalPer100k < b.confirmedTotalPer100k ? 1 : -1))),
                'confirmedTotalPer100k',
                this.setSelect,
              );
            }
          } else if (options.isAbsoluteValues) {
          // oneday absolut
            this.drawList(
              this.setCountry,
              (copyCovidDataForSort.sort((a, b) => (a.NewConfirmed < b.NewConfirmed ? 1 : -1))),
              'NewConfirmed',
              this.setSelect,
            );
          } else {
          // oneday 100k
            const filtred = copyCovidDataForSort.filter((el) => el.population !== undefined);
            filtred.map(
              (element) => (element.confirmedOneDayPer100k = Math.round(
                (element.NewConfirmed / element.population) * 10000000,
              ) / 100),
            );
            this.drawList(
              this.setCountry,
              filtred.sort((a, b) => (a.confirmedOneDayPer100k < b.confirmedOneDayPer100k ? 1 : -1)),
              'confirmedOneDayPer100k',
              this.setSelect,
            );
          }
          break;
        case 'Deaths':
          if (options.isAllPeriod) {
            if (options.isAbsoluteValues) {
              // allperiod absolute
              this.drawList(
                this.setCountry,
                copyCovidDataForSort.sort((a, b) => (a.TotalDeaths < b.TotalDeaths ? 1 : -1)),
                'TotalDeaths',
                this.setSelect,
              );
            } else {
              // allperiod 100k
              const filtred = copyCovidDataForSort.filter((el) => el.population !== undefined);
              filtred.map(
                (element) => (element.deathsTotalPer100k = Math.round(
                  (element.TotalDeaths / element.population) * 10000000,
                ) / 100),
              );
              this.drawList(
                this.setCountry,
                (filtred.sort((a, b) => (a.deathsTotalPer100k < b.deathsTotalPer100k ? 1 : -1))),
                'deathsTotalPer100k',
                this.setSelect,
              );
            }
          } else if (options.isAbsoluteValues) {
            // oneday absolut
            this.drawList(
              this.setCountry,
              (copyCovidDataForSort.sort((a, b) => (a.NewDeaths < b.NewDeaths ? 1 : -1))),
              'NewDeaths',
              this.setSelect,
            );
          } else {
            // oneday 100k
            const filtred = copyCovidDataForSort.filter((el) => el.population !== undefined);
            filtred.map(
              (element) => (element.deathsOneDayPer100k = Math.round(
                (element.NewDeaths / element.population) * 10000000,
              ) / 100),
            );
            this.drawList(
              this.setCountry,
              (filtred.sort((a, b) => (a.deathsOneDayPer100k < b.deathsOneDayPer100k ? 1 : -1))),
              'deathsOneDayPer100k',
              this.setSelect,
            );
          }
          break;
        case 'Recovered':
          if (options.isAllPeriod) {
            if (options.isAbsoluteValues) {
              // allperiod absolute
              this.drawList(
                this.setCountry,
                copyCovidDataForSort.sort((a, b) => (a.TotalRecovered < b.TotalRecovered ? 1 : -1)),
                'TotalRecovered',
                this.setSelect,
              );
            } else {
              // allperiod 100k
              const filtred = copyCovidDataForSort.filter((el) => el.population !== undefined);
              filtred.map(
                (element) => (element.recoveredTotalPer100k = Math.round(
                  (element.TotalRecovered / element.population) * 10000000,
                ) / 100),
              );
              this.drawList(
                this.setCountry,
                (filtred.sort((a, b) => (a.recoveredTotalPer100k < b.recoveredTotalPer100k ? 1 : -1))),
                'recoveredTotalPer100k',
                this.setSelect,
              );
            }
          } else if (options.isAbsoluteValues) {
            // oneday absolut
            this.drawList(
              this.setCountry,
              (copyCovidDataForSort.sort((a, b) => (a.NewRecovered < b.NewRecovered ? 1 : -1))),
              'NewRecovered',
              this.setSelect,
            );
          } else {
            // oneday 100k
            const filtred = copyCovidDataForSort.filter((el) => el.population !== undefined);
            filtred.map(
              (element) => (element.recoveredOneDayPer100k = Math.round(
                (element.NewRecovered / element.population) * 10000000,
              ) / 100),
            );
            this.drawList(
              this.setCountry,
              (filtred.sort((a, b) => (a.recoveredOneDayPer100k < b.recoveredOneDayPer100k ? 1 : -1))),
              'recoveredOneDayPer100k',
              this.setSelect,
            );
          }
          break;
        default:
          break;
      }
    }
  };
}
