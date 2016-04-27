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
        .browserify('i-heart-reading.js')
        .browserify('i-heart-reading-teacher.js')
        .version(['public/js/i-heart-reading.js', 'public/js/i-heart-reading-teacher.js', 'public/css/app.css']);
});