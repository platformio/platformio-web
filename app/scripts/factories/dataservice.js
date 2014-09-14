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
      getLibInfo: getLibInfo,
      getLibDlUrl: getLibDlUrl,
      getLibStats: getLibStats
    };

    function getLibSearchResult(data) {
      return $resource(siteConfig.apiURL + '/lib/search', data).get();
    }

    function getLibInfo(name) {
      return $resource(siteConfig.apiURL + '/lib/info/' + name).get();
    }

    function getLibDlUrl(name) {
      return $resource(
        siteConfig.apiURL + '/lib/download/' + name).get();
    }

    function getLibStats() {
      return $resource(siteConfig.apiURL + '/lib/stats').get();
    }
  }

})();
