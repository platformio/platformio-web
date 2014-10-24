/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular
    .module('siteApp')
    .factory('dataService', dataService);

  function dataService($resource, siteConfig) {
    return {
      getLibSearchResult: getLibSearchResult,
      getLibExamples: getLibExamples,
      getLibInfo: getLibInfo,
      getLibDlUrl: getLibDlUrl,
      getLibStats: getLibStats,
      getFrameworks: getFrameworks,
      getPlatforms: getPlatforms
    };

    function getLibSearchResult(data) {
      return $resource(siteConfig.apiURL + '/lib/search', data).get();
    }

    function getLibExamples(data) {
      return $resource(siteConfig.apiURL + '/lib/examples', data).get();
    }

    function getLibInfo(id) {
      return $resource(siteConfig.apiURL + '/lib/info/' + id).get();
    }

    function getLibDlUrl(id) {
      return $resource(
        siteConfig.apiURL + '/lib/download/' + id).get();
    }

    function getLibStats() {
      return $resource(siteConfig.apiURL + '/lib/stats').get();
    }

    function getFrameworks() {
      return [
        {name: 'arduino', title: 'Arduino'},
        {name: 'energia', title: 'Energia'}
      ];
    }

    function getPlatforms() {
      return [
        {name: 'atmelavr', title: 'Atmel AVR'},
        {name: 'timsp430', title: 'TI MSP430'},
        {name: 'titiva', title: 'TI TIVA'},
        {name: 'teensy', title: 'Teensy'}
      ];
    }
  }

})();
