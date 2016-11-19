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
    .controller('BoardsController', BoardsController);

  function BoardsController($scope, $httpParamSerializerJQLike, $filter,
    $location, NgTableParams, ngTableEventsChannel, boardsList, platformsList,
    frameworksList) {
    var vm = this;

    vm.shareUrl = '';
    vm.platforms = platformsList;
    vm.frameworks = frameworksList;
    vm.getFilterData = getFilterData;
    vm.updateShareUrl = updateShareUrl;

    vm.tableParams = new NgTableParams(
      angular.extend({
          page: 1,
          count: 15,
          sorting: { 'name': 'asc' }
        },
        $location.search()), {
        counts: [15, 30, 50, 100, 1000],
        dataset: boardsList
      });

    ngTableEventsChannel.onAfterReloadData(
      updateShareUrl,
      $scope,
      vm.tableParams
    );

    ////////////

    function updateShareUrl() {
      vm.shareUrl = $location.protocol() + '://' + $location.host();
      if (parseInt($location.port()) !== 80) {
        vm.shareUrl += ':' + $location.port();
      }
      vm.shareUrl += '/boards?' + $httpParamSerializerJQLike(vm.tableParams.url());
    }

    function getFilterData(type_) {
      var data = [];
      angular.forEach(type_ === 'platforms' ? platformsList :
        frameworksList,
        function(item) {
          if (type_ === 'platforms' && item.forDesktop) {
            return;
          }
          if (angular.isObject(item) && 'title' in item) {
            data.push({
              'id': item.name,
              'title': item.title
            });
          }
        });
      return data;
    }
  }
})();
