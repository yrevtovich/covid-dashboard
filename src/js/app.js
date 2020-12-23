import Service from './service';
import Map from './map';

export default class App {
  service = new Service()

  map = new Map()

  options = {
    isAllPeriod: true,
    isAbsoluteValues: true,
  }

  init = async () => {
    try {
      const data = await Promise.all([
        this.service.getCOVIDData(), this.service.getPopulationAndFlag(),
      ]);

      [this.covidData, this.countriesPopulationAndFlags] = data;

      if (!this.covidData || !this.countriesPopulationAndFlags) {
        throw new Error();
      }

      this.fullCovidData = this.covidData.Countries.map((element) => (
        Object.assign(element, this.countriesPopulationAndFlags.filter(
          (el) => el.name === element.Country,
        )[0])));

      this.map.init(this.setCountry, this.fullCovidData, this.options, this.setOptions);
    } catch (e) {
      console.log(e.message);
    }
  }

  update = () => {
    this.map.update(this.choosenCountry, this.options);
  }

  setCountry = (name) => {
    if (name === this.choosenCountry) {
      this.choosenCountry = '';
    }
    this.choosenCountry = name;
    this.update();
  }

  setOptions = (options) => {
    this.options = options;
    this.update();
  }
}
