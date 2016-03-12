/**
 * Copyright 2014-2016 Ivan Kravets <me@ikravets.com>
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
    .controller('PlatformsController', PlatformsController);

  function PlatformsController($routeParams, $location, platformsList,
    packagesList, frameworksList) {
    var vm = this;

    vm.changePlatform = changePlatform;
    vm.isCompatibleFramework = isCompatibleFramework;

    vm.platforms = platformsList;
    vm.packages = packagesList;
    vm.frameworks = frameworksList;
    vm.activeGroup = 0;
    vm.activePlatform = 0;

    // activate platform by hash
    if ($routeParams.hasOwnProperty('platformType')) {
      vm.activeGroup = 2;
      vm.activePlatform = -1;
      angular.forEach(platformsList, function(item, index) {
        if ($routeParams.platformType === item.type) {
          vm.activeGroup = item.forDesktop? 1 : 0;
          vm.activePlatform = index;
        }
      });
    }

    ////////////

    function changePlatform(type) {
      $location.path('/platforms/' + type);
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
