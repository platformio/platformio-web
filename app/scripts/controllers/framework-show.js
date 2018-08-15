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
    .controller('FrameworkShowController', FrameworkShowController);

  function FrameworkShowController(
    $routeParams, NgTableParams, platformsList, boardsList, frameworksList) {
    var vm = this;

    vm.getFrameworkPlatforms = getFrameworkPlatforms;

    vm.framework = getFrameworkInfo($routeParams.frameworkName);
    vm.frameworks = frameworksList;
    vm.tableParams = getBoardsTableParams();

    ////////////

    function getFrameworkInfo(name) {
      var result = null;
      angular.forEach(frameworksList, function(item) {
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
        if (board.frameworks.indexOf(vm.framework.name) !== -1) {
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

    function getFrameworkPlatforms(frameworkName) {
      var result = [];
      angular.forEach(platformsList, function(item) {
        if (item.frameworks.indexOf(frameworkName) !== -1) {
          result.push(item);
        }
      });
      return result;
    }
  }

})();
