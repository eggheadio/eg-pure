var config = require("./gulp.config.json");

var gulp = require("gulp");
var ngHtml2js = require("gulp-ng-html2js");
var minifyHtml = require("gulp-minify-html");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var debug = require("gulp-debug");
var ngMin = require("gulp-ngmin");
var rimraf = require("gulp-rimraf");
var streamqueue = require("streamqueue");
var protractor = require("gulp-protractor").protractor;


gulp.task("build", function () {
    return streamqueue(
        {objectMode: true},
        //clean
        gulp.src("./dist/**", {read: false})
            .pipe(rimraf()),
        //add angular (needs to be first)
        gulp.src("./bower_components/angular/angular.js"),
        //build templates
        gulp.src("./src/**/*.html")
            .pipe(minifyHtml({
                empty: true,
                spare: true,
                quotes: true
            }))
            .pipe(ngHtml2js({
                moduleName: "egTemplates",
                rename: function (url) {
                    return "templates/" + url.split("/").pop();
                }
            })
        )
            .pipe(ngMin())

        ,
        //add directives
        gulp.src(["./src/**/*.js"])
            .pipe(ngMin())
    )
        .pipe(concat("egPure.js"))
        .pipe(gulp.dest("./dist"))
        .pipe(uglify())
        .pipe(concat("egPure.min.js"))
        .pipe(gulp.dest("./dist"));
})

gulp.task("e2e", ["build"], function () {
    return gulp.src(["./e2e/*_spec.js"])
        .pipe(protractor({
            configFile: "./protractor-conf.js"
        }))
        .on('error', function (e) {
            throw e
        })
})


gulp.task("default", ["build", "e2e"])
