/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular
    .module('siteApp')
    .controller('PlatformsController', PlatformsController);

  function PlatformsController($routeParams, $window, dataService) {
    var vm = this;

    vm.changePlatform = changePlatform;
    vm.activeTabName = '';
    vm.platforms = dataService.getPlatforms();
    vm.packages = dataService.getPackages();

    // activate platform by hash
    var _type = 'atmelavr';
    if ($routeParams.hasOwnProperty('platformType')) {
      _type = $routeParams.platformType;
    }

    angular.forEach(vm.platforms, function(item) {
      item.active = item.type === _type;

      if (item.active) {
        vm.activeTabName = item.name;
      }
    });

    if (_type === 'creating') {
      vm.activeTabName = 'Create Platform';
    }

    ////////////

    function changePlatform(type) {
      $window.location.href = '#!/platforms/' + type;
    }
  }
})();
