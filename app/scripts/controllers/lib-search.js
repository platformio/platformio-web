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
    .controller('LibSearchController', LibSearchController);

  function LibSearchController($location, siteUtils, searchResult,
    frameworksList, platformsList) {
    var vm = this;
    var searchObject = $location.search();

    vm.siteUtils = siteUtils;
    vm.frameworks = frameworksList;
    vm.platforms = platformsList;
    vm.searchQuery = '';
    vm.searchResult = searchResult;
    vm.meta = getMeta();
    vm.submitSearchForm = doSearch;
    vm.pageChanged = doSearch;
    vm.searchPath = '/lib/search';
    vm.searchInputPlaceholder = 'Search for library ...';

    if (searchObject.query && searchObject.query.length) {
      vm.searchQuery = decodeURIComponent(searchObject.query);
    }

    ////////////

    function getMeta() {
      var data = {
        'description': [],
        'keywords': []
      };

      angular.forEach(vm.searchResult.items, function(item) {
        data.description.push(item.name);
        data.keywords = data.keywords.concat(item.name.split(
          '-'));
        // frameworks & platforms
        angular.forEach(['frameworks', 'platforms'], function(what) {
          angular.forEach(item[what], function(item2) {
            data.description.push(item2.title);
            data.keywords = data.keywords.concat([item2.name, item2.title]);
          });
        });
      });

      angular.forEach(['description', 'keywords'], function(what) {
        data[what] = data[what].filter(

          function(value, index, self) {
            return self.indexOf(value) === index;
          }
        );
      });

      // join to string
      data.description = data.description.join(', ');
      data.keywords = data.keywords.join(', ');

      return data;
    }

    function doSearch() {
      $location.search({
        query: encodeURIComponent(vm.searchQuery),
        page: vm.searchResult.page
      });
    }
  }

})();
