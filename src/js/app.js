import Service from './service';

export default class App {
  sevice = new Service()

  init = async () => {
    this.covidData = await this.service.getCOVIDData();
    this.countriesPopulationAndFlags = await this.service.getPopulationAndFlag();

    // this.update();
  }

  update = () => {
    // call components update methods
    // setEventListeners - ??
  }
}
