var elixir = require('laravel-elixir');
require('babel-plugin-syntax-jsx');

elixir.config.js.browserify.transformers
    .find(transformer => transformer.name === 'babelify')
    .options.presets.push(
        'syntax-jsx'
    );
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
        .babel('student-app.js')
        .version(['public/js/student-app.js', 'public/css/app.css']);
});