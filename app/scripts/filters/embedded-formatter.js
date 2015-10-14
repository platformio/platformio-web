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
