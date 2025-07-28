import gulp from 'gulp';
import babel from 'gulp-babel';
import terser from 'gulp-terser';
import concat from 'gulp-concat';
import gulpSass from 'gulp-sass';
import * as sassCompiler from 'sass';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';

const sass = gulpSass(sassCompiler);
import clean from 'gulp-purgecss';
import cacheBust from 'gulp-cache-bust';
import htmlmin from 'gulp-htmlmin';
import pug from 'gulp-pug';

const production = false;

// Bind gulp-sass to the sass compiler
sass.compiler = sassCompiler;

// CSS plugins
const cssPlugins = [cssnano(), autoprefixer()];

// HTML task
gulp.task('html', () => {
	return gulp
		.src('./src/template/page/*.html')
		.pipe(
			htmlmin({
				collapseWhitespace: true,
				removeComments: false,
			})
		)
		.pipe(gulp.dest('./public'));
});

// Babel task (minify and concatenate JS)
gulp.task('babel', () => {
	return gulp
		.src('./src/js/*.js')
		.pipe(concat('scripts-min.js'))
		.pipe(babel())
		.pipe(terser())
		.pipe(gulp.dest('./public/js'));
});

// Pug task
gulp.task('views', () => {
	return gulp
		.src('./src/template/page/index.pug')
		.pipe(
			pug({
				pretty: production ? false : true,
			})
		)
		.pipe(
			cacheBust({
				type: 'timestamp',
			})
		)
		.pipe(gulp.dest('./public'));
});

// Sass task
gulp.task('sass', () => {
	return gulp
		.src('./src/scss/style.scss')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(postcss(cssPlugins))
		.pipe(gulp.dest('./public/css'));
});

// Clean CSS task
gulp.task('clean', () => {
	return gulp
		.src('./public/css/style.css')
		.pipe(
			clean({
				content: ['./public/*.html'],
			})
		)
		.pipe(gulp.dest('./public/css'));
});

// Imagemin task
gulp.task('imagemin', async () => {
    try {
        const imagemin = (await import('gulp-imagemin')).default;
        const mozjpeg = (await import('imagemin-mozjpeg')).default;
        const optipng = (await import('imagemin-optipng')).default;
        const gifsicle = (await import('imagemin-gifsicle')).default;
        const fs = require('fs');

        // Configuración de imagemin
        const imageminOptions = [
            gifsicle({ interlaced: true }),
            mozjpeg({ quality: 75, progressive: true }),
            optipng({ optimizationLevel: 1 })
        ];

        // Crear directorios si no existen
        ['./public/assets', './public/assets/icons'].forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });

        // Procesar imágenes principales y copiarlas
        const mainImages = gulp.src('./src/assets/*.{jpg,jpeg,png,gif}')
            .pipe(imagemin(imageminOptions))
            .pipe(gulp.dest('./public/assets'));

        // Procesar iconos y copiarlos
        const iconImages = gulp.src('./src/assets/icons/**/*.{jpg,jpeg,png,gif,svg}')
            .pipe(imagemin(imageminOptions))
            .pipe(gulp.dest('./public/assets/icons'));

        // Esperar a que todas las operaciones terminen
        await Promise.all([
            new Promise((resolve, reject) => {
                mainImages
                    .on('end', resolve)
                    .on('error', reject);
            }),
            new Promise((resolve, reject) => {
                iconImages
                    .on('end', resolve)
                    .on('error', reject);
            })
        ]);

        console.log('Images processed successfully');

    } catch (error) {
        console.error('Error in imagemin task:', error);
        throw error;
    }
});// Error handling
function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}

// Clean task
gulp.task('clean-all', (done) => {
	const fs = require('fs');
	const path = require('path');

	const directory = 'public';

	// Función recursiva para eliminar directorios
	const removeDir = function (dirPath) {
		if (fs.existsSync(dirPath)) {
			const files = fs.readdirSync(dirPath);

			if (files.length > 0) {
				files.forEach(function (filename) {
					const filePath = path.join(dirPath, filename);
					if (fs.statSync(filePath).isDirectory()) {
						removeDir(filePath);
					} else {
						fs.unlinkSync(filePath);
					}
				});
				fs.rmdirSync(dirPath);
			} else {
				fs.rmdirSync(dirPath);
			}
		}
	};

	try {
		removeDir(directory);
		fs.mkdirSync(directory);
		console.log('Successfully cleaned public directory');
		done();
	} catch (err) {
		console.error('Error cleaning directory:', err);
		done(err);
	}
});

// Build task
gulp.task('build', (done) => {
	gulp.series(
		'clean-all',
		gulp.parallel('imagemin', 'sass', 'babel'),
		'views',
		'clean',
		(seriesDone) => {
			console.log('Build completed successfully');
			seriesDone();
		}
	)(done);
});

// Default task with watch
gulp.task('default', (done) => {
	gulp.series('build', () => {
		gulp.watch('./src/template/**/*.pug', gulp.series('views'))
			.on('error', handleError);

		gulp.watch('./src/scss/**/*.scss', gulp.series('sass', 'clean'))
			.on('error', handleError);

		gulp.watch('./src/js/*.js', gulp.series('babel'))
			.on('error', handleError);

		gulp.watch('./src/assets/**/*', gulp.series('imagemin'))
			.on('error', handleError);

		console.log('Watching for changes...');
	})(done);
});
