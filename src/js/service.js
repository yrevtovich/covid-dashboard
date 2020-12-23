export default class Service {
  getCOVIDData = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    return fetch('https://api.covid19api.com/summary', requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log('error', error));
  };

  getPopulationAndFlag = () => fetch('https://restcountries.eu/rest/v2/all?fields=name;population;flag')
    .then((response) => response.json())
    .catch((error) => console.log('error', error));

  getDailyComulativeCOVIDData = () => fetch('https://covid19-api.org/api/timeline')
    .then((response) => response.json())
    .catch((error) => console.log('error', error));

  getDailyGlobalCOVIDData = () => fetch('https://corona-api.com/timeline')
    .then((response) => response.json())
    .catch((error) => console.log('error', error));

  getDailyCountryCOVIDData = (country) => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    return fetch(`https://api.covid19api.com/total/country/${country}`, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log('error', error));
  }
}
