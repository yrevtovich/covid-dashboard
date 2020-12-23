/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import Service from './service';
import Map from './map';
import List from './list';
import { Keyboard } from './keyboard'; // ----???
import Table from './table';
import CovidChart from './chart';

export default class App {
  service = new Service();

  keyboard = new Keyboard();

  map = new Map()

  chart = new CovidChart()

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

      if (!this.covidData || !this.countriesPopulationAndFlags || this.covidData.Message) {
        throw new Error(this.covidData.Message);
      }

      this.fullCovidData = this.covidData.Countries.map((element) => Object.assign(
        element,
        this.countriesPopulationAndFlags.filter(
          (el) => el.name === element.Country,
        )[0],
      ));

      this.map.init(
        this.setCountry,
        this.fullCovidData,
        this.options,
        this.setOptions,
        this.setSelect,
      );

      this.chart.init(
        this.options,
        this.setOptions,
        this.fullCovidData,
        this.countriesPopulationAndFlags,
        this.setSelect,
      );

      this.list.init(
        this.setCountry,
        this.fullCovidData,
        this.options,
        this.setOptions,
        this.selectOption,
        this.setSelect,
      );

      this.table.init(
        this.setCountry,
        this.fullCovidData,
        this.options,
        this.setOptions,
      );

      this.update();
    } catch (e) {
      console.log(e.message);
    }
  }

  update = () => {
    this.map.update(this.choosenCountry, this.options, this.selectOption);
    this.chart.update(this.choosenCountry, this.options, this.selectOption);
    this.table.update(this.choosenCountry, this.options);
    this.list.update(this.choosenCountry, this.options, this.selectOption);
    this.updateSelect();
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

  updateSelect = () => {
    const selectArr = document.querySelectorAll('select');
    const optionsArr = [];
    selectArr.forEach((item) => optionsArr.push(...item.children));

    optionsArr.forEach((option) => {
      if (option.value === this.selectOption) {
        option.selected = true;
      }
    });
  }

  setSelect = (selectOption) => {
    this.selectOption = selectOption;
    this.update();
  }
}
