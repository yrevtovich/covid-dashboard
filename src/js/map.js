/* eslint-disable new-cap */
/* eslint-disable no-undef */

import Switcher from './switcher';
import ResizeButton from './resizeButton';
import { classNames } from './constants';
import geomap from './geomap';
// import countries_data from './newGeoJSON';

export default class Map {
  colors = {
    map: 'grey',
    hover: '#ffffaa99',
    choosen: '#00ffff99',
    legend: ['purple', 'crimson', 'red', 'orange', 'yellow', 'green', 'grey'],
  }

  legendOptions = {
    absoluteValues: {
      total: [10000000, 1000000, 500000, 100000, 1000, 0, 'Not found'],
      daily: [100000, 20000, 10000, 5000, 1000, 0, 'Not found'],
    },
    relativeValues: {
      total: [5000, 2500, 1000, 500, 100, 0, 'Not found'],
      daily: [50, 20, 10, 5, 1, 0, 'Not found'],
    },
  }

  mapOptions = {
    center: [30, 30],
    minZoom: 2,
    zoom: 1,
    worldCopyJump: true,
    maxBounds: [L.latLng(-270, -180), L.latLng(270, 180)],
    animate: true,
  }

  containers = {
    map: document.querySelector(`.${classNames.map}`),
    options: document.querySelector(`.${classNames.mapOptions}`),
    legend: document.querySelector(`.${classNames.mapLegend}`),
  }

  index = 'Confirmed'

  init = (setCountry, covidData, options, setOptions, select) => {
    const { containers } = this;

    this.switcher = new Switcher();
    this.switcher.init(containers.options, setOptions, options);

    this.resizeButton = new ResizeButton();
    this.resizeButton.init(containers.map);

    this.covidData = covidData;
    this.options = options;

    this.drawMap(setCountry);
    this.drawLegend();
    this.setEvents(select);
  }

  drawMap = (setCountry) => {
    const {
      updateContriesStyles,
      showTooltip,
      addColorToLocation,
      covidData,
    } = this;

    this.map = new L.map(classNames.map, this.mapOptions);

    const geoJSONStyle = {
      stroke: false,
      fill: true,
      fillOpacity: 1,
    };

    this.geoJson = L.geoJson(geomap, {
      style: geoJSONStyle,
      onEachFeature(feature, country) {
        const { name, iso_a2: countryCode } = feature.properties;
        // const { id } = feature;
        addColorToLocation(country, countryCode);

        const data = covidData.find((elem) => elem.CountryCode === countryCode);
        const countryName = data ? data.Country : name;

        country.on('click', () => {
          this.country = this.country === countryName ? '' : countryName;
          setCountry(this.country);
        });

        country.on('mouseover', () => showTooltip(country, countryName, countryCode /* , id */));

        country.on('mouseout', () => updateContriesStyles());
      },
    }).addTo(this.map);
  }

  addColorToLocation = (location, countryCode) => {
    const legendScale = this.getLegendScale();
    const indicatorValue = this.getIndicatorValue(countryCode);

    const index = legendScale.findIndex((item) => indicatorValue >= item);

    location.setStyle({ fillColor: this.colors.legend[index] });
  }

  getLegendScale = () => {
    const { isAbsoluteValues, isAllPeriod } = this.options;
    const valueIndex = isAbsoluteValues ? 'absoluteValues' : 'relativeValues';
    const periodIndex = isAllPeriod ? 'total' : 'daily';

    return this.legendOptions[valueIndex][periodIndex];
  }

  getIndicatorValue = (countryCode) => {
    const { isAllPeriod, isAbsoluteValues } = this.options;

    const indicator = isAllPeriod ? `Total${this.index}` : `New${this.index}`;
    const data = this.covidData.find((elem) => elem.CountryCode === countryCode);

    let value = data ? data[indicator] : 'Not found';

    if (!isAbsoluteValues && typeof value !== 'string') {
      value = data.population
        ? Math.round((value / data.population) * 10000000) / 100
        : 'Not found';
    }

    return value;
  }

  updateContriesStyles = () => {
    this.geoJson.eachLayer((layer) => {
      const { name, iso_a2: countryCode } = layer.feature.properties;

      const data = this.covidData.find((elem) => elem.CountryCode === countryCode);
      const countryName = data ? data.Country : name;

      this.addColorToLocation(layer, countryCode);

      if (this.country === countryName) {
        layer.setStyle({ fillColor: this.colors.choosen });
      }
    });
  }

  showTooltip = (country, name, countryCode) => {
    const value = this.getIndicatorValue(countryCode);

    country.setStyle({ fillColor: this.colors.hover });
    country
      .bindTooltip(`<div>${name}</div><div>${this.index}: ${value}</div>`)
      .openTooltip();
  }

  addMarker = () => {
    const icon = L.divIcon({ className: 'marker' });
    const marker = new L.Marker([46.82, 8.23], { icon });
    marker.addTo(this.map);
  }

  update = (country = this.country, options, index) => {
    this.country = country;
    this.options = options;
    this.index = index;
    this.switcher.updateOptions(options);
    this.updateContriesStyles();
    this.updateLegend();
  }

  setEvents = (select) => {
    const mapParametersSelect = document.querySelector(`.${classNames.mapSelect}`);
    mapParametersSelect.addEventListener('change', (e) => {
      this.index = e.target.value;
      select(this.index);
    });
  }

  drawLegend = () => {
    const legendScale = this.getLegendScale();

    const legendList = document.createElement('ul');
    const listItems = legendScale.map((value, index) => {
      const listItem = document.createElement('li');
      listItem.classList.add(classNames.legendListItem);

      const colorIcon = document.createElement('div');
      colorIcon.classList.add(classNames.legendIcon);
      colorIcon.style.backgroundColor = this.colors.legend[index];

      const description = document.createElement('p');
      description.classList.add(classNames.legendDescription);
      description.innerText = typeof value === 'number' ? `> ${value}` : value;

      listItem.append(colorIcon, description);

      return listItem;
    });

    legendList.append(...listItems);
    this.containers.legend.append(legendList);
  }

  updateLegend = () => {
    this.containers.legend.innerHTML = '';
    this.drawLegend();
  }
}
