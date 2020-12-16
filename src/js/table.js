export default class Table {
  showTable = (data) => {
    const tableContainer = document.querySelector('.test');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    thead.innerHTML = `
    <th style="width: 25%;">Country</th>
    <th style="width: 25%;">Cases</th>
    <th style="width: 25%;">Deaths</th>
    <th style="width: 25%;">Recovered</th>
  `;
    const tbody = document.createElement('tbody');
    data.Countries.forEach((country) => {
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
    table.append(thead);
    table.append(tbody);
    tableContainer.append(table);
    table.addEventListener('click', (e) => {
      this.showCountryInTable(e.target.innerText);
    });
  };

  showCountryInTable = (country) => {
    console.log(country);
  }
}
