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
    vm.submitSearchForm = doSearch;
    vm.pageChanged = doSearch;

    if (searchObject.query.length) {
      vm.searchQuery = decodeURIComponent(searchObject.query);
    }

    ////////////

    function doSearch() {
      $location.search({
        query: encodeURIComponent(vm.searchQuery),
        page: vm.searchResult.page
      });
    }
  }

})();
