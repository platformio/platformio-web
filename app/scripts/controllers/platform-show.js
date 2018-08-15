/**
 * Copyright 2014-present Ivan Kravets <me@ikravets.com>
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

  angular.module('siteApp')
    .controller('PlatformShowController', PlatformShowController);

  function PlatformShowController(
    $location, $routeParams, NgTableParams, platformsList, boardsList,
    packagesList, frameworksList) {
    var vm = this;
    var tabs = [
      'boards', 'installation', 'packages', 'examples'
    ];

    vm.platform = getPlatformInfo($routeParams.platformName);
    vm.frameworks = frameworksList;
    vm.packages = packagesList;
    vm.tableParams = getBoardsTableParams();
    vm.activeTab = getActiveTab();
    vm.changeTab = changeTab;

    ////////////

    function getPlatformInfo(name) {
      var result = null;
      angular.forEach(platformsList, function(item) {
        if (item['name'] === name) {
          result = item;
          return;
        }
      });
      return result;
    }

    function getBoardsTableParams() {
      var boards = [];
      angular.forEach(boardsList, function(board) {
        if (board.platform === vm.platform.name) {
          boards.push(board);
        }
      });
      return new NgTableParams(
        angular.extend({
          count: 15,
          sorting: {
            'name': 'asc'
          }
        }), {
          counts: [15, 30, 50, 100, 1000],
          dataset: boards
        }
      );
    }

    function changeTab(name) {
      if (vm.activeTab === tabs.indexOf(name)) {
        return;
      }
      $location.url('/platforms/' + $routeParams.platformName + '/' + name);
    }

    function getActiveTab() {
      if (!$routeParams.hasOwnProperty('activeTab')) {
        return 0;
      }
      var tabIndex = tabs.indexOf($routeParams.activeTab);
      return tabIndex !== -1 ? tabIndex : 0;
    }
  }

})();
