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
            url: ('http://platformio.org/lib/show/' +
              $scope.lib.id + '/' + $scope.lib.name),
            title: ($scope.lib.name + ' library' + (
              hashFrameworks ? ' for ' : '') + hashFrameworks),
            description: $scope.lib.description + ' ' + hashKeywords,
            templates: {
              twitter: '{{title}} {{url}} via @PlatformIO_Org ' +
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
