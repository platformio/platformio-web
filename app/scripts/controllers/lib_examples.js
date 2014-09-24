/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular.module('siteApp')
    .controller('LibExamplesController', LibExamplesController);

  function LibExamplesController($location, $http, $templateCache, $q,
    searchResult) {
    var vm = this;
    var searchObject = $location.search();

    vm.searchQuery = '';
    vm.searchResult = searchResult;
    vm.submitSearchForm = doSearch;
    vm.pageChanged = doSearch;

    if (searchObject.query && searchObject.query.length) {
      vm.searchQuery = decodeURIComponent(searchObject.query);
    }

    angular.forEach(vm.searchResult.items, function(item) {
      codePreloader(item);
    });

    ////////////

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
          item.shortCode = code.split('\n', maxLines).splice(0, maxLines).join(
            '\n');
        });
    }
  }
})();
