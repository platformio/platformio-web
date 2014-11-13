/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular
    .module('siteApp')
    .factory('httpErrorInterceptor', httpErrorInterceptor)
    .config(routeConfig);

  function httpErrorInterceptor($q, $window) {
    return {
      'responseError': function(rejection) {
        if (rejection.status === 404) {
          $window.location.href = '#!/404';
        }
        return $q.reject(rejection);
      }
    };
  }

  function routeConfig($locationProvider, $routeProvider,
    $disqusProvider, $httpProvider) {
    $locationProvider.hashPrefix('!');
    $disqusProvider.setShortname('platformio');
    $httpProvider.interceptors.push('httpErrorInterceptor');

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/get-started', {
        templateUrl: 'views/get_started.html'
      })
      .when('/platforms/:platformType?', {
        templateUrl: 'views/platforms.html',
        controller: 'PlatformsController',
        controllerAs: 'vm'
      })
      .when('/boards/:vendorType?', {
        templateUrl: 'views/boards.html',
        controller: 'BoardsController',
        controllerAs: 'vm'
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
      .when('/lib/examples', {
        templateUrl: 'views/lib_examples.html',
        controller: 'LibExamplesController',
        controllerAs: 'vm',
        resolve: {
          searchResult: ['$location', 'dataService',
            function($location, dataService) {
              var searchObject = $location.search();
              return dataService.getLibExamples({
                query: searchObject.query,
                page: searchObject.page ? parseInt(searchObject.page) : 1
              }).$promise;
            }
          ]
        }
      })
      .when('/lib/show/:libId/:libName', {
        templateUrl: 'views/lib_show.html',
        controller: 'LibShowController',
        controllerAs: 'vm',
        resolve: {
          libInfo: ['$route', 'dataService',
            function($route, dataService) {
              return dataService.getLibInfo(
                $route.current.params.libId).$promise;
            }
          ]
        }
      })
      .when('/404', {
        templateUrl: 'views/404.html'
      })
      .otherwise({
        redirectTo: '/404'
      });
  }

})();
