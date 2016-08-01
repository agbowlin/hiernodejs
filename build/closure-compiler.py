#!/usr/bin/python

import httplib, urllib, sys

params = urllib.urlencode([
    ('code_url', sys.argv[1]),
    ('compilation_level', 'ADVANCED_OPTIMIZATIONS'),
    ('output_format', 'text'),
    ('output_info', 'compiled_code'),
  ])

headers = { "Content-type": "application/x-www-form-urlencoded" }
conn = httplib.HTTPConnection('closure-compiler.appspot.com')
conn.request('POST', '/compile', params, headers)
response = conn.getresponse()
data = response.read()
print data
conn.close()
