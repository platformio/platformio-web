/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular.module('siteApp')
    .filter('nameToTitle', nameToTitle);

  function nameToTitle() {
    return function(name, data) {
      var title = name;
      angular.forEach(data, function(item) {
        if ('name' in item && 'title' in item && item.name === name) {
          title = item.title;
        }
      });
      return title;
    };
  }

})();
