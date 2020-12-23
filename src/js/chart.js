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
    total_cases: { color: 'orange', name: 'confirmed' },
    total_deaths: { color: 'red', name: 'deaths' },
    total_recovered: { color: 'green', name: 'recovered' },
  }

  chartConfig = {
    type: 'line',
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      title: {
        display: true,
        // text: 'Comparison of results',
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

  init = (options, setOptions, country) => {
    this.options = options;
    this.country = country;

    this.switcher = new Switcher();
    this.switcher.init(this.container, setOptions, options);

    this.resizeButton = new ResizeButton();
    this.resizeButton.init(this.container);

    const ctx = this.canvas.getContext('2d');
    this.chart = new Chart(ctx, this.chartConfig);

    this.setConfig();
  }

  setChartConfig = (configData, key) => {
    const { name, color } = this.parametersConfig[key];

    const chart = {
      label: name,
      data: configData,
      backgroundColor: color,
      borderColor: color,
      width: 1,
      fill: false,
    };

    return chart;
  }

  setConfig = async () => {
    // const { isAbsoluteValue, isAllPeriod } = this.options;

    if (!this.country) {
      this.comulativeData = await this.service.getDailyComulativeCOVIDData();
    }

    const configData = this.comulativeData.reduce((acc, item) => {
      const keys = Object.keys(item);

      keys.forEach((key) => {
        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key].push(item[key]);
      });

      return acc;
    }, {});

    const keys = Object.keys(this.parametersConfig);

    // console.log(configData);

    const config = keys.map((key) => this.setChartConfig(configData[key], key));

    console.log(config, configData);
    this.chart.data.labels.push(...configData.last_update);
    this.chart.data.datasets.push(...config);
    this.chart.update();

    console.log(this.chart.data.labels, this.chart.data.datasets)
  }
}
