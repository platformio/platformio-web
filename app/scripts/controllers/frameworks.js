/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular
    .module('siteApp')
    .controller('FrameworksController', FrameworksController);

  function FrameworksController($routeParams, $window, frameworksList) {
    var vm = this;

    vm.changeFramework = changeFramework;
    vm.activeTab = 'arduino';
    vm.frameworks = frameworksList;

    // activate framework by hash
    if ($routeParams.hasOwnProperty('frameworkType')) {
      vm.activeTab = $routeParams.frameworkType;
    }

    vm.tabs = getTabs(vm.activeTab);

    ////////////

    function changeFramework(type) {
      $window.location.href = '#!/frameworks/' + type;
    }

    function getTabs(activeType) {
      var tabs = {};

      angular.forEach(frameworksList, function(item) {
        tabs[item.type] = {
          name: item.name,
          active: item.type === activeType
        };
      });

      return tabs;
    }

  }
})();
