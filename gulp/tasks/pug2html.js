const { dest, src, watch, series, parallel, task } = require('gulp'),
	pug = require('gulp-pug'),
	pugLinter = require('gulp-pug-linter'),
	htmlValidator = require('gulp-w3c-html-validator'),
	bemValidator = require('gulp-html-bem-validator'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	critical = require('critical').stream;

module.exports = task('pug2html', () => {
	return src('src/pages/*.pug')
		.pipe(plumber({
			errorHandler: function(err) {
			notify.onError({
				title: "Ошибка в Pug",
				message: "<%= error.message %>"
			})(err);
			}
		}))
		.pipe(pugLinter({ reporter: 'default' }))
		.pipe(pug({ pretty: true }))
		.pipe(bemValidator())
		.pipe(dest('./build/'))
});

module.exports = task('_pug2html', () => {
	return src('src/pages/*.pug')
		.pipe(plumber({
			errorHandler: function(err) {
			notify.onError({
				title: "Ошибка в Pug",
				message: "<%= error.message %>"
			})(err);
			}
		}))
		.pipe(pugLinter({ reporter: 'default' }))
		.pipe(pug({ pretty: true }))
		.pipe(critical({                            // генерируем критический CSS для быстрой загрузки страниц
			base: `./build/`,                      // из всех наших файлов
			minify: true,                           // с минификацией
			inline: true,
			width: 1920,
			height: 1280,
			css: [`./build/css/styles.min.css`]     // путь к вашему основному файлу стилей, или несколько файлов через звпятую
		}))
		.pipe(bemValidator())
		.pipe(htmlValidator())
		.pipe(dest('./build/'))
});