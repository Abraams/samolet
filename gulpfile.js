const SOURCE_FOLDER = "app";
const BUILD_FOLDER = "dist";
const NODE = "node_modules";

const PATHS = {
	bulid: {
		html: `${BUILD_FOLDER}/`,
		css: `${BUILD_FOLDER}/css/`,
		js: `${BUILD_FOLDER}/js/`,
		img: `${BUILD_FOLDER}/img/`,
		fonts: `${BUILD_FOLDER}/fonts/`,
	},
	src: {
		html: [`${SOURCE_FOLDER}/**/*.html`, `!${SOURCE_FOLDER}/**/_*.html`],
		css: `${SOURCE_FOLDER}/less/main.less`,
		cssLibs: [
			`node_modules/normalize.css/normalize.css`,
			`node_modules/slick-carousel/slick/slick.css`,
		],
		js: `${SOURCE_FOLDER}/js/index.js`,
		jsLibs: [
			`node_modules/jquery/dist/jquery.min.js`,
			`node_modules/slick-carousel/slick/slick.min.js`,
			`node_modules/animejs/lib/anime.min.js`,
		],
		img: `${SOURCE_FOLDER}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
		fonts: `${SOURCE_FOLDER}/fonts/*.ttf`,
	},
	watch: {
		html: `${SOURCE_FOLDER}/**/*.html`,
		css: `${SOURCE_FOLDER}/less/**/*.less`,
		js: `${SOURCE_FOLDER}/js/**/*.js`,
		img: `${SOURCE_FOLDER}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
	},
	clean: `${BUILD_FOLDER}/`,
};

const { src, dest, series, parallel, watch } = require("gulp");

const less = require("gulp-less"),
	csso = require("gulp-csso"),
	gcmq = require("gulp-group-css-media-queries"),
	autoprefixer = require("gulp-autoprefixer");

const babel = require("gulp-babel"),
	sourcemaps = require("gulp-sourcemaps");

const uglify = require("gulp-uglify"),
	concat = require("gulp-concat"),
	include = require("gulp-file-include"),
	rename = require("gulp-rename"),
	del = require("del");

const imagemin = require("gulp-imagemin"),
	imageminPngquant = require("imagemin-pngquant"),
	imageminMozjpeg = require("imagemin-mozjpeg"),
	webp = require("gulp-webp"),
	webpHtml = require("gulp-webp-html");

const ttf2woff = require("gulp-ttf2woff"),
	ttf2woff2 = require("gulp-ttf2woff2"),
	fonter = require("gulp-fonter");

const browserSync = require("browser-sync").create();

// ------------

function HTML() {
	return src(PATHS.src.html)
		.pipe(include())
		.pipe(webpHtml())
		.pipe(dest(PATHS.bulid.html))
		.pipe(browserSync.stream());
}

function CSS() {
	return src(PATHS.src.css)
		.pipe(less())
		.pipe(gcmq())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["<0.1%"],
			})
		)
		.pipe(
			rename({
				basename: "style",
			})
		)
		.pipe(dest(PATHS.bulid.css))
		.pipe(
			csso({
				restructure: true,
			})
		)
		.pipe(
			rename({
				suffix: ".min",
			})
		)
		.pipe(dest(PATHS.bulid.css))
		.pipe(browserSync.stream());
}

function CSS_LIBS() {
	return src(PATHS.src.cssLibs)
		.pipe(concat("_libs.less"))
		.pipe(dest(`${SOURCE_FOLDER}/less/`))
		.pipe(browserSync.stream());
}

function JS() {
	return src(PATHS.src.js)
		.pipe(sourcemaps.init())
		.pipe(include())
		.pipe(
			rename({
				basename: "scripts",
			})
		)
		.pipe(dest(PATHS.bulid.js))
		.pipe(babel())
		.pipe(
			uglify({
				toplevel: true,
			})
		)
		.pipe(sourcemaps.write())
		.pipe(
			rename({
				suffix: ".min",
			})
		)
		.pipe(dest(PATHS.bulid.js))
		.pipe(browserSync.stream());
}

function JS_LIBS() {
	return src(PATHS.src.jsLibs)
		.pipe(
			rename({
				basename: "scripts",
			})
		)
		.pipe(concat("libs.min.js"))
		.pipe(dest(PATHS.bulid.js))
		.pipe(browserSync.stream());
}

function IMG() {
	return src(PATHS.src.img)
		.pipe(
			webp({
				quality: 80,
			})
		)
		.pipe(dest(PATHS.bulid.img))
		.pipe(src(PATHS.src.img))
		.pipe(
			imagemin(
				[
					imageminPngquant(),
					imageminMozjpeg({
						progressive: true,
					}),
				],
				{
					verbose: true,
				}
			)
		)
		.pipe(dest(PATHS.bulid.img))
		.pipe(browserSync.stream());
}

function BROWSER_SYNC() {
	browserSync.init({
		server: {
			baseDir: `./${BUILD_FOLDER}/`,
		},
		port: 3000,
		notify: false,
	});
}

function OFT_2_TTF() {
	return src(`${SOURCE_FOLDER}/fonts/*.otf`)
		.pipe(fonter({ formats: ["ttf"] }))
		.pipe(dest(`${SOURCE_FOLDER}/fonts/`));
}

function TTF_2_WOFF() {
	src(PATHS.src.fonts).pipe(ttf2woff()).pipe(dest(PATHS.bulid.fonts));
	return src(PATHS.src.fonts).pipe(ttf2woff2()).pipe(dest(PATHS.bulid.fonts));
}

function CLEAN() {
	return del(PATHS.clean);
}

function WATCH_FILES() {
	watch([PATHS.watch.html], HTML);
	watch([PATHS.watch.css], CSS);
	watch([PATHS.watch.js], JS);
	watch([PATHS.watch.img], IMG);
}

const CONVERT_FONTS = series(OFT_2_TTF, TTF_2_WOFF);

const BUILD = series(
	CLEAN,
	HTML,
	CSS_LIBS,
	CSS,
	JS_LIBS,
	JS,
	IMG,
	CONVERT_FONTS
);
const WATCH = series(BUILD, parallel(WATCH_FILES, BROWSER_SYNC));

exports.fonts = CONVERT_FONTS;
exports.img = IMG;

exports.jsLibs = JS_LIBS;
exports.js = JS;
exports.cssLibs = CSS_LIBS;
exports.css = CSS;
exports.html = HTML;

exports.clean = CLEAN;
exports.build = BUILD;
exports.watch = WATCH;
exports.default = WATCH;
