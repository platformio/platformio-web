/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular
    .module('siteApp')
    .controller('BoardsController', BoardsController);

  function BoardsController($routeParams, $window, dataService) {
    var vm = this;

    vm.changeVendor = changeVendor;
    vm.vendors = getVendors();
    vm.boards = dataService.getBoards();
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
      var data = [
        {'type': 'arduino', 'name': 'Arduino', 'active': false},
        {'type': 'adafruit', 'name': 'Adafruit', 'active': false},
        {'type': 'digistump', 'name': 'Digistump', 'active': false},
        {'type': 'engduino', 'name': 'Engduino', 'active': false},
        {'type': 'freescale', 'name': 'Freescale', 'active': false},
        {'type': 'microduino', 'name': 'Microduino', 'active': false},
        {'type': 'nordic', 'name': 'Nordic', 'active': false},
        {'type': 'nxp', 'name': 'NXP', 'active': false},
        {'type': 'raspduino', 'name': 'Raspduino', 'active': false},
        {'type': 'sainsmart', 'name': 'SainSmart', 'active': false},
        {'type': 'st', 'name': 'ST', 'active': false},
        {'type': 'teensy', 'name': 'Teensy', 'active': false},
        {'type': 'ti', 'name': 'TI LaunchPads', 'active': false}
      ];

      var _type = 'arduino';
      if ($routeParams.hasOwnProperty('vendorType')) {
        _type = $routeParams.vendorType;
      }

      angular.forEach(data, function(item) {
        item.active = item['type'] === _type;
      });

      return data;
    }
  }
})();
