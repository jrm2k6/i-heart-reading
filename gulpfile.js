var elixir = require('laravel-elixir');
require('babel-plugin-syntax-jsx');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss')
        .sass('static/landing.scss')
        .sass('static/terms.scss')
        .browserify('i-heart-reading.js')
        .browserify('i-heart-reading-teacher.js')
        .browserify('i-heart-reading-signup.js')
        .browserify('i-heart-reading-admin.js')
        .version([
            'public/js/i-heart-reading.js',
            'public/js/i-heart-reading-teacher.js',
            'public/js/i-heart-reading-signup.js',
            'public/js/i-heart-reading-admin.js',
            'public/css/app.css',
            'public/css/landing.css',
            'public/css/terms.css'
        ])
        .copy('public/images', 'public/build/css/images');
});
