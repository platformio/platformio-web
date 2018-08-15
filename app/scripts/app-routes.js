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
      .when('/install/:gsType?', {
        templateUrl: 'views/install.html',
        controller: 'InstallController',
        controllerAs: 'vm'
      })
      .when('/platforms', {
        templateUrl: 'views/platforms.html',
        controller: 'PlatformsController',
        controllerAs: 'vm',
        resolve: {
          platformsList: ['dataService',
            function(dataService) {
              return dataService.getPlatforms().$promise;
            }
          ],
          frameworksList: ['dataService',
            function(dataService) {
              return dataService.getFrameworks().$promise;
            }
          ]
        }
      })
      .when('/platforms/:platformName/:activeTab?', {
        templateUrl: 'views/platform_show.html',
        controller: 'PlatformShowController',
        controllerAs: 'vm',
        resolve: {
          platformsList: ['dataService',
            function(dataService) {
              return dataService.getPlatforms().$promise;
            }
          ],
          boardsList: ['dataService',
            function(dataService) {
              return dataService.getBoards();;
            }
          ],
          packagesList: ['dataService',
            function(dataService) {
              return dataService.getPackages().$promise;
            }
          ],
          frameworksList: ['dataService',
            function(dataService) {
              return dataService.getFrameworks().$promise;
            }
          ]
        }
      })
      .when('/frameworks', {
        templateUrl: 'views/frameworks.html',
        controller: 'FrameworksController',
        controllerAs: 'vm',
        resolve: {
          frameworksList: ['dataService',
            function(dataService) {
              return dataService.getFrameworks().$promise;
            }
          ],
          platformsList: ['dataService',
            function(dataService) {
              return dataService.getPlatforms().$promise;
            }
          ]
        }
      })
      .when('/frameworks/:frameworkName', {
        templateUrl: 'views/framework_show.html',
        controller: 'FrameworkShowController',
        controllerAs: 'vm',
        resolve: {
          platformsList: ['dataService',
            function(dataService) {
              return dataService.getPlatforms().$promise;
            }
          ],
          boardsList: ['dataService',
            function(dataService) {
              return dataService.getBoards();;
            }
          ],
          frameworksList: ['dataService',
            function(dataService) {
              return dataService.getFrameworks().$promise;
            }
          ]
        }
      })
      .when('/boards', {
        templateUrl: 'views/boards.html',
        controller: 'BoardsController',
        controllerAs: 'vm',
        resolve: {
          boardsList: ['dataService',
            function(dataService) {
              return dataService.getBoards();
            }
          ],
          platformsList: ['dataService',
            function(dataService) {
              return dataService.getPlatforms().$promise;
            }
          ],
          frameworksList: ['dataService',
            function(dataService) {
              return dataService.getFrameworks().$promise;
            }
          ]
        }
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
          ],
          frameworksList: ['dataService',
            function(dataService) {
              return dataService.getFrameworks().$promise;
            }
          ],
          platformsList: ['dataService',
            function(dataService) {
              return dataService.getPlatforms().$promise;
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
          ],
          frameworksList: ['dataService',
            function(dataService) {
              return dataService.getFrameworks().$promise;
            }
          ],
          platformsList: ['dataService',
            function(dataService) {
              return dataService.getPlatforms().$promise;
            }
          ]
        }
      })
      .when('/lib/show/:libId/:libName/:activeTab?', {
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
      .when('/pricing', {
        templateUrl: 'views/pricing.html',
        controller: 'PricingController',
        controllerAs: 'vm'
      })
      .when('/license', {
        templateUrl: 'views/license.html'
      })
      .when('/subscriptions', {
        templateUrl: 'views/subscriptions.html'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html'
      })
      .when('/support', {
        templateUrl: 'views/support.html',
        controller: 'SupportController',
        controllerAs: 'vm'
      })
      .when('/who-uses', {
        templateUrl: 'views/who_uses.html'
      })
      .when('/platformio-ide', {
        templateUrl: 'views/platformio-ide.html'
      })
      .when('/donate', {
        templateUrl: 'views/donate.html'
      })
      .when('/404', {
        templateUrl: 'views/404.html'
      })
      .otherwise({
        redirectTo: '/404'
      });
  }

})();
