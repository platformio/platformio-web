/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular.module('siteApp')
    .filter('typeToName', typeToName);

  function typeToName() {
    return function(type, data) {
      var name = type;
      angular.forEach(data, function(item) {
        if ('type' in item && 'name' in item && item.type === type) {
          name = item.name;
        }
      });
      return name;
    };
  }

})();
