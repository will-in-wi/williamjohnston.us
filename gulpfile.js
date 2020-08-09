const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const csso = require('gulp-csso');
const postcss = require('gulp-postcss');
// const concat = require('gulp-concat');
const rename = require('gulp-rename');
// const sourcemaps = require('gulp-sourcemaps');


gulp.task('html', function () {
  return gulp.src('content/**/*.+(html|nj)')
    .pipe(nunjucksRender({
      path: ['templates']
    }))
    .pipe(gulp.dest('build'))
});

gulp.task('css', function () {
  return gulp.src(['src/styles.css'])
    // .pipe(sourcemaps.init())
    .pipe(postcss([
      require('tailwindcss'),
      require('autoprefixer'),
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/assets'))
});

gulp.task('files', function () {
  return gulp.src('assets/**/*')
    .pipe(gulp.dest('build/assets'))
});

gulp.task('static', function () {
  return gulp.src('static/*')
    .pipe(gulp.dest('build'))
});

// gulp.task('js', gulp.series(function () {
//   return gulp.src(['node_modules/tiny-slider/dist/tiny-slider.js', 'src/*.js'])
//     // .pipe(sourcemaps.init())
//     .pipe(concat('app.min.js'))
//     // .pipe(sourcemaps.write())
//     .pipe(gulp.dest('build/assets'))
// }));

gulp.task('htaccess', function () {
  return gulp.src('htaccess')
    .pipe(rename('.htaccess'))
    .pipe(gulp.dest('build'))
});

gulp.task('default', gulp.parallel([
  'html',
  'css',
  'files',
  // 'js',
  'static',
  'htaccess'
]));

gulp.task('watch', gulp.series('default', function () {
  gulp.watch('content/**/*', gulp.series('html'));
  gulp.watch('templates/**/*', gulp.series('html'));
  gulp.watch('src/**/*', gulp.series(
    'css' //,
    // 'js'
  ));
  gulp.watch('assets/**/*', gulp.series('files'));
  gulp.watch('static/**/*', gulp.series('static'));
}));

gulp.task('serve', gulp.parallel('watch', function () {
  const connect = require('connect'),
    serveStatic = require('serve-static'),
    serveIndex = require('serve-index');

  const app = connect()
    .use(serveStatic('build'))
    .use(serveIndex('build'));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
}));
