import { classNames } from './constants';

export default class Table {
  constructor(covidData) {
    this.covidData = covidData;
  }

  showTable = () => {
    this.table = document.createElement('table');
    const thead = document.createElement('thead');
    thead.innerHTML = `
    <th style="width: 55%;">Country</th>
    <th style="width: 15%;">Cases</th>
    <th style="width: 15%;">Deaths</th>
    <th style="width: 15%;">Recovered</th>
  `;
    const tbody = document.createElement('tbody');
    this.covidData.forEach((country) => {
      const tr = document.createElement('tr');

      const tdCountry = document.createElement('td');
      tdCountry.textContent = country.Country;
      tdCountry.classList.add(classNames.tdCountry);
      tr.append(tdCountry);

      const tdCases = document.createElement('td');
      tdCases.textContent = country.TotalConfirmed;
      tdCases.classList.add(classNames.tdCases);
      tr.append(tdCases);

      const tdDeaths = document.createElement('td');
      tdDeaths.textContent = country.TotalDeaths;
      tdDeaths.classList.add(classNames.tdDeaths);
      tr.append(tdDeaths);

      const tdRecovered = document.createElement('td');
      tdRecovered.textContent = country.TotalRecovered;
      tdRecovered.classList.add(classNames.tdRecovered);
      tr.append(tdRecovered);

      tbody.append(tr);
    });
    this.table.append(thead);
    this.table.append(tbody);
    classNames.tableContainer.append(this.table);

    tbody.addEventListener('click', (e) => {
      this.showCountryInTable(e.target.parentElement.firstChild.innerText);
    });
  };

  showCountryInTable = (selectedCountry) => {
    this.table.innerHTML = '';
    const oneCountryData = this.covidData.filter(
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
