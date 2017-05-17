'use strict'

var gulp = require('gulp')
var sass = require('gulp-sass')

gulp.task('default', () => {
  gulp.start('sass')
})

gulp.task('sass', () => {
  gulp.src('sass/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('static/css'))
})
