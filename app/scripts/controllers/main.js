/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular
    .module('siteApp')
    .controller('MainController', MainController);

  function MainController($location, $window) {
    var vm = this;

    vm.isRouteActive = isRouteActive;
    vm.isPhJSCrawler = $window.navigator.userAgent.indexOf('PhantomJS') !== -1;

    ////////////

    function isRouteActive(pattern) {
      return new RegExp(pattern).test($location.path());
    }
  }

})();
