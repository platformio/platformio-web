/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular.module('siteApp')
    .controller('LibShowController', LibShowController);

  function LibShowController($window, $location, $filter, $analytics,
    dataService, libInfo, frameworksList, platformsList) {
    var vm = this;

    vm.frameworks = frameworksList;
    vm.platforms = platformsList;
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
        authornames.push(item.name);
      });
      if (authornames.length) {
        data.title += ' by ' + authornames.join(', ');
      }

      var nametitles = [];
      angular.forEach(['frameworks', 'platforms'], function(what) {
        angular.forEach(vm.lib[what], function(item) {
          var _name = $filter('typeToName')(item, vm[what]);
          nametitles.push(_name);
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
      $analytics.eventTrack('Download', {
        category: 'Library',
        label: '#' + vm.lib.id + ' ' +  vm.lib.name
      });

      var defer = dataService.getLibDlUrl(vm.lib.id).$promise;
      defer.then(function(data) {
        $window.location.href = (data.url + '?filename=' + [
          vm.lib.name, vm.lib.version.name, vm.lib.id
        ].join('_'));
      });
    }
  }

})();
