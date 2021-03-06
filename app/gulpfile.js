'use strict'

var gulp = require('gulp')
var sass = require('gulp-sass')
var cleanCSS = require('gulp-clean-css')

gulp.task('default', () => {
  gulp.start('sass')
})

gulp.task('deploy', () => {
  gulp.start('sass')
})

gulp.task('watch', () => {
  gulp.watch('sass/*.sass', ['sass'])
})

gulp.task('sass', () => {
  gulp.src('sass/*.sass')
    .pipe(sass())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('static/css'))
})

gulp.task('test', () => {
  var mocha = require('gulp-mocha')
  gulp.src('test/*.js', {read: false})
    .pipe(mocha())
})
