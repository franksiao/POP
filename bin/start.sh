#!/bin/start
watchify -o public/js/home/bundle.js -v -d public/js/home/main.js &
nodemon index.js