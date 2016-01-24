var gulp = require('gulp');
var connect = require('gulp-connect');
var ts = require('gulp-typescript');

var tsproject = ts.createProject('tsconfig.json');

gulp.task('connect', function () {
    connect.server();
});

gulp.task('typescript', function () {
    var tsResult = tsproject.src()
        .pipe(ts(tsproject));

    return tsResult.js.pipe(gulp.dest('js'));
});

gulp.task('watch', ['typescript'], function () {
    return gulp.watch('ts/*.ts', ['typescript']);
});

gulp.task('default', ['connect', 'watch']);