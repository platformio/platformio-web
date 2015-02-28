/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular.module('siteApp')
    .controller('LibSearchController', LibSearchController);

  function LibSearchController($location, $filter, dataService, siteUtils,
    searchResult) {
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
    vm.searchPath = '#!/lib/search';
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
            var _name = $filter('typeToName')(item2, vm[
              what]);
            data.description.push(_name);
            data.keywords = data.keywords.concat([item2,
              _name
            ]);
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
