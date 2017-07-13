var gulp = require("gulp");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var buffer = require("vinyl-buffer");
var clean = require("gulp-clean");
var useref = require("gulp-useref");
var uglify = require("gulp-uglify");
var replace = require("gulp-replace");


gulp.task("clean",function(){
    return gulp.src("./dist")
    .pipe(clean());
});


gulp.task("copy:assets",function(){
    return gulp.src("./assets/**/*.*")
    .pipe(gulp.dest("./dist/assets"));
});

gulp.task("build:js",function(){
    return browserify("./app.js")
    .transform(babelify)
    .bundle()
    .pipe(source("app.js"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest("./dist"))
});

gulp.task("build:html",function(){
    return gulp.src("./index.html")
    .pipe(useref())
    .pipe(replace("dist/app.js","app.js"))
    .pipe(gulp.dest("./dist"));
});



gulp.task("build",["copy:assets","build:html","build:js"])