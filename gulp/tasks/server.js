const { dest, src, watch, series, parallel, task } = require('gulp'),
	browserSync = require('browser-sync').create(),
	requireDir = require('require-dir');

requireDir('.');

function readyReload(cb) {
	browserSync.reload()
	cb()
}

module.exports = task('browser-sync', () => {
	browserSync.init({
        server: {
			baseDir: "./build",
			notify: false,
			online: true
		}
	});
	watch(['src/images/general/*.{png,jpg,gif,svg}',
		'src/images/content/*.{png,jpg,gif,svg}'], series('images', readyReload))
	watch('src/images/svg/*.svg', series('sprites', readyReload))
	watch('src/styles/**/*.scss', series('styles', cb => src('build/styles').pipe(browserSync.stream()).on('end', cb)))
	watch('src/js/**/*.js', series('scripts', readyReload))
	watch('src/pages/**/*.pug', series('pug2html', readyReload))

	watch('package.json', series('copyModules', readyReload))
});