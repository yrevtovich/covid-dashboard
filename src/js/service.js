export default class Service {
  getCOVIDData = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    return fetch('https://api.covid19api.com/summary', requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log('error', error));
  }

  getPopulationAndFlag = () => fetch('https://restcountries.eu/rest/v2/all?fields=name;population;flag')
    .then((response) => response.json())
    .catch((error) => console.log('error', error))
}
