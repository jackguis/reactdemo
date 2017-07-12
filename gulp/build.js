var gulp = require("gulp");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var clean = require("gulp-clean");
var useref = require("gulp-useref");


gulp.task("clean",function(){
    return gulp.src("./dist")
    .pipe(clean());
});

gulp.task("build:js",function(){

    return browserify("./app.js")
    .transform(babelify)
    .bundle()
    .pipe(source("app.js"))
    .pipe(gulp.dest("./dist"))
});

gulp.task("build:html",function(){
    return gulp.src("./index.html")
    .pipe(useref())
    .pipe(gulp.dest("./dist"));
});
