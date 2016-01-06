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
    .controller('LibExamplesController', LibExamplesController);

  function LibExamplesController($location, $http, $templateCache, $q,
    dataService, siteUtils, searchResult) {
    var vm = this;
    var searchObject = $location.search();

    vm.siteUtils = siteUtils;
    vm.frameworks = dataService.getFrameworks();
    vm.platforms = dataService.getPlatforms();
    vm.searchQuery = '';
    vm.searchResult = searchResult;
    vm.meta = getMeta();
    vm.submitSearchForm = doSearch;
    vm.pageChanged = doSearch;
    vm.searchPath = '#!/lib/examples';
    vm.searchInputPlaceholder = 'Search for example ...';

    if (searchObject.query && searchObject.query.length) {
      vm.searchQuery = decodeURIComponent(searchObject.query);
    }

    angular.forEach(vm.searchResult.items, function(item) {
      codePreloader(item);
    });

    ////////////

    function getMeta() {
      var data = {
        'description': [],
        'keywords': []
      };

      angular.forEach(vm.searchResult.items, function(item) {
        data.description = data.description.concat([item.lib.name,
          item.name
        ]);
        data.keywords = data.keywords.concat(item.name.split(
          /[\-\_\.]/));
      });

      data.description = data.description.filter(filterUniqueValues);
      data.keywords = data.keywords.filter(filterUniqueValues);

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

    function codePreloader(item) {
      var maxLines = 20;
      var templateCachePromise, d;

      item.showFullCode = false;
      item.shortCode = 'Loading...';

      templateCachePromise = $templateCache.get(item.url);
      if (!templateCachePromise) {
        d = $q.defer();
        $http.get(item.url, {
          cache: $templateCache,
          transformResponse: function(data, headersGetter) {
            return data;
          }
        }).success(function(code) {
          d.resolve(code);
        }).error(function(error) {
          console.log(error);
          d.resolve('Can\'t load an example code');
        });
        templateCachePromise = d.promise;
      }

      $q.when(templateCachePromise)
        .then(function(code) {
          if (angular.isArray(code)) {
            code = code[1];
          } else if (angular.isObject(code)) {
            code = code.data;
          }

          code = code.replace(
            /(?:\s*\/\*[\s\S]+?\*\/\s*|\s*\/\/[\s\S]+?$\s)/m, '');
          item.shortCode = code.split('\n', maxLines).splice(0,
            maxLines).join(
            '\n');
        });
    }

    function filterUniqueValues(value, index, self) {
      return self.indexOf(value) === index;
    }
  }
})();
