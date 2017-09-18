/*
* Gulp task runner
* (config src and dist to use) + autoprefixer options (chrome liveReload extention required)
* liveReload server, compile sass/scss, compress js, gulp watch
*/
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var sass = require("gulp-ruby-sass");
var gutil = require("gulp-util");
var connect = require("gulp-connect");
var autoprefixer = require("gulp-autoprefixer");
var imagemin = require("gulp-imagemin");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");

/*
* Use autoprefixer options to choose browser mixins support
*/
// autoprefix options
var autoprefixerOptions = {
	browsers: [
		"Chrome >= 40",
		"IE >= 8",
		"Safari >= 7",
		"Firefox > 20",
		"Opera >= 39"
	]
};

// set up live reload server (localhost:8080)
gulp.task("connect", function() {
	connect.server({
		livereload: true
	});
});

// compile sass
gulp.task("styles", () =>
	sass("src/stylesheets/main.scss")
		.pipe(autoprefixer(autoprefixerOptions))
		.on("error", sass.logError)
		.pipe(gulp.dest("build/stylesheets/"))
		.pipe(connect.reload())
);

// compress images
gulp.task("image-compression", () =>
	gulp
		.src("src/img/*")
		.pipe(imagemin())
		.pipe(gulp.dest("build/img"))
);

// compress JS scripts (into one file)
gulp.task("scripts", function() {
	return (gulp
			.src("src/js/*.js")
			.pipe(sourcemaps.init())
			.pipe(babel())
			.pipe(concat("main.js"))
			// .pipe(uglify())
			.pipe(sourcemaps.write("."))
			.pipe(gulp.dest("build/js"))
			.pipe(connect.reload()) );
});

// live reload for html files
gulp.task("html-reload", function() {
	gulp.src("build/*.html").pipe(connect.reload());
});

// gulp watch
gulp.task("watch", function() {
	gulp.watch("src/js/*.js", ["scripts"]);
	gulp.watch("src/stylesheets/**/*.scss", ["styles"]);
	gulp.watch("build/*.html", ["html-reload"]);
});

// start of script
gulp.task("default", [
	"connect",
	"watch",
	"styles",
	"scripts",
	"image-compression"
]);
