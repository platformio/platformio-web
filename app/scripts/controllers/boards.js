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
        {'type': 'arduino', 'title': 'Arduino', 'active': false},
        {'type': 'adafruit', 'title': 'Adafruit', 'active': false},
        {'type': 'digispark', 'title': 'Digispark', 'active': false},
        {'type': 'engduino', 'title': 'Engduino', 'active': false},
        {'type': 'microduino', 'title': 'Microduino', 'active': false},
        {'type': 'raspduino', 'title': 'Raspduino', 'active': false},
        {'type': 'stm32', 'title': 'STM32', 'active': false},
        {'type': 'teensy', 'title': 'Teensy', 'active': false},
        {'type': 'timsp430', 'title': 'TI MSP430', 'active': false},
        {'type': 'titiva', 'title': 'TI Tiva', 'active': false}
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
