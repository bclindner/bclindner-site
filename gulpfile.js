'use strict'

var gulp = require('gulp')
var sass = require('gulp-sass')
var cleanCSS = require('gulp-clean-css')

gulp.task('default', () => {
  gulp.start('sass')
})

gulp.task('sass', () => {
  gulp.src('sass/*.sass')
    .pipe(sass())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('static/css'))
})
