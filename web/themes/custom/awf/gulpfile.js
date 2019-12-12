'use strict';

// modules
var gulp = require('gulp');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var del = require('del');
var gulpif = require('gulp-if');
var webpack = require('webpack');
var assemble = require('fabricator-assemble');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var csso = require('gulp-csso');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var svgSprite = require('gulp-svg-sprite');
var sasslint = require('gulp-sass-lint');

// configuration
var config = {
  dev: gutil.env.dev,
  src: {
    scripts: {
      'js': './src/js/*.js',
      'fabricator/js': './src/styleguide/fabricator/scripts/fabricator.js'
    },
    styles: {
      fabricator: './src/styleguide/fabricator/styles/fabricator.scss',
      chief: './src/sass/styles.scss'
    },
    images: './src/images/**/*',
    svg: './src/svg/*.svg',
    fonts: './src/fonts/**/*'
  },
  dest: 'dist'
};

// webpack
var webpackConfig = require('./webpack.config')(config);
var webpackCompiler = webpack(webpackConfig);

// clean
gulp.task('clean', function () {
  return del([config.dest]);
});

// styles
gulp.task('styles:fabricator', function () {
  gulp.src(config.src.styles.fabricator)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix({
      browsers: ['last 2 versions'],
      grid: false
    }))
    .pipe(gulpif(!config.dev, csso()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest + '/fabricator/css'))
    .pipe(gulpif(config.dev, reload({stream: true})));
});

// Compile sass
gulp.task('styles:chief', function () {
  gulp.src(config.src.styles.chief)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [
        'node_modules/breakpoint-sass/stylesheets',
        'node_modules/standardize-sass/stylesheet'
      ]
    }).on('error', sass.logError))
    .pipe(prefix({
      browsers: ['last 2 versions'],
      grid: false
    }))
    .pipe(gulpif(!config.dev, csso()))
    .pipe(gulpif(config.dev, sourcemaps.write()))
    .pipe(gulp.dest(config.dest + '/css'))
    .pipe(gulpif(config.dev, reload({stream: true})));
});

gulp.task('styles', ['styles:fabricator', 'styles:chief']);

gulp.task('lint', function(){
  return gulp.src('src/sass/**/*.scss')
    .pipe(sasslint({
      files: {ignore: 'src/sass/_print.scss'},
      configFile: '.sass-lint.yml',
    }))
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError())
});

// scripts
gulp.task('scripts', function (done) {
  webpackCompiler.run(function (error, result) {
    if (error) {
      gutil.log(gutil.colors.red(error));
    }
    result = result.toJson();
    if (result.errors.length) {
      result.errors.forEach(function (error) {
        gutil.log(gutil.colors.red(error));
      });
    }
    done();
  });
});

// images
gulp.task('images', function () {
  gulp.src(config.src.images)
    .pipe(imagemin())
    .pipe(gulp.dest(config.dest + '/images'));
});

// generates an svg stack file
// for full configuration options see https://github.com/jkphl/svg-sprite/blob/master/docs/configuration.md
gulp.task('svg', function () {
  gulp.src(config.src.svg)
    .pipe(svgSprite({
      dest: '.',
      shape: {
        dimension: {
          maxWidth: 32, // scale down to 32 if larger
          maxHeight: 32
        }
      },
      mode: {
        stack: {
          dest: 'svg',
          sprite: 'svg-stack'
        }
      }
    }))
    .pipe(gulp.dest(config.dest));
});

// fonts
gulp.task('fonts', function () {
  gulp.src(config.src.fonts)
    .pipe(gulp.dest(config.dest + '/fonts'));
});

// assemble
gulp.task('assemble', function (done) {
  assemble({
    layout: 'default',
    layouts: ['src/styleguide/fabricator/templates/*'],
    layoutIncludes: ['src/styleguide/fabricator/templates/includes/*'],
    views: ['src/styleguide/fabricator/templates/layouts/*', 'src/styleguide/materials/pages/*'],
    materials: ['src/styleguide/materials/**/*', '!src/styleguide/materials/+(pages)/**'],
    data: ['src/styleguide/data/**/*.{json,yml}'],
    docs: ['src/styleguide/docs/**/*.md'],
    keys: {
      materials: 'materials',
      views: 'layouts',
      docs: 'docs'
    },
    logErrors: config.dev,
    dest: config.dest
  });
  done();
});


// server
gulp.task('serve', function () {

  browserSync({
    // Add your vhost as the proxy for local development
    // Avoid using .local address because it's super slow to load
    // Disable caching from your browser to see the display update
    // Uncomment line below to work on your site install
    // proxy: 'toolkit.dev',

    // Uncomment lines below to work on the styleguide directly
    server: {
      baseDir: config.dest
    },

    // Uncomment lines below to work from multiple browsers
    // browser: ['google chrome', 'firefox', 'safari'],

    logPrefix: 'CHIEF'
  });

  /**
   * Because webpackCompiler.watch() isn't being used
   * manually remove the changed file path from the cache
   */
  function webpackCache(e) {
    var keys = Object.keys(webpackConfig.cache);
    var key, matchedKey;
    for (var keyIndex = 0; keyIndex < keys.length; keyIndex++) {
      key = keys[keyIndex];
      if (key.indexOf(e.path) !== -1) {
        matchedKey = key;
        break;
      }
    }
    if (matchedKey) {
      delete webpackConfig.cache[matchedKey];
    }
  }

  gulp.task('assemble:watch', ['assemble'], reload);
  gulp.watch('src/styleguide/**/*.{html,md,json,yml}', ['assemble:watch']);

  gulp.task('styles:fabricator:watch', ['styles:fabricator']);
  gulp.watch('src/styleguide/fabricator/styles/**/*.scss', ['styles:fabricator:watch']);

  gulp.task('styles:chief:watch', ['styles:chief']);
  gulp.watch('src/sass/**/*.scss', ['styles:chief:watch']);

  gulp.task('scripts:watch', ['scripts'], reload);
  gulp.watch('src/styleguide/fabricator/scripts/**/*.js', ['scripts:watch']).on('change', webpackCache);
  gulp.watch('src/js/**/*.js', ['scripts:watch']).on('change', webpackCache);

  gulp.task('images:watch', ['images'], reload);
  gulp.watch(config.src.images, ['images:watch']);

  gulp.task('fonts:watch', ['fonts'], reload);
  gulp.watch(config.src.fonts, ['fonts:watch']);
});


// default build task
gulp.task('default', ['clean'], function () {

  // define build tasks
  var tasks = [
    'svg',
    'styles',
    'scripts',
    'images',
    'fonts',
    'assemble'
  ];

  // run build
  runSequence(tasks, function () {
    if (config.dev) {
      gulp.start('serve');
    }
  });

});
