/**
 * Copyright 2014-2015 Ivan Kravets <me@ikravets.com>
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

  angular
    .module('siteApp')
    .factory('siteUtils', siteUtils);

  function siteUtils($modal) {
    return {
      showSearchExamples: showSearchExamples,
      showDemo: showDemo
    };

    function showSearchExamples(searchPath) {
      $modal.open({
        templateUrl: 'views/lib_search_examples.html',
        controller: 'LibModalSEController',
        controllerAs: 'vm',
        size: 'lg',
        resolve: {
          searchPath: function() {
            return searchPath;
          }
        }
      });
    }

    function showDemo() {
      $modal.open({
        templateUrl: 'views/demo_modal.html',
        controller: 'DemoModalController',
        controllerAs: 'vm',
        size: 'piodemo',
      });
    }
  }

})();
