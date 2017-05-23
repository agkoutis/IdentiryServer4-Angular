﻿"use strict";

var gulp = require('gulp');
var config = require('./gulp.config')();
var cleanCSS = require('gulp-clean-css');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var $ = require('gulp-load-plugins')({ lazy: true });

gulp.task("clean:js", function (cb) {
    //return $.rimraf('wwwroot/js/*.min.js', cb);
    return gulp.src('wwwroot/js/*.min.js', { read: false }).pipe(clean());
});

gulp.task("clean:css", function (cb) {
    //return $.rimraf('wwwroot/css/*.min.css', cb);
    return gulp.src('wwwroot/css/*.min.css', { read: false }).pipe(clean());
});

gulp.task('minify:css', function () {
    return gulp.src(config.css)
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.cssDest));
});

gulp.task("clean", ["clean:js", "clean:css"]);
gulp.task('minify', ['minify:css']);

gulp.task("copy:angular", function () {

    return gulp.src(config.angular,
        { base: config.node_modules + "@angular/" })
        .pipe(gulp.dest(config.lib + "@angular/"));
});

gulp.task("copy:angularWebApi", function () {
    return gulp.src(config.angularWebApi,
        { base: config.node_modules })
        .pipe(gulp.dest(config.lib));
});

gulp.task("copy:corejs", function () {
    return gulp.src(config.corejs,
        { base: config.node_modules })
        .pipe(gulp.dest(config.lib));
});

gulp.task("copy:zonejs", function () {
    return gulp.src(config.zonejs,
        { base: config.node_modules })
        .pipe(gulp.dest(config.lib));
});

gulp.task("copy:reflectjs", function () {
    return gulp.src(config.reflectjs,
        { base: config.node_modules })
        .pipe(gulp.dest(config.lib));
});

gulp.task("copy:systemjs", function () {
    return gulp.src(config.systemjs,
        { base: config.node_modules })
        .pipe(gulp.dest(config.lib));
});

gulp.task("copy:rxjs", function () {
    return gulp.src(config.rxjs,
        { base: config.node_modules })
        .pipe(gulp.dest(config.lib));
});

gulp.task("copy:app", function () {
    return gulp.src(config.app)
        .pipe(gulp.dest(config.appDest));
});

gulp.task("copy:jasmine", function () {
    return gulp.src(config.jasminejs,
        { base: config.node_modules + "jasmine-core/lib" })
        .pipe(gulp.dest(config.lib));
});

/* Bower  */

var paths = {
    bower: "./bower_components/",
    lib: "./wwwroot/lib/"
};

gulp.task("copy:bower", function () {
    var bower = {
        "bootstrap": "bootstrap/dist/**/*.{min.js,min.css,ttf,svg,woff,eot}",
        "jquery": "jquery/dist/jquery.min.js",
        "jquery-validation": "jquery-validation/dist/jquery.validate.js",
        "jquery-validation-unobtrusive": "jquery-validation-unobtrusive/jquery.validate.unobtrusive.js",
        "tether": "tether/dist/js/tether.min.js"
    };

    for (var destinationDir in bower) {
        gulp.src(paths.bower + bower[destinationDir])
            .pipe(gulp.dest(paths.lib + destinationDir));
    }
});


/* Bower  */

gulp.task("dependencies", [
    "copy:angular",
    "copy:angularWebApi",
    "copy:corejs",
    "copy:zonejs",
    "copy:reflectjs",
    "copy:systemjs",
    "copy:rxjs",
    "copy:jasmine",
    "copy:bower",
    "copy:app"
]);

gulp.task("watch", function () {
    return $.watch(config.app)
        .pipe(gulp.dest(config.appDest));
});

gulp.task("default", ["clean", 'minify', "dependencies"]);