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

    vm.subscriptions = {
      'individual': {
        'professional': {
          'M': {
            'price': 11.99,
            'productId': 535472
          },
          'Y': {
            'price': 119.88,
            'productId': 535473
          }
        }
      },
      'business': {
        'professional': {
          'M': {
            'price': 34.99,
            'productId': 535474
          },
          'Y': {
            'price': 359.88,
            'productId': 535475
          }
        }
      },
      'non-commercial': {
        'professional': {
          'Y': {
            'price': 35.88,
            'productId': 535476
          }
        }
      }
    };
    vm.currentSubscription = 'individual';
    vm.currentPeriod = 'Y';
    vm.plans = null;
    vm.togglePeriod = togglePeriod;
    vm.checkout = checkout;

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
      if (vm.currentSubscription === 'non-commercial') {
        vm.currentPeriod = 'Y';
      }
      var coupon = getParameterByName('coupon');
      var sale = 0;
      if (coupon && coupon.indexOf('OFF') !== -1) {
        sale = parseInt(coupon.substr(coupon.indexOf('OFF') + 3));
      }
      vm.plans = {};
      angular.forEach(vm.subscriptions[vm.currentSubscription], function(item, plan) {
        var subscription = item[vm.currentPeriod];
        var planItem = {
          'beforeSale': null,
          'whole': 0,
          'cents': 0,
          'coupon': coupon,
          'productId': subscription.productId
        };

        var price = subscription.price;
        if (vm.currentPeriod === 'Y') {
          price = price / 12;
        }

        if (sale > 0 && sale <= 100) {
          planItem['beforeSale'] = price;
          price -= price * sale / 100;
        }

        planItem['whole'] = Math.floor(price);
        planItem['cents'] = Math.round((price % 1) * 100);
        if (planItem['cents'] === 100) {
          planItem['cents'] = 99;
        }

        vm.plans[plan] = planItem;
      });
    }

    function checkout(productId, coupon) {
      Paddle.Checkout.open({
        product: productId,
        coupon: coupon
      });
    }
  }

})();
