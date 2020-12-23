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
    this.drawList(
      setCountry,
      covidData,
      this.selectedOption,
      setSelect,
      options,
    );
  }

  drawList = (setCountry, covidData, selectedOption, setSelect, options) => {
    document.querySelector(`.${classNames.listResults}`).innerHTML = '';
    const copyCovidDataForSort = [...covidData];
    switch (selectedOption) {
      case 'Confirmed':
        this.sortedCovidData = copyCovidDataForSort.sort((a, b) => (a.TotalConfirmed < b.TotalConfirmed ? 1 : -1));
        break;
      case 'Deaths':
        this.sortedCovidData = copyCovidDataForSort.sort((a, b) => (a.TotalDeaths < b.TotalDeaths ? 1 : -1));
        break;
      case 'Recovered':
        this.sortedCovidData = copyCovidDataForSort.sort((a, b) => (a.NewRecovered < b.NewRecovered ? 1 : -1));
        break;
      default:
        break;
    }
    if (options.isAllPeriod) {
      if (options.isAbsoluteValues) {
        // allperiod absolute
        this.sortedCovidData.forEach((element) => {
          const listCountryWrapper = document.createElement('div');
          listCountryWrapper.classList.add('list-country-wrapper');

          const listCountry = document.createElement('div');
          listCountry.textContent = element.Country;
          listCountry.classList.add('list-country-name');

          const listFlag = document.createElement('div');
          listFlag.classList.add('list-country-flag');
          listFlag.style = `background-image: url(https://www.countryflags.io/${element.CountryCode}/flat/64.png)`;

          const listCountryValue = document.createElement('div');
          listCountryValue.textContent = element[`Total${selectedOption}`];
          listCountryValue.classList.add('list-country-value');

          listCountryWrapper.append(listFlag, listCountry, listCountryValue);
          document
            .querySelector(`.${classNames.listResults}`)
            .append(listCountryWrapper);
        });
        document
          .querySelector(`.${classNames.listResults}`)
          .addEventListener('click', (e) => {
            setCountry(e.target.parentElement.childNodes[1].innerText);
          });
      } else {
        // allperiod 100k
        this.sortedCovidData.forEach((element) => {
          const listCountryWrapper = document.createElement('div');
          listCountryWrapper.classList.add('list-country-wrapper');

          const listCountry = document.createElement('div');
          listCountry.textContent = element.Country;
          listCountry.classList.add('list-country-name');

          const listFlag = document.createElement('div');
          listFlag.classList.add('list-country-flag');
          listFlag.style = `background-image: url(https://www.countryflags.io/${element.CountryCode}/flat/64.png)`;

          const listCountryValue = document.createElement('div');
          listCountryValue.textContent = Math.round(
            (element[`Total${selectedOption}`] / element.population)
                * 10000000,
          ) / 100;
          listCountryValue.classList.add('list-country-value');

          listCountryWrapper.append(listFlag, listCountry, listCountryValue);
          document
            .querySelector(`.${classNames.listResults}`)
            .append(listCountryWrapper);
        });
        document
          .querySelector(`.${classNames.listResults}`)
          .addEventListener('click', (e) => {
            setCountry(e.target.parentElement.childNodes[1].innerText);
          });
      }
    } else if (options.isAbsoluteValues) {
      // oneday absolut
      this.sortedCovidData.forEach((element) => {
        const listCountryWrapper = document.createElement('div');
        listCountryWrapper.classList.add('list-country-wrapper');

        const listCountry = document.createElement('div');
        listCountry.textContent = element.Country;
        listCountry.classList.add('list-country-name');

        const listFlag = document.createElement('div');
        listFlag.classList.add('list-country-flag');
        listFlag.style = `background-image: url(https://www.countryflags.io/${element.CountryCode}/flat/64.png)`;

        const listCountryValue = document.createElement('div');
        listCountryValue.textContent = element[`New${selectedOption}`];
        listCountryValue.classList.add('list-country-value');

        listCountryWrapper.append(listFlag, listCountry, listCountryValue);
        document
          .querySelector(`.${classNames.listResults}`)
          .append(listCountryWrapper);
      });
      document
        .querySelector(`.${classNames.listResults}`)
        .addEventListener('click', (e) => {
          setCountry(e.target.parentElement.childNodes[1].innerText);
        });
    } else {
      // oneday 100k
      this.sortedCovidData.forEach((element) => {
        const listCountryWrapper = document.createElement('div');
        listCountryWrapper.classList.add('list-country-wrapper');

        const listCountry = document.createElement('div');
        listCountry.textContent = element.Country;
        listCountry.classList.add('list-country-name');

        const listFlag = document.createElement('div');
        listFlag.classList.add('list-country-flag');
        listFlag.style = `background-image: url(https://www.countryflags.io/${element.CountryCode}/flat/64.png)`;

        const listCountryValue = document.createElement('div');
        listCountryValue.textContent = Math.round(
          (element[`New${selectedOption}`] / element.population) * 10000000,
        ) / 100;
        listCountryValue.classList.add('list-country-value');

        listCountryWrapper.append(listFlag, listCountry, listCountryValue);
        document
          .querySelector(`.${classNames.listResults}`)
          .append(listCountryWrapper);
      });
      document
        .querySelector(`.${classNames.listResults}`)
        .addEventListener('click', (e) => {
          setCountry(e.target.parentElement.childNodes[1].innerText);
        });
    }

    document
      .querySelector(`.${classNames.listSearchInput}`)
      .addEventListener('select', (e) => {
        document.querySelector(`.${classNames.listResults}`).innerHTML = '';
        if (e.target.value.length === 0) {
          if (options.isAllPeriod) {
            if (options.isAbsoluteValues) {
              // allperiod absolute
              this.sortedCovidData.forEach((element) => {
                const listCountryWrapper = document.createElement('div');
                listCountryWrapper.classList.add('list-country-wrapper');

                const listCountry = document.createElement('div');
                listCountry.textContent = element.Country;
                listCountry.classList.add('list-country-name');

                const listFlag = document.createElement('div');
                listFlag.classList.add('list-country-flag');
                listFlag.style = `background-image: url(https://www.countryflags.io/${element.CountryCode}/flat/64.png)`;

                const listCountryValue = document.createElement('div');
                listCountryValue.textContent = element[`Total${selectedOption}`];
                listCountryValue.classList.add('list-country-value');

                listCountryWrapper.append(
                  listFlag,
                  listCountry,
                  listCountryValue,
                );
                document
                  .querySelector(`.${classNames.listResults}`)
                  .append(listCountryWrapper);
              });
              document
                .querySelector(`.${classNames.listResults}`)
                .addEventListener('click', (el) => {
                  setCountry(el.target.parentElement.childNodes[1].innerText);
                });
            } else {
              // allperiod 100k
              this.sortedCovidData.forEach((element) => {
                const listCountryWrapper = document.createElement('div');
                listCountryWrapper.classList.add('list-country-wrapper');

                const listCountry = document.createElement('div');
                listCountry.textContent = element.Country;
                listCountry.classList.add('list-country-name');

                const listFlag = document.createElement('div');
                listFlag.classList.add('list-country-flag');
                listFlag.style = `background-image: url(https://www.countryflags.io/${element.CountryCode}/flat/64.png)`;

                const listCountryValue = document.createElement('div');
                listCountryValue.textContent = Math.round(
                  (element[`Total${selectedOption}`] / element.population)
                      * 10000000,
                ) / 100;
                listCountryValue.classList.add('list-country-value');

                listCountryWrapper.append(
                  listFlag,
                  listCountry,
                  listCountryValue,
                );
                document
                  .querySelector(`.${classNames.listResults}`)
                  .append(listCountryWrapper);
              });
              document
                .querySelector(`.${classNames.listResults}`)
                .addEventListener('click', (el) => {
                  setCountry(el.target.parentElement.childNodes[1].innerText);
                });
            }
          } else if (options.isAbsoluteValues) {
            // oneday absolut
            this.sortedCovidData.forEach((element) => {
              const listCountryWrapper = document.createElement('div');
              listCountryWrapper.classList.add('list-country-wrapper');

              const listCountry = document.createElement('div');
              listCountry.textContent = element.Country;
              listCountry.classList.add('list-country-name');

              const listFlag = document.createElement('div');
              listFlag.classList.add('list-country-flag');
              listFlag.style = `background-image: url(https://www.countryflags.io/${element.CountryCode}/flat/64.png)`;

              const listCountryValue = document.createElement('div');
              listCountryValue.textContent = element[`New${selectedOption}`];
              listCountryValue.classList.add('list-country-value');

              listCountryWrapper.append(
                listFlag,
                listCountry,
                listCountryValue,
              );
              document
                .querySelector(`.${classNames.listResults}`)
                .append(listCountryWrapper);
            });
            document
              .querySelector(`.${classNames.listResults}`)
              .addEventListener('click', (el) => {
                setCountry(el.target.parentElement.childNodes[1].innerText);
              });
          } else {
            // oneday 100k
            this.sortedCovidData.forEach((element) => {
              const listCountryWrapper = document.createElement('div');
              listCountryWrapper.classList.add('list-country-wrapper');

              const listCountry = document.createElement('div');
              listCountry.textContent = element.Country;
              listCountry.classList.add('list-country-name');

              const listFlag = document.createElement('div');
              listFlag.classList.add('list-country-flag');
              listFlag.style = `background-image: url(https://www.countryflags.io/${element.CountryCode}/flat/64.png)`;

              const listCountryValue = document.createElement('div');
              listCountryValue.textContent = Math.round(
                (element[`New${selectedOption}`] / element.population)
                    * 10000000,
              ) / 100;
              listCountryValue.classList.add('list-country-value');

              listCountryWrapper.append(
                listFlag,
                listCountry,
                listCountryValue,
              );
              document
                .querySelector(`.${classNames.listResults}`)
                .append(listCountryWrapper);
            });
            document
              .querySelector(`.${classNames.listResults}`)
              .addEventListener('click', (el) => {
                setCountry(el.target.parentElement.childNodes[1].innerText);
              });
          }
        } else if (e.target.value.length >= 1) {
          document.querySelector(`.${classNames.listResults}`).innerHTML = '';
          this.renderSearchValues(
            this.sortedCovidData,
            selectedOption,
            e.target.value,
            setCountry,
            options,
          );
        }
      });
    document
      .querySelector(`.${classNames.listSelect}`)
      .addEventListener('change', (e) => {
        switch (e.target.value) {
          case 'Confirmed':
            setSelect(e.target.value);
            break;
          case 'Deaths':
            setSelect(e.target.value);
            break;
          case 'Recovered':
            setSelect(e.target.value);
            break;
          default:
            break;
        }
      });
  };

  renderSearchValues = (
    sortedCovidData,
    selectedOption,
    inputValue,
    setCountry,
    options,
  ) => {
    const result = sortedCovidData
      .map((el) => {
        el.Country = el.Country.toLowerCase();
        return el;
      })
      .filter((element) => element.Country.includes(inputValue));
    if (options.isAllPeriod) {
      if (options.isAbsoluteValues) {
        // allperiod absolute
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
          foundCountryValue.textContent = element[`Total${selectedOption}`];
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
      } else {
        // allperiod 100k
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
          foundCountryValue.textContent = Math.round(
            (element[`Total${selectedOption}`] / element.population)
                * 10000000,
          ) / 100;
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
      }
    } else if (options.isAbsoluteValues) {
      // oneday absolut
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
        foundCountryValue.textContent = element[`New${selectedOption}`];
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
    } else {
      // oneday 100k
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
        foundCountryValue.textContent = Math.round(
          (element[`New${selectedOption}`] / element.population) * 10000000,
        ) / 100;
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
    }
  };

  drawOneCountry = (selectedCountry, options, selectedOption) => {
    document.querySelector(`.${classNames.listResults}`).innerHTML = '';
    const oneCountryData = this.covidData.find(
      (el) => el.Country === selectedCountry,
    );
    if (options.isAllPeriod) {
      if (options.isAbsoluteValues) {
        // allperiod absolute
        const listCountryWrapper = document.createElement('div');
        listCountryWrapper.classList.add('list-country-wrapper');

        const listCountry = document.createElement('div');
        listCountry.textContent = oneCountryData.Country;
        listCountry.classList.add('list-country-name');

        const listFlag = document.createElement('div');
        listFlag.classList.add('list-country-flag');
        listFlag.style = `background-image: url(https://www.countryflags.io/${oneCountryData.CountryCode}/flat/64.png)`;

        const listCountryValue = document.createElement('div');
        listCountryValue.textContent = oneCountryData[`Total${selectedOption}`];
        listCountryValue.classList.add('list-country-value');

        listCountryWrapper.append(listFlag, listCountry, listCountryValue);
        document
          .querySelector(`.${classNames.listResults}`)
          .append(listCountryWrapper);
      } else {
        // allperiod 100k
        const listCountryWrapper = document.createElement('div');
        listCountryWrapper.classList.add('list-country-wrapper');

        const listCountry = document.createElement('div');
        listCountry.textContent = oneCountryData.Country;
        listCountry.classList.add('list-country-name');

        const listFlag = document.createElement('div');
        listFlag.classList.add('list-country-flag');
        listFlag.style = `background-image: url(https://www.countryflags.io/${oneCountryData.CountryCode}/flat/64.png)`;

        const listCountryValue = document.createElement('div');
        listCountryValue.textContent = Math.round(
          (oneCountryData[`Total${selectedOption}`]
              / oneCountryData.population)
              * 10000000,
        ) / 100;
        listCountryValue.classList.add('list-country-value');

        listCountryWrapper.append(listFlag, listCountry, listCountryValue);
        document
          .querySelector(`.${classNames.listResults}`)
          .append(listCountryWrapper);
      }
    } else if (options.isAbsoluteValues) {
      // oneday absolut
      const listCountryWrapper = document.createElement('div');
      listCountryWrapper.classList.add('list-country-wrapper');

      const listCountry = document.createElement('div');
      listCountry.textContent = oneCountryData.Country;
      listCountry.classList.add('list-country-name');

      const listFlag = document.createElement('div');
      listFlag.classList.add('list-country-flag');
      listFlag.style = `background-image: url(https://www.countryflags.io/${oneCountryData.CountryCode}/flat/64.png)`;

      const listCountryValue = document.createElement('div');
      listCountryValue.textContent = oneCountryData[`New${selectedOption}`];
      listCountryValue.classList.add('list-country-value');

      listCountryWrapper.append(listFlag, listCountry, listCountryValue);
      document
        .querySelector(`.${classNames.listResults}`)
        .append(listCountryWrapper);
    } else {
      // oneday 100k
      const listCountryWrapper = document.createElement('div');
      listCountryWrapper.classList.add('list-country-wrapper');

      const listCountry = document.createElement('div');
      listCountry.textContent = oneCountryData.Country;
      listCountry.classList.add('list-country-name');

      const listFlag = document.createElement('div');
      listFlag.classList.add('list-country-flag');
      listFlag.style = `background-image: url(https://www.countryflags.io/${oneCountryData.CountryCode}/flat/64.png)`;

      const listCountryValue = document.createElement('div');
      listCountryValue.textContent = Math.round(
        (oneCountryData[`New${selectedOption}`] / oneCountryData.population)
            * 10000000,
      ) / 100;
      listCountryValue.classList.add('list-country-value');

      listCountryWrapper.append(listFlag, listCountry, listCountryValue);
      document
        .querySelector(`.${classNames.listResults}`)
        .append(listCountryWrapper);
    }
  };

  update = (country = this.country, options, selectedOption) => {
    if (country) {
      this.drawOneCountry(country, options, selectedOption);
    } else {
      this.drawList(
        this.setCountry,
        this.covidData,
        selectedOption,
        this.setSelect,
        options,
      );
    }
  };
}
