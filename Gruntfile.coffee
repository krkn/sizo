"use strict"

module.exports = ( grunt ) ->

    grunt.loadNpmTasks "grunt-mocha-cli"

    grunt.initConfig
        mochacli:
            options:
                require: [ "should" ]
                reporter: "spec"
                "check-leaks": yes
                "inline-diffs": yes
            tests:
                src: "test/runner.js"

    grunt.registerTask "test", [
        "mochacli"
    ]
