// eslint-disable-next-line import/no-extraneous-dependencies
import Chart from 'chart.js';
import Service from './service';
import Switcher from './switcher';
import ResizeButton from './resizeButton';
import { classNames } from './constants';

export default class CovidChart {
  container = document.querySelector(`.${classNames.chart}`);

  canvas = document.querySelector(`#${classNames.chart}`);

  service = new Service();

  parametersConfig = {
    global: {
      confirmed: { color: 'orange', name: 'confirmed' },
      deaths: { color: 'red', name: 'deaths' },
      recovered: { color: 'green', name: 'recovered' },
    },
    country: {
      Confirmed: { color: 'orange', name: 'confirmed' },
      Deaths: { color: 'red', name: 'deaths' },
      Recovered: { color: 'green', name: 'recovered' },
    },
  }

  chartConfig = {
    type: 'line',
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      responsive: true,
      // maintainAspectRatio: false,
      title: {
        display: true,
        // text: 'Comparison of results',
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'month',
          },
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    },
  }

  init = (options, setOptions, country, covidData, population, select) => {
    this.populationData = population;
    this.fullCovidData = covidData;
    this.options = options;
    this.country = country;

    this.worldPopulation = population.reduce((acc, item) => (
      acc + item.population
    ), 0);

    this.switcher = new Switcher();
    this.switcher.init(this.container, setOptions, options);

    this.resizeButton = new ResizeButton();
    this.resizeButton.init(this.container);

    Chart.defaults.global.elements.point.radius = 2;
    Chart.defaults.global.elements.point.pointStyle = 'line';

    const ctx = this.canvas.getContext('2d');
    this.chart = new Chart(ctx, this.chartConfig);

    this.setEvents(select);
  }

  setChartConfig = (configData, key, parameters) => {
    const { name, color } = parameters[key];

    const chart = {
      label: name,
      data: configData,
      backgroundColor: color,
      borderColor: color,
      width: 3,
      fill: false,
    };

    return chart;
  }

  setConfig = async () => {
    let configData;

    if (!this.country) {
      this.comulativeData = await this.service.getDailyGlobalCOVIDData();
      this.comulativeData = this.comulativeData.data.reverse();
      configData = this.setGlobalDataConfig();
    } else {
      this.countryData = await this.service.getDailyCountryCOVIDData(this.country);
      configData = this.setCountryDataConfig();
    }

    const { config, date } = configData;

    this.clearCharts();
    this.chart.data.labels.push(...date);
    this.chart.data.datasets.push(config);
    this.chart.update();
  }

  setGlobalDataConfig = () => {
    const { isAbsoluteValues, isAllPeriod } = this.options;

    const { global } = this.parametersConfig;

    const key = this.index.toLowerCase();

    const configData = this.comulativeData.reduce((acc, item, index) => {
      if (!acc[key]) {
        acc[key] = [];
      }

      let value = item[key];

      if (!isAllPeriod) {
        value = item[`new_${key}`];
      }

      if (!isAbsoluteValues) {
        value = Math.round((value / this.worldPopulation) * 10000000) / 100;
      }

      acc[key].push(value);

      if (!acc.date) {
        acc.date = [];
      }

      acc.date.push(item.date);

      return acc;
    }, {});

    const config = this.setChartConfig(configData[key], key, global);

    return { config, date: configData.date };
  }

  setCountryDataConfig = () => {
    const { isAbsoluteValues, isAllPeriod } = this.options;
    const { country: countryConfig } = this.parametersConfig;

    const key = this.index;

    const configData = this.countryData.reduce((acc, item, index, array) => {
      if (!acc[key]) {
        acc[key] = [];
      }

      let value = item[key];

      if (!isAllPeriod) {
        value = index ? item[key] - array[index - 1][key] : item[key];
      }

      if (!isAbsoluteValues) {
        value = Math.round((value / this.worldPopulation) * 10000000) / 100;
      }

      acc[key].push(value);

      if (!acc.date) {
        acc.date = [];
      }

      acc.date.push(item.Date);
      return acc;
    }, {});

    const config = this.setChartConfig(configData[key], key, countryConfig);
    return { config, date: configData.date };
  }

  update = (country, options, index) => {
    this.index = index;
    this.options = options;
    this.country = country;
    this.clearCharts();
    this.setConfig();
  }

  clearCharts = () => {
    this.chart.data.labels = [];
    this.chart.data.datasets = [];
  }

  setEvents = (select) => {
    const mapParametersSelect = document.querySelector(`.${classNames.chartSelect}`);
    mapParametersSelect.addEventListener('change', (e) => {
      if (this.index === e.target.value) {
        return;
      }

      this.index = e.target.value;
      select(this.index);
    });
  }
}
