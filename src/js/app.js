/* eslint-disable max-len */
/* eslint-disable no-console */
import Service from './service';
import Map from './map';
import List from './list';
import { Keyboard } from './keyboard'; // ----???
import Table from './table';

export default class App {
  service = new Service();

  keyboard = new Keyboard();

  map = new Map()

  table = new Table()

  list = new List()

  options = {
    isAllPeriod: true,
    isAbsoluteValues: true,
  }

  selectOption = 'Confirmed'

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
      this.table.init(this.setCountry, this.fullCovidData, this.options, this.setOptions);
      this.list.init(this.setCountry, this.fullCovidData, this.options, this.setOptions, this.selectOption, this.setSelect);
    } catch (e) {
      console.log(e.message);
    }
  }

  update = () => {
    this.table.update(this.choosenCountry, this.options);
    this.map.update(this.choosenCountry, this.options);
    this.list.update(this.choosenCountry, this.options, this.selectOption);
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

  setSelect = (selectOption) => {
    this.selectOption = selectOption;
    this.update();
  }
}
