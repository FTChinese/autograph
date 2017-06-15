const gulp = require('gulp');
const postcss = require('postcss');
const cssnext = require('postcss-cssnext');
const cssvariables = require('postcss-css-variables');
// const $ = require('gulp-load-plugins')();

gulp.task('css', () => {
  return gulp.src('client/char-styles.css')
    .pipe(postcss([
      cssvariables()
    ]))
    .pipe(gulp.dest('./tmp'));
})

// gulp.task('styles', function styles() {
//   const DEST = 'public/styles';

//   return gulp.src('client/main.scss')
//     .pipe($.changed(DEST))
//     .pipe($.plumber())
//     .pipe($.sourcemaps.init({loadMaps:true}))
//     .pipe($.sass({
//       outputStyle: 'expanded',
//       precision: 10,
//     }).on('error', $.sass.logError))
//     .pipe($.postcss([
//       cssnext({
//         features: {
//           colorRgba: false
//         }
//       })
//     ]))
//     .pipe($.sourcemaps.write('./'))
//     .pipe(gulp.dest(DEST));
// });

// gulp.task('serve', gulp.parallel('styles', () => {
//   console.log(`Watching changes...`);
//   gulp.watch('client/**/*.scss', gulp.parallel('styles'));
// }));