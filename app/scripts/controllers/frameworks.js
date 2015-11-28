/**
 * Copyright 2014-2015 Ivan Kravets <me@ikravets.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
          description: item.description.split('.')[0],
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
