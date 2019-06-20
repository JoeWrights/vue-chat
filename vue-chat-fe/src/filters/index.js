import Vue from 'vue';
import { snakeCase } from 'lodash';

import date from './date.filter';

const filters = {
  date,
};

Object.keys(filters).forEach((key) => {
  Vue.filter(snakeCase(key), filters[key]);
});

export default filters;
