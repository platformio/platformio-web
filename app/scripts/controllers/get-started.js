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
    .controller('GetStartedController', GetStartedController);

  function GetStartedController($routeParams, $window, dataService, siteUtils) {
    var vm = this;

    vm.gsType = 'ide';
    if ($routeParams.hasOwnProperty('gsType')) {
      vm.gsType = $routeParams.gsType;
    }

    vm.siteUtils = siteUtils;
    vm.cliDemos = dataService.getCLIDemos();
    vm.cliDemoActive = 0;
    vm.ideDemos = dataService.getIDEDemos();
    vm.ideDemoActive = 0;
    vm.ideDemoInterval = 5000;
    vm.slideHeight = ($window.innerHeight ? Math.ceil($window.innerHeight / 2) :
      240);
  }
})();
