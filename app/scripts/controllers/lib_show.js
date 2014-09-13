/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular.module('siteApp')
    .controller('LibShowController', LibShowController);

  function LibShowController($window, libInfo, dataService) {
    var vm = this;

    vm.lib = libInfo;
    vm.examples = getExamples();
    vm.currentExample = {};
    vm.downloadLib = downloadLib;

    if (vm.examples.length) {
      vm.currentExample = vm.examples[0];
    }

    ////////////

    function getExamples() {
      var items = [];
      if (!vm.lib.examples.length) {
        return items;
      }
      angular.forEach(vm.lib.examples, function(url) {
        var urlParts = url.split('/');
        items.push({
          url: url,
          name: urlParts[urlParts.length - 1]
        });
      });
      return items;
    }

    function downloadLib() {
      var defer = dataService.getLibDlUrl(vm.lib.name).$promise;
      defer.then(function(data) {
        $window.location.href = data.url;
      });
    }
  }

})();
