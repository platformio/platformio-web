/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular.module('siteApp')
    .controller('LibMainController', LibMainController);

  function LibMainController($location, libStats) {
    var vm = this;

    vm.submitSearchForm = submitSearchForm;
    vm.searchQuery = '';
    vm.stats = libStats;

    ////////////

    function submitSearchForm() {
      $location.url('/lib/search?query=' + encodeURIComponent(vm.searchQuery));
    }
  }

})();
