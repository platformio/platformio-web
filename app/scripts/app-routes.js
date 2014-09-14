/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular
    .module('siteApp')
    .config(routeConfig);

  function routeConfig($locationProvider, $routeProvider,
    $disqusProvider) {
    $locationProvider.hashPrefix('!');
    $disqusProvider.setShortname('platformio');

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/platforms', {
        templateUrl: 'views/platforms.html'
      })
      .when('/boards', {
        templateUrl: 'views/boards.html'
      })
      .when('/lib', {
        templateUrl: 'views/lib_main.html',
        controller: 'LibMainController',
        controllerAs: 'vm',
        resolve: {
          libStats: ['dataService',
            function(dataService) {
              return dataService.getLibStats().$promise;
            }
          ]
        }
      })
      .when('/lib/search', {
        templateUrl: 'views/lib_search.html',
        controller: 'LibSearchController',
        controllerAs: 'vm',
        resolve: {
          searchResult: ['$location', 'dataService',
            function($location, dataService) {
              var searchObject = $location.search();
              return dataService.getLibSearchResult({
                query: searchObject.query,
                page: searchObject.page ? parseInt(searchObject.page) : 1
              }).$promise;
            }
          ]
        }
      })
      .when('/lib/show/:libName', {
        templateUrl: 'views/lib_show.html',
        controller: 'LibShowController',
        controllerAs: 'vm',
        resolve: {
          libInfo: ['$route', 'dataService',
            function($route, dataService) {
              return dataService.getLibInfo(
                $route.current.params.libName).$promise;
            }
          ]
        }
      })

    .when('/lib/examples', {
      templateUrl: 'views/lib_examples.html'
    })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
