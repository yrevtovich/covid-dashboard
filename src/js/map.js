/* eslint-disable new-cap */
/* eslint-disable no-undef */

import Switcher from './switcher';
import geomap from './geomap';
// import countries_data from './newGeoJSON';

const classNames = {
  map: 'map',
  mapOptions: 'map__options',
  mapSelect: 'map__select',
};

export default class Map {
  colors = {
    map: 'transparent',
    hover: '#ffffaa99',
    choosen: '#00ffff99',
    marker: ['yellow', 'orange', 'red', 'purple'],
  }

  mapOptions = {
    center: [30, 30],
    minZoom: 2,
    zoom: 2,
    worldCopyJump: true,
    // maxBoundsViscosity: 1,
    maxBounds: [L.latLng(-270, -180), L.latLng(270, 180)],
  }

  optionsContainer = document.querySelector(`.${classNames.mapOptions}`);

  index = 'Confirmed'

  init = (setCountry, covidData, options, setOptions) => {
    const { optionsContainer } = this;

    this.switcher = new Switcher();
    this.switcher.init(optionsContainer, setOptions, options);

    this.covidData = covidData;
    this.options = options;

    this.drawMap(setCountry);
    this.setEvents();
  }

  drawMap = (setCountry) => {
    const { updateContriesStyles, colors, showTooltip } = this;
    this.map = new L.map(classNames.map, this.mapOptions);

    const layer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    });

    layer.addTo(this.map);

    const myCustomStyle = {
      stroke: false,
      width: 2,
      fill: true,
      fillColor: colors.map,
      fillOpacity: 1,
    };

    this.geoJson = L.geoJson(geomap, {
      style: myCustomStyle,
      onEachFeature(feature, country) {
        const { name, iso_a2: countryCode } = feature.properties;
        // const { id } = feature;

        country.on('click', () => {
          setCountry(name);
          this.country = name;
          updateContriesStyles(name);
        });

        country.on('mouseover', () => showTooltip(country, name, countryCode /* , id */));

        country.on('mouseout', () => updateContriesStyles());
      },
    }).addTo(this.map);
    this.addMarker();
  }

  updateContriesStyles = (country = this.country) => {
    this.country = country;
    this.geoJson.eachLayer((layer) => {
      const { name } = layer.feature.properties;

      layer.setStyle({ fillColor: this.colors.map });

      if (this.country === name) {
        layer.setStyle({ fillColor: this.colors.choosen });
      }
    });
  }

  showTooltip = (country, name, countryCode) => {
    const { isAllPeriod, isAbsoluteValues } = this.options;

    country.setStyle({ fillColor: this.colors.hover });
    const data = this.covidData.find((elem) => elem.CountryCode === countryCode);

    const indicator = isAllPeriod ? `Total${this.index}` : `New${this.index}`;

    let value = data ? data[indicator] : 'Not found';

    if (!isAbsoluteValues && typeof value !== 'string') {
      value = data.population
        ? Math.round((value / data.population) * 10000000) / 100
        : 'Not found';
    }

    country.bindTooltip(`<div>${name}</div><div>${this.index}: ${value}</div>`).openTooltip();
  }

  addMarker = () => {
    const icon = L.divIcon({ className: 'marker' });
    const marker = new L.Marker([46.82, 8.23], { icon });
    marker.addTo(this.map);
  }

  update = (country = this.country, options) => {
    this.country = country;
    this.options = options;
    this.switcher.updateOptions(options);
  }

  setEvents = () => {
    const mapParametersSelect = document.querySelector(`.${classNames.mapSelect}`);
    mapParametersSelect.addEventListener('change', (e) => {
      this.index = e.target.value;
    });
  }
}
