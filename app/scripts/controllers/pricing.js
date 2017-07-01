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

  function PricingController($scope) {
    var vm = this;

    vm.annualPlans = {
      'personal': {
        'basic': 9.99,
        'professional': 99.99
      },
      'commercial': {
        'basic': 29.99,
        'professional': 299.99
      },
      'students': {
        'basic': 2.99,
        'professional': 29.99
      }
    };
    vm.currentSubscription = 'personal';
    vm.currentPeriod = 'Y';
    vm.plans = null;
    vm.togglePeriod = togglePeriod;

    // show annual rates by default
    $scope.$watchGroup(['vm.currentSubscription', 'vm.currentPeriod'], function() {
      updateRates();
    });

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

    function togglePeriod() {
      vm.currentPeriod = vm.currentPeriod === 'Y' ? 'M' : 'Y';
    }

    function updateRates() {
      var coupon = getParameterByName('coupon');
      var sale = 0;
      if (coupon && coupon.indexOf('OFF') !== -1) {
        sale = parseInt(coupon.substr(coupon.indexOf('OFF') + 3));
      }
      vm.plans = {};
      angular.forEach(vm.annualPlans[vm.currentSubscription], function(annualPrice, plan) {
        var planItem = {
          'beforeSale': null,
          'whole': 0,
          'cents': 0,
          'url': null
        };

        var price = annualPrice;
        if (vm.currentPeriod !== 'Y') {
          price = Math.floor(annualPrice * 14 / 12) + 0.99;
        }

        planItem['beforeSale'] = null;
        if (sale > 0 && sale <= 100) {
          planItem['beforeSale'] = price;
          price -= price * sale / 100;
        }

        planItem['whole'] = Math.floor(price);
        planItem['cents'] = Math.round((price % 1) * 100);

        // Billing URL
        planItem['url'] = 'https://sites.fastspring.com/platformio/';
        planItem['url'] += 'instant/platformio-plus-';
        planItem['url'] += plan + '-' + vm.currentSubscription + '-';
        if (vm.currentPeriod === 'Y') {
          planItem['url'] += 'yearly';
        } else {
          planItem['url'] += 'monthly';
        }
        if (coupon) {
          planItem['url'] += '?coupon=' + coupon;
        }
        vm.plans[plan] = planItem;
      });
    }
  }

})();
