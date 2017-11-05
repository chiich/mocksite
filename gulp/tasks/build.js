var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
del = require('del'),
browsersync = require('browser-sync').create();


gulp.task('build', ['deleteDistFolder','copyGeneralFiles', 'optimiseImages', 'useminTrigger']);

gulp.task('deleteDistFolder', ['icons'], function() {
    return del('./docs');
});

gulp.task('previewDist', function() {
    browsersync.init({
        notify: false,
        server:{
          baseDir: "docs"
        }
      });
});

gulp.task('copyGeneralFiles',['deleteDistFolder'], function() {
    var pathsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/images/**/*',
        '!./app/assets/styles/**/*',
        '!./app/assets/scripts/**/*',
        '!./app/temp/',
        '!./app/temp/**/*'
    ];

    return gulp.src(pathsToCopy)
        .pipe( gulp.dest('./docs/') );
})

gulp.task('optimiseImages',['deleteDistFolder'], function() {
    return gulp.src([
        './app/assets/images/**/*',
        '!./app/assets/images/icons',
        '!./app/assets/images/icons/**/*'
    ]).pipe(imagemin({
        progressive: true,
        interlaced: true,
        multipass: true
    })).pipe( gulp.dest('./docs/assets/images/'));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
    gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], function() {
    return gulp.src('./app/index.html')
        .pipe(usemin({
            css:[ function(){ return rev() }, function() { return cssnano() }],
            js: [ function() {return rev() }, function() { return uglify() }]
        })).pipe( gulp.dest('./docs/') )
})