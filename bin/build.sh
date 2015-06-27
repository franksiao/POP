#!/bin/build
browserify public/js/home/main.js -t [envify --NODE_ENV production] | uglifyjs -cm > public/js/home/bundle.min.js