import { classNames } from './constants';

export default class Table {
  constructor(covidData, populationAndFlag) {
    this.covidData = covidData;
    this.populationAndFlag = populationAndFlag;
  }

  showTable = () => {
    const tableControl = document.createElement('div');
    tableControl.classList.add('table-control');

    const togglePeriod = document.createElement('input');
    togglePeriod.setAttribute('type', 'checkbox');

    const toggleQuantity = document.createElement('input');
    toggleQuantity.setAttribute('type', 'checkbox');

    const buttonFullScreen = document.createElement('button');
    buttonFullScreen.textContent = 'full screen';

    this.table = document.createElement('table');
    const thead = document.createElement('thead');
    thead.innerHTML = `
    <th style="width: 55%;">Country</th>
    <th style="width: 15%;">Cases</th>
    <th style="width: 15%;">Deaths</th>
    <th style="width: 15%;">Recovered</th>
  `;
    const tbody = document.createElement('tbody');
    this.covidData.Countries.forEach((country) => {
      const tr = document.createElement('tr');

      const tdCountry = document.createElement('td');
      tdCountry.textContent = country.Country;
      tdCountry.classList.add('tdCountry');
      tr.append(tdCountry);

      const tdCases = document.createElement('td');
      tdCases.textContent = country.TotalConfirmed;
      tr.append(tdCases);

      const tdDeaths = document.createElement('td');
      tdDeaths.textContent = country.TotalDeaths;
      tr.append(tdDeaths);

      const tdRecovered = document.createElement('td');
      tdRecovered.textContent = country.TotalRecovered;
      tr.append(tdRecovered);

      tbody.append(tr);
    });
    this.table.append(thead);
    this.table.append(tbody);
    classNames.tableContainer.append(tableControl, this.table);
    tableControl.append(
      togglePeriod,
      'day/allTime',
      toggleQuantity,
      'absolut/100k',
      buttonFullScreen,
    );

    this.table.addEventListener('click', (e) => {
      this.showCountryInTable(e.target.innerText);
    });
  };

  showCountryInTable = (selectedCountry) => {
    this.table.innerHTML = '';
    const oneCountryData = this.covidData.Countries.filter(
      (element) => element.Country === selectedCountry,
    )[0];

    const countryElement = document.createElement('div');
    countryElement.textContent = `${oneCountryData.Country}`;

    const deathsElement = document.createElement('div');
    deathsElement.textContent = `Deaths: ${oneCountryData.TotalDeaths}`;

    const casesElement = document.createElement('div');
    casesElement.textContent = `Cases: ${oneCountryData.TotalConfirmed}`;

    const recoveredElement = document.createElement('div');
    recoveredElement.textContent = `Recovered: ${oneCountryData.TotalRecovered}`;

    this.table.append(countryElement, deathsElement, casesElement, recoveredElement);
  };
}
