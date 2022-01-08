import Vue from 'vue'
import dateToLocale from '@/plugins/filters/date-to-locale'
import currencyToLocale from '@/plugins/filters/currency-to-locale'
import getShortMovieTitle from '@/plugins/filters/movie-short-title'

Vue.filter('dateToLocale', dateToLocale)
Vue.filter('currencyToLocale', currencyToLocale)
Vue.filter('movieShortTitle', getShortMovieTitle)
