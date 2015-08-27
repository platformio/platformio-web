/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular
    .module('siteApp')
    .factory('siteUtils', siteUtils);

  function siteUtils($modal) {
    return {
      showSearchExamples: showSearchExamples,
      showDemo: showDemo
    };

    function showSearchExamples(searchPath) {
      $modal.open({
        templateUrl: 'views/lib_search_examples.html',
        controller: 'LibModalSEController',
        controllerAs: 'vm',
        size: 'lg',
        resolve: {
          searchPath: function() {
            return searchPath;
          }
        }
      });
    }

    function showDemo() {
      $modal.open({
        templateUrl: 'views/demo_modal.html',
        controller: 'DemoModalController',
        controllerAs: 'vm',
        size: 'piodemo',
      });
    }
  }

})();
