/*
* Gulp task runner
* (config src and dist to use) + autoprefixer options (chrome liveReload extention required)
* liveReload server, compile sass/scss, compress js, gulp watch
*/
const gulp = require("gulp");
const uglify = require("gulp-uglify");
const sass = require("gulp-ruby-sass");
const connect = require("gulp-connect");
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");

/*
* Use autoprefixer options to choose browser mixins support
*/
// autoprefix options
const autoprefixerOptions = {
	browsers: [
		"Chrome >= 40",
		"IE >= 8",
		"Safari >= 7",
		"Firefox > 20",
		"Opera >= 39"
	]
};

// set up live reload server (localhost:8080)
gulp.task("connect", () => {
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
gulp.task("scripts", () =>
	gulp
		.src("src/js/*.js")
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat("main.js"))
		.pipe(uglify())
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("build/js"))
		.pipe(connect.reload())
);

// live reload for html files
gulp.task("html-reload", () => {
	gulp.src("build/*.html").pipe(connect.reload());
});

// gulp watch
gulp.task("watch", () => {
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
