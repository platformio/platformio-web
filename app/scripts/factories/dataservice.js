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

  angular
    .module('siteApp')
    .factory('dataService', dataService);

  function dataService($resource, siteConfig) {
    return {
      getLibSearchResult: getLibSearchResult,
      getLibExamples: getLibExamples,
      getLibInfo: getLibInfo,
      getLibDlUrl: getLibDlUrl,
      getLibStats: getLibStats,
      getPioStats: getPioStats,
      getFrameworks: getFrameworks,
      getPackages: getPackages,
      getPlatforms: getPlatforms,
      getBoards: getBoards,
      getCLIDemos: getCLIDemos,
      getIDEDemos: getIDEDemos
    };

    function getLibSearchResult(data) {
      return $resource(siteConfig.apiURL + '/v2/lib/search', data).get();
    }

    function getLibExamples(data) {
      return $resource(siteConfig.apiURL + '/lib/examples', data).get();
    }

    function getLibInfo(id) {
      return $resource(siteConfig.apiURL + '/lib/info/' + id).get();
    }

    function getLibDlUrl(id) {
      return $resource(
        siteConfig.apiURL + '/lib/download/' + id).get();
    }

    function getLibStats() {
      return $resource(siteConfig.apiURL + '/lib/stats').get();
    }

    function getPioStats() {
      return $resource(siteConfig.apiURL + '/stats').get();
    }

    function getBoards() {
      var p = $resource(siteConfig.apiURL + '/boards').query().$promise;
      return p.then(function(boards) {
        angular.forEach(boards, function(board) {
          if (!board.debug || !board.debug.tools) {
            return;
          }
          var filters = [];
          var onboard = [];
          var external = [];
          angular.forEach(board.debug.tools, function(data, name) {
            if ('onboard' in data && data.onboard) {
              onboard.push(name);
            } else {
              external.push(name)
            }
          });
          if (onboard.length) {
            filters.push('onboard');
          }
          if (external.length) {
            filters.push('external');
          }
          board.debug = {
            'onboard': onboard,
            'external': external,
            'filters': filters
          };
        });
        return boards;
      });
    }

    function getFrameworks() {
      return $resource(siteConfig.apiURL + '/frameworks').query();
    }

    function getPlatforms() {
      return $resource(siteConfig.apiURL + '/platforms').query();
    }

    function getPackages() {
      return $resource(siteConfig.apiURL + '/packages').get();
    }

    function getCLIDemos() {
      return [{
        'image': '/images/demo/platformio-demo-wiring.gif',
        'title': 'Blink Project',
        'icon': 'lightbulb-o'
      }, {
        'image': '/images/demo/platformio-demo-platforms.gif',
        'title': 'Platform Manager',
        'icon': 'laptop'
      }, {
        'image': '/images/demo/platformio-demo-lib.gif',
        'title': 'Library Manager',
        'icon': 'code'
      }];
    }

    function getIDEDemos() {
      return [{
        'image': '/images/demo/ide/platformio-ide-vscode.png',
        'title': 'VSCode',
        'url': 'https://docs.platformio.org/page/ide/vscode.html'
      }, {
        'image': '/images/demo/ide/ide-atom-platformio.png',
        'title': 'Atom',
        'url': 'https://docs.platformio.org/page/ide/atom.html'
      }, {
        'image': '/images/demo/ide/ide-cloud9-init-project.png',
        'title': 'Cloud9',
        'url': 'https://docs.platformio.org/page/ide/cloud9.html'
      }, {
        'image': '/images/demo/ide/ide-codeanywhere-init-project.png',
        'title': 'Codeanywhere (Cloud)',
        'url': 'https://docs.platformio.org/page/ide/codeanywhere.html'
      }, {
        'image': '/images/demo/ide/ide-eclipseche-demo.png',
        'title': 'Eclipse Che (Cloud)',
        'url': 'https://docs.platformio.org/page/ide/eclipseche.html'
      }, {
        'image': '/images/demo/ide/ide-platformio-clion.png',
        'title': 'CLion',
        'url': 'https://docs.platformio.org/page/ide/clion.html'
      }, {
        'image': '/images/demo/ide/ide-platformio-codeblocks.png',
        'title': 'CodeBlocks',
        'url': 'https://docs.platformio.org/page/ide/codeblocks.html'
      }, {
        'image': '/images/demo/ide/ide-platformio-eclipse.png',
        'title': 'Eclipse',
        'url': 'https://docs.platformio.org/page/ide/eclipse.html'
      }, {
        'image': '/images/demo/ide/ide-platformio-emacs.png',
        'title': 'Emacs',
        'url': 'https://docs.platformio.org/page/ide/emacs.html'
      }, {
        'image': '/images/demo/ide/ide-platformio-netbeans.png',
        'title': 'NetBeans',
        'url': 'https://docs.platformio.org/page/ide/netbeans.html'
      }, {
        'image': '/images/demo/ide/ide-qtcreator-7.png',
        'title': 'Qt Creator',
        'url': 'https://docs.platformio.org/page/ide/qtcreator.html'
      }, {
        'image': '/images/demo/ide/ide-sublime-text-deviot.gif',
        'title': 'Sublime Text',
        'url': 'https://docs.platformio.org/page/ide/sublimetext.html'
      }, {
        'image': '/images/demo/ide/ide-platformio-vim.png',
        'title': 'Vim',
        'url': 'https://docs.platformio.org/page/ide/vim.html'
      }, {
        'image': '/images/demo/ide/ide-visualstudio-newproject-8.png',
        'title': 'Visual Studio',
        'url': 'https://docs.platformio.org/page/ide/visualstudio.html'
      }];
    }

  }

})();
