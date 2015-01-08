/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular
    .module('siteApp')
    .controller('PlatformsController', PlatformsController);

  function PlatformsController($routeParams, $window) {
    var vm = this;

    vm.changePlatform = changePlatform;
    vm.platforms = getPlatforms();
    vm.activePlatform = '';

    angular.forEach(vm.platforms, function(item, key) {
      if (item.active) {
        vm.activePlatform = key;
      }
    });

    ////////////

    function changePlatform(type) {
      $window.location.href = '#!/platforms/' + type;
    }

    function getPlatforms() {
      var data = {
        'atmelavr': {'title': 'Atmel AVR', 'active': false},
        'timsp430': {'title': 'TI MSP430', 'active': false},
        'titiva': {'title': 'TI TIVA', 'active': false},
        'creating': {'title': 'Creating Platform', 'active': false}
      };

      var _type = 'atmelavr';
      if ($routeParams.hasOwnProperty('platformType')) {
        _type = $routeParams.platformType;
      }

      angular.forEach(data, function(item, key) {
        data[key].active = key === _type;
      });

      return data;
    }
  }
})();
