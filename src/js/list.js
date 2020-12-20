/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { classNames } from './constants';

const list = (covidData) => {
  const copyCovidDataForCases = [...covidData];
  const covidDataByCases = copyCovidDataForCases.sort((a, b) => (a.TotalConfirmed < b.TotalConfirmed ? 1 : -1));
  const copyCovidDataForDeaths = [...covidData];
  const covidDataByDeaths = copyCovidDataForDeaths.sort((a, b) => (a.TotalDeaths < b.TotalDeaths ? 1 : -1));
  const copyCovidDataForRecovery = [...covidData];
  const covidDataByRecovery = copyCovidDataForRecovery.sort((a, b) => (a.NewRecovered < b.NewRecovered ? 1 : -1));
  const selectParams = classNames.listParamsSelect;
  const showCountryInList = (selectedCountry) => {
    classNames.listResults.append(selectedCountry);
  };

  const renderSearchValues = (covData, selectedValue, inputValue) => {
    const result = covData
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
      foundCountryFlag.style = `background-image: url(${element.flag})`;

      const foundCountryValue = document.createElement('div');
      foundCountryValue.textContent = element.[selectedValue];
      foundCountryValue.classList.add('found-country-value');

      foundCountryWrapper.append(
        foundCountryFlag,
        foundCountryName,
        foundCountryValue,
      );
      classNames.listResults.append(foundCountryWrapper);
      foundCountryWrapper.addEventListener('click', (e) => {
        classNames.listResults.innerHTML = ' ';
        showCountryInList(e.target.parentElement);
      });
    });
  };

  const showList = (covData, selectedValue) => {
    covData.forEach((element) => {
      const listCountryWrapper = document.createElement('div');
      listCountryWrapper.classList.add('list-country-wrapper');

      const listCountry = document.createElement('div');
      listCountry.textContent = element.Country;
      listCountry.classList.add('list-country-name');

      const listFlag = document.createElement('div');
      listFlag.classList.add('list-country-flag');
      listFlag.style = `background-image: url(${element.flag})`;

      const listCountryValue = document.createElement('div');
      listCountryValue.textContent = element[selectedValue];
      listCountryValue.classList.add('list-country-value');

      listCountryWrapper.append(listFlag, listCountry, listCountryValue);
      classNames.listResults.append(listCountryWrapper);
    });

    classNames.listSearchInput.addEventListener('select', (e) => {
      if (e.target.value.length === 0) {
        classNames.listResults.innerHTML = ' ';
        covData.forEach((element) => {
          const listCountryWrapper = document.createElement('div');
          listCountryWrapper.classList.add('list-country-wrapper');

          const listCountry = document.createElement('div');
          listCountry.textContent = element.Country;
          listCountry.classList.add('list-country-name');

          const listFlag = document.createElement('div');
          listFlag.classList.add('list-country-flag');
          listFlag.style = `background-image: url(${element.flag})`;

          const listCountryValue = document.createElement('div');
          listCountryValue.textContent = element[selectedValue];
          listCountryValue.classList.add('list-country-value');

          listCountryWrapper.append(listFlag, listCountry, listCountryValue);
          classNames.listResults.append(listCountryWrapper);
        });
      } else if (e.target.value.length >= 1) {
        classNames.listResults.innerHTML = ' ';
        renderSearchValues(covData, selectedValue, e.target.value);
      }
    });
  };

  selectParams.addEventListener('change', (e) => {
    switch (e.target.value) {
      case 'by Cases':
        classNames.listResults.innerHTML = ' ';
        showList(covidDataByCases, 'TotalConfirmed');
        break;
      case 'by Deaths':
        classNames.listResults.innerHTML = ' ';
        showList(covidDataByDeaths, 'TotalDeaths');
        break;
      case 'by Recovery':
        classNames.listResults.innerHTML = ' ';
        showList(covidDataByRecovery, 'TotalRecovered');
        break;
      default:
        break;
    }
  });
  showList(covidDataByCases, 'TotalConfirmed');
};
export default list;
