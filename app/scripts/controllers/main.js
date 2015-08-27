/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular
    .module('siteApp')
    .controller('MainController', MainController);

  function MainController($location, $window, siteUtils) {
    var vm = this;

    vm.isRouteActive = isRouteActive;
    vm.isPhJSCrawler = $window.navigator.userAgent.indexOf('PhantomJS') !== -1;
    vm.siteUtils = siteUtils;

    ////////////

    function isRouteActive(pattern) {
      return new RegExp(pattern).test($location.path());
    }
  }

})();
