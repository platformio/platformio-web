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
      return $resource(siteConfig.apiURL + '/boards').query();
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
        'image': 'http://docs.platformio.org/en/stable/_images/platformio-demo-wiring.gif',
        'title': 'Blink Project',
        'icon': 'lightbulb-o'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/platformio-demo-platforms.gif',
        'title': 'Platform Manager',
        'icon': 'laptop'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/platformio-demo-lib.gif',
        'title': 'Library Manager',
        'icon': 'code'
      }];
    }

    function getIDEDemos() {
      return [{
        'image': 'http://docs.platformio.org/en/stable/_images/ide-cloud9-init-project.png',
        'title': 'Cloud9',
        'url': 'http://docs.platformio.org/en/stable/ide/cloud9.html'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/ide-codeanywhere-init-project.png',
        'title': 'Codeanywhere (Cloud)',
        'url': 'http://docs.platformio.org/en/stable/ide/codeanywhere.html'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/ide-eclipseche-demo.png',
        'title': 'Eclipse Che (Cloud)',
        'url': 'http://docs.platformio.org/en/stable/ide/eclipseche.html'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/ide-platformio-eclipse.png',
        'title': 'Eclipse',
        'url': 'http://docs.platformio.org/en/stable/ide/eclipse.html'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/ide-sublime-text-deviot.gif',
        'title': 'Sublime Text',
        'url': 'http://docs.platformio.org/en/stable/ide/sublimetext.html'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/ide-vs-platformio-newproject-8.png',
        'title': 'Visual Studio',
        'url': 'http://docs.platformio.org/en/stable/ide/visualstudio.html'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/ide-platformio-clion.png',
        'title': 'CLion',
        'url': 'http://docs.platformio.org/en/stable/ide/clion.html'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/ide-platformio-netbeans.png',
        'title': 'NetBeans',
        'url': 'http://docs.platformio.org/en/stable/ide/netbeans.html'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/ide-platformio-codeblocks.png',
        'title': 'CodeBlocks',
        'url': 'http://docs.platformio.org/en/stable/ide/codeblocks.html'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/ide-platformio-qtcreator-7.png',
        'title': 'Qt Creator',
        'url': 'http://docs.platformio.org/en/stable/ide/qtcreator.html'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/ide-platformio-vim.png',
        'title': 'Vim',
        'url': 'http://docs.platformio.org/en/stable/ide/vim.html'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/ide-platformio-emacs.png',
        'title': 'Emacs',
        'url': 'http://docs.platformio.org/en/stable/ide/emacs.html'
      }, {
        'image': 'http://docs.platformio.org/en/stable/_images/ide-atom-platformio.png',
        'title': 'Atom',
        'url': 'http://docs.platformio.org/en/stable/ide/atom.html'
      }];
    }

  }

})();
