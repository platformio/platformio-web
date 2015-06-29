/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular
    .module('siteApp')
    .controller('FrameworksController', FrameworksController);

  function FrameworksController($routeParams, $window, frameworksList,
    platformsList) {
    var vm = this;

    vm.changeFramework = changeFramework;
    vm.isCompatiblePlatform = isCompatiblePlatform;

    vm.activeTab = 'arduino';
    vm.frameworks = frameworksList;
    vm.platforms = platformsList;

    // activate framework by hash
    if ($routeParams.hasOwnProperty('frameworkType')) {
      vm.activeTab = $routeParams.frameworkType;
    }

    vm.tabs = getTabs(vm.activeTab);

    ////////////

    function changeFramework(type) {
      $window.location.href = '#!/frameworks/' + type;
    }

    function getTabs(activeType) {
      var tabs = {};

      angular.forEach(frameworksList, function(item) {
        tabs[item.type] = {
          name: item.name,
          description: item.description.split(".")[0],
          active: item.type === activeType
        };
      });

      return tabs;
    }

    function isCompatiblePlatform(platformType, frameworkType) {
      var compatible = false;
      angular.forEach(platformsList, function(platform) {
        if (platform.type !== platformType) {
          return;
        }
        angular.forEach(platform.packages, function(pkg) {
            if (pkg.indexOf('framework-' + frameworkType) !== -1) {
              compatible = true;
            }
          });

      });
      return compatible;
    }

  }
})();
