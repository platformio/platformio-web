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
    .filter('boardDebugInfo', boardDebugInfo);

  function boardDebugInfo() {
    return function(debug) {
      var html = '';
      if (debug.onboard.length) {
        html += '<p><b>ON-BOARD:</b> ' + debug.onboard.join(', ') + '</p>';
      }
      if (debug.external.length) {
        html += '<p><b>EXTERNAL:</b> ' + debug.external.join(', ') + '</p>';
      }
      return html;
    };
  }

})();
