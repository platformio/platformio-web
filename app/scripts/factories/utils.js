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
      showSearchExamples: showSearchExamples
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
  }

})();
