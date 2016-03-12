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

from time import sleep
from subprocess import check_output, CalledProcessError
from urllib import unquote


class PhJSFailedException(Exception):
    pass


def application(env, start_response):
    status = "200 OK"
    response = ""

    qs = env.get("QUERY_STRING", None)
    if not qs or not qs.startswith("_escaped_fragment_="):
        status = "500 Internal Server Error"
    else:
        url = "http://platformio.org" + unquote(qs[19:])
        try:
            response = get_webcontent(url)
            if "404 Not Found" in response:
                status = "404 Not Found"
        except Exception:
            status = "500 Internal Server Error"

    start_response(status, [("Content-Type", "text/html"),
                            ("Content-Length", str(len(response)))])
    return response


def get_webcontent(url):
    retrynums = 0
    while retrynums < 5:
        try:
            response = check_output([
                "phantomjs", "--disk-cache=true", "--load-images=false",
                "crawler.js", url
            ])

            if "ng-view=" not in response:
                raise PhJSFailedException()

            return response
        except (CalledProcessError, PhJSFailedException):
            retrynums += 1
            sleep(retrynums * 1)

    raise Exception("Could not retrieve content from %s" % url)
