module.exports = function(grunt) {
  require('jit-grunt')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concurrent: {
        target: {
            tasks: ['watch','nodemon'],
            options: {
                logConcurrentOutput: true
            }
        }
    },
    watch: {
      scripts: {
        files: ['public/js/**/*', '!public/js/home/bundle.js'],
        tasks: ['browserify'],
        options: {
          spawn: false
        }
      },
      styles: {
        files: ['public/styles/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    },
    browserify: {
      dist: {
        options: {
          browserifyOptions: {
            transform: [[ 'reactify', {'es6': true} ]],
            debug: true
          }
        },
        files: {
          'public/js/home/bundle.js': ['public/js/home/main.js']
        }
      }
    },
    nodemon: {
      dev: {
        script: 'index.js',
        delayTime: 1
      }
    },
    less: {
      development: {
        options: {
          compress: false,
          sourceMap: false,
          sourceMapFilename: "main.css.map",
          yuicompress: false,
          optimization: 2
        },
        files: {
          "public/styles/main.css": "public/styles/main.less" // destination file and source file
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.registerTask('default', ['concurrent:target']);
};