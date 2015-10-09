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
    packagesList, frameworksList) {
    var vm = this;

    vm.changePlatform = changePlatform;
    vm.isCompatibleFramework = isCompatibleFramework;

    vm.platforms = platformsList;
    vm.packages = packagesList;
    vm.frameworks = frameworksList;
    vm.activeTab = 'atmelavr';

    // activate platform by hash
    if ($routeParams.hasOwnProperty('platformType')) {
      vm.activeTab = $routeParams.platformType;
    }

    vm.tabs = getTabs(vm.activeTab);
    vm.groups = getGroups(vm.tabs, vm.activeTab);

    ////////////

    function getGroups(tabs, activeType) {
      var groups = {
        embedded: false,
        desktop: false,
        creating: false
      };

      var stop = false;
      angular.forEach(tabs, function(item, key) {
        if (stop || !item.active) {
          return;
        }
        stop = true;
        if (key === 'creating') {
          groups.creating = true;
        }
        else if (item.forDesktop) {
          groups.desktop = true;
        }
        else {
          groups.embedded = true;
        }
      });

      return groups;
    }

    function changePlatform(type) {
      $window.location.href = '#!/platforms/' + type;
    }

    function getTabs(activeType) {
      var activated = false;
      var tabs = {};

      angular.forEach(platformsList, function(item) {
        tabs[item.type] = {
          name: item.name,
          description: item.description.split('.')[0],
          active: item.type === activeType,
          forDesktop: item.forDesktop
        };

        if (!activated && tabs[item.type].active) {
          activated = true;
        }
      });

      tabs['creating'] = {
        name: 'Create Platform',
        description: 'Create Platform',
        active: !activated
      };

      if (tabs['creating'].active) {
        vm.activeTab = 'creating';
      }

      return tabs;
    }

    function isCompatibleFramework(frameworkType, platformType) {
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
