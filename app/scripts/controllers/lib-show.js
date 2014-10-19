/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular.module('siteApp')
    .controller('LibShowController', LibShowController);

  function LibShowController($window, $location, $filter, dataService,
    libInfo) {
    var vm = this;

    vm.frameworks = dataService.getFrameworks();
    vm.platforms = dataService.getPlatforms();
    vm.lib = libInfo;
    vm.meta = getMeta();
    vm.examples = getExamples();
    vm.currentExample = {};
    vm.downloadLib = downloadLib;

    if (vm.examples.length) {
      vm.currentExample = vm.examples[0];
    }

    var searchObject = $location.search();
    if (searchObject.example) {
      angular.forEach(vm.examples, function(item) {
        if (item.name === searchObject.example) {
          vm.currentExample = item;
          return;
        }
      });
    }

    ////////////

    function getMeta() {
      var data = {
        title: vm.lib.name,
        keywords: vm.lib.keywords.slice(0),
        description: vm.lib.description
      };

      // prepare title
      var authornames = [];
      angular.forEach(vm.lib.authors, function(item) {
        if (!item.maintainer) {
          authornames.push(item.name);
        }
      });
      if (authornames.length) {
        data.title += ' by ' + authornames.join(', ');
      }

      var nametitles = [];
      angular.forEach(['frameworks', 'platforms'], function(what) {
        angular.forEach(vm.lib[what], function(item) {
          var _title = $filter('nameToTitle')(item, vm[what]);
          data.keywords.push(item);
          nametitles.push(_title);
        });
      });

      if (nametitles.length) {
        data.keywords = data.keywords.concat(nametitles);
        data.description += ' for ' + nametitles.join(', ');
      }

      data.keywords = data.keywords.join(', ');

      return data;
    }

    function getExamples() {
      var items = [];
      if (!vm.lib.examples.length) {
        return items;
      }
      angular.forEach(vm.lib.examples, function(url) {
        var urlParts = url.split('/');
        items.push({
          url: url,
          name: urlParts[urlParts.length - 1]
        });
      });
      return items;
    }

    function downloadLib() {
      var defer = dataService.getLibDlUrl(vm.lib.id).$promise;
      defer.then(function(data) {
        $window.location.href = (data.url + '?filename=' + [
          vm.lib.name, vm.lib.version.name, vm.lib.id
        ].join('_'));
      });
    }
  }

})();
