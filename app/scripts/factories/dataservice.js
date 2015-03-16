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
      getPackages: getPackages,
      getPlatforms: getPlatforms,
      getBoards: getBoards
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

    function getBoards() {
      return $resource(siteConfig.apiURL + '/boards').query();
    }

    function getFrameworks() {
      return $resource(siteConfig.apiURL + '/frameworks').query();
    }

    function getPlatforms() {
      return $resource(siteConfig.apiURL + '/platforms').query();
    }

    function getPackages() {
      return $resource(siteConfig.apiURL + '/packages').get();
    }

  }

})();
