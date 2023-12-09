const mix = require('laravel-mix');
const esbuild = require('laravel-mix-esbuild');

mix.js('resources/js/app.js', 'public/js')
   .react()
   .sass('resources/sass/app.scss', 'public/css')
   .webpackConfig({
      plugins: [esbuild({ loader: { '.js': 'jsx' } })],
   });