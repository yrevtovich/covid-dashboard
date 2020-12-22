import Service from './service';
import Table from './table';

export default class App {
  service = new Service();

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
    this.table = new Table(
      this.fullCovidData,
    );
    this.table.showTable();
  };
}
