/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular
    .module('siteApp')
    .controller('BoardsController', BoardsController);

  function BoardsController($routeParams, $window) {
    var vm = this;

    vm.changeVendor = changeVendor;
    vm.vendors = getVendors();
    vm.activeVendor = '';

    angular.forEach(vm.vendors, function(item, key) {
      if (item.active) {
        vm.activeVendor = key;
      }
    });

    ////////////

    function changeVendor(type) {
      $window.location.href = '#!/boards/' + type;
    }

    function getVendors() {
      var data = {
        'arduino': {'title': 'Arduino', 'active': false},
        'engduino': {'title': 'Engduino', 'active': false},
        'microduino': {'title': 'Microduino', 'active': false},
        'raspduino': {'title': 'Raspduino', 'active': false},
        'timsp430': {'title': 'TI MSP430 LaunchPads', 'active': false},
        'titiva': {'title': 'TI Tiva C LaunchPads', 'active': false}
      };

      var _type = 'arduino';
      if ($routeParams.hasOwnProperty('vendorType')) {
        _type = $routeParams.vendorType;
      }

      angular.forEach(data, function(item, key) {
        data[key].active = key === _type;
      });

      return data;
    }
  }
})();
