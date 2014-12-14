/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular.module('siteApp')
    .controller('LibModalSEController', LibModalSEController);

  function LibModalSEController($window, $modalInstance, searchPath) {
    var vm = this;
    vm.searchPath = searchPath;
    vm.search = doSearch;

    ////////////

    function doSearch(query) {
      $window.location.href = vm.searchPath + '?query=' + query;
      $modalInstance.close();
    }
  }

})();
