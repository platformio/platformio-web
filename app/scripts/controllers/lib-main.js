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
    .controller('LibMainController', LibMainController);

  function LibMainController($location, libStats) {
    var vm = this;

    vm.submitSearchForm = submitSearchForm;
    vm.searchQuery = '';
    vm.stats = libStats;
    vm.searchPath = '/lib/search';
    vm.searchInputPlaceholder = 'Search for library ...';

    ////////////

    function submitSearchForm() {
      $location.url('/lib/search?query=' + encodeURIComponent(vm.searchQuery));
    }
  }

})();
