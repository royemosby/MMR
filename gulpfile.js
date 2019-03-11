const gulp = require('gulp'),
      notify = require('gulp-notify'),
      sass = require('gulp-sass'),
      plumber = require('gulp-plumber');

const paths = {
  sass: {
    source: 'styles/app.scss',
    dest: './',
  }
}

const onError = function (err) {
  notify.onError({
      title: "Gulp Error - Compile Failed",
      message: "Error: <%= error.message %>"
  })(err);

  this.emit('end');
};

gulp.task('css:compile', function() {
  return gulp.src(paths.sass.source)
      .pipe(plumber({ errorHandler: onError }))
      .pipe(sass())
      .pipe(gulp.dest(paths.sass.dest))
});