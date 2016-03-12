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
    .controller('FrameworksController', FrameworksController);

  function FrameworksController($routeParams, $location, frameworksList,
    platformsList) {
    var vm = this;

    vm.changeFramework = changeFramework;
    vm.isCompatiblePlatform = isCompatiblePlatform;

    vm.active = 0;
    vm.frameworks = frameworksList;
    vm.platforms = platformsList;

    // activate framework by hash
    if ($routeParams.hasOwnProperty('frameworkType')) {
      angular.forEach(frameworksList, function(item, index) {
        if ($routeParams.frameworkType === item.type) {
          vm.active = index;
        }
      });
    }

    ////////////

    function changeFramework(type) {
      $location.path('/frameworks/' + type);
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
