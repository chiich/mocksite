var gulp = require('gulp');

var watch = require('gulp-watch');
var browsersync = require('browser-sync').create();


gulp.task('watch', function(){

  browsersync.init({
    notify: false,
    server:{
      baseDir: "app"
    }
  });

  watch('./app/index.html',function(){
    browsersync.reload();
  });

  watch('./app/assets/styles/**/*.css',function(){
    gulp.start('cssInject');
  });
});

gulp.task('cssInject', ['styles'] , function(){
  return gulp.src('./app/temp/styles/style.css')
              .pipe(browsersync.stream());
});
