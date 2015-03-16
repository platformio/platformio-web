/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular.module('siteApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'viewhead',
    'angulartics',
    'angulartics.google.analytics',
    'hljs',
    'ngDisqus',
    'relativeDate',
    'ngTable'
  ])

  .constant('siteConfig', {
    apiURL: (parseInt(location.port) === 9000 ? 'http://localhost:8080' :
      'http://api.platformio.org')
  });

})();
