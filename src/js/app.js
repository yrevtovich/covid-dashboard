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
    this.service.getCOVIDData()
      .then((res) => {
        // console.log(res);
        this.covidData = res;
        return this.service.getPopulationAndFlag();
      })
      .then((res) => {
        // console.log(res);
        this.countriesPopulationAndFlags = res;

        this.fullCovidData = this.covidData.Countries.map((element) => (
          Object.assign(element, this.countriesPopulationAndFlags.filter(
            (el) => el.name === element.Country,
          )[0])));

        this.map.init(this.setCountry, this.fullCovidData, this.options, this.setOptions);
      })
      .catch((e) => {
        console.log('error', e);
      });

    // this.map.init(this.setCountry, this.fullCovidData, this.options, this.setOptions);

    // try {
    //   const data = await Promise.all([
    //     this.service.getCOVIDData(), this.service.getPopulationAndFlag(),
    //   ]);

    //   console.log(data);

    //   [this.covidData, this.countriesPopulationAndFlags] = data;

    //   this.fullCovidData = this.covidData.Countries.map((element) => (
    //     Object.assign(element, this.countriesPopulationAndFlags.filter(
    //       (el) => el.name === element.Country,
    //     )[0])));

    //   this.map.init(this.setCountry, this.fullCovidData, this.options, this.setOptions);
    // } catch (e) {
    //   console.log(e);
    // }
  }

  update = () => {
    this.map.update(this.country, this.options);
  }

  setCountry = (name) => {
    if (name === this.choosenCountry) {
      this.choosenCountry = '';
    }
    this.choosenCountry = name;
  }

  setOptions = (options) => {
    this.options = options;
    this.update();
  }
}
