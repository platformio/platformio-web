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

  angular
    .module('siteApp')
    .factory('siteUtils', siteUtils);

  function siteUtils($uibModal) {
    return {
      showSearchExamples: showSearchExamples,
      osType: getOSType()
    };

    function showSearchExamples(searchPath) {
      $uibModal.open({
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

    function getOSType() {
      if (navigator.appVersion.indexOf('Macintosh') !== -1) {
        return 'Macintosh';
      } else if (navigator.appVersion.indexOf('Windows') !== -1) {
        return 'Windows';
      } else if (navigator.appVersion.indexOf('Linux') !== -1) {
        return 'Linux';
      }
      return '';
    }
  }

})();
