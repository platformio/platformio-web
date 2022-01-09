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

  angular
    .module('siteApp')
    .factory('httpErrorInterceptor', httpErrorInterceptor)
    .config(routeConfig);

  function httpErrorInterceptor($q, $location) {
    return {
      'responseError': function(rejection) {
        if (rejection.status === 404) {
          $location.path('/404');
        }
        return $q.reject(rejection);
      }
    };
  }

  function routeConfig($locationProvider, $routeProvider, $httpProvider) {
    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push('httpErrorInterceptor');
    $httpProvider.defaults.cache = true;

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        resolve: {
          pioStats: ['dataService',
            function(dataService) {
              return dataService.getPioStats().$promise;
            }
          ]
        }
      })
      .when('/get-started', {
        redirectTo: '/install'
      })
      .when('/get-started/ide', {
        redirectTo: '/platformio-ide'
      })
      .when('/install/:gsType?', {
        templateUrl: 'views/install.html',
        controller: 'InstallController',
        controllerAs: 'vm'
      })
      .when('/support', {
        templateUrl: 'views/support.html'
      })
      .when('/platformio-ide', {
        templateUrl: 'views/platformio-ide.html'
      })
      .when('/donate', {
        templateUrl: 'views/donate.html'
      })
      .when('/advertising', {
        templateUrl: 'views/advertising.html'
      })
      .when('/404', {
        templateUrl: 'views/404.html'
      })
      .otherwise({
        redirectTo: '/404'
      });
  }

})();
