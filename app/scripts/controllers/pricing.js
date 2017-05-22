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

  angular.module('siteApp')
    .controller('PricingController', PricingController);

  function PricingController() {
    var vm = this;

    vm.baseRates = {
      'M': {
        'basic': {
          'price': 12.99,
          'whole': 12,
          'cents': 99
        },
        'professional': {
          'price': 124.99,
          'whole': 124,
          'cents': 99
        }
      },
      'Y': {
        'basic': {
          'price': 9.99,
          'whole': 9,
          'cents': 99
        },
        'professional': {
          'price': 99.99,
          'whole': 99,
          'cents': 99
        }
      }
    };
    vm.currentPeriod = 'Y';
    vm.rates = null;
    vm.changeRate = changeRate;

    // show annual rates by default
    changeRate('Y');

    ////////////

    function getParameterByName(name, url) {
      if (!url) {
        url = window.location.href;
      }
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
      if (!results) {
        return null;
      }
      if (!results[2]) {
        return '';
      }
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    function changeRate(newPeriod) {
      if (!newPeriod) {
        vm.currentPeriod = vm.currentPeriod === 'Y' ? 'M' : 'Y';
      } else {
        vm.currentPeriod = newPeriod;
      }
      var coupon = getParameterByName('coupon');
      var sale = 0;
      if (coupon && coupon.indexOf('OFF') !== -1) {
        sale = parseInt(coupon.substr(coupon.indexOf('OFF') + 3));
      }
      vm.rates = vm.baseRates[vm.currentPeriod];
      for (var key in vm.rates) {
        if (!vm.rates.hasOwnProperty(key)) {
          continue;
        }
        var price = vm.rates[key]['price'];
        if (sale > 0 && sale <= 100) {
          price -= price * sale / 100;
        }
        vm.rates[key]['whole'] = Math.floor(price);
        vm.rates[key]['cents'] = parseInt((price - Math.floor(price)) * 100);
        vm.rates[key]['url'] = 'https://sites.fastspring.com/platformio/';
        vm.rates[key]['url'] += 'instant/platformio-plus-' + key + '-';
        if (vm.currentPeriod === 'Y') {
          vm.rates[key]['url'] += 'annually';
        } else {
          vm.rates[key]['url'] += 'monthly';
        }
        if (coupon) {
          vm.rates[key]['url'] += '?coupon=' + coupon;
        }
      }
    }
  }

})();
