/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

var args = require('system').args;
if (args.length !== 2) {
  phantom.exit();
}

var page = require('webpage').create();
page.settings.userAgent = 'PlatformIO Escaped Fragment Crawler / PhantomJS';
page.open(args[1], function() {
  console.log(page.content);
  phantom.exit();
});
