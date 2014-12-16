/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular.module('siteApp')
    .directive('addthisLib', addthisLib);

  function addthisLib($timeout) {
    var directive = {
      link: link,
      restrict: 'A',
      transclude: true,
      replace: true,
      scope: {
        lib: '='
      },
      template: '<div ng-transclude></div>',
    };
    return directive;

    function link($scope, element, attrs) {
      $timeout(function() {
        if (typeof addthis === 'undefined') {
          return;
        }

        var hashFrameworks = $scope.lib.frameworks.join(' #'),
          hashKeywords = $scope.lib.keywords.join(' #');

        if (hashFrameworks.length > 0) {
          hashFrameworks = '#' + hashFrameworks;
        }
        if (hashKeywords.length > 0) {
          hashKeywords = '#' + hashKeywords;
        }

        var configurationObject = {
            'data_track_clickback': false,
            'data_track_addressbar': false,
            'data_ga_property': 'UA-1768265-8',
            'data_ga_social': true
          },
          sharingObject = {
            url: ('http://platformio.ikravets.com/#!/lib/show/' +
              $scope.lib.id + '/' + $scope.lib.name),
            title: ($scope.lib.name + ' library' + (
              hashFrameworks ? ' for ' : '') + hashFrameworks),
            description: $scope.lib.description + ' ' + hashKeywords,
            templates: {
              twitter: '{{title}} {{url}} via @PlatformIOTool ' +
                hashKeywords
            },
            'url_transforms': {
              shorten: {
                twitter: 'bitly'
              }
            }
          };

        addthis.init();
        addthis.toolbox(element[0], configurationObject,
          sharingObject);
      });
    }
  }
})();
