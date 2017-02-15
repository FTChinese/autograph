const gulp = require('gulp');
const cssnext = require('postcss-cssnext');
const $ = require('gulp-load-plugins')();

gulp.task('styles', function styles() {
  const DEST = 'public/styles';

  return gulp.src('client/main.scss')
    .pipe($.changed(DEST))
    .pipe($.plumber())
    .pipe($.sourcemaps.init({loadMaps:true}))
    .pipe($.sass({
      outputStyle: 'expanded',
      precision: 10,
    }).on('error', $.sass.logError))
    .pipe($.postcss([
      cssnext({
        features: {
          colorRgba: false
        }
      })
    ]))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(DEST));
});

gulp.task('serve', gulp.parallel('styles', () => {
    console.log(`Watching changes...`);
  gulp.watch('client/**/*.scss', gulp.parallel('styles'));
}));