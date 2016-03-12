# Copyright 2014-2016 Ivan Kravets <me@ikravets.com>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import json
from os.path import abspath
from time import sleep
try:
    from urllib2 import urlopen
except ImportError:
    from urllib.request import urlopen


PLATFORMIOAPILIB_URL = "http://api.platformio.org/lib/search"
SITEMAPXML_PATH = abspath("../htdocs/sitemap.xml")


class PIOLibsGenerator(object):

    def __init__(self):
        self._data = None
        self._paginator()

    def _paginator(self):
        sleep(0.3)  # avoid PlatformIO API Limit 503

        page = 1
        if self._data:
            page = self._data['page']
            if page * self._data['perpage'] >= self._data['total']:
                raise StopIteration()
            page += 1

        self._data = json.load(urlopen(
            "%s?page=%d" % (PLATFORMIOAPILIB_URL, page))
        )
        self._data['items'] = iter(self._data['items'])

    def __iter__(self):
        return self

    def __next__(self):
        return self.next()

    def next(self):
        if self._data:
            try:
                return next(self._data['items'])
            except StopIteration:
                self._paginator()
                return next(self._data['items'])
        else:
            raise StopIteration()


class SiteMapBuilder(object):

    def __init__(self, path):
        self.path = path
        self._fp = None

    def __enter__(self):
        self._fp = open(self.path, "w")
        self._fp.write("""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
""")
        return self

    def __exit__(self, type, value, traceback):
        self._fp.write("</urlset>")
        self._fp.close()

    def add_url(self, **kwargs):
        self._fp.write("  <url>\n")
        for name, value in kwargs.items():
            self._fp.write("    <%s>%s</%s>\n" % (name, value, name))
        self._fp.write("  </url>\n")


def main():
    with SiteMapBuilder(SITEMAPXML_PATH) as b:
        # main
        b.add_url(
            loc="http://platformio.org",
            changefreq="weekly"
        )
        b.add_url(
            loc="http://platformio.org/get-started",
            changefreq="weekly"
        )
        b.add_url(
            loc="http://platformio.org/platformio-ide",
            changefreq="weekly"
        )
        b.add_url(
            loc="http://platformio.org/contact",
            changefreq="weekly"
        )
        b.add_url(
            loc="http://platformio.org/platforms",
            changefreq="weekly"
        )
        b.add_url(
            loc="http://platformio.org/frameworks",
            changefreq="weekly"
        )
        b.add_url(
            loc="http://platformio.org/boards",
            changefreq="weekly"
        )
        b.add_url(
            loc="http://platformio.org/lib",
            changefreq="daily"
        )
        b.add_url(
            loc="http://platformio.org/lib/examples",
            changefreq="daily"
        )

        # libs
        for item in PIOLibsGenerator():
            b.add_url(
                loc=("http://platformio.org/lib/show/%d/%s" %
                     (item['id'], item['name'])),
                lastmod=item['updated'],
                changefreq="weekly")


if __name__ == "__main__":
    main()
