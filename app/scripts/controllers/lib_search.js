/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular.module('siteApp')
    .controller('LibSearchController', LibSearchController);

  function LibSearchController($location, searchResult) {
    var vm = this;
    var searchObject = $location.search();

    vm.searchQuery = '';
    vm.searchResult = searchResult;
    vm.seo = prepareSEOData();
    vm.submitSearchForm = doSearch;
    vm.pageChanged = doSearch;

    if (searchObject.query && searchObject.query.length) {
      vm.searchQuery = decodeURIComponent(searchObject.query);
    }

    ////////////

    function doSearch() {
      $location.search({
        query: encodeURIComponent(vm.searchQuery),
        page: vm.searchResult.page
      });
    }

    function prepareSEOData() {
      var data = {
        'description': [],
        'keywords': []
      };

      angular.forEach(vm.searchResult.items, function(item) {
        data.description.push(item.name);
        data.keywords = data.keywords.concat(item.name.split(
          '-'));
      });

      data.keywords = data.keywords.filter(
        function(value, index, self) {
          return self.indexOf(value) === index;
        }
      );

      // join to string
      data.description = data.description.join(', ');
      data.keywords = data.keywords.join(', ');

      return data;
    }
  }

})();
