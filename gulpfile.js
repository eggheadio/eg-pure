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
        gulp.src(config.dist, {read: false})
            .pipe(rimraf()),
        //add angular (needs to be first)
        gulp.src(config.angular),
        //build templates
        gulp.src(config.templatesPath)
            .pipe(minifyHtml({
                empty: true,
                spare: true,
                quotes: true
            }))
            .pipe(ngHtml2js({
                moduleName: config.templatesModuleName,
                rename: function (url) {
                    return config.templatePrefix + url.split("/").pop();
                }
            })
        )
            .pipe(ngMin())

        ,
        //add directives
        gulp.src([config.directivesPath])
            .pipe(ngMin())
    )
        .pipe(concat(config.name))
        .pipe(gulp.dest(config.dist))
        .pipe(uglify())
        .pipe(concat(config.minName))
        .pipe(gulp.dest(config.dist));
})

gulp.task("e2e", ["build"], function () {
    return gulp.src([config.specPath])
        .pipe(protractor({
            configFile: config.protractorConf
        }))
        .on('error', function (e) {
            throw e
        })
})


gulp.task("default", ["build", "e2e"])
