/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
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
          if (value < 1024) {
            value /= 1024;
          } else {
            value = Math.ceil(value / 1024);
            var stop = false;
            angular.forEach([64, 32, 16, 8, 4, 2, 1], function(b) {
              if (!stop && b < value) {
                value = Math.ceil(value / b) * b;
                stop = true;
              }
            });
          }
          value += ' Kb';
          break;
      }

      return value;
    };
  }

})();
