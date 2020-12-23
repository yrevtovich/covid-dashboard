/* eslint-disable no-console */
import Service from './service';
import Map from './map';
import list from './list';
import { Keyboard } from './keyboard'; // ----???
import Table from './table';
import CovidChart from './chart';

export default class App {
  service = new Service();

  keyboard = new Keyboard();

  map = new Map()

  chart = new CovidChart();

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

      this.fullCovidData = this.covidData.Countries.map((element) => Object.assign(
        element,
        this.countriesPopulationAndFlags.filter(
          (el) => el.name === element.Country,
        )[0],
      ));

      this.map.init(this.setCountry, this.fullCovidData, this.options, this.setOptions);

      this.table = new Table(
        this.fullCovidData,
      );

      this.chart.init(this.options, this.setOptions, this.choosenCountry);

      this.update();
    } catch (e) {
      console.log(e.message);
    }
  }

  update = () => {
    list(this.fullCovidData);
    this.map.update(this.choosenCountry, this.options);
    this.table.showTable();
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
