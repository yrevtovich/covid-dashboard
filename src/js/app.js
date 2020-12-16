import Service from './service';
import Table from './table';

export default class App {
  service = new Service();

  table = new Table();

  init = async () => {
    this.covidData = await this.service.getCOVIDData();
    this.countriesPopulationAndFlags = await this.service.getPopulationAndFlag();
    this.update();
  };

  update = () => {
    this.table.showTable(this.covidData);
  };
}
