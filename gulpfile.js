const gulp = require('gulp');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');

const paths = {
  sass: {
    source: 'sass/app.scss',
    dest: './styles',
  },
};

function onError(err) {
  notify.onError({
    title: 'Gulp Error - Compile Failed',
    message: 'Error: <%= error.message %>',
  })(err);

  this.emit('end');
}

gulp.task('css:compile', () => gulp
  .src(paths.sass.source)
  .pipe(
    plumber({
      errorHandler: onError,
    }),
  )
  .pipe(sass())
  .pipe(gulp.dest(paths.sass.dest)));

gulp.task('watch', () => {
  gulp.watch(paths.sass.source, gulp.parallel('css:compile'));
});
