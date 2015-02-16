module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        concat: {
            options: {
                separator: '\n;'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/mud.js'
            }
        },
        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },
            my_target: {
                files: {
                    'dist/mud.min.js': ['dist/mud.js']
                }
            }
        }
    });

    // Load required modules
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Task definitions
    grunt.registerTask('default', ['build']);
    grunt.registerTask('tests', ['karma']);
    grunt.registerTask('build', ['concat','uglify']);
};
