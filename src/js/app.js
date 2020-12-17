import Service from './service';
import Table from './table';

export default class App {
  service = new Service();

  init = async () => {
    this.covidData = await this.service.getCOVIDData();
    this.countriesPopulationAndFlags = await this.service.getPopulationAndFlag();
    this.update();
  };

  update = () => {
    this.table = new Table(
      this.covidData,
      this.countriesPopulationAndFlags,
    );
    this.table.showTable();
  };
}
