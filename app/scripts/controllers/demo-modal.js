/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular.module('siteApp')
    .controller('DemoModalController', DemoModalController);

  function DemoModalController($window, $modalInstance, $location,
    $analytics) {
    var vm = this;

    vm.ok = ok;
    vm.cancel = cancel;

    ////////////

    function ok() {
      $analytics.eventTrack('Button', {
        category: 'Install',
        label: 'Demo'
      });
      $modalInstance.close('ok');
      $location.path('/get-started');
    }

    function cancel() {
      $analytics.eventTrack('Button', {
        category: 'Demo',
        label: 'Cancel'
      });
      $modalInstance.dismiss('cancel');
    }

  }

})();
