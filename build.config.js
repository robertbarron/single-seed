/**
* This file/module contains all configuration for the build process.
*/
module.exports = {
/**
* The `build_dir` folder is where our projects are compiled during
* development and the `compile_dir` folder is where our app resides once it's
* completely built.
*/
    build_dir: 'build',
    compile_dir: 'bin',
    sass_cache: '.sass_cache',

/**
* Collection of file patterns that refer to our app code. These file paths are used 
* in the configuration of build tasks. `js` is all project javascript. `tpl` contains
* our template files. `html` is just our main HTML file. `sass` is our main stylesheet
*/
    app_files: {
        js: [ 
            'src/**/*.js',
            '!src/assets/**/*.js'
        ],
        tpl: [ 
            'src/app/templates/**/*.tpl' 
        ],

        html: [ 
            'src/index.html' 
        ],
        sass: 'src/sass/main.scss'
    },

/**
* Needs to add vendor files manually. Needs to work on automation for this part.
*/
    vendor_files: {
        js: [
            'vendor/jquery/dist/jquery.js',
            'vendor/bootstrap/dist/js/bootstrap.js',
            'vendor/modernizr/modernizr.js'
        ],
        css: [
            'vendor/bootstrap/dist/css/bootstrap.css'
        ],
        assets: [
        ]
    }
};