/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular
    .module('siteApp')
    .controller('PlatformsController', PlatformsController);

  function PlatformsController($routeParams, $window, platformsList,
    packagesList) {
    var vm = this;

    vm.changePlatform = changePlatform;
    vm.platforms = platformsList;
    vm.packages = packagesList;
    vm.activeTab = 'atmelavr';

    // activate platform by hash
    if ($routeParams.hasOwnProperty('platformType')) {
      vm.activeTab = $routeParams.platformType;
    }

    vm.tabs = getTabs(vm.activeTab);

    ////////////

    function changePlatform(type) {
      $window.location.href = '#!/platforms/' + type;
    }

    function getTabs(activeType) {
      var activated = false;
      var tabs = {};

      angular.forEach(platformsList, function(item) {
        tabs[item.type] = {
          name: item.name,
          active: item.type === activeType
        };

        if (!activated && tabs[item.type].active) {
          activated = true;
        }
      });

      tabs['creating'] = {
        name: 'Create Platform',
        active: !activated
      };

      if (tabs['creating'].active) {
        vm.activeTab = 'creating';
      }

      return tabs;
    }

  }
})();
