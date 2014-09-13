/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular
    .module('siteApp')
    .controller('MainController', MainController);

  function MainController($location) {
    var vm = this;

    vm.isRouteActive = isRouteActive;

    ////////////

    function isRouteActive(pattern) {
      return new RegExp(pattern).test($location.path());
    }
  }

})();
