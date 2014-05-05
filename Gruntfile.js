module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'lib/*.js',
                'bin/jsjsdoc',
            ],
            options: {
            },
        },
        watch: {
            main: {
                options: {
                    spawn: false
                },
                files: ['./**/*.js'],
                tasks: ['all']
            }
        },
        
        mochaTest: {
            options: {
                reporter: 'spec',
                clearRequireCache: true
            },
            test: {
                src: ['test/*.js']
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');    

    grunt.registerTask('all', ['jshint', 'mochaTest']);
    grunt.registerTask('default', ['all', 'watch']);

};

