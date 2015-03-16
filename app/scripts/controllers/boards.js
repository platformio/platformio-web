/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular
    .module('siteApp')
    .controller('BoardsController', BoardsController);

  function BoardsController($scope, $filter, $location, $q, $window,
    ngTableParams, boardsList, platformsList, frameworksList) {
    var vm = this;

    vm.groupBy = 'vendor';
    vm.platforms = platformsList;
    vm.frameworks = frameworksList;
    vm.getFilterData = getFilterData;

    /* jshint newcap:false */
    vm.tableParams = new ngTableParams(
      angular.extend({
          page: 1,
          count: $window.navigator.userAgent.indexOf('PhantomJS') !== -1 ?
            1000 : 15,
          sorting: {
            'vendor': 'asc'
          }
        },
        $location.search()), {
        counts: [15, 30, 50, 100, 1000],
        groupBy: function(item) {
          return item[vm.groupBy];
        },
        total: boardsList.length,
        getData: function($defer, params) {
          // $location.search(params.url());

          var orderedData = params.sorting() ?
            $filter('orderBy')(boardsList, vm.tableParams.orderBy()) :
            boardsList;
          orderedData = params.filter() ?
            $filter('filter')(orderedData, params.filter()) :
            orderedData;

          params.total(orderedData.length);
          $defer.resolve(orderedData.slice((params.page() - 1) * params
            .count(), params.page() * params.count()));
        }
      });

    $scope.$watch('vm.groupBy', function(value) {
      vm.tableParams.reload();
    });

    ////////////

    function getFilterData(type_) {
      var d = $q.defer(),
        data = [];
      angular.forEach(type_ === 'platforms' ? platformsList :
        frameworksList,
        function(item) {
          if (angular.isObject(item) && 'name' in item) {
            data.push({
              'id': item.type,
              'title': item.name
            });
          }
        });

      d.resolve(data);
      return d;
    }

  }
})();
