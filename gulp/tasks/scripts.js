const { dest, src, watch, series, parallel, task } = require('gulp'),
	sourcemaps = require('gulp-sourcemaps'),
	babel = require('gulp-babel'),
	eslint = require('gulp-eslint'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	concat = require('gulp-concat');

module.exports = task('scripts', () => {
	return src('src/js/**/*.js')
		.pipe(plumber({
			errorHandler: function(err) {
				notify.onError({
					title: "Ошибка в JavaScript",
					message: "<%= error.message %>"
				})(err);
			}
		}))
		.pipe(eslint({
			fix: true
		}))
		.pipe(eslint.format())
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.write())
		.pipe(dest('./build/js'))
});

module.exports = task('_scripts', () => {
	return src('src/js/**/*.js')
		.pipe(plumber({
			errorHandler: function(err) {
				notify.onError({
					title: "Ошибка в JavaScript",
					message: "<%= error.message %>"
				})(err);
			}
		}))
		.pipe(eslint({
			fix: true
		}))
		.pipe(eslint.format())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(dest('./build/js'))
});

module.exports = task('libs', () => {
	return src(['node_modules/jquery/dist/jquery.min.js'])
		.pipe(concat('libs.min.js'))
		.pipe(dest('./build/js/vendor'));
});

module.exports = task('_libs', () => {
	return src(['node_modules/jquery/dist/jquery.min.js'])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(dest('./build/js/vendor'));
});