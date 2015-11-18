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

  angular.module('siteApp')
    .filter('embeddedFormatter', embeddedFormatter);

  function embeddedFormatter() {
    return function(value, toFormat) {
      switch (toFormat) {
        case 'frequency':
          value = (value / 1000000) + ' MHz';
          break;

        case 'size':
          if (value % 1024 === 0) {
            value /= 1024;
          } else {
            value = Math.round(value / 1024 * 10) / 10;
          }
          value += ' Kb';
          break;
      }

      return value;
    };
  }

})();
