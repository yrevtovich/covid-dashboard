import { classNames } from './constants';
import Switcher from './switcher';
import ResizeButton from './resizeButton';

export default class Table {
  containers = {
    options: document.querySelector(`.${classNames.tableOptions}`),
    table: document.querySelector(`.${classNames.table}`),
  };

  init = (setCountry, covidData, options, setOptions) => {
    const { containers } = this;
    this.setCountry = setCountry;

    this.switcher = new Switcher();
    this.switcher.init(containers.options, setOptions, options);

    this.resizeButton = new ResizeButton();
    this.resizeButton.init(containers.table);

    this.covidData = covidData;
    this.options = options;

    this.drawTable(setCountry, options);
  };

  drawTable = (setCountry, options) => {
    if (document.querySelector('table') !== null) document.querySelector('table').remove();
    this.table = document.createElement('table');
    document.querySelector(`.${classNames.table}`).append(this.table);

    if (options.isAllPeriod) {
      if (options.isAbsoluteValues) {
        // allperiod absolute
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
        this.table.append(thead, tbody);

        tbody.addEventListener('click', (e) => {
          setCountry(e.target.parentElement.firstChild.innerText);
        });
      } else {
        // allperiod 100k
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
          tdCases.textContent = Math.round(
            (country.TotalConfirmed / country.population) * 10000000,
          ) / 100;
          tdCases.classList.add(classNames.tdCases);
          tr.append(tdCases);

          const tdDeaths = document.createElement('td');
          tdDeaths.textContent = Math.round((country.TotalDeaths / country.population) * 10000000)
            / 100;
          tdDeaths.classList.add(classNames.tdDeaths);
          tr.append(tdDeaths);

          const tdRecovered = document.createElement('td');
          tdRecovered.textContent = Math.round(
            (country.TotalRecovered / country.population) * 10000000,
          ) / 100;
          tdRecovered.classList.add(classNames.tdRecovered);
          tr.append(tdRecovered);

          tbody.append(tr);
        });
        this.table.append(thead, tbody);

        tbody.addEventListener('click', (e) => {
          setCountry(e.target.parentElement.firstChild.innerText);
        });
      }
    } else if (options.isAbsoluteValues) {
      // oneday absolut
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
        tdCases.textContent = country.NewConfirmed;
        tdCases.classList.add(classNames.tdCases);
        tr.append(tdCases);

        const tdDeaths = document.createElement('td');
        tdDeaths.textContent = country.NewDeaths;
        tdDeaths.classList.add(classNames.tdDeaths);
        tr.append(tdDeaths);

        const tdRecovered = document.createElement('td');
        tdRecovered.textContent = country.NewRecovered;
        tdRecovered.classList.add(classNames.tdRecovered);
        tr.append(tdRecovered);

        tbody.append(tr);
      });
      this.table.append(thead, tbody);
      document.querySelector(`.${classNames.table}`).append(this.table);

      tbody.addEventListener('click', (e) => {
        setCountry(e.target.parentElement.firstChild.innerText);
      });
    } else {
      // oneday 100k
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
        tdCases.textContent = Math.round((country.NewConfirmed / country.population) * 10000000)
          / 100;
        tdCases.classList.add(classNames.tdCases);
        tr.append(tdCases);

        const tdDeaths = document.createElement('td');
        tdDeaths.textContent = Math.round(
          (country.NewDeaths / country.population) * 10000000,
        ) / 100;
        tdDeaths.classList.add(classNames.tdDeaths);
        tr.append(tdDeaths);

        const tdRecovered = document.createElement('td');
        tdRecovered.textContent = Math.round((country.NewRecovered / country.population) * 10000000)
          / 100;
        tdRecovered.classList.add(classNames.tdRecovered);
        tr.append(tdRecovered);

        tbody.append(tr);
      });
      this.table.append(thead, tbody);
      document.querySelector(`.${classNames.table}`).append(this.table);

      tbody.addEventListener('click', (e) => {
        setCountry(e.target.parentElement.firstChild.innerText);
      });
    }
  };

  drawOneCountry = (choosenCountry, options) => {
    this.table.innerHTML = '';
    let oneCountryData = this.covidData.filter(
      (element) => element.Country.toLowerCase() === choosenCountry.toLowerCase(),
    )[0];
    if (oneCountryData === undefined) {
      oneCountryData = {};
      oneCountryData.Country = choosenCountry;
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

    if (options.isAllPeriod) {
      if (options.isAbsoluteValues) {
        // allperiod absolute
        const countryElement = document.createElement('div');
        countryElement.textContent = `${oneCountryData.Country}`;

        const deathsElement = document.createElement('div');
        deathsElement.textContent = `Deaths: ${oneCountryData.TotalDeaths}`;

        const casesElement = document.createElement('div');
        casesElement.textContent = `Cases: ${oneCountryData.TotalConfirmed}`;

        const recoveredElement = document.createElement('div');
        recoveredElement.textContent = `Recovered: ${oneCountryData.TotalRecovered}`;

        this.table.append(
          countryElement,
          deathsElement,
          casesElement,
          recoveredElement,
        );
      } else {
        // allperiod 100k
        const countryElement = document.createElement('div');
        countryElement.textContent = `${oneCountryData.Country}`;

        const deathsElement = document.createElement('div');
        deathsElement.textContent = `Deaths: ${
          Math.round(
            (oneCountryData.TotalDeaths / oneCountryData.population) * 10000000,
          ) / 100
        }`;

        const casesElement = document.createElement('div');
        casesElement.textContent = `Cases: ${
          Math.round(
            (oneCountryData.TotalConfirmed / oneCountryData.population)
              * 10000000,
          ) / 100
        }`;
        const recoveredElement = document.createElement('div');
        recoveredElement.TotalRecovered = `Recovered: ${
          Math.round(
            (oneCountryData.TotalDeaths / oneCountryData.population) * 10000000,
          ) / 100
        }`;
        this.table.append(
          countryElement,
          deathsElement,
          casesElement,
          recoveredElement,
        );
      }
    } else if (options.isAbsoluteValues) {
      // oneday absolut
      const countryElement = document.createElement('div');
      countryElement.textContent = `${oneCountryData.Country}`;

      const deathsElement = document.createElement('div');
      deathsElement.textContent = `Deaths: ${oneCountryData.NewDeaths}`;

      const casesElement = document.createElement('div');
      casesElement.textContent = `Cases: ${oneCountryData.NewConfirmed}`;

      const recoveredElement = document.createElement('div');
      recoveredElement.textContent = `Recovered: ${oneCountryData.NewRecovered}`;

      this.table.append(
        countryElement,
        deathsElement,
        casesElement,
        recoveredElement,
      );
    } else {
      // oneday 100k
      const countryElement = document.createElement('div');
      countryElement.textContent = `${oneCountryData.Country}`;

      const deathsElement = document.createElement('div');
      deathsElement.textContent = `Deaths: ${
        Math.round(
          (oneCountryData.NewDeaths / oneCountryData.population) * 10000000,
        ) / 100
      }`;

      const casesElement = document.createElement('div');
      casesElement.textContent = `Cases: ${
        Math.round(
          (oneCountryData.NewConfirmed / oneCountryData.population) * 10000000,
        ) / 100
      }`;

      const recoveredElement = document.createElement('div');
      recoveredElement.textContent = `Recovered: ${
        Math.round(
          (oneCountryData.NewRecovered / oneCountryData.population) * 10000000,
        ) / 100
      }`;
      this.table.append(
        countryElement,
        deathsElement,
        casesElement,
        recoveredElement,
      );
    }
  };

  update = (country = this.country, options) => {
    if (country) {
      this.drawOneCountry(country, options);
    } else {
      this.drawTable(this.setCountry, options);
    }
  };
}
