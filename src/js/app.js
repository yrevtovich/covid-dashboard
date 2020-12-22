/* eslint-disable max-len */
import Service from './service';
import list from './list';
import { Keyboard } from './keyboard';
import Table from './table';

export default class App {
  service = new Service();

  keyboard = new Keyboard();

  init = async () => {
    this.covidData = await this.service.getCOVIDData();
    this.countriesPopulationAndFlags = await this.service.getPopulationAndFlag();
    this.fullCovidData = this.covidData.Countries.map((element) => Object.assign(
      element,
      this.countriesPopulationAndFlags.filter(
        (el) => el.name === element.Country,
      )[0],
    ));
    this.update();
  };

  update = () => {
    list(this.fullCovidData);
    this.table = new Table(
      this.fullCovidData,
    );
    this.table.showTable();
  };
}
