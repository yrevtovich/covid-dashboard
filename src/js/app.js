/* eslint-disable no-param-reassign */
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

  parameter = 'Confirmed'

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
        this.selectParameter,
      );

      this.table = new Table(
        this.fullCovidData,
      );

      this.chart.init(
        this.options,
        this.setOptions,
        this.choosenCountry,
        this.fullCovidData,
        this.countriesPopulationAndFlags,
        this.selectParameter,
      );

      this.update();
    } catch (e) {
      console.log(e.message);
    }

    // this.countriesPopulationAndFlags = await this.service.getPopulationAndFlag();

    // this.chart.init(
    //   this.options,
    //   this.setOptions,
    //   this.choosenCountry,
    //   this.fullCovidData,
    //   this.countriesPopulationAndFlags,
    // );
  }

  update = () => {
    list(this.fullCovidData);
    this.map.update(this.choosenCountry, this.options, this.parameter);
    this.table.showTable();
    this.chart.update(this.choosenCountry, this.options, this.parameter);
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

  selectParameter = (param) => {
    this.parameter = param;
    this.update();
  }

  updateSelect = () => {
    const selectArr = document.querySelectorAll('[data-params="true"]');
    const optionsArr = [];
    selectArr.forEach((item) => optionsArr.push(...item.children));

    optionsArr.forEach((option) => {
      if (option.value === this.parameter) {
        option.selected = true;
      }
    });
  }
}
