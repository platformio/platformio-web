/**
 * Copyright 2014-2016 Ivan Kravets <me@ikravets.com>
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
    .controller('LibShowController', LibShowController);

  function LibShowController($window, $location, $filter, $routeParams,
    $analytics, dataService, libInfo, frameworksList, platformsList) {
    var vm = this;
    var tabs = ['examples', 'installation', 'manifest', 'discussion'];

    vm.frameworks = frameworksList;
    vm.platforms = platformsList;
    vm.lib = libInfo;
    vm.meta = getMeta();
    vm.examples = getExamples();
    vm.activeTab = getActiveTab();
    vm.currentExample = {};
    vm.downloadLib = downloadLib;
    vm.editLibraryConf = editLibraryConf;
    vm.changeTab = changeTab;

    // redirect to discussion tab
    if ($routeParams.activeTab !== 'discussion' &&
      $location.hash().indexOf('comment-') === 0) {
      $location.url(
        '/lib/show/' + $routeParams.libId +
        '/' + $routeParams.libName +
        '/discussion#' + $location.hash());
    }

    if (vm.examples.length) {
      vm.currentExample = vm.examples[0];
    }
    var searchObject = $location.search();
    if (searchObject.file) {
      angular.forEach(vm.examples, function(item) {
        if (item.name === searchObject.file) {
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
          nametitles.push($filter('nameToTitle')(item, vm[what]));
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
        label: '#' + vm.lib.id + ' ' + vm.lib.name
      });

      var defer = dataService.getLibDlUrl(vm.lib.id).$promise;
      defer.then(function(data) {
        $window.location.href = (data.url + '?filename=' + [
          vm.lib.name.replace(/[\s]+/g, '-'), vm.lib.version.name, vm.lib.id
        ].join('_'));
      });
    }

    function editLibraryConf(confUrl) {
      $analytics.eventTrack('Edit', {
        category: 'Library',
        label: '#' + vm.lib.id + ' ' + vm.lib.name
      });

      if (confUrl.indexOf('https://raw.githubusercontent.com') === 0) {
        var matches = confUrl.match(
          new RegExp('content\.com/([^/]+/[^/]+)/(.+)$'));
        if (matches) {
          $window.location.href = (
            'https://github.com/' + matches[1] + '/blob/' + matches[2]);
          return;
        }
      }

      $window.location.href = confUrl;
    }

    function changeTab(name) {
      if (vm.activeTab === tabs.indexOf(name)) {
        return;
      }
      $location.url(
        '/lib/show/' + $routeParams.libId +
        '/' + $routeParams.libName +
        '/' + name);
    }

    function getActiveTab() {
      if (!$routeParams.hasOwnProperty('activeTab')) {
        return 0;
      }
      var tabIndex = tabs.indexOf($routeParams.activeTab);
      return tabIndex !== -1 ? tabIndex : 0;
    }
  }

})();
